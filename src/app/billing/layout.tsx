import { Sidebar } from "@/features/dashboard/components/Sidebar";
import { Topbar } from "@/features/dashboard/components/Topbar";

export const metadata = {
  title: "Billing & Subscription — DevForge",
  description: "Manage your subscription, payment methods and invoices.",
};

export default function BillingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative min-h-screen bg-background">
      <Sidebar className="fixed left-0 top-0 z-40" />
      <Topbar className="fixed left-64 right-0 top-0 z-40" />
      <main className="min-h-screen pl-64 pt-16">{children}</main>
    </div>
  );
}
