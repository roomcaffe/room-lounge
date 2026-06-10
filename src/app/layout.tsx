import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Room Lounge Cafe — Lipjan, Kosovë",
    template: "%s | Room Lounge Cafe",
  },
  description:
    "Mbi 18 vite në Lipjan. Coffee, cocktails, live music dhe atmosferë premium. Rezervoni tavolinën tuaj online.",
  keywords: [
    "Room Lounge Cafe",
    "Lipjan",
    "Kosovë",
    "kafene",
    "lounge",
    "live music",
    "rezervim tavoline",
    "coffee shop",
    "cocktails",
  ],
  openGraph: {
    title: "Room Lounge Cafe — Lipjan, Kosovë",
    description:
      "Mbi 18 vite në Lipjan. Coffee, cocktails, live music dhe atmosferë premium.",
    url: "https://roomloungecafe.com",
    siteName: "Room Lounge Cafe",
    locale: "sq_AL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Room Lounge Cafe — Lipjan, Kosovë",
    description:
      "Coffee, cocktails, live music dhe atmosferë premium në zemër të Lipjanit.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sq" className={`${cormorant.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
