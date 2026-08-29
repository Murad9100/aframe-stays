"use client";

import type { House } from "@/types";
import { localizedTitle, localizedDescription } from "@/lib/utils";
import { useTourist } from "@/context/TouristContext";

export function LocalizedTitle({ house }: { house: House }) {
  const { lang } = useTourist();
  return <>{localizedTitle(house, lang)}</>;
}

export function LocalizedDescription({ house }: { house: House }) {
  const { lang } = useTourist();
  return (
    <p className="whitespace-pre-line leading-[1.9] text-ink-soft">
      {localizedDescription(house, lang)}
    </p>
  );
}