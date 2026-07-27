import { Hero } from "@/features/landing/components/Hero";
import { TrustedBy } from "@/features/landing/components/TrustedBy";
import { ProblemSolution } from "@/features/landing/components/ProblemSolution";
import { ForgeKitGrid } from "@/features/landing/components/ForgeKitGrid";
import { HowItWorks } from "@/features/landing/components/HowItWorks";
import { Features } from "@/features/landing/components/Features";
import { Pricing } from "@/features/landing/components/Pricing";
import { Testimonials } from "@/features/landing/components/Testimonials";
import { CTA } from "@/features/landing/components/CTA";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustedBy />
      <ProblemSolution />
      <ForgeKitGrid />
      <HowItWorks />
      <Features />
      <Pricing />
      <Testimonials />
      <CTA />
    </>
  );
}
