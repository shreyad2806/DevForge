import { SocialAuthButtons } from "./SocialAuthButtons";

export function SocialLoginButtons({ className }: { className?: string }) {
  return <SocialAuthButtons mode="login" className={className} />;
}
