import type { Metadata } from "next";
import { Banknote, CalendarX2, Home } from "lucide-react";
import { getHouses, getUpcomingBlockedSummary } from "@/lib/db";
import { formatPrice } from "@/lib/utils";
import { HousesTable } from "@/components/admin/HousesTable";
import { Reveal } from "@/components/shared/Reveal";

export const dynamic = "force-dynamic";

export const metadata: Metadata = { title: "İdarəetmə Paneli" };

export default async function AdminDashboard() {
  const [houses, blockedSummary] = await Promise.all([getHouses(), getUpcomingBlockedSummary()]);

  const averagePrice =
    houses.length > 0
      ? Math.round(houses.reduce((s, h) => s + h.dailyPrice, 0) / houses.length)
      : 0;
  const totalBlocked = Object.values(blockedSummary).reduce((s, n) => s + n, 0);

  const stats = [
    { icon: Home, label: "Ümumi Ev", value: String(houses.length) },
    { icon: Banknote, label: "Orta Qiymət", value: formatPrice(averagePrice) },
    { icon: CalendarX2, label: "Bloklu Gün (qarşıda)", value: String(totalBlocked) },
  ];

  return (
    <>
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            İdarəetmə Paneli
          </h1>
          <p className="mt-1 text-sm text-ink-faint">
            Evləri idarə edin, təqvimi bloklayın, linkləri İnstagram-da paylaşın.
          </p>
        </div>
      </div>

      <Reveal>
        <div className="mb-8 grid gap-3 sm:grid-cols-3">
          {stats.map((s) => (
            <div
              key={s.label}
              className="flex items-center gap-4 rounded-3xl border border-line bg-white/80 px-5 py-4 shadow-soft"
            >
              <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-cream text-ember-deep">
                <s.icon className="size-5" />
              </span>
              <div>
                <div className="font-display text-xl font-bold text-ink">{s.value}</div>
                <div className="text-xs text-ink-faint">{s.label}</div>
              </div>
            </div>
          ))}
        </div>
      </Reveal>

      <HousesTable houses={houses} blockedSummary={blockedSummary} />
    </>
  );
}
