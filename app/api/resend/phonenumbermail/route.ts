// app/api/resend/phonenumbermail/route.tsx
import React from "react";
import { Resend } from "resend";
import CallRequestEmail from "@/app/[locale]/components/Emails/PhoneNumber";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const body = await req.json();
  const { fullName, phone } = body;

  if (!fullName || !phone) {
    return Response.json(
      { error: "Nombre y teléfono son requeridos" },
      { status: 400 }
    );
  }

  const { data, error } = await resend.emails.send({
    from: "Fundación CMA <noreply@mail.fundacioncma.org.co>",
    to: [process.env.ADMIN_LIVE_EMAIL || ""],
    subject: "Nueva solicitud de llamada",
    react: React.createElement(CallRequestEmail, { fullName, phone }),
  });

  if (error) {
    return Response.json({ error }, { status: 500 });
  }

  return Response.json({ success: true, id: data?.id });
}