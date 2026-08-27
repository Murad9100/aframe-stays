import fs from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { requireAdmin } from "@/lib/api";

export const runtime = "nodejs";

const ALLOWED: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/avif": "avif",
  "image/gif": "gif",
};
const MAX_BYTES = 10 * 1024 * 1024;

const hasBlob = () => Boolean(process.env.BLOB_STORE_ID || process.env.BLOB_READ_WRITE_TOKEN);

export async function POST(req: Request) {
  const guard = await requireAdmin();
  if (guard) return guard;

  const form = await req.formData().catch(() => null);
  const file = form?.get("file");
  if (!file || !(file instanceof File)) {
    return Response.json({ error: "Fayl tapilmadi" }, { status: 400 });
  }
  const ext = ALLOWED[file.type];
  if (!ext) {
    return Response.json({ error: "Yalniz JPG, PNG, WebP, AVIF, GIF qebul olunur" }, { status: 400 });
  }
  if (file.size > MAX_BYTES) {
    return Response.json({ error: "Fayl 10 MB-dan boyuk ola bilmez" }, { status: 400 });
  }

  const name = `${randomUUID()}.${ext}`;
  const buf = Buffer.from(await file.arrayBuffer());

  if (hasBlob()) {
    try {
      const { put } = await import("@vercel/blob");
      const blob = await put(name, buf, {
        access: "public",
        contentType: file.type,
        ...(process.env.BLOB_READ_WRITE_TOKEN ? { token: process.env.BLOB_READ_WRITE_TOKEN } : {}),
      });
      return Response.json({ url: blob.url }, { status: 201 });
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Blob yuklemesi ugursuz oldu";
      return Response.json({ error: `Blob xetasi: ${msg}` }, { status: 500 });
    }
  }

  try {
    const dir = path.join(process.cwd(), "uploads");
    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(path.join(dir, name), buf);
    return Response.json({ url: `/uploads/${name}` }, { status: 201 });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "namelum xeta";
    return Response.json(
      { error: `Blob qoshulmayib ve lokal yazma mumkun olmadi: ${msg}` },
      { status: 500 },
    );
  }
}

export async function DELETE(req: Request) {
  const guard = await requireAdmin();
  if (guard) return guard;

  const { url } = await req.json().catch(() => ({ url: "" }));
  if (typeof url !== "string" || !url) {
    return Response.json({ error: "URL telab olunur" }, { status: 400 });
  }

  if (url.includes("blob.vercel-storage.com") && hasBlob()) {
    const { del } = await import("@vercel/blob");
    await del(
      url,
      process.env.BLOB_READ_WRITE_TOKEN ? { token: process.env.BLOB_READ_WRITE_TOKEN } : undefined,
    ).catch(() => null);
    return Response.json({ ok: true });
  }

  if (url.startsWith("/uploads/")) {
    const safe = path.basename(url);
    await fs.unlink(path.join(process.cwd(), "uploads", safe)).catch(() => null);
  }
  return Response.json({ ok: true });
}