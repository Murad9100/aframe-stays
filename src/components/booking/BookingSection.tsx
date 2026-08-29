"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CalendarDays, Eraser, LogIn, LogOut, ShieldCheck, X } from "lucide-react";
import { toast } from "sonner";
import type { House } from "@/types";
import {
  buildWhatsAppUrl,
  formatShortAz,
  nightsBetween,
} from "@/lib/utils";
import { useTourist } from "@/context/TouristContext";
import { BookingCalendar } from "@/components/booking/BookingCalendar";
import { WhatsAppButton } from "@/components/booking/WhatsAppButton";
import { Button } from "@/components/ui/button";

export function BookingSection({ house, blockedKeys }: { house: House; blockedKeys: string[] }) {
  const { formatPrice } = useTourist();
  const [start, setStart] = useState<string | null>(null);
  const [end, setEnd] = useState<string | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);

  const blocked = useMemo(() => new Set(blockedKeys), [blockedKeys]);
  const nights = start && end ? nightsBetween(start, end) : 0;
  const total = nights * house.dailyPrice;

  const getUrl = () =>
    buildWhatsAppUrl({
      houseTitle: house.title,
      startKey: start!,
      endKey: end!,
      nights,
      total,
      url: `${window.location.origin}/house/${house.id}`,
    });

  const handleInvalid = (key: string) => {
    toast.error("Bu aralıqda dolu günlər var", {
      description: "Zəhmət olmasa fərqli tarixlər seçin.",
    });
    setStart(key);
    setEnd(null);
  };

  const clear = () => {
    setStart(null);
    setEnd(null);
  };

  const DateBoxes = (
    <div className="grid grid-cols-2 gap-2">
      <div className="rounded-2xl border border-line bg-white/70 px-4 py-3">
        <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-ink-faint">
          <LogIn className="size-3" /> Giriş
        </div>
        <div className="mt-1 text-sm font-semibold text-ink">
          {start ? formatShortAz(start) : "Seçin"}
        </div>
      </div>
      <div className="rounded-2xl border border-line bg-white/70 px-4 py-3">
        <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-ink-faint">
          <LogOut className="size-3" /> Çıxış
        </div>
        <div className="mt-1 text-sm font-semibold text-ink">
          {end ? formatShortAz(end) : "Seçin"}
        </div>
      </div>
    </div>
  );

  const Breakdown = (
    <AnimatePresence initial={false}>
      {nights > 0 && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="overflow-hidden"
        >
          <div className="space-y-2 border-t border-line pt-4 text-sm">
            <div className="flex justify-between text-ink-soft">
              <span>
                {formatPrice(house.dailyPrice)} × {nights} gecə
              </span>
              <motion.span
                key={total}
                initial={{ scale: 1.12, color: "#e0512d" }}
                animate={{ scale: 1, color: "#584e41" }}
                transition={{ duration: 0.35 }}
                className="font-semibold"
              >
                {formatPrice(total)}
              </motion.span>
            </div>
            <div className="flex justify-between text-ink-soft">
              <span>Xidmət haqqı</span>
              <span className="font-medium text-emerald-600">Pulsuz</span>
            </div>
            <div className="flex items-center justify-between border-t border-line pt-3">
              <span className="font-display font-semibold text-ink">Yekun məbləğ</span>
              <motion.span
                key={`t-${total}`}
                initial={{ scale: 1.12 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 380, damping: 16 }}
                className="font-display text-lg font-bold text-ember"
              >
                {formatPrice(total)}
              </motion.span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  const ClearButton = (start || end) && (
    <button
      onClick={clear}
      className="mt-2 flex items-center gap-1.5 text-xs font-medium text-ink-faint transition hover:text-ember cursor-pointer"
    >
      <Eraser className="size-3.5" /> Seçimi təmizlə
    </button>
  );

  return (
    <>
      {/* ---------- Desktop sticky widget ---------- */}
      <aside className="sticky top-24 hidden lg:block">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="rounded-3xl border border-line bg-white/80 p-6 shadow-soft"
        >
          <div className="flex items-end justify-between">
            <div>
              <span className="font-display text-2xl font-bold text-ink">
                {formatPrice(house.dailyPrice)}
              </span>
              <span className="text-sm text-ink-faint"> / gecə</span>
            </div>
            {ClearButton}
          </div>

          <div className="mt-5 space-y-4">
            {DateBoxes}
            <BookingCalendar
              blocked={blocked}
              start={start}
              end={end}
              onSelect={(s, e) => {
                setStart(s);
                setEnd(e);
              }}
              onInvalidRange={handleInvalid}
              months={1}
            />
            {Breakdown}
            <WhatsAppButton getUrl={getUrl} ready={nights > 0} />
            <p className="flex items-center justify-center gap-1.5 text-center text-xs text-ink-faint">
              <ShieldCheck className="size-3.5 text-emerald-600" />
              Ödəniş evə çatdıqda · 48 saat öncə pulsuz ləğv
            </p>
          </div>
        </motion.div>
      </aside>

      {/* ---------- Mobile: inline nudge + sticky glass bar ---------- */}
      <div className="lg:hidden">
        <div className="rounded-3xl border border-line bg-white/80 p-5 shadow-soft">
          <div className="flex items-center justify-between">
            <div>
              <span className="font-display text-xl font-bold text-ink">
                {formatPrice(house.dailyPrice)}
              </span>
              <span className="text-sm text-ink-faint"> / gecə</span>
            </div>
            <Button variant="ember" size="sm" onClick={() => setSheetOpen(true)}>
              <CalendarDays className="size-4" />
              Tarix Seç
            </Button>
          </div>
        </div>

        {/* Sticky bottom bar */}
        <motion.div
          initial={{ y: 90, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="fixed inset-x-3 bottom-3 z-[60]"
        >
          <div className="glass flex items-center justify-between gap-3 rounded-2xl px-4 py-3 shadow-lift">
            <div className="min-w-0">
              {nights > 0 ? (
                <>
                  <div className="font-display text-lg font-bold leading-tight text-ink">
                    {formatPrice(total)}
                  </div>
                  <div className="truncate text-[11px] text-ink-faint">
                    {nights} gecə · {formatShortAz(start!)} — {formatShortAz(end!)}
                  </div>
                </>
              ) : (
                <>
                  <div className="font-display text-lg font-bold leading-tight text-ink">
                    {formatPrice(house.dailyPrice)}
                    <span className="text-xs font-medium text-ink-faint"> /gecə</span>
                  </div>
                  <div className="text-[11px] text-ink-faint">Boş tarixləri yoxlayın</div>
                </>
              )}
            </div>
            <Button
              variant="ember"
              className="shrink-0"
              onClick={() => setSheetOpen(true)}
            >
              <CalendarDays className="size-4" />
              {nights > 0 ? "Sifarişi Tamamla" : "Tarix Seç"}
            </Button>
          </div>
        </motion.div>

        {/* Bottom sheet */}
        <AnimatePresence>
          {sheetOpen && (
            <div className="fixed inset-0 z-[95]">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSheetOpen(false)}
                className="absolute inset-0 bg-ink/55 backdrop-blur-sm"
              />
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", stiffness: 300, damping: 32 }}
                className="absolute inset-x-0 bottom-0 max-h-[92dvh] overflow-y-auto rounded-t-[28px] bg-paper px-5 pb-8 pt-3 shadow-lift"
              >
                <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-sand" />
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="font-display text-lg font-semibold text-ink">
                    Tarixləri seçin
                  </h3>
                  <div className="flex items-center gap-2">
                    {ClearButton}
                    <button
                      onClick={() => setSheetOpen(false)}
                      aria-label="Bağla"
                      className="grid size-9 place-items-center rounded-full bg-cream text-ink-soft transition hover:bg-sand cursor-pointer"
                    >
                      <X className="size-4" />
                    </button>
                  </div>
                </div>

                {DateBoxes}
                <div className="mt-4">
                  <BookingCalendar
                    blocked={blocked}
                    start={start}
                    end={end}
                    onSelect={(s, e) => {
                      setStart(s);
                      setEnd(e);
                    }}
                    onInvalidRange={handleInvalid}
                    months={1}
                  />
                </div>
                <div className="mt-4">{Breakdown}</div>
                <div className="mt-4">
                  <WhatsAppButton getUrl={getUrl} ready={nights > 0} />
                </div>
                <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-xs text-ink-faint">
                  <ShieldCheck className="size-3.5 text-emerald-600" />
                  Ödəniş evə çatdıqda · 48 saat öncə pulsuz ləğv
                </p>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
