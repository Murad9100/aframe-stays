import * as React from "react";
import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      className={cn(
        "flex h-11 w-full rounded-xl border border-line bg-white/70 px-4 py-2 text-sm text-ink shadow-sm transition-all duration-200 placeholder:text-ink-faint focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember/40 focus-visible:border-ember/60 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
