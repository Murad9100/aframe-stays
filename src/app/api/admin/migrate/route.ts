import { sql } from "drizzle-orm";
import { db } from "@/db";
import { requireAdmin } from "@/lib/api";

export async function GET() {
  const guard = await requireAdmin();
  if (guard) return guard;

  await db.execute(sql`ALTER TABLE houses ADD COLUMN IF NOT EXISTS title_en text`);
  await db.execute(sql`ALTER TABLE houses ADD COLUMN IF NOT EXISTS title_ru text`);
  await db.execute(sql`ALTER TABLE houses ADD COLUMN IF NOT EXISTS description_en text`);
  await db.execute(sql`ALTER TABLE houses ADD COLUMN IF NOT EXISTS description_ru text`);

  return Response.json({
    ok: true,
    message: "Migration tamamlandi: title_en, title_ru, description_en, description_ru sutunlari elave olundu.",
  });
}