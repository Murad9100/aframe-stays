import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, MapPin, Users } from "lucide-react";
import { getBlockedKeys, getHouseById } from "@/lib/db";
import { ImageGallery } from "@/components/house/ImageGallery";
import { FeaturesList } from "@/components/house/FeaturesList";
import { LocalizedTitle, LocalizedDescription } from "@/components/house/LocalizedHouseText";
import { PriceBadge } from "@/components/house/PriceBadge";
import { BookingSection } from "@/components/booking/BookingSection";
import { MapCard } from "@/components/map/MapCard";
import { CopyLinkButton } from "@/components/shared/CopyLinkButton";
import { Reveal } from "@/components/shared/Reveal";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const house = await getHouseById(id);
  if (!house) notFound();
  return {
    title: house.title,
    description: house.description.slice(0, 160),
    openGraph: house.images[0] ? { images: [{ url: house.images[0] }] } : undefined,
  };
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-4 flex items-center gap-3 font-display text-xl font-semibold text-ink">
      <span className="h-5 w-1.5 rounded-full bg-ember" />
      {children}
    </h2>
  );
}

export default async function HousePage({ params }: PageProps) {
  const { id } = await params;
  const house = await getHouseById(id);
  if (!house) notFound();
  const blockedKeys = await getBlockedKeys(house.id);
  const googleMapsUrl = `https://www.google.com/maps?q=${house.location.lat},${house.location.lng}`;

  return (
    <div className="mx-auto max-w-7xl px-4 pb-32 pt-24 sm:px-6 lg:pb-16">
      <div className="mb-5 flex items-center justify-between">
        <Link
          href="/#houses"
          className="flex items-center gap-2 rounded-full py-1.5 pr-4 text-sm font-medium text-ink-soft transition hover:text-ink"
        >
          <span className="grid size-8 place-items-center rounded-full border border-line bg-white/70">
            <ArrowLeft className="size-4" />
          </span>
          Bütün evlər
        </Link>
        <CopyLinkButton path={`/house/${house.id}`} label="Paylaş" />
      </div>

      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            <LocalizedTitle house={house} />
          </h1>
          <div className="mt-2.5 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm text-ink-faint">
            <span className="flex items-center gap-1.5">
              <MapPin className="size-4 text-ember" />
              {house.region}, Azərbaycan
            </span>
            <span className="flex items-center gap-1.5">
              <Users className="size-4 text-ember" />
              {house.guests} qonağa qədər
            </span>
          </div>
        </div>
        <PriceBadge dailyPrice={house.dailyPrice} />
      </div>

      <Reveal y={20}>
        <div className="relative">
          <ImageGallery images={house.images} title={house.title} />
        </div>
      </Reveal>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_400px] lg:gap-12">
        <div className="min-w-0 space-y-12">
          <Reveal>
            <section>
              <SectionTitle>Ev Haqqında</SectionTitle>
              <LocalizedDescription house={house} />
            </section>
          </Reveal>

          {house.features.length > 0 && (
            <Reveal>
              <section>
                <SectionTitle>Xüsusiyyətlər</SectionTitle>
                <FeaturesList features={house.features} />
              </section>
            </Reveal>
          )}

          <Reveal>
            <section>
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <SectionTitle>Haradadır?</SectionTitle>
                
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 rounded-full border border-line bg-white/70 px-4 py-2 text-xs font-semibold text-ink transition hover:bg-cream"
                >
                  Google Maps-də aç
                  <ExternalLink className="size-3.5" />
                </a>
              </div>
              <div className="h-[380px]">
                <MapCard
                  lat={house.location.lat}
                  lng={house.location.lng}
                  title={house.title}
                  price={house.dailyPrice}
                />
              </div>
              <p className="mt-3 text-xs leading-relaxed text-ink-faint">
                Dəqiq ünvan rezervasiya təsdiqləndikdən sonra WhatsApp vasitəsilə paylaşılır.
              </p>
            </section>
          </Reveal>
        </div>

        <BookingSection house={house} blockedKeys={blockedKeys} />
      </div>
    </div>
  );
}