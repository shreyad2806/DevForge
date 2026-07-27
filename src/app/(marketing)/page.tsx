import { createClient } from "@/lib/supabase/server";
import { Hero } from "@/features/landing/components/Hero";
import { TrustedBy } from "@/features/landing/components/TrustedBy";
import { ProblemSolution } from "@/features/landing/components/ProblemSolution";
import { ForgeKitGrid } from "@/features/landing/components/ForgeKitGrid";
import { HowItWorks } from "@/features/landing/components/HowItWorks";
import { Features } from "@/features/landing/components/Features";
import { Pricing } from "@/features/landing/components/Pricing";
import { Testimonials } from "@/features/landing/components/Testimonials";
import { CTA } from "@/features/landing/components/CTA";

export default async function Home() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const authUser = user ? { id: user.id } : null;

  return (
    <>
      <Hero user={authUser} />
      <TrustedBy />
      <ProblemSolution />
      <ForgeKitGrid />
      <HowItWorks />
      <Features />
      <Pricing />
      <Testimonials />
      <CTA user={authUser} />
    </>
  );
}
