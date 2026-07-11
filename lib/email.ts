import { resend } from "./resend";
import { DonationThankYouEmail } from "@/app/[locale]/components/Emails/DonationThankYou";

interface DonationEmailProps {
  to: string;
  donorName: string;
  amount: string;
  currency: string;
  texts: {
    title: string;
    greeting: string;
    thanksText: string;
    supportText: string;
    badgeTitle: string;
    footerText: string;
    confirmationText: string;
  };
}

export async function sendDonationThankYouEmail({
  to,
  donorName,
  amount,
  currency,
  texts,
}: DonationEmailProps) {
  return await resend.emails.send({
    from: "Fundación CMA <donaciones@mail.fundacioncma.org.co>",
    to,
    subject: "❤️ ¡Gracias por tu donación!",
    // 👇 Pasamos el componente React directamente aquí
    react: await DonationThankYouEmail({ donorName, amount, currency, texts }),
  });
}