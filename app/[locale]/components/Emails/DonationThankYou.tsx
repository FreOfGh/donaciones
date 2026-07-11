// app/[locale]/components/Emails/DonationThankYou.tsx
import * as React from "react";

interface DonationThankYouEmailProps {
  donorName: string;
  amount: string;
  currency: string;
  // Textos traducidos que vienen del servidor
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

export const DonationThankYouEmail: React.FC<DonationThankYouEmailProps> = ({
  donorName,
  amount,
  currency,
  texts,
}) => {
  return (
    <div style={container}>
      <div style={card}>
        <h1 style={heading}>{texts.title}</h1>

        <p style={text}>
          {texts.greeting} <strong>{donorName}</strong>,
        </p>

        <p style={text}>
          {texts.thanksText}{" "}
          <strong>
            {amount} {currency}
          </strong>{" "}
          <strong>Fundación CMA</strong>.
        </p>

        <p style={text}>{texts.supportText}</p>

        <div style={badgeContainer}>
          <h2 style={badgeTitle}>{texts.badgeTitle}</h2>
          <p style={badgeAmount}>
            {amount} {currency}
          </p>
        </div>

        <p style={footerText}>{texts.footerText}</p>

        <hr style={hr} />

        <p style={subFooter}>{texts.confirmationText}</p>
      </div>
    </div>
  );
};

export default DonationThankYouEmail;

// --- ESTILOS ---
const container: React.CSSProperties = {
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  backgroundColor: "#f4f5f6",
  padding: "16px",
  margin: "0",
  width: "100%",
  WebkitTextSizeAdjust: "100%",
  textSizeAdjust: "100%",
};

const card: React.CSSProperties = {
  backgroundColor: "#ffffff",
  width: "100%",
  maxWidth: "600px",
  margin: "0 auto",
  padding: "24px",
  borderRadius: "10px",
  border: "1px solid #e2e8f0",
  boxSizing: "border-box",
};

const heading: React.CSSProperties = {
  color: "#0ea5e9",
  textAlign: "center",
  fontSize: "24px",
  fontWeight: "bold",
  margin: "0 0 20px 0",
  lineHeight: "1.3",
};

const text: React.CSSProperties = {
  fontSize: "15px",
  lineHeight: "1.7",
  color: "#334155",
  margin: "0 0 14px 0",
};

const badgeContainer: React.CSSProperties = {
  margin: "24px 0",
  padding: "16px",
  backgroundColor: "#f8fafc",
  borderRadius: "8px",
  textAlign: "center",
  border: "1px dashed #cbd5e1",
};

const badgeTitle: React.CSSProperties = {
  margin: "0 0 8px 0",
  color: "#0284c7",
  fontSize: "16px",
  fontWeight: "600",
};

const badgeAmount: React.CSSProperties = {
  margin: "0",
  fontSize: "28px",
  fontWeight: "bold",
  color: "#1e293b",
};

const footerText: React.CSSProperties = {
  fontSize: "14px",
  color: "#64748b",
  lineHeight: "1.6",
  margin: "0 0 14px 0",
};

const hr: React.CSSProperties = {
  margin: "24px 0",
  border: "0",
  borderTop: "1px solid #e2e8f0",
};

const subFooter: React.CSSProperties = {
  textAlign: "center",
  color: "#94a3b8",
  fontSize: "12px",
  margin: "0",
};