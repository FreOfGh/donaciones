import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./[locale]/globals.css";
import { Analytics } from "@vercel/analytics/next"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://fundacioncma.org"),
  title: {
    default: "Fundación Centro Mariana de Alfabetización",
    template: "%s | Fundación CMA",
  },
  description: "Fundación Centro Mariana de Alfabetización en Marinilla, Antioquia. Apoyamos procesos educativos y comunitarios para niñas, niños y familias.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName: "Fundación Centro Mariana de Alfabetización",
    title: "Fundación Centro Mariana de Alfabetización",
    description: "Apoyamos procesos educativos y comunitarios para niñas, niños y familias.",
    url: "/",
    images: [
      {
        url: "/logocma.jpeg",
        width: 1200,
        height: 630,
        alt: "Fundación Centro Mariana de Alfabetización",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fundación Centro Mariana de Alfabetización",
    description: "Apoyamos procesos educativos y comunitarios para niñas, niños y familias.",
    images: ["/logocma.jpeg"],
  },
};



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <Analytics/>
      <body>{children}</body>
    </html>
  );
}