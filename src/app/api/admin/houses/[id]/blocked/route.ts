import { and, eq, gte, lte } from "drizzle-orm";
import { db } from "@/db";
import { blockedDates, houses } from "@/db/schema";
import { requireAdmin } from "@/lib/api";
import { isValidDateKey, toDateKey } from "@/lib/utils";

interface Ctx {
  params: Promise<{ id: string }>;
}

async function readDate(req: Request): Promise<string | null> {
  const body = (await req.json().catch(() => null)) as { date?: unknown } | null;
  return typeof body?.date === "string" ? body.date : null;
}

export async function POST(req: Request, ctx: Ctx) {
  const guard = await requireAdmin();
  if (guard) return guard;

  const { id } = await ctx.params;
  const date = await readDate(req);
  if (!date || !isValidDateKey(date)) {
    return Response.json({ error: "Tarix düzgün deyil" }, { status: 400 });
  }
  if (date < toDateKey(new Date())) {
    return Response.json({ error: "Keçmiş tarixi bloklamaq olmaz" }, { status: 400 });
  }

  const house = await db.select({ id: houses.id }).from(houses).where(eq(houses.id, id)).limit(1);
  if (!house.length) return Response.json({ error: "Ev tapılmadı" }, { status: 404 });

  // Artıq bu günü əhatə edən blok var?
  const existing = await db
    .select({ id: blockedDates.id })
    .from(blockedDates)
    .where(
      and(
        eq(blockedDates.houseId, id),
        lte(blockedDates.startDate, date),
        gte(blockedDates.endDate, date),
      ),
    )
    .limit(1);

  if (existing.length) return Response.json({ ok: true, already: true });

  await db.insert(blockedDates).values({ houseId: id, startDate: date, endDate: date });
  return Response.json({ ok: true }, { status: 201 });
}

export async function DELETE(req: Request, ctx: Ctx) {
  const guard = await requireAdmin();
  if (guard) return guard;

  const { id } = await ctx.params;
  const date = await readDate(req);
  if (!date || !isValidDateKey(date)) {
    return Response.json({ error: "Tarix düzgün deyil" }, { status: 400 });
  }

  const removed = await db
    .delete(blockedDates)
    .where(
      and(
        eq(blockedDates.houseId, id),
        lte(blockedDates.startDate, date),
        gte(blockedDates.endDate, date),
      ),
    )
    .returning({ id: blockedDates.id });

  return Response.json({ ok: true, removed: removed.length });
}
