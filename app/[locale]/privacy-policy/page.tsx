import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de privacidad y cookies",
  description:
    "Conoce la política de privacidad y cookies de la Fundación Centro Mariana de Alfabetización.",
  alternates: {
    canonical: "/privacy-policy",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <main style={{ maxWidth: 900, margin: "0 auto", padding: "2rem 1rem", lineHeight: 1.7 }}>
      <h1>Política de privacidad y cookies</h1>
      <p>
        Esta política explica cómo la Fundación Centro Mariana de Alfabetización gestiona
        la información personal y el uso de cookies dentro del sitio web.
      </p>
      <p>
        Si tienes preguntas sobre el tratamiento de datos personales, puedes contactarnos
        por los canales oficiales publicados en la sección de contacto.
      </p>
    </main>
  );
}
