// app/api/paypal/capture/route.ts
import { NextRequest, NextResponse } from "next/server";
import { captureOrder } from "@/lib/paypal";
import { sendDonationThankYouEmail } from "@/lib/email";

export async function POST(req: NextRequest) {
  try {
    const { orderId } = await req.json();

    if (!orderId || typeof orderId !== "string") {
      return NextResponse.json(
        { error: "Order ID is required and must be a string." },
        { status: 400 }
      );
    }

    let result;
    let wasAlreadyCaptured = false;

    try {
      result = await captureOrder(orderId);
    } catch (captureError: any) {
      console.warn("PayPal capture error:", captureError?.message || captureError);

      const errorMessage = captureError?.message || "";
      let parsed: any;

      try {
        parsed = JSON.parse(errorMessage);
      } catch {
        parsed = null;
      }

      const isAlreadyCaptured =
        parsed?.details?.some(
          (detail: any) => detail.issue === "ORDER_ALREADY_CAPTURED"
        ) || errorMessage.includes("ORDER_ALREADY_CAPTURED");

      if (isAlreadyCaptured) {
        wasAlreadyCaptured = true;
        result = {
          status: "COMPLETED",
          id: orderId,
          payer: {
            email_address: "",
            name: { given_name: "Donor" },
          },
          purchase_units: [
            {
              payments: {
                captures: [
                  {
                    amount: { value: "0.00", currency_code: "USD" },
                  },
                ],
              },
            },
          ],
        };
      } else {
        throw captureError;
      }
    }

    if (result?.status === "COMPLETED") {
      const capture = result.purchase_units?.[0]?.payments?.captures?.[0];
      const amount = capture?.amount?.value ?? "0.00";
      const currency = capture?.amount?.currency_code ?? "USD";
      const emailTo = result.payer?.email_address;
      const donorName = result.payer?.name?.given_name || "Donor";

      if (emailTo) {
        try {
          await sendDonationThankYouEmail({
            to: emailTo,
            donorName,
            amount,
            currency,
            // Provide minimal required texts property for DonationEmailProps
            texts: {
              title: `Gracias por tu donación, ${donorName}`,
              greeting: `Hola ${donorName},`,
              thanksText: `Gracias por tu donación de ${amount} ${currency}. Tu apoyo es muy valioso para nosotros.`,
              supportText: "Si necesitas ayuda, por favor contáctanos.",
              badgeTitle: "Donación recibida",
              confirmationText: "Tu contribución ha sido procesada con éxito.",
              footerText: "Fundación",
            },
          });
        } catch (emailError) {
          console.error("Error sending thank-you email:", emailError);
        }
      } else {
        console.warn("No donor email available. Skipping thank-you email.");
      }
    }

    return NextResponse.json({
      status: result.status,
      orderId: result.id,
      wasAlreadyCaptured,
    });
  } catch (error: any) {
    console.error("Fatal error in PayPal capture:", error);

    return NextResponse.json(
      {
        error: "Unable to capture PayPal payment.",
        details: process.env.NODE_ENV === "development" ? error.message : undefined,
      },
      { status: 500 }
    );
  }
}