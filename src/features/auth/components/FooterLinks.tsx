export function FooterLinks() {
  return (
    <footer className="flex flex-col items-center justify-between gap-3 text-xs text-muted-foreground sm:flex-row">
      <p>&copy; 2024 DevForge. All rights reserved.</p>
      <div className="flex items-center gap-4">
        <a href="/privacy" className="transition-colors hover:text-foreground">
          Privacy Policy
        </a>
        <a href="/terms" className="transition-colors hover:text-foreground">
          Terms of Service
        </a>
      </div>
    </footer>
  );
}
