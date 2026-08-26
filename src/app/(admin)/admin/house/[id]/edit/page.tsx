import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, Share2 } from "lucide-react";
import { getBlockedKeys, getHouseById } from "@/lib/db";
import { HouseForm } from "@/components/admin/HouseForm";
import { BlockCalendar } from "@/components/admin/BlockCalendar";
import { CopyLinkButton } from "@/components/shared/CopyLinkButton";

export const dynamic = "force-dynamic";

export const metadata: Metadata = { title: "Evi Redaktə Et" };

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditHousePage({ params }: PageProps) {
  const { id } = await params;
  const house = await getHouseById(id);
  if (!house) notFound();
  const blockedKeys = await getBlockedKeys(house.id);

  return (
    <div>
      <div className="mb-6">
        <Link
          href="/admin"
          className="mb-3 inline-flex items-center gap-2 text-sm font-medium text-ink-soft transition hover:text-ink"
        >
          <ArrowLeft className="size-4" />
          Panele qayıt
        </Link>
        <h1 className="truncate font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
          {house.title}
        </h1>
        <p className="mt-1 text-sm text-ink-faint">
          Evi redaktə edin, dolu günləri bloklayın və ya paylaşım linkini kopyalayın.
        </p>
      </div>

      <div className="grid items-start gap-6 lg:grid-cols-[1fr_380px]">
        <HouseForm initial={house} />

        <div className="space-y-5 lg:sticky lg:top-24">
          <div className="rounded-3xl border border-line bg-white/80 p-6 shadow-soft">
            <h2 className="flex items-center gap-2 font-display text-base font-semibold text-ink">
              <Share2 className="size-4.5 text-ember" />
              Sürətli Paylaşım
            </h2>
            <p className="mt-1 text-xs leading-relaxed text-ink-faint">
              Linki kopyalayıb İnstagram-da stori və ya bio-da paylaşın — müştərilər birbaşa bu evə
              düşəcək.
            </p>
            <div className="mt-4 rounded-xl border border-line bg-cream/60 px-3.5 py-2.5 font-mono text-xs text-ink-soft break-all">
              /house/{house.id}
            </div>
            <div className="mt-3 flex gap-2">
              <CopyLinkButton path={`/house/${house.id}`} className="flex-1" />
              <Link
                href={`/house/${house.id}`}
                target="_blank"
                aria-label="Saytda aç"
                className="grid size-9 shrink-0 place-items-center rounded-full border border-line text-ink-soft transition hover:bg-cream hover:text-ink"
              >
                <ExternalLink className="size-4" />
              </Link>
            </div>
          </div>

          <BlockCalendar houseId={house.id} initialKeys={blockedKeys} />
        </div>
      </div>
    </div>
  );
}
