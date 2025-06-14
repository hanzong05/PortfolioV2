import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  const { name, email, subject, message } = await req.json();

  // Configure your SMTP transporter
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com', // e.g. smtp.gmail.com
    port: 465, // or 587
    secure: true, // true for 465, false for 587
    auth: {
      user: 'hanzongpillerva@gmail.com',
      pass: 'echd tvsm ehed sksh', // Use an app password, not your real password!
    },
  });

  try {
    await transporter.sendMail({
      from: '"Portfolio Contact" <hanzongpillerva@gmail.com>',
      to: 'bw.hanzpillerva@gmail.com',
      replyTo: email,
      subject: subject,
      text: message,
      html: `<p><strong>From:</strong> ${name} (${email})</p>
             <p><strong>Subject:</strong> ${subject}</p>
             <p>${message}</p>`,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Email send error:', error);
    return NextResponse.json({ success: false, error: 'Failed to send email.' }, { status: 500 });
  }
}