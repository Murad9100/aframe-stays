"use client";

import dynamic from "next/dynamic";
import { MapPin } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const LeafletMap = dynamic(() => import("@/components/map/LeafletMap"), {
  ssr: false,
  loading: () => (
    <Skeleton className="flex h-full min-h-[320px] w-full items-center justify-center rounded-none">
      <span className="flex items-center gap-2 text-sm text-ink-faint">
        <MapPin className="size-4 animate-bounce" />
        Xəritə yüklənir...
      </span>
    </Skeleton>
  ),
});

export function MapCard(props: { lat: number; lng: number; title: string; price: number }) {
  return (
    <div className="relative h-full min-h-[320px] w-full overflow-hidden rounded-3xl border border-line shadow-soft">
      <LeafletMap {...props} />
    </div>
  );
}
