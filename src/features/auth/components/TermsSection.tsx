export function TermsSection() {
  return (
    <p className="text-center text-xs text-muted-foreground">
      By creating an account, you agree to our{" "}
      <a href="/terms" className="text-primary transition-opacity hover:opacity-80">
        Terms of Service
      </a>{" "}
      and{" "}
      <a href="/privacy" className="text-primary transition-opacity hover:opacity-80">
        Privacy Policy
      </a>
      .
    </p>
  );
}
