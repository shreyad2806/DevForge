export interface ProcessStep {
  id: string;
  title: string;
  description: string;
}

export const howItWorksSteps: ProcessStep[] = [
  {
    id: "browse",
    title: "Browse",
    description: "Explore hundreds of production-ready kits for any use case or stack.",
  },
  {
    id: "add-workspace",
    title: "Add to Workspace",
    description: "Install only the blocks you need directly into your Next.js project.",
  },
  {
    id: "integrate",
    title: "Integrate",
    description: "Follow our step-by-step guide to connect your APIs and database.",
  },
  {
    id: "ship",
    title: "Ship Faster",
    description: "Focus on your product, not boilerplate. Launch in hours, not weeks.",
  },
];
