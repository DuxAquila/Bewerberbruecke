import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/options";
import { redirect } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminTopbar from "@/components/admin/AdminTopbar";
import AdminSessionProvider from "@/components/admin/AdminSessionProvider";

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/admin/login");
  if (session.user.twoFactorPending) redirect("/admin/2fa");

  return (
    <AdminSessionProvider>
      <div className="admin-layout">
        <AdminSidebar />
        <div className="admin-main">
          <AdminTopbar title="Admin" />
          <main className="admin-content">
            {children}
          </main>
        </div>
      </div>
    </AdminSessionProvider>
  );
}
