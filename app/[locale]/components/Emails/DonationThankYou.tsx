// app/[locale]/components/Emails/DonationThankYou.tsx
import * as React from "react";

export interface DonationThankYouEmailProps {
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

export const DonationThankYouEmail: React.FC<DonationThankYouEmailProps> = ({
  donorName,
  amount,
  currency,
  texts,
}) => {
  return (
    <html>
      <head>
        <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body style={bodyStyle}>
        <table role="presentation" cellPadding="0" cellSpacing="0" style={wrapperTable}>
          <tbody>
            <tr>
              <td align="center" style={{ padding: "24px 0" }}>
                <table
                  role="presentation"
                  cellPadding="0"
                  cellSpacing="0"
                  style={cardTable}
                >
                  <tbody>
                    {/* Header */}
                    <tr>
                      <td style={headerCell}>
                        <div style={logoPlaceholder}>Fundación CMA</div>
                      </td>
                    </tr>

                    {/* Content */}
                    <tr>
                      <td style={contentCell}>
                        <h1 style={heading}>{texts.title}</h1>

                        <p style={paragraph}>
                          {texts.greeting} <strong style={highlight}>{donorName}</strong>,
                        </p>

                        <p style={paragraph}>
                          {texts.thanksText}{" "}
                          <strong style={highlight}>
                            {amount} {currency}
                          </strong>{" "}
                          a <strong style={highlight}>Fundación CMA</strong>.
                        </p>

                        <p style={paragraph}>{texts.supportText}</p>

                        {/* Badge */}
                        <table
                          role="presentation"
                          cellPadding="0"
                          cellSpacing="0"
                          style={badgeTable}
                        >
                          <tbody>
                            <tr>
                              <td style={badgeCell}>
                                <p style={badgeTitle}>{texts.badgeTitle}</p>
                                <p style={badgeAmount}>
                                  {amount} {currency}
                                </p>
                              </td>
                            </tr>
                          </tbody>
                        </table>

                        <p style={footerParagraph}>{texts.footerText}</p>
                      </td>
                    </tr>

                    {/* Divider */}
                    <tr>
                      <td style={{ padding: "0 32px" }}>
                        <hr style={hr} />
                      </td>
                    </tr>

                    {/* Footer */}
                    <tr>
                      <td style={subFooterCell}>
                        <p style={subFooter}>{texts.confirmationText}</p>
                        <p style={metaFooter}>
                          © {new Date().getFullYear()} Fundación CMA. Todos los derechos reservados.
                        </p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </body>
    </html>
  );
};

export default DonationThankYouEmail;

// --- ESTILOS ---
const bodyStyle: React.CSSProperties = {
  margin: 0,
  padding: 0,
  backgroundColor: "#f1f5f9",
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  WebkitTextSizeAdjust: "100%",
  textSizeAdjust: "100%",
};

const wrapperTable: React.CSSProperties = {
  width: "100%",
  borderCollapse: "collapse",
  borderSpacing: 0,
};

const cardTable: React.CSSProperties = {
  width: "100%",
  maxWidth: "600px",
  backgroundColor: "#ffffff",
  borderRadius: "12px",
  overflow: "hidden",
  border: "1px solid #e2e8f0",
  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
};

const headerCell: React.CSSProperties = {
  backgroundColor: "#0f766e", // Verde institucional CMA
  padding: "32px 24px",
  textAlign: "center",
};

const logoPlaceholder: React.CSSProperties = {
  color: "#ffffff",
  fontSize: "20px",
  fontWeight: 700,
  letterSpacing: "0.5px",
};

const contentCell: React.CSSProperties = {
  padding: "32px",
};

const heading: React.CSSProperties = {
  color: "#0f766e",
  textAlign: "center",
  fontSize: "26px",
  fontWeight: 700,
  margin: "0 0 24px 0",
  lineHeight: 1.3,
};

const paragraph: React.CSSProperties = {
  fontSize: "16px",
  lineHeight: 1.7,
  color: "#334155",
  margin: "0 0 16px 0",
};

const highlight: React.CSSProperties = {
  color: "#0f766e",
};

const badgeTable: React.CSSProperties = {
  width: "100%",
  margin: "28px 0",
  borderCollapse: "collapse",
};

const badgeCell: React.CSSProperties = {
  padding: "20px",
  backgroundColor: "#f0fdfa",
  borderRadius: "10px",
  textAlign: "center",
  border: "1.5px dashed #99f6e4",
};

const badgeTitle: React.CSSProperties = {
  margin: "0 0 10px 0",
  color: "#0f766e",
  fontSize: "14px",
  fontWeight: 600,
  textTransform: "uppercase",
  letterSpacing: "0.5px",
};

const badgeAmount: React.CSSProperties = {
  margin: 0,
  fontSize: "32px",
  fontWeight: 800,
  color: "#134e4a",
};

const footerParagraph: React.CSSProperties = {
  fontSize: "15px",
  color: "#64748b",
  lineHeight: 1.6,
  margin: "16px 0 0 0",
  textAlign: "center",
};

const hr: React.CSSProperties = {
  margin: 0,
  border: 0,
  borderTop: "1px solid #e2e8f0",
};

const subFooterCell: React.CSSProperties = {
  padding: "24px 32px 32px",
  textAlign: "center",
};

const subFooter: React.CSSProperties = {
  color: "#64748b",
  fontSize: "13px",
  margin: "0 0 8px 0",
  lineHeight: 1.5,
};

const metaFooter: React.CSSProperties = {
  color: "#94a3b8",
  fontSize: "11px",
  margin: 0,
};