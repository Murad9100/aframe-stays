import { cache } from "react";
import { and, asc, desc, eq, gte } from "drizzle-orm";
import { eachDayOfInterval, parseISO } from "date-fns";
import { db } from "@/db";
import { blockedDates, houses, type BlockedDateRow, type HouseRow } from "@/db/schema";
import type { BlockedRange, House } from "@/types";
import { toDateKey } from "@/lib/utils";

export function serializeHouse(row: HouseRow): House {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    region: row.region,
    dailyPrice: row.dailyPrice,
    guests: row.guests,
    features: row.features ?? [],
    images: row.images ?? [],
    location: { lat: row.lat, lng: row.lng },
    createdAt: row.createdAt.toISOString(),
  };
}

function serializeRange(row: BlockedDateRow): BlockedRange {
  return {
    id: row.id,
    houseId: row.houseId,
    startDate: row.startDate,
    endDate: row.endDate,
    status: "blocked",
  };
}

export async function getHouses(): Promise<House[]> {
  const rows = await db.select().from(houses).orderBy(desc(houses.createdAt));
  return rows.map(serializeHouse);
}

export const getHouseById = cache(async (id: string): Promise<House | null> => {
  const rows = await db.select().from(houses).where(eq(houses.id, id)).limit(1);
  return rows[0] ? serializeHouse(rows[0]) : null;
});

/** Tarix aralığını fərdi günlərə açır (yyyy-MM-dd) */
export function expandRange(startKey: string, endKey: string): string[] {
  try {
    return eachDayOfInterval({ start: parseISO(startKey), end: parseISO(endKey) }).map(toDateKey);
  } catch {
    return [];
  }
}

export async function getBlockedRanges(houseId: string): Promise<BlockedRange[]> {
  const today = toDateKey(new Date());
  const rows = await db
    .select()
    .from(blockedDates)
    .where(and(eq(blockedDates.houseId, houseId), gte(blockedDates.endDate, today)))
    .orderBy(asc(blockedDates.startDate));
  return rows.map(serializeRange);
}

export async function getBlockedKeys(houseId: string): Promise<string[]> {
  const ranges = await getBlockedRanges(houseId);
  const set = new Set<string>();
  for (const r of ranges) for (const d of expandRange(r.startDate, r.endDate)) set.add(d);
  return [...set].sort();
}

/** Dashboard üçün: hər ev üzrə qarşıdakı bloklanmış gün sayı */
export async function getUpcomingBlockedSummary(): Promise<Record<string, number>> {
  const today = toDateKey(new Date());
  const rows = await db
    .select()
    .from(blockedDates)
    .where(gte(blockedDates.endDate, today))
    .orderBy(asc(blockedDates.startDate));
  const summary: Record<string, Set<string>> = {};
  for (const row of rows) {
    const set = (summary[row.houseId] ??= new Set<string>());
    for (const d of expandRange(row.startDate, row.endDate)) if (d >= today) set.add(d);
  }
  return Object.fromEntries(Object.entries(summary).map(([k, v]) => [k, v.size]));
}
