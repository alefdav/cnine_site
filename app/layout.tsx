import type { Metadata } from "next";
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

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://cloudnine.com'),
  title: {
    default: "C9 - Atmospheric Growth | AI-Powered Digital Marketing",
    template: "%s | C9 Company"
  },
  description: "We don't just run ads. We engineer high-altitude digital ecosystems using AI automation and performance architecture. Transform your business with 300% average ROI.",
  keywords: [
    "digital marketing",
    "AI automation",
    "performance marketing",
    "paid traffic",
    "conversion optimization",
    "marketing automation",
    "growth marketing",
    "ROI optimization",
    "PPC advertising",
    "marketing technology"
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
    locale: "en_US",
    alternateLocale: ["pt_BR"],
    url: "/",
    siteName: "C9 Company",
    title: "C9 - Atmospheric Growth | AI-Powered Digital Marketing",
    description: "We don't just run ads. We engineer high-altitude digital ecosystems using AI automation and performance architecture.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "C9 Company - Atmospheric Growth",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "C9 - Atmospheric Growth | AI-Powered Digital Marketing",
    description: "We don't just run ads. We engineer high-altitude digital ecosystems using AI automation and performance architecture.",
    images: ["/og-image.jpg"],
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
    languages: {
      "en": "/",
      "pt": "/?lang=pt",
    },
  },
  category: "Marketing",
  classification: "Business",
  other: {
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "theme-color": "#0ea5e9",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="canonical" href={process.env.NEXT_PUBLIC_SITE_URL || "https://cloudnine.com"} />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="theme-color" content="#0ea5e9" />
        <meta name="msapplication-TileColor" content="#0ea5e9" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
