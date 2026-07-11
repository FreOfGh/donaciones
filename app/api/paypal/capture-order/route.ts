import { NextRequest, NextResponse } from "next/server";
import { captureOrder } from "@/lib/paypal";
import { sendDonationThankYouEmail } from "@/lib/email";

export async function POST(req: NextRequest) {
  try {
    const { orderId } = await req.json();

    if (!orderId) {
      return NextResponse.json({ error: "Order ID is required." }, { status: 400 });
    }

    let result;
    try {
      // Intentamos capturar normalmente
      result = await captureOrder(orderId);
    } catch (captureError: any) {
      // Analizamos si el error es porque ya fue capturada previamente
      console.warn("Error capturando o re-intento detectado:", captureError.message);
      
      try {
        const errorData = JSON.parse(captureError.message);
        
        // PayPal suele responder con un issue 'ORDER_ALREADY_CAPTURED'
        const isAlreadyCaptured = errorData.details?.some(
          (detail: any) => detail.issue === "ORDER_ALREADY_CAPTURED"
        );

        if (isAlreadyCaptured) {
          // Si ya se capturó, retornamos un estado simulando éxito para no romper el flujo del cliente
          return NextResponse.json({
            status: "COMPLETED",
            message: "Order was already successfully captured previously.",
            // Puedes mapear aquí más datos simulados si tu frontend los necesita obligatoriamente
          });
        }
      } catch (parseError) {
        // Si el mensaje de error no era un JSON válido, seguimos la ejecución para que caiga en el 500 original
      }

      // Si no fue por 'ORDER_ALREADY_CAPTURED', lanzamos el error original hacia el catch principal
      throw captureError;
    }

    // Si el pago fue exitoso en esta primera ejecución, enviar el correo
    if (result.status === "COMPLETED") {
      try {
        const capture = result.purchase_units?.[0]?.payments?.captures?.[0];

        await sendDonationThankYouEmail({
          to: result.payer?.email_address,
          donorName: result.payer?.name?.given_name,
          amount: capture?.amount?.value ?? "0.00",
          currency: capture?.amount?.currency_code ?? "USD",
          texts: {
            title: "Gracias por tu donación",
            greeting: "Gracias por tu apoyo",
            thanksText: "Hemos recibido tu contribución y estamos muy agradecidos.",
            supportText: "Tu aporte nos ayuda a seguir con nuestra misión.",
            badgeTitle: "Donación recibida",
            footerText: "Gracias por tu solidaridad.",
            confirmationText: "Tu donación ha sido procesada correctamente.",
          },
        });
      } catch (emailError) {
        console.error("Error sending email:", emailError);
        // No interrumpimos la respuesta si el pago ya fue exitoso.
      }
    }

    return NextResponse.json(result);

  } catch (error) {
    console.error("Fatal backend check:", error);

    return NextResponse.json(
      { error: "Unable to capture PayPal payment." },
      { status: 500 }
    );
  }
}