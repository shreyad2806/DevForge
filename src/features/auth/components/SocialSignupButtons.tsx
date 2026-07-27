import { SocialAuthButtons } from "./SocialAuthButtons";

export function SocialSignupButtons({ className }: { className?: string }) {
  return <SocialAuthButtons mode="signup" className={className} />;
}
