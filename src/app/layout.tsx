import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "./style/index.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Fonts werden von Next.js automatisch lokal heruntergeladen und gehostet.
// Kein Google-Request zur Laufzeit → schneller + DSGVO-konform.
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-serif",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bewerberbrücke – Social Recruiting für Pflege & Soziales",
  description:
    "Planbare Sichtbarkeit und Mitarbeitergewinnung. Wir bauen Ihnen die Maschine, die Bewerber für Sie generiert.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de" className={`${playfair.variable} ${dmSans.variable}`}>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
