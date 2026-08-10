import type { Metadata } from "next";
import CookiePolicy from "../CookiePolicy/CookiePolicy";

export const metadata: Metadata = {
  title: "Política de privacidad y cookies",
  description:
    "Conoce la política de privacidad y cookies de la Fundación Centro Mariana de Alfabetización.",
  alternates: {
    canonical: "/privacy-policy",
  },
};

export default function PrivacyPolicyPage() {
  return <CookiePolicy />;
}
