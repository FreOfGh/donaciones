import { resend } from "./resend";
import { DonationThankYouEmail } from "@/app/[locale]/components/Emails/DonationThankYou";

interface DonationEmailProps {
  to: string;
  donorName?: string;
  amount: string;
  currency: string;
}

export async function sendDonationThankYouEmail({
  to,
  donorName,
  amount,
  currency,
}: DonationEmailProps) {
  return await resend.emails.send({
    from: "Fundación CMA <donaciones@mail.fundacioncma.org.co>",
    to,
    subject: "❤️ ¡Gracias por tu donación!",
    // 👇 Pasamos el componente React directamente aquí
    react: await DonationThankYouEmail({ donorName, amount, currency }),
  });
}