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
  title: "Fundación CMA",
  description: "Fundación Centro Mariana de Alfabetización",
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