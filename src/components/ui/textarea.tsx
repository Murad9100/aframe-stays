import * as React from "react";
import { cn } from "@/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      className={cn(
        "flex min-h-28 w-full rounded-xl border border-line bg-white/70 px-4 py-3 text-sm text-ink shadow-sm transition-all duration-200 placeholder:text-ink-faint focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember/40 focus-visible:border-ember/60 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
