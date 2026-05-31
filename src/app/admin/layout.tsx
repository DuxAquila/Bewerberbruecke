import type { Metadata } from "next";
import "@/app/style/admin.css";

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
      <body className="admin-scope">
        {children}
      </body>
    </html>
  );
}
