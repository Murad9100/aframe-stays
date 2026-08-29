import Link from "next/link";
import { cn } from "@/lib/utils";

export function LogoMark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "grid size-9 shrink-0 place-items-center rounded-xl bg-ink text-paper transition-colors duration-300 group-hover:bg-ember",
        className,
      )}
    >
      <svg viewBox="0 0 24 24" fill="none" className="size-5" aria-hidden="true">
        <path
          d="M12 4.5 21 20H3L12 4.5Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path d="M12 20v-4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </span>
  );
}

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className="group flex items-center gap-2.5" aria-label="N&F Cabins ana səhifə">
      <LogoMark />
      <span
        className={cn(
          "font-display text-lg font-bold tracking-tight",
          light ? "text-paper" : "text-ink",
        )}
      >
        <span className="text-ember">N&F</span> Cabins
      </span>
    </Link>
  );
}
