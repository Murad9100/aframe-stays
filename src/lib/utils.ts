import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { differenceInCalendarDays, format, parseISO } from "date-fns";
import { az } from "date-fns/locale";

export const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "994505550707";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const priceFormatter = new Intl.NumberFormat("az-AZ", {
  style: "currency",
  currency: "AZN",
  maximumFractionDigits: 0,
});

export function formatPrice(amount: number): string {
  return priceFormatter.format(amount);
}

/** yyyy-MM-dd */
export function toDateKey(d: Date): string {
  return format(d, "yyyy-MM-dd");
}

export function parseKey(key: string): Date {
  return parseISO(key);
}

export function formatDateAz(keyOrDate: string | Date): string {
  const d = typeof keyOrDate === "string" ? parseISO(keyOrDate) : keyOrDate;
  return format(d, "d MMMM yyyy", { locale: az });
}

export function formatShortAz(keyOrDate: string | Date): string {
  const d = typeof keyOrDate === "string" ? parseISO(keyOrDate) : keyOrDate;
  return format(d, "d MMM", { locale: az });
}

export function nightsBetween(startKey: string, endKey: string): number {
  return Math.max(0, differenceInCalendarDays(parseISO(endKey), parseISO(startKey)));
}

export function buildWhatsAppUrl(opts: {
  houseTitle: string;
  startKey: string;
  endKey: string;
  nights: number;
  total: number;
  url?: string;
}): string {
  const lines = [
    `Salam! "${opts.houseTitle}" A-Frame evini bron etmək istəyirəm.`,
    "",
    `Giriş: ${formatDateAz(opts.startKey)}`,
    `Çıxış: ${formatDateAz(opts.endKey)}`,
    `Gecə sayı: ${opts.nights}`,
    `Yekun məbləğ: ${formatPrice(opts.total)}`,
  ];
  if (opts.url) lines.push("", `Link: ${opts.url}`);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`;
}

export function isValidDateKey(key: string): boolean {
  return /^\d{4}-\d{2}-\d{2}$/.test(key) && !Number.isNaN(parseISO(key).getTime());
}

export function clamp(n: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, n));
}
