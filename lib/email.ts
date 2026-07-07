import { resend } from "./resend";

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
    from: "Education Foundation <onboarding@resend.dev>",
    to,
    subject: "❤️ Thank you for your donation!",
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;padding:30px;background:#ffffff;border:1px solid #eee;border-radius:10px;">

        <h1 style="color:#0ea5e9;text-align:center;">
          Thank You ❤️
        </h1>

        <p style="font-size:16px;">
          Hello <strong>${donorName ?? "Friend"}</strong>,
        </p>

        <p style="font-size:16px;line-height:1.7;">
          Thank you for your generous donation of
          <strong>${amount} ${currency}</strong>.
        </p>

        <p style="font-size:16px;line-height:1.7;">
          Your support helps us provide educational opportunities,
          school supplies and hope to children and young people.
        </p>

        <div style="margin:35px 0;padding:20px;background:#f8fafc;border-radius:8px;text-align:center;">
            <h2 style="margin:0;color:#0284c7;">
                Donation Received
            </h2>

            <p style="font-size:28px;font-weight:bold;">
                ${amount} ${currency}
            </p>
        </div>

        <p style="font-size:15px;color:#666;">
          Every contribution makes a real difference.
          Thank you for believing in our mission.
        </p>

        <hr style="margin:30px 0;">

        <p style="text-align:center;color:#999;font-size:13px;">
          This email confirms that your donation was successfully received.
        </p>

      </div>
    `,
  });
}