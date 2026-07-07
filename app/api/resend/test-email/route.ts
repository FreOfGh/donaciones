import { NextResponse } from "next/server";
import { resend } from "@/lib/resend";

export async function GET() {
  try {
    const data = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: [process.env.CORREO_ADMINISTRADOR || ""],
      subject: "🎉 Resend está funcionando",
      html: `
        <h1>¡Hola!</h1>
        <p>Este es el primer correo enviado desde tu aplicación Next.js.</p>
        <p>Si recibiste este mensaje, la integración con Resend funciona correctamente.</p>
      `,
    });

    return NextResponse.json(data);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "No fue posible enviar el correo.",
      },
      {
        status: 500,
      }
    );
  }
}