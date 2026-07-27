import { DashboardShell } from "@/features/dashboard/components/DashboardShell";

export const metadata = {
  title: "Settings — DevForge",
  description: "Manage your account, preferences and application settings.",
};

export default function SettingsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <DashboardShell>{children}</DashboardShell>;
}
