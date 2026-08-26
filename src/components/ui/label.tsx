import * as React from "react";
import { cn } from "@/lib/utils";

function Label({ className, ...props }: React.ComponentProps<"label">) {
  return (
    <label
      className={cn("block text-[13px] font-semibold text-ink-soft mb-1.5 select-none", className)}
      {...props}
    />
  );
}

export { Label };
