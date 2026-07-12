import type { Metadata } from "next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  axes: ["SOFT"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://roomcaffe.com"),
  title: {
    default: "Room Lounge — Lipjan",
    template: "%s · Room Lounge",
  },
  description:
    "19 vite në Lipjan. Coffee, cocktails, live music. Hyr në lounge para se të vish.",
  keywords: [
    "Room Lounge",
    "RoomCaffe",
    "Lipjan",
    "Kosovë",
    "lounge bar",
    "live music",
    "rezervim",
    "coffee",
    "cocktails",
  ],
  openGraph: {
    title: "Room Lounge — Lipjan",
    description:
      "19 vite në Lipjan. Coffee, cocktails, live music. Hyr në lounge para se të vish.",
    url: "https://roomcaffe.com",
    siteName: "Room Lounge",
    locale: "sq_AL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Room Lounge — Lipjan",
    description: "19 vite në Lipjan. Hyr në lounge para se të vish.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="sq"
      className={`${fraunces.variable} ${inter.variable} ${jetbrains.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
