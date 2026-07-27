import { DashboardShell } from "@/features/dashboard/components/DashboardShell";

export const metadata = {
  title: "Workspaces — DevForge",
  description: "Organize your projects with production-ready Forge Kits.",
};

export default function WorkspacesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <DashboardShell>{children}</DashboardShell>;
}
