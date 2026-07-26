import nodemailer from 'nodemailer';

export type LeadEmail = {
  subject: string;
  html: string;
  replyTo?: string;
};

const RESEND_TIMEOUT_MS = 10_000;

const smtpReady = () =>
  !!(
    process.env.SMTP_HOST &&
    process.env.SMTP_USER &&
    process.env.SMTP_PASS &&
    process.env.SMTP_FROM &&
    process.env.CONTACT_EMAIL
  );

/** Returns the list of missing env vars, or an empty array when sending is possible. */
export function missingMailConfig(): string[] {
  const missing: string[] = [];
  if (!process.env.CONTACT_EMAIL) missing.push('CONTACT_EMAIL');
  if (!process.env.RESEND_API_KEY && !smtpReady()) {
    missing.push('RESEND_API_KEY (or SMTP_HOST/USER/PASS/FROM)');
  }
  return missing;
}

async function sendViaResend({
  subject,
  html,
  replyTo,
}: LeadEmail): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_EMAIL;
  if (!apiKey || !to) throw new Error('Resend configuration incomplete');

  const from = process.env.SMTP_FROM || 'no-reply@progix.pro';
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: `PROGIX <${from}>`,
      to: [to],
      ...(replyTo ? { reply_to: replyTo } : {}),
      subject,
      html,
    }),
    // Without this, a hung connection hangs the whole request.
    signal: AbortSignal.timeout(RESEND_TIMEOUT_MS),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => '');
    throw new Error(`Resend error ${res.status}: ${detail}`);
  }
}

async function sendViaSmtp({ subject, html, replyTo }: LeadEmail): Promise<void> {
  const host = process.env.SMTP_HOST as string;
  const user = process.env.SMTP_USER as string;
  const pass = process.env.SMTP_PASS as string;
  const configuredFrom = process.env.SMTP_FROM as string;
  const to = process.env.CONTACT_EMAIL as string;
  const port = Number.parseInt(process.env.SMTP_PORT ?? '', 10) || 587;

  // Certificate validation stays ON. This connection carries SMTP AUTH
  // credentials plus every lead's contact details; `rejectUnauthorized: false`
  // would hand both to anyone able to sit in the middle.
  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });

  // Gmail rejects a From that is not the authenticated mailbox.
  const useGmailSafeFrom =
    /gmail\.com$/i.test(user) || /smtp\.gmail\.com$/i.test(host);

  await transporter.sendMail({
    from: useGmailSafeFrom ? user : configuredFrom,
    to,
    ...(replyTo ? { replyTo } : {}),
    subject,
    html,
  });
}

/**
 * Sends through Resend when configured, falling back to SMTP only when SMTP is
 * actually configured.
 *
 * The fallback keeps the Resend error rather than discarding it: on a
 * Resend-only deployment, a transient Resend failure used to surface as
 * "SMTP configuration incomplete", which sent ops chasing a problem that did
 * not exist.
 */
export async function sendLeadEmail(email: LeadEmail): Promise<void> {
  let resendError: unknown;

  if (process.env.RESEND_API_KEY) {
    try {
      await sendViaResend(email);
      return;
    } catch (error) {
      resendError = error;
      console.error('[mail] Resend send failed', error);
    }
  }

  if (!smtpReady()) {
    throw resendError ?? new Error('SMTP configuration incomplete');
  }
  await sendViaSmtp(email);
}
