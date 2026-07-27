import { DashboardShell } from "@/features/dashboard/components/DashboardShell";

export const metadata = {
  title: "Explore Kits — DevForge",
  description: "Browse production-ready forge kits for your next project.",
};

export default function ExploreLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <DashboardShell>{children}</DashboardShell>;
}
