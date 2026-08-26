import { isAdmin } from "@/lib/auth";
import type { HouseInput } from "@/types";

export async function requireAdmin(): Promise<Response | null> {
  if (await isAdmin()) return null;
  return Response.json({ error: "İcazə yoxdur" }, { status: 401 });
}

export function parseHouseInput(body: unknown): { data?: HouseInput; error?: string } {
  if (!body || typeof body !== "object") return { error: "Yanlış məlumat formatı" };
  const b = body as Record<string, unknown>;

  const str = (v: unknown): string => (typeof v === "string" ? v.trim() : "");
  const num = (v: unknown): number => (typeof v === "number" ? v : Number(v));
  const strArr = (v: unknown): string[] =>
    Array.isArray(v)
      ? v.filter((x): x is string => typeof x === "string").map((s) => s.trim()).filter(Boolean)
      : [];

  const title = str(b.title);
  const description = str(b.description);
  const region = str(b.region);
  const dailyPrice = Math.round(num(b.dailyPrice));
  const guests = Math.round(num(b.guests));
  const lat = num(b.lat);
  const lng = num(b.lng);
  const features = strArr(b.features).slice(0, 24);
  const images = strArr(b.images).slice(0, 20);

  if (!title || title.length > 120) return { error: "Ev adı düzgün deyil" };
  if (!region) return { error: "Region boş ola bilməz" };
  if (!Number.isFinite(dailyPrice) || dailyPrice <= 0 || dailyPrice > 100000)
    return { error: "Günlük qiymət düzgün deyil" };
  if (!Number.isInteger(guests) || guests < 1 || guests > 30)
    return { error: "Qonaq sayı düzgün deyil" };
  if (!Number.isFinite(lat) || Math.abs(lat) > 90) return { error: "Enlik (lat) düzgün deyil" };
  if (!Number.isFinite(lng) || Math.abs(lng) > 180) return { error: "Uzunluq (lng) düzgün deyil" };
  if (images.length === 0) return { error: "Ən azı 1 şəkil linki tələb olunur" };
  if (images.some((u) => !/^https?:\/\//.test(u)))
    return { error: "Şəkil linkləri http/https ilə başlamalıdır" };

  return {
    data: { title, description, region, dailyPrice, guests, lat, lng, features, images },
  };
}
