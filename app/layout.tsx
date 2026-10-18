import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Instrument_Serif } from "next/font/google";
import "./globals.css";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["italic", "normal"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Gumbelle — The 11\" Classic Gumball Machine",
  description:
    "A real-glass, cast-metal gumball machine with a built-in coin bank. Playful, premium and delivered across South Africa. Order on WhatsApp.",
  openGraph: {
    title: "Gumbelle — Joy, one turn at a time",
    description:
      "The 11\" classic gumball machine with real glass, cast metal and a coin bank. Order on WhatsApp.",
    images: ["/images/specs.jpg"],
    locale: "en_ZA",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#FFF4E8",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-ZA" className={`${display.variable} ${serif.variable}`}>
      <body>{children}</body>
    </html>
  );
}
