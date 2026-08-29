"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowDown,
  ArrowLeft,
  ArrowUp,
  ImagePlus,
  Link2,
  Loader2,
  Plus,
  Save,
  UploadCloud,
  X,
} from "lucide-react";
import { toast } from "sonner";
import type { House } from "@/types";
import { FEATURE_PRESETS } from "@/lib/features";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const REGIONS = ["Qusar", "Qebele", "Quba", "Seki", "Ismayilli", "Zaqatala", "Qax", "Lenkeran"];

export function HouseForm({ initial }: { initial?: House }) {
  const router = useRouter();
  const [langTab, setLangTab] = useState<"az" | "en" | "ru">("az");

  const [title, setTitle] = useState(initial?.title ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [titleEn, setTitleEn] = useState(initial?.titleEn ?? "");
  const [descriptionEn, setDescriptionEn] = useState(initial?.descriptionEn ?? "");
  const [titleRu, setTitleRu] = useState(initial?.titleRu ?? "");
  const [descriptionRu, setDescriptionRu] = useState(initial?.descriptionRu ?? "");

  const [region, setRegion] = useState(initial?.region ?? "");
  const [dailyPrice, setDailyPrice] = useState(initial ? String(initial.dailyPrice) : "");
  const [guests, setGuests] = useState(initial ? String(initial.guests) : "4");
  const [lat, setLat] = useState(initial ? String(initial.location.lat) : "");
  const [lng, setLng] = useState(initial ? String(initial.location.lng) : "");
  const [features, setFeatures] = useState<string[]>(initial?.features ?? []);
  const [customFeature, setCustomFeature] = useState("");
  const [images, setImages] = useState<string[]>(initial?.images?.length ? initial.images : []);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState<Record<string, boolean>>({});
  const [dragOver, setDragOver] = useState(false);
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [linkValue, setLinkValue] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const toggleFeature = (label: string) =>
    setFeatures((f) => (f.includes(label) ? f.filter((x) => x !== label) : [...f, label]));

  const addCustomFeature = () => {
    const v = customFeature.trim();
    if (v && !features.includes(v)) setFeatures((f) => [...f, v]);
    setCustomFeature("");
  };

  const moveImage = (i: number, dir: -1 | 1) =>
    setImages((imgs) => {
      const next = [...imgs];
      const j = i + dir;
      if (j < 0 || j >= next.length) return next;
      [next[i], next[j]] = [next[j], next[i]];
      return next;
    });

  const uploadFiles = async (files: FileList | File[]) => {
    const list = Array.from(files).filter((f) => f.type.startsWith("image/"));
    if (list.length === 0) return;
    for (const file of list) {
      const key = `${file.name}-${file.size}-${Date.now()}`;
      setUploading((u) => ({ ...u, [key]: true }));
      try {
        const fd = new FormData();
        fd.append("file", file);
        const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
        let data: any = null;
        try {
          data = await res.json();
        } catch {
          data = null;
        }
        if (!res.ok || !data?.url) {
          const reason = data?.error ?? `HTTP ${res.status} ${res.statusText}`;
          toast.error(`"${file.name}" yuklenmedi: ${reason}`);
        } else {
          setImages((imgs) => [...imgs, data.url]);
        }
      } catch (e: any) {
        toast.error(`"${file.name}" yuklenmedi: ${e?.message ?? "sebeke xetasi"}`);
      } finally {
        setUploading((u) => {
          const next = { ...u };
          delete next[key];
          return next;
        });
      }
    }
  };

  const removeImage = async (i: number) => {
    const url = images[i];
    setImages((imgs) => imgs.filter((_, j) => j !== i));
    if (url && (url.startsWith("/uploads/") || url.includes("blob.vercel-storage.com"))) {
      try {
        await fetch("/api/admin/upload", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url }),
        });
        toast.success("Sekil yaddasdan da silindi");
      } catch {
      }
    }
  };

  const validate = (): string | null => {
    if (!title.trim()) return "Ev adi bos ola bilmez";
    if (!region.trim()) return "Region secin";
    const price = Number(dailyPrice);
    if (!Number.isFinite(price) || price <= 0) return "Duzgun gunluk qiymet daxil edin";
    const g = Number(guests);
    if (!Number.isInteger(g) || g < 1) return "Qonaq sayi duzgun deyil";
    const la = Number(lat);
    const ln = Number(lng);
    if (!Number.isFinite(la) || !Number.isFinite(ln)) return "Koordinatlari reqemle daxil edin";
    if (images.filter((u) => u.trim()).length === 0) return "En azi 1 sekil elave edin";
    return null;
  };

  const submit = async () => {
    const err = validate();
    if (err) {
      toast.error(err);
      return;
    }
    setSaving(true);
    const payload = {
      title: title.trim(),
      titleEn: titleEn.trim() || null,
      titleRu: titleRu.trim() || null,
      description: description.trim(),
      descriptionEn: descriptionEn.trim() || null,
      descriptionRu: descriptionRu.trim() || null,
      region: region.trim(),
      dailyPrice: Math.round(Number(dailyPrice)),
      guests: Number(guests),
      features,
      images: images.map((u) => u.trim()).filter(Boolean),
      lat: Number(lat),
      lng: Number(lng),
    };
    const res = await fetch(initial ? `/api/admin/houses/${initial.id}` : "/api/admin/houses", {
      method: initial ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    setSaving(false);
    if (res.ok) {
      toast.success(initial ? "Deyisikliklər yadda saxlanildi" : "Yeni ev elave olundu");
      router.push("/admin");
      router.refresh();
    } else {
      const data = await res.json().catch(() => null);
      toast.error(data?.error ?? "Xeta bas verdi");
    }
  };

  return (
    <div className="space-y-8">
      <section className="rounded-3xl border border-line bg-white/80 p-6 shadow-soft">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="font-display text-base font-semibold text-ink">Esas Melumatlar</h2>
          <div className="flex gap-1 rounded-full border border-line bg-cream/50 p-1">
            {(["az", "en", "ru"] as const).map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => setLangTab(l)}
                className={cn(
                  "rounded-full px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wide transition cursor-pointer",
                  langTab === l ? "bg-ember text-white" : "text-ink-faint hover:text-ink",
                )}
              >
                {l}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          {langTab === "az" && (
            <>
              <div className="sm:col-span-2">
                <Label htmlFor="title">Ev Adi (AZ) *</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="mes. Sahdag Panorama Lodge"
                />
              </div>
              <div className="sm:col-span-2">
                <Label htmlFor="desc">Tesvir (AZ) *</Label>
                <Textarea
                  id="desc"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Evin atmosferi, etrafi ve ustunlukleri haqqinda qisa, semimi tesvir..."
                />
              </div>
            </>
          )}

          {langTab === "en" && (
            <>
              <div className="sm:col-span-2">
                <Label htmlFor="titleEn">House Name (EN) — optional, falls back to AZ if empty</Label>
                <Input
                  id="titleEn"
                  value={titleEn}
                  onChange={(e) => setTitleEn(e.target.value)}
                  placeholder="e.g. Shahdag Panorama Lodge"
                />
              </div>
              <div className="sm:col-span-2">
                <Label htmlFor="descEn">Description (EN) — optional, falls back to AZ if empty</Label>
                <Textarea
                  id="descEn"
                  value={descriptionEn}
                  onChange={(e) => setDescriptionEn(e.target.value)}
                  placeholder="English translation of the description..."
                />
              </div>
            </>
          )}

          {langTab === "ru" && (
            <>
              <div className="sm:col-span-2">
                <Label htmlFor="titleRu">Название (RU) — необязательно, иначе показывается AZ</Label>
                <Input
                  id="titleRu"
                  value={titleRu}
                  onChange={(e) => setTitleRu(e.target.value)}
                  placeholder="напр. Шахдаг Панорама Лодж"
                />
              </div>
              <div className="sm:col-span-2">
                <Label htmlFor="descRu">Описание (RU) — необязательно, иначе показывается AZ</Label>
                <Textarea
                  id="descRu"
                  value={descriptionRu}
                  onChange={(e) => setDescriptionRu(e.target.value)}
                  placeholder="Русский перевод описания..."
                />
              </div>
            </>
          )}

          <div>
            <Label htmlFor="region">Region</Label>
            <Input
              id="region"
              list="region-list"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              placeholder="mes. Qusar"
            />
            <datalist id="region-list">
              {REGIONS.map((r) => (
                <option key={r} value={r} />
              ))}
            </datalist>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="price">Gunluk Qiymet (AZN)</Label>
              <Input
                id="price"
                type="number"
                min={1}
                value={dailyPrice}
                onChange={(e) => setDailyPrice(e.target.value)}
                placeholder="200"
              />
            </div>
            <div>
              <Label htmlFor="guests">Qonaq Sayi</Label>
              <Input
                id="guests"
                type="number"
                min={1}
                max={20}
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-line bg-white/80 p-6 shadow-soft">
        <h2 className="font-display text-base font-semibold text-ink">Lokasiya (Lat / Lng)</h2>
        <p className="mt-1 text-xs text-ink-faint">
          Google Maps-de eve sag klikleyin - koordinatlar avtomatik kopyalanir.
        </p>
        <div className="mt-4 grid gap-5 sm:grid-cols-2">
          <div>
            <Label htmlFor="lat">Enlik (Latitude)</Label>
            <Input
              id="lat"
              inputMode="decimal"
              value={lat}
              onChange={(e) => setLat(e.target.value)}
              placeholder="41.4275"
            />
          </div>
          <div>
            <Label htmlFor="lng">Uzunluq (Longitude)</Label>
            <Input
              id="lng"
              inputMode="decimal"
              value={lng}
              onChange={(e) => setLng(e.target.value)}
              placeholder="48.4302"
            />
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-line bg-white/80 p-6 shadow-soft">
        <h2 className="font-display text-base font-semibold text-ink">Xususiyyetler</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {FEATURE_PRESETS.map(({ label, icon: Icon }) => {
            const active = features.includes(label);
            return (
              <button
                key={label}
                type="button"
                onClick={() => toggleFeature(label)}
                className={cn(
                  "flex items-center gap-2 rounded-full border px-4 py-2 text-[13px] font-medium transition-all duration-200 cursor-pointer",
                  active
                    ? "border-ember bg-ember text-white shadow-soft"
                    : "border-line bg-white/60 text-ink-soft hover:border-ink-faint hover:text-ink",
                )}
              >
                <Icon className="size-3.5" />
                {label}
              </button>
            );
          })}
        </div>

        <AnimatePresence initial={false}>
          {features.filter((f) => !FEATURE_PRESETS.some((p) => p.label === f)).length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-3 flex flex-wrap gap-2 overflow-hidden"
            >
              {features
                .filter((f) => !FEATURE_PRESETS.some((p) => p.label === f))
                .map((f) => (
                  <span
                    key={f}
                    className="flex items-center gap-2 rounded-full bg-forest px-4 py-2 text-[13px] font-medium text-paper"
                  >
                    {f}
                    <button
                      onClick={() => toggleFeature(f)}
                      aria-label={`${f} sil`}
                      className="cursor-pointer opacity-70 transition hover:opacity-100"
                    >
                      <X className="size-3.5" />
                    </button>
                  </span>
                ))}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-4 flex gap-2">
          <Input
            value={customFeature}
            onChange={(e) => setCustomFeature(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addCustomFeature())}
            placeholder="Ferdi xususiyyet elave et (mes. Usaq meydancasi)"
          />
          <Button type="button" variant="secondary" onClick={addCustomFeature} className="shrink-0">
            <Plus className="size-4" />
            Elave et
          </Button>
        </div>
      </section>

      <section className="rounded-3xl border border-line bg-white/80 p-6 shadow-soft">
        <div className="flex items-center justify-between gap-2">
          <h2 className="font-display text-base font-semibold text-ink">Sekiller</h2>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setShowLinkInput((s) => !s)}
          >
            <Link2 className="size-4" />
            Link elave et
          </Button>
        </div>
        <p className="mt-1 text-xs text-ink-faint">
          Ilk sekil qalereyada esas (boyuk) gorunur. Oxlarla sirani deyise bilersiniz.
        </p>

        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragOver(false);
            if (e.dataTransfer.files?.length) uploadFiles(e.dataTransfer.files);
          }}
          onClick={() => fileInputRef.current?.click()}
          className={cn(
            "mt-4 flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed px-6 py-8 text-center transition-colors",
            dragOver ? "border-ember bg-ember/5" : "border-line bg-cream/40 hover:border-ink-faint",
          )}
        >
          <UploadCloud className="size-7 text-ink-faint" />
          <p className="text-sm font-medium text-ink">
            Sekilleri buraya suruşdurun, ya da klikleyib secin
          </p>
          <p className="text-xs text-ink-faint">JPG, PNG, WebP, AVIF, GIF - maks 10 MB</p>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => {
              if (e.target.files?.length) uploadFiles(e.target.files);
              e.target.value = "";
            }}
          />
        </div>

        <AnimatePresence initial={false}>
          {showLinkInput && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-3 flex gap-2 overflow-hidden"
            >
              <Input
                value={linkValue}
                onChange={(e) => setLinkValue(e.target.value)}
                placeholder="https://..."
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    if (linkValue.trim()) setImages((i) => [...i, linkValue.trim()]);
                    setLinkValue("");
                  }
                }}
              />
              <Button
                type="button"
                variant="secondary"
                className="shrink-0"
                onClick={() => {
                  if (linkValue.trim()) setImages((i) => [...i, linkValue.trim()]);
                  setLinkValue("");
                }}
              >
                <ImagePlus className="size-4" />
                Elave et
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-4 space-y-2.5">
          <AnimatePresence initial={false}>
            {Object.keys(uploading).map((key) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2.5 rounded-xl bg-cream/60 px-3 py-2.5"
              >
                <Loader2 className="size-4 shrink-0 animate-spin text-ember" />
                <span className="text-sm text-ink-faint">Yuklenir...</span>
              </motion.div>
            ))}
          </AnimatePresence>
          <AnimatePresence initial={false}>
            {images.map((url, i) => (
              <motion.div
                key={url + i}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="flex items-center gap-2.5"
              >
                <span className="w-6 text-center text-xs font-semibold text-ink-faint">
                  {i + 1}
                </span>
                <div className="size-11 shrink-0 overflow-hidden rounded-xl bg-cream">
                  {url.trim() && (
                    <img src={url} alt="" className="h-full w-full object-cover" loading="lazy" />
                  )}
                </div>
                <span className="flex-1 truncate text-sm text-ink-soft">{url}</span>
                <div className="flex shrink-0 items-center gap-0.5">
                  <button
                    type="button"
                    onClick={() => moveImage(i, -1)}
                    disabled={i === 0}
                    aria-label="Yuxari"
                    className="grid size-8 place-items-center rounded-full text-ink-faint transition hover:bg-cream hover:text-ink disabled:opacity-30 cursor-pointer"
                  >
                    <ArrowUp className="size-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => moveImage(i, 1)}
                    disabled={i === images.length - 1}
                    aria-label="Asagi"
                    className="grid size-8 place-items-center rounded-full text-ink-faint transition hover:bg-cream hover:text-ink disabled:opacity-30 cursor-pointer"
                  >
                    <ArrowDown className="size-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => removeImage(i)}
                    aria-label="Sil"
                    className="grid size-8 place-items-center rounded-full text-rose-400 transition hover:bg-rose-50 hover:text-rose-600 cursor-pointer"
                  >
                    <X className="size-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      <div className="sticky bottom-4 z-20 flex items-center justify-between gap-3 rounded-2xl glass px-4 py-3 shadow-lift">
        <Button variant="ghost" onClick={() => router.back()} disabled={saving}>
          <ArrowLeft className="size-4" />
          Geri
        </Button>
        <Button variant="ember" onClick={submit} disabled={saving} className="min-w-44">
          {saving ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
          {saving ? "Yadda saxlanir..." : initial ? "Deyisiklikleri Saxla" : "Evi Elave Et"}
        </Button>
      </div>
    </div>
  );
}