export interface PainPoint {
  text: string;
}

export interface ProblemSolutionData {
  problemTitle: string;
  problemDescription: string;
  problemPoints: PainPoint[];
  solutionTitle: string;
  solutionDescription: string;
  solutionPoints: PainPoint[];
}

export const problemSolution: ProblemSolutionData = {
  problemTitle: "The Problem",
  problemDescription:
    "Building production-grade features from scratch is slow, error-prone, and drains engineering focus.",
  problemPoints: [
    { text: "Rewriting the same features again and again" },
    { text: "Inconsistent authentication and security rules" },
    { text: "Wasted hours on boilerplate and set-up" },
    { text: "No test suite, updates, or migration guides" },
  ],
  solutionTitle: "The Solution",
  solutionDescription:
    "DevForge gives you battle-tested, modular code blocks you can drop into any modern stack.",
  solutionPoints: [
    { text: "Production-ready, battle-tested Forge Kits" },
    { text: "Secure, scalable, and easy to integrate" },
    { text: "Save hours of development time" },
    { text: "Built by developers, for developers" },
  ],
};
