import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from "react-email";
import * as React from "react";
import DonationFooter from "../Donation/footer";
interface CallRequestEmailProps {
  fullName: string;
  phone: string;
}

export const CallRequestEmail = ({
  fullName,
  phone,
}: CallRequestEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Nueva solicitud de llamada - Fundación CMA</Preview>

      <Body style={main}>
        <Container style={container}>
          <Heading style={heading}>
            📞 Nueva solicitud de llamada
          </Heading>

          <Text style={text}>
            Se ha recibido una nueva solicitud de contacto desde el sitio web de
            la <strong>Fundación CMA</strong>.
          </Text>

          <Section style={card}>
            <Text style={label}>Nombre completo</Text>
            <Text style={value}>{fullName}</Text>

            <Text style={label}>Número de teléfono</Text>
            <Text style={value}>{phone}</Text>
          </Section>

          <Text style={text}>
            Por favor, comuníquese con esta persona a la mayor brevedad posible
            para brindarle la información solicitada.
          </Text>

          <Section style={{ textAlign: "center", marginTop: "32px" }}>
            <Button
              href={`tel:${phone}`}
              style={button}
            >
              Llamar ahora
            </Button>
          </Section>

          <Text style={footer}>
            Este mensaje fue generado automáticamente desde el formulario de
            contacto del sitio web de la Fundación CMA.
          </Text>
          <DonationFooter/>
        </Container>
      </Body>
    </Html>
  );
};

CallRequestEmail.PreviewProps = {
  fullName: "Juan Pérez",
  phone: "+57 300 123 4567",
} satisfies CallRequestEmailProps;

export default CallRequestEmail;

const main = {
  backgroundColor: "#f4f4f5",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
  padding: "40px 0",
};

const container = {
  backgroundColor: "#ffffff",
  borderRadius: "12px",
  padding: "40px",
  maxWidth: "600px",
  margin: "0 auto",
};

const heading = {
  fontSize: "28px",
  fontWeight: "700",
  color: "#1f2937",
  marginBottom: "24px",
};

const text = {
  fontSize: "16px",
  color: "#4b5563",
  lineHeight: "24px",
};

const card = {
  backgroundColor: "#f9fafb",
  border: "1px solid #e5e7eb",
  borderRadius: "8px",
  padding: "20px",
  margin: "24px 0",
};

const label = {
  fontSize: "13px",
  color: "#6b7280",
  textTransform: "uppercase" as const,
  marginBottom: "4px",
};

const value = {
  fontSize: "18px",
  color: "#111827",
  fontWeight: "600",
  marginBottom: "16px",
};

const button = {
  backgroundColor: "#2563eb",
  color: "#ffffff",
  padding: "12px 24px",
  borderRadius: "8px",
  textDecoration: "none",
  fontWeight: "600",
};

const footer = {
  marginTop: "40px",
  fontSize: "13px",
  color: "#9ca3af",
  textAlign: "center" as const,
};