import { eq } from "drizzle-orm";
import { db } from "@/db";
import { houses } from "@/db/schema";
import { parseHouseInput, requireAdmin } from "@/lib/api";
import { serializeHouse } from "@/lib/db";

interface Ctx {
  params: Promise<{ id: string }>;
}

export async function PUT(req: Request, ctx: Ctx) {
  const guard = await requireAdmin();
  if (guard) return guard;

  const { id } = await ctx.params;
  const { data, error } = parseHouseInput(await req.json().catch(() => null));
  if (error || !data) return Response.json({ error: error ?? "Xəta" }, { status: 400 });

  const [row] = await db
    .update(houses)
    .set({
      title: data.title,
      description: data.description,
      region: data.region,
      dailyPrice: data.dailyPrice,
      guests: data.guests,
      features: data.features,
      images: data.images,
      lat: data.lat,
      lng: data.lng,
    })
    .where(eq(houses.id, id))
    .returning();

  if (!row) return Response.json({ error: "Ev tapılmadı" }, { status: 404 });
  return Response.json({ house: serializeHouse(row) });
}

export async function DELETE(_req: Request, ctx: Ctx) {
  const guard = await requireAdmin();
  if (guard) return guard;

  const { id } = await ctx.params;
  const rows = await db.delete(houses).where(eq(houses.id, id)).returning({ id: houses.id });
  if (!rows.length) return Response.json({ error: "Ev tapılmadı" }, { status: 404 });
  return Response.json({ ok: true });
}
