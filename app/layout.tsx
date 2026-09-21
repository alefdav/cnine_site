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

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://c9company.com.br";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#16233d",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "C9 Company | Anúncio, página e recepção automática num sistema só",
    template: "%s | C9 Company",
  },
  description:
    "Anúncio, página e recepção automática no WhatsApp para negócios que atendem com hora marcada. Teste a recepção antes de contratar.",
  keywords: [
    "recepção automática no WhatsApp",
    "atendente de IA para clínica",
    "agendamento automático",
    "tráfego pago local",
    "página de conversão",
    "SEO local",
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
    title: "C9 Company | Anúncio, página e recepção automática num sistema só",
    description:
      "Anúncio, página e recepção automática no WhatsApp para negócios que atendem com hora marcada. Teste a recepção antes de contratar.",
  },
  twitter: {
    card: "summary_large_image",
    title: "C9 Company | Anúncio, página e recepção automática num sistema só",
    description:
      "Anúncio, página e recepção automática no WhatsApp para negócios que atendem com hora marcada. Teste a recepção antes de contratar.",
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

/*
  Escolhe o céu antes da primeira pintura, a partir da escolha salva pelo
  visitante ou do relógio local dele. Sem isso a página pintaria a noite e
  trocaria depois da hidratação, piscando. Sem JS, fica a noite do HTML.
  As faixas aqui espelham `daypartFromHour()` em `lib/content.ts`.
*/
const SKY_SCRIPT = `(function(){try{var k=localStorage.getItem('c9-sky');var v=['night','dawn','day','dusk'];var h=new Date().getHours();var d=(k&&v.indexOf(k)>-1)?k:(h<5?'night':h<9?'dawn':h<17?'day':h<20?'dusk':'night');document.documentElement.dataset.daypart=d;}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" data-daypart="night" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <script dangerouslySetInnerHTML={{ __html: SKY_SCRIPT }} />
        {children}
      </body>
    </html>
  );
}
