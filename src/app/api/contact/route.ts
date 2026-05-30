import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  const { name, company, email, message } = await req.json();

  if (!name || !email) {
    return NextResponse.json({ error: "Name und E-Mail sind erforderlich." }, { status: 400 });
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const mailToOwner = {
    from: `"Bewerberbrücke Website" <${process.env.SMTP_USER}>`,
    to: process.env.CONTACT_RECEIVER,
    replyTo: email,
    subject: `Neue Anfrage von ${name}${company ? ` (${company})` : ""}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; color: #1a1714;">
        <div style="background: #1a1714; padding: 24px 32px; margin-bottom: 24px;">
          <h2 style="color: #c8a96e; margin: 0; font-size: 1.1rem; letter-spacing: 0.1em;">BEWERBERBRÜCKE — Neue Anfrage</h2>
        </div>
        <div style="padding: 0 32px 32px;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; color: #6b6560; font-size: 0.85rem; width: 130px;">Name</td><td style="padding: 8px 0; font-weight: 600;">${name}</td></tr>
            ${company ? `<tr><td style="padding: 8px 0; color: #6b6560; font-size: 0.85rem;">Unternehmen</td><td style="padding: 8px 0;">${company}</td></tr>` : ""}
            <tr><td style="padding: 8px 0; color: #6b6560; font-size: 0.85rem;">E-Mail</td><td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #c8a96e;">${email}</a></td></tr>
          </table>
          ${message ? `<div style="margin-top: 20px; padding: 16px; background: #faf8f5; border-left: 3px solid #c8a96e;"><p style="margin: 0; line-height: 1.7; color: #1a1714;">${message.replace(/\n/g, "<br>")}</p></div>` : ""}
        </div>
      </div>
    `,
  };

  const mailToSender = {
    from: `"Bewerberbrücke" <${process.env.SMTP_USER}>`,
    to: email,
    subject: "Ihre Anfrage bei Bewerberbrücke – wir melden uns",
    html: `
      <div style="font-family: sans-serif; max-width: 600px; color: #1a1714;">
        <div style="background: #1a1714; padding: 24px 32px; margin-bottom: 24px;">
          <h2 style="color: #c8a96e; margin: 0; font-size: 1.1rem; letter-spacing: 0.1em;">BEWERBERBRÜCKE</h2>
        </div>
        <div style="padding: 0 32px 32px;">
          <p>Guten Tag ${name},</p>
          <p style="line-height: 1.75;">vielen Dank für Ihre Anfrage. Wir haben Ihre Nachricht erhalten und melden uns zeitnah bei Ihnen.</p>
          <p style="line-height: 1.75;">Im ersten Schritt schauen wir uns gemeinsam an, wo Sie aktuell stehen und welche Hebel für Ihre Situation wirklich sinnvoll sind.</p>
          <p style="margin-top: 24px;">Mit freundlichen Grüßen<br><strong>Das Team der Bewerberbrücke</strong></p>
          <hr style="margin: 32px 0; border: none; border-top: 1px solid #ddd8d0;" />
          <p style="font-size: 0.8rem; color: #6b6560;">Bewerberbrücke e.K. · Fronhofstraße 18 · 35440 Linden<br>info@bewerberbruecke.com · 06403 / 9179483</p>
        </div>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailToOwner);
    await transporter.sendMail(mailToSender);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] Mail error:", err);
    return NextResponse.json({ error: "Mailversand fehlgeschlagen." }, { status: 500 });
  }
}
