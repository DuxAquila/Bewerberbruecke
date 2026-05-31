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

      <style>{`
        .admin-layout {
          display: flex;
          min-height: 100vh;
          background: #0f1117;
          font-family: 'DM Sans', system-ui, sans-serif;
        }
        .admin-main {
          flex: 1;
          display: flex;
          flex-direction: column;
          min-width: 0;
          overflow: hidden;
        }
        .admin-content {
          flex: 1;
          padding: 1.75rem;
          overflow-y: auto;
          color: rgba(255,255,255,0.85);
        }
        @media (max-width: 768px) {
          .admin-layout { flex-direction: column; }
        }
      `}</style>
    </AdminSessionProvider>
  );
}
