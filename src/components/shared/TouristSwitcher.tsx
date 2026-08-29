"use client";
import { useState, useRef, useEffect } from "react";
import { useTourist } from "@/context/TouristContext";
import { ChevronDown } from "lucide-react";

const LANGUAGES = [
  { code: "az", label: "Azərbaycan", flag: "🇦🇿" },
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "ru", label: "Русский", flag: "🇷🇺" },
] as const;

const CURRENCIES = [
  { code: "AZN", symbol: "₼" },
  { code: "USD", symbol: "$" },
  { code: "RUB", symbol: "₽" },
] as const;

export function TouristSwitcher() {
  const { lang, setLang, currency, setCurrency } = useTourist();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const active = LANGUAGES.find((l) => l.code === lang)!;

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 rounded-full border border-line bg-cream/60 px-3 py-1.5 text-xs font-semibold text-ink shadow-sm backdrop-blur-md transition hover:bg-cream cursor-pointer"
      >
        <span className="text-base leading-none">{active.flag}</span>
        <span className="uppercase tracking-wide">{active.code}</span>
        <span className="text-ink-faint">·</span>
        <span className="text-ember-deep">{currency}</span>
        <ChevronDown className={`size-3.5 text-ink-faint transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute right-0 top-full z-50 mt-2 w-52 overflow-hidden rounded-2xl border border-line bg-white shadow-lift">
          <div className="border-b border-line px-3 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-ink-faint">
            Dil
          </div>
          {LANGUAGES.map((l) => (
            <button
              key={l.code}
              onClick={() => { setLang(l.code); setOpen(false); }}
              className={`flex w-full items-center gap-2.5 px-3 py-2 text-left text-sm transition hover:bg-cream cursor-pointer ${
                lang === l.code ? "bg-cream/80 font-semibold text-ember-deep" : "text-ink"
              }`}
            >
              <span className="text-base leading-none">{l.flag}</span>
              {l.label}
            </button>
          ))}

          <div className="border-y border-line px-3 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-ink-faint">
            Valyuta
          </div>
          {CURRENCIES.map((c) => (
            <button
              key={c.code}
              onClick={() => { setCurrency(c.code); setOpen(false); }}
              className={`flex w-full items-center justify-between px-3 py-2 text-left text-sm transition hover:bg-cream cursor-pointer ${
                currency === c.code ? "bg-cream/80 font-semibold text-ember-deep" : "text-ink"
              }`}
            >
              {c.code}
              <span className="text-ink-faint">{c.symbol}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}