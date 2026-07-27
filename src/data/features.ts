export interface Feature {
  id: string;
  title: string;
  description: string;
  icon:
    | "CheckCircle"
    | "Lock"
    | "Sparkles"
    | "RefreshCw"
    | "FolderTree"
    | "Code"
    | "ClipboardCheck"
    | "Zap";
}

export const features: Feature[] = [
  {
    id: "production-ready",
    title: "Production Ready",
    description:
      "All kits are battle-tested in real apps and follow the latest security, performance, and accessibility standards.",
    icon: "CheckCircle",
  },
  {
    id: "secure",
    title: "Secure by Default",
    description:
      "Security best practices built into every kit, from input validation to role-based access control.",
    icon: "Lock",
  },
  {
    id: "ai-assistant",
    title: "AI Assistant",
    description:
      "Get instant help integrating blocks, debugging APIs, and scaffolding new features.",
    icon: "Sparkles",
  },
  {
    id: "updated",
    title: "Always Updated",
    description:
      "Kits are actively maintained and versioned, with patch notes and migration guides included.",
    icon: "RefreshCw",
  },
  {
    id: "workspaces",
    title: "Workspaces & Collections",
    description:
      "Organize your favorite blocks into workspaces and reuse projects for faster scaffolding.",
    icon: "FolderTree",
  },
  {
    id: "typescript",
    title: "TypeScript First",
    description:
      "Every kit ships with fully-typed source code for better DX and safer deployments.",
    icon: "Code",
  },
  {
    id: "tests",
    title: "Tests Included",
    description:
      "Reliable unit and integration tests come with each block so you can deploy confidently.",
    icon: "ClipboardCheck",
  },
  {
    id: "install",
    title: "One Click Install",
    description:
      "Add any kit to your project with a single command and start customizing immediately.",
    icon: "Zap",
  },
];
