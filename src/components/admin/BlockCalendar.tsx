"use client";

import { useState } from "react";
import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isBefore,
  isSameMonth,
  isToday,
  startOfDay,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import { az } from "date-fns/locale";
import { Ban, CalendarCog, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { cn, toDateKey } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

const WEEKDAYS = ["B", "Ç", "Ç", "C", "C", "Ş", "B"];

export function BlockCalendar({
  houseId,
  initialKeys,
}: {
  houseId: string;
  initialKeys: string[];
}) {
  const today = startOfDay(new Date());
  const [blocked, setBlocked] = useState<Set<string>>(new Set(initialKeys));
  const [pending, setPending] = useState<Set<string>>(new Set());
  const [offset, setOffset] = useState(0);

  const viewMonth = startOfMonth(addMonths(today, offset));

  const toggle = async (key: string) => {
    if (pending.has(key)) return;
    const wasBlocked = blocked.has(key);
    const nextBlocked = new Set(blocked);
    if (wasBlocked) nextBlocked.delete(key);
    else nextBlocked.add(key);
    setBlocked(nextBlocked);
    setPending((p) => new Set(p).add(key));

    const res = await fetch(`/api/admin/houses/${houseId}/blocked`, {
      method: wasBlocked ? "DELETE" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ date: key }),
    });

    setPending((p) => {
      const n = new Set(p);
      n.delete(key);
      return n;
    });

    if (!res.ok) {
      setBlocked((prev) => {
        const n = new Set(prev);
        if (wasBlocked) n.add(key);
        else n.delete(key);
        return n;
      });
      toast.error("Əməliyyat uğursuz oldu", { description: "Yenidən cəhd edin." });
    } else {
      toast.success(wasBlocked ? "Gün açıldı" : "Gün bloklandı", {
        description: format(new Date(key + "T00:00:00"), "d MMMM yyyy", { locale: az }),
      });
    }
  };

  const days = eachDayOfInterval({
    start: startOfWeek(startOfMonth(viewMonth), { weekStartsOn: 1 }),
    end: endOfWeek(endOfMonth(viewMonth), { weekStartsOn: 1 }),
  });

  return (
    <div className="rounded-3xl border border-line bg-white/80 p-6 shadow-soft">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="flex items-center gap-2 font-display text-base font-semibold text-ink">
            <CalendarCog className="size-4.5 text-ember" />
            Təqvim İdarəetməsi
          </h2>
          <p className="mt-1 text-xs leading-relaxed text-ink-faint">
            Günlərə klikləyərək bloklayın/açın. Bloklu günlər müştəriyə «dolu» görünür.
          </p>
        </div>
        <Badge variant={blocked.size > 0 ? "ember" : "sand"} className="shrink-0">
          <Ban className="size-3" />
          {blocked.size} gün
        </Badge>
      </div>

      <div className="mt-5">
        <div className="mb-3 flex items-center justify-between">
          <span className="font-display text-[15px] font-semibold capitalize text-ink">
            {format(viewMonth, "LLLL yyyy", { locale: az })}
          </span>
          <div className="flex gap-1">
            <button
              onClick={() => setOffset((o) => Math.max(0, o - 1))}
              disabled={offset === 0}
              aria-label="Əvvəlki ay"
              className={cn(
                "grid size-8 place-items-center rounded-full border border-line text-ink-soft transition hover:bg-cream cursor-pointer",
                offset === 0 && "pointer-events-none opacity-30",
              )}
            >
              <ChevronLeft className="size-4" />
            </button>
            <button
              onClick={() => setOffset((o) => Math.min(11, o + 1))}
              aria-label="Növbəti ay"
              className="grid size-8 place-items-center rounded-full border border-line text-ink-soft transition hover:bg-cream cursor-pointer"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-1">
          {WEEKDAYS.map((w, i) => (
            <div
              key={i}
              className="pb-1.5 text-center text-[11px] font-semibold uppercase tracking-wide text-ink-faint"
            >
              {w}
            </div>
          ))}
          {days.map((day) => {
            const key = toDateKey(day);
            const inMonth = isSameMonth(day, viewMonth);
            const past = isBefore(day, today);
            const isBlocked = blocked.has(key);
            const isPending = pending.has(key);

            if (!inMonth) return <div key={key} className="invisible" />;

            return (
              <button
                key={key}
                type="button"
                disabled={past || isPending}
                onClick={() => toggle(key)}
                aria-label={format(day, "d MMMM", { locale: az })}
                className={cn(
                  "relative grid h-10 w-full place-items-center rounded-xl text-[13px] font-medium transition-all duration-200 cursor-pointer",
                  isBlocked
                    ? "bg-rose-500 font-semibold text-white shadow-soft hover:bg-rose-400"
                    : past
                      ? "cursor-not-allowed text-ink-faint/40"
                      : "border border-line bg-white/60 text-ink-soft hover:border-rose-300 hover:bg-rose-50 hover:text-rose-500",
                  isToday(day) && !isBlocked && "ring-1 ring-ember/40",
                )}
              >
                {isPending ? <Loader2 className="size-3.5 animate-spin" /> : format(day, "d")}
              </button>
            );
          })}
        </div>

        <div className="mt-4 flex gap-5 border-t border-line pt-3.5 text-[11px] text-ink-faint">
          <span className="flex items-center gap-1.5">
            <span className="size-2.5 rounded-full bg-rose-500" /> Bloklu
          </span>
          <span className="flex items-center gap-1.5">
            <span className="size-2.5 rounded-full border border-line bg-white" /> Boş
          </span>
        </div>
      </div>
    </div>
  );
}
