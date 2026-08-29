import { getHouses } from "@/lib/db";
import { Hero } from "@/components/home/Hero";
import { CtaBanner, Editorial, MarqueeStrip, TrustStrip } from "@/components/home/HomeSections";
import { HouseGrid } from "@/components/house/HouseGrid";
import { Reveal } from "@/components/shared/Reveal";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const houses = await getHouses();
  const regions = Array.from(new Set(houses.map((h) => h.region).filter(Boolean)));

  return (
    <>
      <Hero houseCount={houses.length} regionCount={regions.length} regions={regions} />
      <MarqueeStrip regions={regions} />
      <TrustStrip />

      <section id="houses" className="mx-auto max-w-7xl scroll-mt-28 px-5 py-10 sm:px-6">
        <Reveal>
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-ember">
                Kolleksiya
              </span>
              <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink sm:text-5xl">
                A-Frame Evlərimiz
              </h2>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-ink-faint">
              Hər biri unikal dizaynla, təbiətin tam mərkəzində. Kartın üzərinə gəlin — qalereyanı
              vərəqləyin.
            </p>
          </div>
        </Reveal>

        {houses.length > 0 ? (
          <HouseGrid houses={houses} />
        ) : (
          <div className="rounded-3xl border border-dashed border-line bg-white/50 py-24 text-center text-ink-faint">
            Tezliklə yeni evlər əlavə olunacaq.
          </div>
        )}
      </section>

      <Editorial />
      <CtaBanner />
    </>
  );
}