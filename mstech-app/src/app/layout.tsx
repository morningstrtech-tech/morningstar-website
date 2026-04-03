import type { Metadata } from "next";
import { Instrument_Serif } from "next/font/google";
import "./globals.css";
import LayoutShell from "../components/LayoutShell";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-instrument-serif",
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mstech.agency"), // Ganti dengan domain asli
  title: {
    default: "MS.tech — Solusi Digital Modern",
    template: "%s | MS.tech",
  },
  description:
    "MS.tech — Jasa pembuatan website profesional untuk UMKM hingga Enterprise. Modernisasi bisnis Anda di era digital & AI.",
  keywords: [
    "jasa pembuatan website",
    "web developer Indonesia",
    "UMKM digital",
    "website enterprise",
    "animated website",
    "software house",
    "bikin website murah",
    "MS.tech",
  ],
  authors: [{ name: "MS.tech" }],
  creator: "MS.tech",
  openGraph: {
    title: "MS.tech — Technology",
    description: "Solusi digital modern untuk modernisasi bisnis Anda di era digital & AI.",
    url: "https://mstech.agency", // Ganti dengan domain asli
    siteName: "MS.tech",
    type: "website",
    locale: "id_ID",
  },
  twitter: {
    card: "summary_large_image",
    title: "MS.tech — Technology",
    description: "Jasa pembuatan website profesional untuk modernisasi bisnis Anda di era digital & AI.",
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={instrumentSerif.variable}>
      <body className="bg-black text-white antialiased">
        <LayoutShell>{children}</LayoutShell>
      </body>
    </html>
  );
}
