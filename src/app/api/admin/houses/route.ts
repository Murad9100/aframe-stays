import { db } from "@/db";
import { houses } from "@/db/schema";
import { parseHouseInput, requireAdmin } from "@/lib/api";
import { serializeHouse } from "@/lib/db";

export async function POST(req: Request) {
  const guard = await requireAdmin();
  if (guard) return guard;

  const { data, error } = parseHouseInput(await req.json().catch(() => null));
  if (error || !data) return Response.json({ error: error ?? "Xəta" }, { status: 400 });

  const [row] = await db
    .insert(houses)
    .values({
      title: data.title,
      titleEn: data.titleEn ?? null,
      titleRu: data.titleRu ?? null,
      description: data.description,
      descriptionEn: data.descriptionEn ?? null,
      descriptionRu: data.descriptionRu ?? null,
      region: data.region,
      dailyPrice: data.dailyPrice,
      guests: data.guests,
      features: data.features,
      images: data.images,
      lat: data.lat,
      lng: data.lng,
    })
    .returning();

  return Response.json({ house: serializeHouse(row) }, { status: 201 });
}