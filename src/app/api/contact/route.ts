import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export const runtime = 'nodejs'; // Force Node.js runtime for crypto operations

export async function POST(request: NextRequest) {
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('🔵 [CONTACT API] REQUEST STARTED');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('📍 Timestamp:', new Date().toISOString());
  console.log('📍 Method:', request.method);
  console.log('📍 URL:', request.url);
  console.log(
    '📍 Headers:',
    JSON.stringify(Object.fromEntries(request.headers), null, 2),
  );

  try {
    console.log('\n🔄 [STEP 1] Parsing request body...');
    const body = await request.json();
    console.log('✅ [STEP 1] Body parsed successfully');
    console.log('📦 Raw body:', JSON.stringify(body, null, 2));

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

    console.log('\n📋 [STEP 2] Extracted form fields:');
    console.log('  • project:', project || '❌ MISSING');
    console.log('  • timeline:', timeline || '❌ MISSING');
    console.log('  • budget:', budget || '❌ MISSING');
    console.log('  • source:', source || '❌ MISSING');
    console.log('  • fullName:', fullName || '❌ MISSING');
    console.log('  • email:', email || '❌ MISSING');
    console.log('  • phone:', phone || '❌ MISSING');
    console.log(
      '  • projectDescription:',
      projectDescription
        ? `${projectDescription.substring(0, 50)}...`
        : '❌ MISSING',
    );

    console.log('\n🔧 [STEP 3] Checking SMTP environment variables...');
    console.log('  • SMTP_HOST:', process.env.SMTP_HOST || '❌ NOT SET');
    console.log('  • SMTP_PORT:', process.env.SMTP_PORT || '❌ NOT SET');
    console.log(
      '  • SMTP_USER:',
      process.env.SMTP_USER
        ? '✅ Set (' + process.env.SMTP_USER + ')'
        : '❌ NOT SET',
    );
    console.log(
      '  • SMTP_PASS:',
      process.env.SMTP_PASS ? '✅ Set (***hidden***)' : '❌ NOT SET',
    );
    console.log('  • SMTP_FROM:', process.env.SMTP_FROM || '❌ NOT SET');
    console.log(
      '  • CONTACT_EMAIL:',
      process.env.CONTACT_EMAIL || '❌ NOT SET',
    );

    // Validate required env vars
    const missingEnvVars: string[] = [];
    if (!process.env.SMTP_HOST) missingEnvVars.push('SMTP_HOST');
    if (!process.env.SMTP_PORT) missingEnvVars.push('SMTP_PORT');
    if (!process.env.SMTP_USER) missingEnvVars.push('SMTP_USER');
    if (!process.env.SMTP_PASS) missingEnvVars.push('SMTP_PASS');
    if (!process.env.SMTP_FROM) missingEnvVars.push('SMTP_FROM');
    if (!process.env.CONTACT_EMAIL) missingEnvVars.push('CONTACT_EMAIL');

    if (missingEnvVars.length > 0) {
      console.error(
        '❌ [STEP 3] CRITICAL ERROR: Missing environment variables:',
        missingEnvVars,
      );
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
    console.log('✅ [STEP 3] All environment variables present');

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

    console.log('\n📝 [STEP 6] Building email content...');
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
    console.log(
      '✅ [STEP 6] Email HTML generated (length:',
      html.length,
      'chars)',
    );

    // Prefer Resend if configured, fallback to SMTP
    let sent = false;
    try {
      if (process.env.RESEND_API_KEY) {
        await sendViaResend(html);
        sent = true;
      }
    } catch (e) {
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
      } catch (e: any) {
        return NextResponse.json(
          {
            success: false,
            message: 'SMTP verification failed',
            code: e?.code || 'SMTP_VERIFY_ERROR',
            detail: e?.message || 'Unknown error',
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
    console.error('\n❌ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.error('❌ [CONTACT API] ERROR OCCURRED');
    console.error('❌ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.error(
      '🔴 Error type:',
      error instanceof Error ? error.constructor.name : typeof error,
    );
    console.error(
      '🔴 Error message:',
      error instanceof Error ? error.message : String(error),
    );
    console.error(
      '🔴 Error stack:',
      error instanceof Error ? error.stack : 'No stack trace',
    );

    if (error && typeof error === 'object') {
      console.error('🔴 Error details:', JSON.stringify(error, null, 2));
    }

    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error occurred';
    const errorCode =
      error && typeof error === 'object' && 'code' in error
        ? (error as any).code
        : 'UNKNOWN';

    console.error('❌ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

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
