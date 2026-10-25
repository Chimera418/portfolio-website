import type { APIRoute } from 'astro';
import { Resend } from 'resend';

// ── Constants ────────────────────────────────────────────────────────────────
const FROM_ADDRESS  = 'Chimera\'s Realm <contact@chimera-realm.foo>';
const TO_ADDRESS    = 'hello@chimera-realm.foo';
const MAX_MSG_LEN   = 5000;
const MAX_SUBJ_LEN  = 200;
const MAX_NAME_LEN  = 100;
const ALLOWED_CHARS_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// ── Helpers ──────────────────────────────────────────────────────────────────

/** Escape HTML special chars to prevent XSS in the email body. */
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/** Sanitise a string: trim + strip null bytes. */
function sanitise(value: unknown): string {
  if (typeof value !== 'string') return '';
  return value.replace(/\0/g, '').trim();
}

/** Return a JSON Response with the given status code. */
function json(body: Record<string, unknown>, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

// ── HTML Email template ──────────────────────────────────────────────────────
function buildHtml(name: string, email: string, subject: string, message: string, timestamp: string): string {
  const eName    = escapeHtml(name);
  const eEmail   = escapeHtml(email);
  const eSubject = escapeHtml(subject);
  const eMessage = escapeHtml(message).replace(/\n/g, '<br>');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>New Contact Message</title>
</head>
<body style="margin:0;padding:0;background:#191724;font-family:'Segoe UI',system-ui,sans-serif;color:#e0def4;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#191724;padding:32px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#1f1d2e;border-radius:12px;border:1px solid #403d52;overflow:hidden;">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#eb6f92 0%,#c4a7e7 100%);padding:24px 32px;">
              <p style="margin:0;font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#1f1d2e;font-weight:700;font-family:monospace;">Chimera's Realm</p>
              <h1 style="margin:6px 0 0;font-size:22px;color:#1f1d2e;font-weight:800;">New Contact Message</h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:32px;">

              <!-- Meta rows -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid #403d52;">
                    <span style="font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#6e6a86;font-family:monospace;display:block;margin-bottom:4px;">From</span>
                    <span style="color:#e0def4;font-size:14px;">${eName} &lt;<a href="mailto:${eEmail}" style="color:#eb6f92;text-decoration:none;">${eEmail}</a>&gt;</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid #403d52;">
                    <span style="font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#6e6a86;font-family:monospace;display:block;margin-bottom:4px;">Subject</span>
                    <span style="color:#e0def4;font-size:14px;">${eSubject || '(no subject)'}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid #403d52;">
                    <span style="font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#6e6a86;font-family:monospace;display:block;margin-bottom:4px;">Received</span>
                    <span style="color:#e0def4;font-size:14px;">${escapeHtml(timestamp)}</span>
                  </td>
                </tr>
              </table>

              <!-- Message body -->
              <div>
                <p style="font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#6e6a86;font-family:monospace;margin:0 0 10px;">Message</p>
                <div style="background:#26233a;border-radius:8px;border:1px solid #403d52;padding:20px;font-size:14px;line-height:1.7;color:#e0def4;">
                  ${eMessage}
                </div>
              </div>

              <!-- Reply CTA -->
              <div style="margin-top:28px;text-align:center;">
                <a href="mailto:${eEmail}?subject=Re%3A%20${encodeURIComponent(subject || 'Your message')}"
                   style="display:inline-block;background:linear-gradient(135deg,#eb6f92,#c4a7e7);color:#1f1d2e;font-weight:700;font-size:13px;padding:12px 28px;border-radius:8px;text-decoration:none;letter-spacing:1px;">
                  Reply to ${eName}
                </a>
              </div>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:16px 32px;border-top:1px solid #403d52;text-align:center;">
              <p style="margin:0;font-size:11px;color:#6e6a86;font-family:monospace;">
                Sent via chimera-realm.foo contact form
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

/** Plain-text fallback */
function buildText(name: string, email: string, subject: string, message: string, timestamp: string): string {
  return [
    `New contact message — Chimera's Realm`,
    `${'─'.repeat(40)}`,
    `From    : ${name} <${email}>`,
    `Subject : ${subject || '(no subject)'}`,
    `Received: ${timestamp}`,
    `${'─'.repeat(40)}`,
    message,
    `${'─'.repeat(40)}`,
    `Sent via chimera-realm.foo`,
  ].join('\n');
}

// ── Route handler ────────────────────────────────────────────────────────────
export const POST: APIRoute = async ({ request }) => {
  // ── 1. Method guard (Astro handles this, but be explicit) ─────────────────
  if (request.method !== 'POST') {
    return json({ error: 'Method not allowed' }, 405);
  }

  // ── 2. Content-type + size guard ──────────────────────────────────────────
  const contentType = request.headers.get('content-type') ?? '';
  if (!contentType.includes('application/json')) {
    return json({ error: 'Unsupported Media Type' }, 415);
  }

  let body: Record<string, unknown>;
  try {
    // Limit body read to ~20 KB to prevent abuse
    const raw = await request.text();
    if (raw.length > 20_000) {
      return json({ error: 'Request body too large' }, 413);
    }
    body = JSON.parse(raw);
  } catch {
    return json({ error: 'Invalid JSON body' }, 400);
  }

  // ── 3. Honeypot check ─────────────────────────────────────────────────────
  // The client sends a hidden `_hp` field that humans leave empty; bots fill it.
  if (sanitise(body._hp)) {
    // Silently reject — return a fake 200 so bots don't know they were caught.
    return json({ ok: true }, 200);
  }

  // ── 4. Extract & sanitise fields ──────────────────────────────────────────
  const name    = sanitise(body.name).slice(0, MAX_NAME_LEN);
  const email   = sanitise(body.email).slice(0, 254);
  const subject = sanitise(body.subject).slice(0, MAX_SUBJ_LEN);
  const message = sanitise(body.message).slice(0, MAX_MSG_LEN);

  // ── 5. Server-side validation ─────────────────────────────────────────────
  const errors: string[] = [];
  if (!name)                          errors.push('Name is required.');
  if (!email)                         errors.push('Email is required.');
  else if (!ALLOWED_CHARS_EMAIL.test(email)) errors.push('Email address is invalid.');
  if (!message)                       errors.push('Message is required.');

  if (errors.length > 0) {
    return json({ error: errors.join(' ') }, 400);
  }

  // ── 6. Resend API key ─────────────────────────────────────────────────────
  const apiKey = import.meta.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('[contact] RESEND_API_KEY is not set');
    return json({ error: 'Email service is not configured.' }, 503);
  }

  // ── 7. Send via Resend ────────────────────────────────────────────────────
  const resend    = new Resend(apiKey);
  const timestamp = new Date().toUTCString();
  const emailSubject = `Website Contact: ${subject || '(no subject)'}`;

  try {
    const { error } = await resend.emails.send({
      from:      FROM_ADDRESS,
      to:        [TO_ADDRESS],
      replyTo:   email,
      subject:   emailSubject,
      html:      buildHtml(name, email, subject, message, timestamp),
      text:      buildText(name, email, subject, message, timestamp),
    });

    if (error) {
      // Log internally but do NOT expose Resend error details to the client.
      console.error('[contact] Resend error:', error);
      return json({ error: 'Failed to send message. Please try again later.' }, 502);
    }

    return json({ ok: true }, 200);
  } catch (err) {
    console.error('[contact] Unexpected error:', err);
    return json({ error: 'An unexpected error occurred. Please try again later.' }, 500);
  }
};

// Reject any other HTTP method cleanly
export const GET: APIRoute  = () => json({ error: 'Method not allowed' }, 405);
export const PUT: APIRoute  = () => json({ error: 'Method not allowed' }, 405);
export const DELETE: APIRoute = () => json({ error: 'Method not allowed' }, 405);
