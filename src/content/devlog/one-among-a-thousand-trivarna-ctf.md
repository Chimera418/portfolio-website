---
title: "One Among a Thousand — Trivarna CTF Writeup"
pubDate: 2026-08-17
description: "Forensic image analysis on a 1000-QR-code grid: detecting pixel value 254 anomalies in quiet zones and extracting LSB payloads."
tags: ["CTF", "Trivarna CTF", "Forensics", "Steganography", "Python"]
---

**Category:** Forensics / Steganography
**Files:** `UNI6CTF_QR.zip`

---

## Challenge Description

> A thousand voices speak, but only one carries the truth. Not every message deserves attention, and not every answer is a flag. The patient investigator knows that the truth often hides beneath the surface. Can you uncover the secret hidden among the crowd and recover the final flag?

---

## TL;DR

`challenge.png` is a 5800×3625 image holding a 40×25 grid of 1000 QR codes. 999 of them scan to
throwaway taunts like `Access denied.` — the grid is one big haystack. The whole image only ever
uses the pixel values `0`, `254` and `255`; a real black-and-white QR render has no reason to
contain `254`. Every `254` pixel lives in a single scanline — the top row of the cell at grid
position **(row 14, column 0)** — and those pixels carry an LSB-encoded string:

```
11:Freedom1947
```

`Freedom1947` is the ZipCrypto password for `flag.zip`, which yields `final_flag/flag.txt`:

```
UNI6CTF{QR_M9s5er_Tr1ver4a_W1nn7r}
```

---

## Initial Analysis

Standard first move — list before extracting, then identify everything:

```bash
unzip -l UNI6CTF_QR.zip
unzip UNI6CTF_QR.zip -d extracted
cd extracted
ls -lah
file *
cat readme.txt
```

![Initial archive contents](/images/writeups/one-among-a-thousand/01_archive_contents.png)

Three files:

| File | Size | Type |
|---|---|---|
| `challenge.png` | 265 KB | PNG image data, 5800 x 3625, 8-bit/color RGB, non-interlaced |
| `flag.zip` | 251 B | Zip archive, 1 entry, `method=store` |
| `readme.txt` | 215 B | ASCII text |

`readme.txt`:

```
One among a thousand carries the truth.

The truth cannot be seen all at once.

Most people stop after reading.
The patient investigator looks deeper.

Not every answer is a flag.
Sometimes an answer is only a key.
```

That is a fairly explicit roadmap: something in the image is a *key*, not a flag, and the flag
itself is behind the archive. Checking `flag.zip` confirms it:

```bash
unzip -Z flag.zip
xxd flag.zip | head -3
```

```
-rwxrwxrwx  3.0 unx       35 TX stor 26-Jul-29 17:11 final_flag/flag.txt
```

The general-purpose flags in the local file header are `0x0009` — bit 0 set means the entry is
encrypted with legacy ZipCrypto. The stored size is 47 bytes for 35 bytes of content, i.e. the
12-byte encryption header is present. So: find a password, open the zip.

**Observation → hypothesis:** the readme's "key" is hidden in `challenge.png`.

---

## Investigating the Image

ImageMagick wasn't installed on my box, so Pillow + numpy did the job:

```bash
python3 -c "
from PIL import Image
import numpy as np
im = Image.open('challenge.png')
print('mode', im.mode, 'size', im.size, 'info', im.info)
a = np.array(im)
print('unique pixel values:', np.unique(a))
"
```

```
mode RGB size (5800, 3625) info {}
unique pixel values: [  0 254 255]
```

Two things fell out immediately:

1. There is **no EXIF/text metadata** at all — `im.info` is empty, so no cheap win there.
2. The image contains exactly three distinct values across all channels: `0`, `254`, `255`.

A rendered black-and-white QR grid should be strictly `{0, 255}`. The presence of `254` — and
*only* `254`, not a spread of near-white values you'd get from resampling or JPEG history — is
the tell. That is what "the truth often hides beneath the surface" points at: values that differ
from white by exactly 1, i.e. a flipped least significant bit.

Before chasing that, I nailed down the grid geometry properly rather than eyeballing it. The
cells are separated by fully-white gutters, so the pitch can be measured:

```bash
python3 -c "
from PIL import Image
import numpy as np
a = np.array(Image.open('challenge.png').convert('L'))
white_rows = np.where((a == 255).all(axis=1))[0]
bands, s, p = [], white_rows[0], white_rows[0]
for y in white_rows[1:]:
    if y != p + 1: bands.append(s); s = y
    p = y
bands.append(s)
print('gutter band starts:', bands[:5], '...')
print('pitch:', np.bincount(np.diff(bands)).argmax())
print('grid:', a.shape[0] // 145, 'rows x', a.shape[1] // 145, 'cols')
"
```

```
pitch: 145
grid: 25 rows x 40 cols
```

![Challenge image and dimensions](/images/writeups/one-among-a-thousand/02_image_analysis.png)

The arithmetic is exact, no rounding involved:

```
5800 / 145 = 40 columns
3625 / 145 = 25 rows
40 × 25     = 1000 cells
```

Each 145×145 cell is a 125×125 QR bitmap (25 modules at 5 px each) with a 10 px quiet zone.
"A thousand voices" is literal — there are exactly 1000 QR codes.

---

## A Thousand Voices

You do not read 1000 QR codes by hand. `scan_qr.py` slices the image on the 145 px pitch, pads
each cell with extra white so zbar has a quiet zone to lock onto, and decodes everything:

```bash
python3 scan_qr.py
```

![QR grid scanning](/images/writeups/one-among-a-thousand/03_qr_scan.png)

```
[+] Decoded : 999 / 1000
[+] Failed  : 1  -> [(14, 0)]
[+] Distinct messages: 20

    count  message
    -----  -------
       69  Access denied.
       64  Keep looking.
       60  The journey continues.
       57  Still searching?
       56  Look elsewhere.
       56  Not the chosen one.
       53  Keep hunting.
       52  Nothing here.
       52  No treasure found.
       50  This is a decoy.
       49  Not today.
       49  Better luck next time.
       45  Search harder.
       43  Wrong QR.
       43  Try another.
       43  Flag not present.
       42  No flag here.
       41  Sorry, not this one.
       39  You are getting closer.
       36  Almost.
```

999 cells decode to one of 20 canned taunts drawn at random. Not one of them contains a flag,
a password, or anything else useful — this is the "not every message deserves attention" part of
the description. The only genuinely interesting result is the **single cell zbar refuses to
decode: (14, 0)**.

---

## Finding the Odd One Out

Two independent checks land on the same cell, which is what makes the identification solid rather
than a guess.

### 1. Pixel-value check

Every one of the 1000 cells is tested for the set of values it contains:

```python
values = np.unique(cell)
if not np.array_equal(values, np.array([0, 255])):
    # anomaly
```

Exactly one cell fails:

```
[!] Suspicious cell found
    Row / Column      : 14 / 0   (zero-based)
    Pixel offset      : (0, 2030)
    Pixel values      : [0, 254, 255]
    QR bitmap size    : 135 x 135 px (every other cell is 125 x 125)
```

999 cells are pure `{0, 255}`. Cell (14, 0) also contains `254`. Locating those pixels across the
full image:

```
count of 254 channel-values: 145   (R: 56, G: 48, B: 41)
rows containing 254        : [2030]
x positions                : 0 … 98
```

Every `254` in a 21-megapixel image sits on a **single scanline**, `y = 2030`, in the first 99
pixels. And `2030 = 145 × 14`, i.e. it is the very first row of tile (14, 0) — which is quiet
zone, above the QR bitmap. That is not noise, that is a payload written at a tile's origin.

### 2. Geometry check

Measuring the black bounding box inside each cell gives a second, independent anomaly on the same
tile:

| Cell | black bbox | modules |
|---|---|---|
| normal cell | 125 × 125 px at offset (10, 10) | 25 × 25 (QR version 2) |
| cell (14, 0) | **135 × 135 px** at offset (10, 10) | truncated |

The odd cell's QR is drawn at the same 5 px module scale but is a **version 3 (29 × 29 module)**
code, which needs 145 px. Starting it at offset 10 inside a 145 px tile means the rightmost 2
module columns and bottom 2 module rows are cut off at the tile boundary. You can see it in the
sampled module grid: the top-left finder pattern is intact, the timing patterns are intact, but
the top-right and bottom-left finders are sliced in half:

```
TR finder (clipped)      BL finder (clipped)
0 0 1 1 1 1 1            1 0 0 0 1 1 1
0 0 1 0 0 0 0            0 0 0 0 0 0 0
0 0 1 0 1 1 1            1 1 1 1 1 1 1
1 0 1 0 1 1 1            1 0 0 0 0 0 1
0 0 1 0 1 1 1            1 0 1 1 1 0 1
0 0 1 0 0 0 0            1 0 1 1 1 0 1
1 0 1 1 1 1 1            1 0 1 1 1 0 1
```

I confirmed the missing modules really are gone rather than spilling into the neighbouring tile —
the 10 px strip to the right (`x` 145–154) and below (`y` 2175–2184) is solid white, and cell
(14, 1) is a perfectly normal 125×125 decoy. Both zbar and OpenCV's `QRCodeDetector` fail on it,
even after upscaling and re-padding.

So the odd cell is deliberately unreadable as a QR. That matches the readme line *"The truth
cannot be seen all at once"* — the payload was never meant to come out of the QR decoder. It is a
signpost, not a message.

![Suspicious QR identified](/images/writeups/one-among-a-thousand/04_suspicious_qr.png)

The cell is dumped to `suspicious_qr.png` by the solver so you can look at it:

```bash
python3 solve.py           # writes suspicious_qr.png
xdg-open suspicious_qr.png
```

For completeness, the usual container checks come up empty on it — there is no appended data and
no embedded file:

```bash
binwalk suspicious_qr.png
strings suspicious_qr.png
```

Which is expected: the data is in the pixels, not in the file structure.

---

## Beneath the Surface

The value `254` versus `255` is a one-bit difference in the least significant bit:

```
255 = 1111 1111   ->  LSB = 1
254 = 1111 1110   ->  LSB = 0
```

Both are visually white. So the extraction is:

```
pixel value
      ↓
extract least significant bit (value & 1)
      ↓
binary stream, row-major, R → G → B
      ↓
group into bytes (8 bits, MSB first)
      ↓
ASCII decoding
```

One detail matters: the bit stream must stop before the QR bitmap starts. Black pixels are `0`,
whose LSB is also `0`, so reading past the quiet zone floods the stream with fake zero bits. The
solver cuts the stream at the first black pixel in the cell, which leaves the 10 px quiet zone —
4380 bits — of which the payload occupies the first 297:

```bash
python3 solve.py
```

![LSB extraction](/images/writeups/one-among-a-thousand/05_lsb_extraction.png)

```
[+] Extracting LSB data from the suspicious cell...
    Quiet-zone bits   : 4380  (stream stops at first black pixel)
    Last 0 bit at     : 296  (everything after is padding)
    Bytes recovered   : 37
    Raw               : b'11:Freedom1947\r9s5er_Tr1ver4a_W1nn7r}'

[+] Hidden message recovered:
    Length header     : 11
    Secret            : Freedom1947
```

The payload is length-prefixed: `<n>:<message>`, so `11:` means the next 11 bytes are the secret —
**`Freedom1947`**.

A note on the trailing bytes, since they show up in the raw dump: `\r9s5er_Tr1ver4a_W1nn7r}` is
leftover data from an earlier embedding at the same offset that the shorter `11:Freedom1947`
payload only partially overwrote. The original 37-byte payload was almost certainly
`34:UNI6CTF{QR_M9s5er_Tr1ver4a_W1nn7r}` — same length, and the surviving tail lines up byte for
byte with the flag recovered from the zip later. It is an authoring artefact, not part of the
intended solve path; the length header tells you to stop at 11 bytes, and the zip password
confirms that reading is right.

---

## Not Every Answer Is a Flag

`Freedom1947` is not in flag format and submitting it gets you nowhere. The readme already said
what to do with it — *"Sometimes an answer is only a key"* — and `flag.zip` is sitting there
ZipCrypto-encrypted. Test it:

```bash
unzip -P "Freedom1947" flag.zip -d final_flag_out
```

![Password used to extract archive](/images/writeups/one-among-a-thousand/06_zip_extraction.png)

```
Archive:  flag.zip
 extracting: final_flag_out/final_flag/flag.txt
```

No CRC error, no "incorrect password" — the password is correct.

---

## Recovering the Flag

```bash
find final_flag_out -type f
cat final_flag_out/final_flag/flag.txt
```

![Final flag](/images/writeups/one-among-a-thousand/07_final_flag.png)

```
final_flag_out/final_flag/flag.txt
UNI6CTF{QR_M9s5er_Tr1ver4a_W1nn7r}
```

34 bytes plus a trailing newline — matching the 35-byte uncompressed size the zip directory
reported at the start.

---

## Complete Solver

`solve.py`:

```python
#!/usr/bin/env python3
"""
UNI6CTF - "One Among a Thousand" solver.

Path:
  challenge.png  -> 40x25 grid of QR codes (1000 cells)
  one cell has pixel value 254 (every other cell is pure 0/255)
  the 254s are LSB-encoded bytes -> "11:Freedom1947"
  "Freedom1947" is the ZipCrypto password for flag.zip -> final_flag/flag.txt

Only needs: pillow, numpy.  (pyzbar/opencv are optional, used for the decoy dump.)
"""

import os
import sys
import zipfile

import numpy as np
from PIL import Image

IMAGE = os.path.join("extracted", "challenge.png")
ZIP = os.path.join("extracted", "flag.zip")
OUTDIR = "final_flag_out"
SUSPECT_PNG = "suspicious_qr.png"

BAR = "=" * 60


def banner(text):
    print(BAR)
    print(text.center(60))
    print(BAR)
    print()


# --------------------------------------------------------------------------
# 1. Load the image
# --------------------------------------------------------------------------
def load_image(path):
    print("[+] Loading challenge image...")
    img = Image.open(path)
    arr = np.array(img)
    print(f"    File   : {path}")
    print(f"    Mode   : {img.mode}")
    print(f"    Size   : {img.size[0]} x {img.size[1]}")
    print(f"    Values : {np.unique(arr).tolist()}   <-- 254 should not exist in a B/W QR")
    print()
    return arr


# --------------------------------------------------------------------------
# 2. Work out the grid geometry from the white gutters instead of guessing
# --------------------------------------------------------------------------
def detect_grid(arr):
    """Find the cell pitch by looking at the fully-white separator rows."""
    gray = arr[:, :, 0] if arr.ndim == 3 else arr
    height, width = gray.shape

    white_rows = np.where((gray == 255).all(axis=1))[0]

    # group consecutive white rows into bands
    bands, start, prev = [], white_rows[0], white_rows[0]
    for y in white_rows[1:]:
        if y != prev + 1:
            bands.append(start)
            start = y
        prev = y
    bands.append(start)

    # the pitch is the most common distance between band starts
    gaps = np.diff(bands)
    pitch = int(np.bincount(gaps).argmax())

    rows, cols = height // pitch, width // pitch
    print("[+] Detecting grid...")
    print(f"    Cell pitch  : {pitch} px")
    print(f"    Grid        : {rows} rows x {cols} columns")
    print(f"    Total cells : {rows * cols}")
    print()
    return pitch, rows, cols


# --------------------------------------------------------------------------
# 3. Scan every cell and flag the ones that are not plain black/white
# --------------------------------------------------------------------------
def scan_cells(arr, pitch, rows, cols):
    print("[+] Scanning cells for anomalies...")
    gray = arr[:, :, 0] if arr.ndim == 3 else arr
    suspects = []

    for r in range(rows):
        for c in range(cols):
            cell = gray[r * pitch:(r + 1) * pitch, c * pitch:(c + 1) * pitch]
            values = np.unique(cell)

            # a clean QR render only ever contains 0 and 255
            if not np.array_equal(values, np.array([0, 255], dtype=values.dtype)):
                black = np.argwhere(cell == 0)
                qr_px = (black[:, 0].max() - black[:, 0].min() + 1,
                         black[:, 1].max() - black[:, 1].min() + 1)
                suspects.append((r, c, values.tolist(), qr_px))

    print(f"    Cells checked : {rows * cols}")
    print(f"    Anomalies     : {len(suspects)}")
    print()

    for r, c, values, qr_px in suspects:
        print("[!] Suspicious cell found")
        print(f"    Row / Column      : {r} / {c}   (zero-based)")
        print(f"    Pixel offset      : ({c * pitch}, {r * pitch})")
        print(f"    Pixel values      : {values}   <-- 254 is not a QR colour")
        print(f"    QR bitmap size    : {qr_px[1]} x {qr_px[0]} px "
              f"(every other cell is 125 x 125)")
        print()
    return suspects


# --------------------------------------------------------------------------
# 4. Pull the LSB payload out of the suspicious cell
# --------------------------------------------------------------------------
def extract_lsb(arr, pitch, row, col):
    print("[+] Extracting LSB data from the suspicious cell...")
    cell = arr[row * pitch:(row + 1) * pitch, col * pitch:(col + 1) * pitch]

    # The payload sits in the white quiet zone above the QR bitmap. Black pixels
    # (value 0) would also read as bit 0, so cut the stream at the first one.
    flat = cell.reshape(-1)
    quiet = int(np.min(np.where(flat == 0)))

    # row-major, R -> G -> B, one bit per channel: 255 -> 1, 254 -> 0
    bits = flat[:quiet] & 1

    payload_len = int(np.max(np.where(bits == 0)) + 1)
    print(f"    Quiet-zone bits   : {bits.size}  (stream stops at first black pixel)")
    print(f"    Last 0 bit at     : {payload_len - 1}  (everything after is padding)")

    data = bytearray()
    for i in range(0, (payload_len // 8) * 8, 8):
        byte = 0
        for bit in bits[i:i + 8]:
            byte = (byte << 1) | int(bit)
        data.append(byte)

    print(f"    Bytes recovered   : {len(data)}")
    print(f"    Raw               : {bytes(data)!r}")
    print()

    # the payload is length-prefixed:  "<n>:<message>"
    header, _, rest = bytes(data).partition(b":")
    secret = rest[:int(header)].decode()

    print("[+] Hidden message recovered:")
    print(f"    Length header     : {int(header)}")
    print(f"    Secret            : {secret}")
    print()
    return cell, secret


# --------------------------------------------------------------------------
# 5. Use the secret as the ZIP password
# --------------------------------------------------------------------------
def crack_zip(zip_path, password, outdir):
    print(f"[+] Testing '{password}' against {zip_path} ...")
    with zipfile.ZipFile(zip_path) as zf:
        names = zf.namelist()
        print(f"    Archive entries   : {names}")
        zf.extractall(outdir, pwd=password.encode())

    flag_path = os.path.join(outdir, names[0])
    with open(flag_path) as fh:
        flag = fh.read().strip()

    print("[SUCCESS] Archive extracted.")
    print(f"    Written to        : {flag_path}")
    print()
    return flag


def main():
    banner("UNI6CTF CHALLENGE SOLVER")

    arr = load_image(IMAGE)
    pitch, rows, cols = detect_grid(arr)
    suspects = scan_cells(arr, pitch, rows, cols)

    if len(suspects) != 1:
        sys.exit("[-] expected exactly one anomalous cell")

    r, c = suspects[0][0], suspects[0][1]
    cell, secret = extract_lsb(arr, pitch, r, c)

    Image.fromarray(cell).save(SUSPECT_PNG)
    print(f"[+] Suspicious cell saved as {SUSPECT_PNG}")
    print()

    flag = crack_zip(ZIP, secret, OUTDIR)

    print(BAR)
    print("FINAL FLAG:")
    print(flag)
    print(BAR)


if __name__ == "__main__":
    main()
```

Full run:

```
============================================================
                  UNI6CTF CHALLENGE SOLVER
============================================================

[+] Loading challenge image...
    File   : extracted/challenge.png
    Mode   : RGB
    Size   : 5800 x 3625
    Values : [0, 254, 255]   <-- 254 should not exist in a B/W QR

[+] Detecting grid...
    Cell pitch  : 145 px
    Grid        : 25 rows x 40 columns
    Total cells : 1000

[+] Scanning cells for anomalies...
    Cells checked : 1000
    Anomalies     : 1

[!] Suspicious cell found
    Row / Column      : 14 / 0   (zero-based)
    Pixel offset      : (0, 2030)
    Pixel values      : [0, 254, 255]   <-- 254 is not a QR colour
    QR bitmap size    : 135 x 135 px (every other cell is 125 x 125)

[+] Extracting LSB data from the suspicious cell...
    Quiet-zone bits   : 4380  (stream stops at first black pixel)
    Last 0 bit at     : 296  (everything after is padding)
    Bytes recovered   : 37
    Raw               : b'11:Freedom1947\r9s5er_Tr1ver4a_W1nn7r}'

[+] Hidden message recovered:
    Length header     : 11
    Secret            : Freedom1947

[+] Suspicious cell saved as suspicious_qr.png

[+] Testing 'Freedom1947' against extracted/flag.zip ...
    Archive entries   : ['final_flag/flag.txt']
[SUCCESS] Archive extracted.
    Written to        : final_flag_out/final_flag/flag.txt

============================================================
FINAL FLAG:
UNI6CTF{QR_M9s5er_Tr1ver4a_W1nn7r}
============================================================
```

---

## Final Flag

```
UNI6CTF{QR_M9s5er_Tr1ver4a_W1nn7r}
```

---

## Takeaways

- Check the *histogram* of an image before you check anything else. `np.unique()` on a supposedly
  black-and-white image is a 5-second test that solved most of this challenge.
- A steganography payload does not have to be in the visually interesting part of an image. Here
  it was in the quiet zone of one tile, where nothing is drawn.
- Measure the grid, don't guess it. Deriving the 145 px pitch from the white gutters made the
  40 × 25 = 1000 split exact, so no cell was ever sampled off-centre.
- "Not every answer is a flag" is a real hint, not flavour text — a recovered string that isn't in
  flag format is usually a password for something else in the archive.
