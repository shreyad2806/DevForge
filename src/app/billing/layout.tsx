import { DashboardShell } from "@/features/dashboard/components/DashboardShell";

export const metadata = {
  title: "Billing & Subscription — DevForge",
  description: "Manage your subscription, payment methods and invoices.",
};

export default function BillingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <DashboardShell>{children}</DashboardShell>;
}
