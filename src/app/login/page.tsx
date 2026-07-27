import { FadeInView } from "@/components/motion/FadeInView";
import { BrandSection } from "@/features/auth/components/BrandSection";
import { SocialLoginButtons } from "@/features/auth/components/SocialLoginButtons";
import { LoginForm } from "@/features/auth/components/LoginForm";
import { HeroPanel } from "@/features/auth/components/HeroPanel";
import { FooterLinks } from "@/features/auth/components/FooterLinks";
import { Toaster } from "@/components/ui/toast";
import { Code } from "lucide-react";

export const metadata = {
  title: "Sign In — DevForge",
  description: "Sign in to your DevForge account.",
};

export default function LoginPage() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center bg-background px-4 py-12 sm:px-6">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-1/4 -top-1/4 h-[50vw] w-[50vw] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-1/4 -right-1/4 h-[50vw] w-[50vw] rounded-full bg-purple-600/5 blur-3xl" />
      </div>

      <Toaster>
        <FadeInView direction="up" distance={16} duration={0.4}>
          <BrandSection />

        <div className="mt-8 w-full max-w-md rounded-2xl border border-border/60 bg-card p-6 shadow-2xl shadow-black/20">
          <div className="mb-6 flex items-start justify-between">
            <div>
              <h2 className="text-xl font-semibold text-foreground">Welcome back</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Sign in to access your DevForge account
              </p>
            </div>
            <div className="flex size-10 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary">
              <Code className="size-5" aria-hidden="true" />
            </div>
          </div>

          <SocialLoginButtons />

          <div className="my-5 flex items-center gap-3">
            <span className="h-px flex-1 bg-border/60" />
            <span className="text-[10px] text-muted-foreground">or continue with email</span>
            <span className="h-px flex-1 bg-border/60" />
          </div>

          <LoginForm />

          <p className="mt-4 text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <a href="/signup" className="font-medium text-primary transition-opacity hover:opacity-80">
              Sign up
            </a>
          </p>
        </div>

        <div className="mt-6 w-full max-w-md">
          <HeroPanel />
        </div>

        <div className="mt-8 w-full max-w-md">
          <FooterLinks />
        </div>
      </FadeInView>
      </Toaster>
    </main>
  );
}
