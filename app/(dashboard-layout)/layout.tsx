import { DashboardLayout } from "@/components/dashboard-layout";
import { auth } from "@/lib/auth";
//import { redirect } from "next/navigation";
;

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await auth();

    if (!session) {
      //redirect("/login"); // ✅ Redirects unauthenticated users
    }
    return (
        <div>
            <DashboardLayout>{children}</DashboardLayout>
        </div>
    );
}
