"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, LayoutGrid, X } from "lucide-react";
import { cn } from "@/lib/utils";

function cellClass(index: number, count: number): string {
  const base = "group/cell relative overflow-hidden rounded-2xl bg-cream cursor-zoom-in";
  if (count === 1) return cn(base, "col-span-2 md:col-span-4 md:row-span-2 aspect-[16/9] md:aspect-auto");
  if (index === 0)
    return cn(base, "col-span-2 md:col-span-2 md:row-span-2 aspect-[16/10] md:aspect-auto");
  if (count === 2)
    return cn(base, "col-span-2 md:col-span-2 md:row-span-2 aspect-[16/10] md:aspect-auto");
  if (count === 3) return cn(base, "col-span-2 md:col-span-2 aspect-[16/9] md:aspect-auto");
  if (count === 4 && index === 1)
    return cn(base, "col-span-2 md:col-span-2 aspect-[16/9] md:aspect-auto");
  return cn(base, "aspect-square md:aspect-auto");
}

export function ImageGallery({ images, title }: { images: string[]; title: string }) {
  const [active, setActive] = useState<number | null>(null);
  const cells = images.slice(0, 5);
  const extra = images.length - cells.length;

  const close = useCallback(() => setActive(null), []);
  const step = useCallback(
    (d: number) =>
      setActive((a) => (a === null ? a : (((a + d) % images.length) + images.length) % images.length)),
    [images.length],
  );

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active, close, step]);

  return (
    <>
      <div className="grid grid-cols-2 gap-2.5 md:grid-cols-4 md:h-[460px] md:grid-rows-2">
        {cells.map((src, i) => (
          <button
            key={src + i}
            onClick={() => setActive(i)}
            className={cellClass(i, cells.length)}
            aria-label={`${title} — şəkil ${i + 1}`}
          >
            <img
              src={src}
              alt={`${title} — ${i + 1}`}
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover/cell:scale-[1.05]"
              loading={i === 0 ? "eager" : "lazy"}
            />
            {i === cells.length - 1 && extra > 0 && (
              <span className="absolute inset-0 grid place-items-center bg-ink/55 text-sm font-semibold text-white backdrop-blur-[2px]">
                +{extra} şəkil
              </span>
            )}
          </button>
        ))}
        {images.length > 1 && (
          <button
            onClick={() => setActive(0)}
            className="absolute bottom-4 right-4 hidden items-center gap-2 rounded-full glass px-4 py-2 text-[13px] font-semibold text-ink shadow-glass transition hover:bg-white md:flex cursor-pointer"
            style={{ position: "absolute" }}
          >
            <LayoutGrid className="size-4" />
            Bütün şəkillər
          </button>
        )}
      </div>

      <AnimatePresence>
        {active !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] flex flex-col bg-ink/95 backdrop-blur-sm"
            onClick={close}
          >
            <div className="flex items-center justify-between px-5 py-4 text-paper">
              <span className="text-sm font-medium text-paper/70">
                {active + 1} / {images.length}
              </span>
              <button
                onClick={close}
                aria-label="Bağla"
                className="grid size-10 place-items-center rounded-full border border-white/20 text-paper transition hover:bg-white/10 cursor-pointer"
              >
                <X className="size-5" />
              </button>
            </div>

            <div
              className="relative flex flex-1 items-center justify-center overflow-hidden px-3 pb-6"
              onClick={(e) => e.stopPropagation()}
            >
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.img
                  key={active}
                  src={images[active]}
                  alt={`${title} — ${active + 1}`}
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="max-h-full max-w-full rounded-2xl object-contain shadow-lift"
                />
              </AnimatePresence>

              {images.length > 1 && (
                <>
                  <button
                    onClick={() => step(-1)}
                    aria-label="Əvvəlki"
                    className="absolute left-4 top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full glass text-ink transition hover:scale-105 cursor-pointer"
                  >
                    <ChevronLeft className="size-5" />
                  </button>
                  <button
                    onClick={() => step(1)}
                    aria-label="Növbəti"
                    className="absolute right-4 top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full glass text-ink transition hover:scale-105 cursor-pointer"
                  >
                    <ChevronRight className="size-5" />
                  </button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
