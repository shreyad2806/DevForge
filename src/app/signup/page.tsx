import { FadeInView } from "@/components/motion/FadeInView";
import { BrandSection } from "@/features/auth/components/BrandSection";
import { SocialSignupButtons } from "@/features/auth/components/SocialSignupButtons";
import { SignupForm } from "@/features/auth/components/SignupForm";
import { TermsSection } from "@/features/auth/components/TermsSection";
import { BenefitsPanel } from "@/features/auth/components/BenefitsPanel";
import { FooterLinks } from "@/features/auth/components/FooterLinks";
import { UserPlus } from "lucide-react";

export const metadata = {
  title: "Sign Up — DevForge",
  description: "Create your DevForge account.",
};

export default function SignupPage() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center bg-background px-4 py-12 sm:px-6">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-1/4 -top-1/4 h-[50vw] w-[50vw] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-1/4 -right-1/4 h-[50vw] w-[50vw] rounded-full bg-purple-600/5 blur-3xl" />
      </div>

      <FadeInView direction="up" distance={16} duration={0.4}>
        <BrandSection tagline="Join thousands of developers building better" />

        <div className="mt-8 w-full max-w-md rounded-2xl border border-border/60 bg-card p-6 shadow-2xl shadow-black/20">
          <div className="mb-6 flex items-start justify-between">
            <div>
              <h2 className="text-xl font-semibold text-foreground">Create your account</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Start building with production-ready Forge Kits
              </p>
            </div>
            <div className="flex size-10 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary">
              <UserPlus className="size-5" aria-hidden="true" />
            </div>
          </div>

          <SocialSignupButtons />

          <div className="my-5 flex items-center gap-3">
            <span className="h-px flex-1 bg-border/60" />
            <span className="text-[10px] text-muted-foreground">or sign up with email</span>
            <span className="h-px flex-1 bg-border/60" />
          </div>

          <SignupForm />
          <TermsSection />

          <p className="mt-4 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <a href="/login" className="font-medium text-primary transition-opacity hover:opacity-80">
              Sign in
            </a>
          </p>
        </div>

        <div className="mt-6 w-full max-w-md">
          <BenefitsPanel />
        </div>

        <div className="mt-8 w-full max-w-md">
          <FooterLinks />
        </div>
      </FadeInView>
    </main>
  );
}
