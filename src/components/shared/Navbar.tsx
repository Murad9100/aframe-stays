"use client";

import { TouristSwitcher } from "@/components/shared/TouristSwitcher";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CalendarHeart, Menu, X } from "lucide-react";
import { Logo } from "@/components/shared/Logo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "/#houses", label: "Evlər" },
  { href: "/#why", label: "Niyə Biz?" },
  { href: "/#contact", label: "Əlaqə" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -56, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
      className="fixed inset-x-0 top-0 z-50 pointer-events-none"
    >
      <div className="mx-auto max-w-7xl px-3 sm:px-6">
        <div
          className={cn(
            "pointer-events-auto mt-3 flex items-center justify-between gap-3 rounded-2xl px-3 transition-all duration-500 sm:px-4",
            scrolled ? "glass py-2 shadow-glass" : "py-3",
          )}
        >
          <Logo />

          <nav className="hidden items-center gap-1 md:flex">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="rounded-full px-4 py-2 text-sm font-medium text-ink-soft transition-colors hover:bg-cream hover:text-ink"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <TouristSwitcher />
            <Button variant="ember" size="sm" className="hidden sm:inline-flex" onClick={() => { window.location.href = "/#houses"; }}>
              <CalendarHeart className="size-4" />
              İndi Bron Et
            </Button>
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label="Menyu"
              className="grid size-9 place-items-center rounded-full text-ink transition hover:bg-cream cursor-pointer md:hidden"
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {open && (
            <motion.nav
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="pointer-events-auto mt-2 overflow-hidden rounded-2xl glass p-2 shadow-glass md:hidden"
            >
              {[...LINKS, { href: "/#houses", label: "İndi Bron Et" }].map((l) => (
                <Link
                  key={l.label}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium text-ink transition hover:bg-cream"
                >
                  {l.label}
                  <span className="text-ink-faint">→</span>
                </Link>
              ))}
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}