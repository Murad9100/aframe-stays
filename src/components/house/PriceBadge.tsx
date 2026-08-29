"use client";

import { useTourist } from "@/context/TouristContext";
import { Badge } from "@/components/ui/badge";

export function PriceBadge({ dailyPrice }: { dailyPrice: number }) {
  const { formatPrice } = useTourist();
  return (
    <Badge variant="ember" className="px-4 py-2 text-sm">
      {formatPrice(dailyPrice)} / gecə
    </Badge>
  );
}