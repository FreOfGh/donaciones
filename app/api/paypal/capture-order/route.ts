import { NextRequest, NextResponse } from "next/server";
import { captureOrder } from "@/lib/paypal";
import { sendDonationThankYouEmail } from "@/lib/email";

export async function POST(req: NextRequest) {
  try {
    const { orderId } = await req.json();

    if (!orderId) {
      return NextResponse.json(
        {
          error: "Order ID is required.",
        },
        {
          status: 400,
        }
      );
    }

    const result = await captureOrder(orderId);

    // Si el pago fue exitoso, enviar el correo
    if (result.status === "COMPLETED") {
      try {
        const capture =
          result.purchase_units?.[0]?.payments?.captures?.[0];

        await sendDonationThankYouEmail({
          to: result.payer?.email_address,
          donorName: result.payer?.name?.given_name,
          amount: capture?.amount?.value ?? "0.00",
          currency: capture?.amount?.currency_code ?? "USD",
        });
      } catch (emailError) {
        console.error("Error sending email:", emailError);

        // No interrumpimos la respuesta.
        // El pago ya fue realizado correctamente.
      }
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Unable to capture PayPal payment.",
      },
      {
        status: 500,
      }
    );
  }
}