import { DashboardLayout } from "@/components/dashboard-layout";
;

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div>
            <DashboardLayout>{children}</DashboardLayout>
        </div>
    );
}
