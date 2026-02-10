import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export const runtime = 'nodejs'; // Force Node.js runtime for crypto operations

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Extract form data based on current contact form
    const {
      project,
      timeline,
      budget,
      source,
      fullName,
      email,
      phone,
      projectDescription,
    } = body;

    // Validate required env vars
    const missingEnvVars: string[] = [];
    if (!process.env.SMTP_HOST) missingEnvVars.push('SMTP_HOST');
    if (!process.env.SMTP_PORT) missingEnvVars.push('SMTP_PORT');
    if (!process.env.SMTP_USER) missingEnvVars.push('SMTP_USER');
    if (!process.env.SMTP_PASS) missingEnvVars.push('SMTP_PASS');
    if (!process.env.SMTP_FROM) missingEnvVars.push('SMTP_FROM');
    if (!process.env.CONTACT_EMAIL) missingEnvVars.push('CONTACT_EMAIL');

    if (missingEnvVars.length > 0) {
      return NextResponse.json(
        {
          success: false,
          error: 'missing_config',
          message: 'Server configuration incomplete',
          details: `Missing: ${missingEnvVars.join(', ')}`,
        },
        { status: 500 },
      );
    }

    // For now, we'll skip database saving and just send the email
    // TODO: Implement database saving later if needed

    // Helper to send via Resend HTTP API (avoids SMTP restrictions on some hosts)
    const sendViaResend = async (htmlContent: string) => {
      const apiKey = process.env.RESEND_API_KEY;
      const to = process.env.CONTACT_EMAIL;
      if (!apiKey || !to) return false;
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
          subject: 'Nouvelle demande de soumission - Progix',
          html: htmlContent,
        }),
      });
      if (!res.ok) {
        const txt = await res.text().catch(() => '');
        throw new Error(`Resend error ${res.status}: ${txt}`);
      }
      return true;
    };

    // Format project type
    const getProjectType = (proj: string) => {
      const types: { [key: string]: string } = {
        web: 'Application Web',
        mobile: 'Application Mobile',
        crm: 'CRM',
        erp: 'ERP',
        integration: 'Intégration SAP, Dynamics',
        ecommerce: 'E-commerce',
        data: 'Data & Analytics',
        autre: 'Autre',
      };
      return types[proj] || proj;
    };

    // Format timeline
    const getTimelineText = (time: string) => {
      const times: { [key: string]: string } = {
        '1m': "D'ICI 1 MOIS",
        '3m': "D'ICI 3 MOIS",
        '6m': "D'ICI 6 MOIS",
        '12m': "D'ICI 12 MOIS",
      };
      return times[time] || time;
    };

    // Format budget
    const getBudgetText = (bud: string) => {
      const budgets: { [key: string]: string } = {
        b1: 'MOINS DE 20 000$',
        b2: 'DE 20 000$ À 40 000$',
        b3: 'DE 40 000$ À 60 000$',
        b4: 'DE 60 000$ À 100 000$',
        b5: 'PLUS DE 100 000$',
      };
      return budgets[bud] || bud;
    };

    // Format source
    const getSourceText = (src: string) => {
      const sources: { [key: string]: string } = {
        google: 'GOOGLE',
        ref: 'RÉFÉRENCE',
        social: 'RÉSEAUX SOCIAUX',
        autre: 'AUTRE',
      };
      return sources[src] || src;
    };

    const html = `
      <h2>Nouvelle demande de soumission de projet</h2>

      <h3>Détails du projet</h3>
      <p><strong>Type de projet:</strong> ${getProjectType(project)}</p>
      <p><strong>Échéancier souhaité:</strong> ${getTimelineText(timeline)}</p>
      <p><strong>Budget estimé:</strong> ${getBudgetText(budget)}</p>
      <p><strong>Source:</strong> ${getSourceText(source)}</p>

      <h3>Informations de contact</h3>
      <p><strong>Nom complet:</strong> ${fullName}</p>
      <p><strong>Courriel:</strong> ${email}</p>
      <p><strong>Téléphone:</strong> ${phone}</p>

      <h3>Description du projet</h3>
      <p>${projectDescription.replace(/\n/g, '<br>')}</p>
    `;

    // Prefer Resend if configured, fallback to SMTP
    let sent = false;
    try {
      if (process.env.RESEND_API_KEY) {
        await sendViaResend(html);
        sent = true;
      }
    } catch {
      // fall back to SMTP
    }

    if (!sent) {
      // Validate minimal SMTP config
      const host = process.env.SMTP_HOST;
      const port = parseInt(process.env.SMTP_PORT || '587', 10);
      const user = process.env.SMTP_USER;
      const pass = process.env.SMTP_PASS;
      const configuredFrom = process.env.SMTP_FROM;
      const to = process.env.CONTACT_EMAIL;
      if (!host || !user || !pass || !configuredFrom || !to) {
        return NextResponse.json(
          {
            success: false,
            message:
              'Email service not configured. Set RESEND_API_KEY or SMTP_* env vars.',
          },
          { status: 500 },
        );
      }
      const transporter = nodemailer.createTransport({
        host,
        port,
        secure: port === 465,
        auth: { user, pass },
        tls: { rejectUnauthorized: false },
      });
      // Optional preflight verify to surface clearer errors
      try {
        await transporter.verify();
      } catch {
        return NextResponse.json(
          {
            success: false,
            message: 'SMTP verification failed',
            code: 'SMTP_VERIFY_ERROR',
            detail: 'Unknown error',
          },
          { status: 500 },
        );
      }
      // Gmail requires From to match the authenticated user unless "Send mail as" is configured.
      const useGmailSafeFrom =
        /gmail\.com$/i.test(user) || /smtp\.gmail\.com$/i.test(host);
      const from = useGmailSafeFrom ? user : configuredFrom!;

      await transporter.sendMail({
        from,
        to,
        replyTo: email, // so you can reply directly to la personne
        subject: 'Nouvelle demande de soumission - Progix',
        html,
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Email sent successfully',
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error occurred';
    const errorCode =
      error && typeof error === 'object' && 'code' in error
        ? (error as { code?: string }).code
        : 'UNKNOWN';

    return NextResponse.json(
      {
        success: false,
        error: 'email_send_failed',
        message: 'Failed to send email',
        details: errorMessage,
        errorCode: errorCode,
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    );
  }
}
