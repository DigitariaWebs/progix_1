import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export const runtime = "nodejs"; // Force Node.js runtime for crypto operations

export async function POST(request: NextRequest) {
  console.log('Contact form submission received');
  try {
    const body = await request.json();
    console.log('Request body:', JSON.stringify(body, null, 2));

    // Extract form data based on current contact form
    const {
      project,
      timeline,
      budget,
      source,
      fullName,
      email,
      phone,
      projectDescription
    } = body;

    console.log('SMTP_HOST:', process.env.SMTP_HOST);
    console.log('SMTP_PORT:', process.env.SMTP_PORT);
    console.log('SMTP_USER:', process.env.SMTP_USER ? 'Set' : 'Not set');
    console.log('SMTP_PASS:', process.env.SMTP_PASS ? 'Set' : 'Not set');
    console.log('SMTP_FROM:', process.env.SMTP_FROM);
    console.log('CONTACT_EMAIL:', process.env.CONTACT_EMAIL);

    // For now, we'll skip database saving and just send the email
    // TODO: Implement database saving later if needed

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    console.log('Transporter created, verifying connection...');
    await transporter.verify();
    console.log('Transporter verified successfully');

    // ...existing code...

    // Format project type
    const getProjectType = (proj: string) => {
      const types: { [key: string]: string } = {
        web: "Application Web",
        mobile: "Application Mobile",
        crm: "CRM",
        erp: "ERP",
        integration: "Intégration SAP, Dynamics",
        ecommerce: "E-commerce",
        data: "Data & Analytics",
        autre: "Autre"
      };
      return types[proj] || proj;
    };

    // Format timeline
    const getTimelineText = (time: string) => {
      const times: { [key: string]: string } = {
        "1m": "D'ICI 1 MOIS",
        "3m": "D'ICI 3 MOIS",
        "6m": "D'ICI 6 MOIS",
        "12m": "D'ICI 12 MOIS"
      };
      return times[time] || time;
    };

    // Format budget
    const getBudgetText = (bud: string) => {
      const budgets: { [key: string]: string } = {
        b1: "MOINS DE 20 000$",
        b2: "DE 20 000$ À 40 000$",
        b3: "DE 40 000$ À 60 000$",
        b4: "DE 60 000$ À 100 000$",
        b5: "PLUS DE 100 000$"
      };
      return budgets[bud] || bud;
    };

    // Format source
    const getSourceText = (src: string) => {
      const sources: { [key: string]: string } = {
        google: "GOOGLE",
        ref: "RÉFÉRENCE",
        social: "RÉSEAUX SOCIAUX",
        autre: "AUTRE"
      };
      return sources[src] || src;
    };

    // Email content
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

    // Send email
    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: process.env.CONTACT_EMAIL,
      subject: "Nouvelle demande de soumission - Progix",
      html,
    });

    console.log('Email sent successfully');

    return NextResponse.json({
      success: true,
      message: "Email sent successfully",
    });

  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { success: false, message: "Failed to send email" },
      { status: 500 }
    );
  }
}
