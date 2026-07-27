import { Loader2 } from "lucide-react";

export default function ExploreLoading() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-3 p-6 text-muted-foreground">
      <Loader2 className="size-6 animate-spin" aria-hidden="true" />
      <p className="text-sm">Loading explore kits…</p>
    </div>
  );
}
