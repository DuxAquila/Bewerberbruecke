import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Bewerberbrücke – Social Recruiting für Pflege & Soziales",
  description: "Planbare Sichtbarkeit und Mitarbeitergewinnung. Wir bauen Ihnen die Maschine, die Bewerber für Sie generiert.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
