"use client";
import { useTourist } from "@/context/TouristContext";
import { Globe } from "lucide-react";

export function TouristSwitcher() {
  const { lang, setLang, currency, setCurrency } = useTourist();

  return (
    <div className="flex items-center gap-2 rounded-full border border-line bg-cream/50 px-3 py-1.5 shadow-sm backdrop-blur-md">
      <Globe className="size-4 text-ember" />
      <select value={lang} onChange={(e) => setLang(e.target.value as any)} className="bg-transparent text-xs font-semibold uppercase text-ink outline-none cursor-pointer appearance-none">
        <option value="az">AZ</option><option value="en">EN</option><option value="ru">RU</option>
      </select>
      <div className="h-3 w-[1px] bg-line"></div>
      <select value={currency} onChange={(e) => setCurrency(e.target.value as any)} className="bg-transparent text-xs font-semibold text-ink outline-none cursor-pointer appearance-none">
        <option value="AZN">AZN</option><option value="USD">USD</option><option value="RUB">RUB</option>
      </select>
    </div>
  );
}