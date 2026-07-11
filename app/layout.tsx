import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://cloudnine.com";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1466a8",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "C9 Company | Tráfego pago, automação com IA e conversão",
    template: "%s | C9 Company",
  },
  description:
    "Agência de growth para PMEs: tráfego pago, automação com IA e design de conversão operando como um único sistema. Agende um diagnóstico.",
  keywords: [
    "tráfego pago",
    "automação com IA",
    "marketing de performance",
    "otimização de conversão",
    "growth marketing",
    "agência de marketing digital",
  ],
  authors: [{ name: "C9 Company" }],
  creator: "C9 Company",
  publisher: "C9 Company",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    alternateLocale: ["en_US"],
    url: "/",
    siteName: "C9 Company",
    title: "C9 Company | Tráfego pago, automação com IA e conversão",
    description:
      "Agência de growth para PMEs: tráfego pago, automação com IA e design de conversão operando como um único sistema.",
  },
  twitter: {
    card: "summary_large_image",
    title: "C9 Company | Tráfego pago, automação com IA e conversão",
    description:
      "Agência de growth para PMEs: tráfego pago, automação com IA e design de conversão operando como um único sistema.",
    creator: "@c9company",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
  category: "Marketing",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
