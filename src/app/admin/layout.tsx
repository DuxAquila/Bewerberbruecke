import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin – Bewerberbrücke",
  robots: "noindex, nofollow",
};

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <body>
        {children}
      </body>
    </html>
  );
}
