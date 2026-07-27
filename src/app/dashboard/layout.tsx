import { DashboardShell } from "@/features/dashboard/components/DashboardShell";

export const metadata = {
  title: "Dashboard — DevForge",
  description: "Your DevForge workspace dashboard.",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <DashboardShell>{children}</DashboardShell>;
}
