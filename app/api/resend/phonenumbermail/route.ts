// app/api/donation/confirm/route.tsx
import React from "react";
import { Resend } from "resend";
import { getTranslations } from "next-intl/server";
import { DonationThankYouEmail } from "@/app/[locale]/components/Emails/DonationThankYou";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const body = await req.json();
  const { donorEmail, donorName, amount, currency, locale } = body;

  // Validación básica
  if (!donorEmail || !amount || !currency) {
    return Response.json(
      { error: "Faltan datos requeridos" },
      { status: 400 }
    );
  }

  // Carga las traducciones según el locale que envía el frontend
  const t = await getTranslations({
    locale: locale || "es",
    namespace: "Donate.Mail",
  });

  const { data, error } = await resend.emails.send({
    from: "Fundación CMA <noreply@mail.fundacioncma.org.co>",
    to: [donorEmail],
    subject: t("Title"),
    react: React.createElement(DonationThankYouEmail, {
      donorName: donorName || "Amigo/a",
      amount,
      currency,
      texts: {
        title: t("Title"),
        greeting: t("Text1"),
        thanksText: t("Text2"),
        supportText: t("Text3"),
        badgeTitle: t("Title2"),
        footerText: t("Text4"),
        confirmationText: t("Text5"),
      },
    }),
  });

  if (error) {
    return Response.json({ error }, { status: 500 });
  }

  return Response.json({ success: true, id: data?.id });
}