"use client";

import { useState } from "react";
import {
  addDays,
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isBefore,
  isSameMonth,
  isToday,
  parseISO,
  startOfDay,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import { az } from "date-fns/locale";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn, toDateKey } from "@/lib/utils";

const WEEKDAYS = ["B", "Ç", "Ç", "C", "C", "Ş", "B"];

export function BookingCalendar({
  blocked,
  start,
  end,
  onSelect,
  onInvalidRange,
  months = 1,
}: {
  blocked: Set<string>;
  start: string | null;
  end: string | null;
  onSelect: (start: string | null, end: string | null) => void;
  onInvalidRange?: (newStart: string) => void;
  months?: 1 | 2;
}) {
  const today = startOfDay(new Date());
  const [offset, setOffset] = useState(0);
  const [hoverKey, setHoverKey] = useState<string | null>(null);

  const viewStart = startOfMonth(addMonths(today, offset));

  const handleDay = (key: string) => {
    if (!start || (start && end)) {
      onSelect(key, null);
      return;
    }
    if (key <= start) {
      onSelect(key, null);
      return;
    }
    // Aralıqda bloklanmış gün varmı?
    let d = parseISO(start);
    const endD = parseISO(key);
    let invalid = false;
    while (d < endD) {
      if (blocked.has(toDateKey(d))) {
        invalid = true;
        break;
      }
      d = addDays(d, 1);
    }
    if (invalid) {
      onInvalidRange?.(key);
      return;
    }
    onSelect(start, key);
  };

  const monthList = [viewStart];
  if (months === 2) monthList.push(addMonths(viewStart, 1));

  const previewEnd = start && !end && hoverKey && hoverKey > start ? hoverKey : null;

  return (
    <div>
      <div className={cn("grid gap-6", months === 2 && "sm:grid-cols-2")}>
        {monthList.map((m, mi) => {
          const days = eachDayOfInterval({
            start: startOfWeek(startOfMonth(m), { weekStartsOn: 1 }),
            end: endOfWeek(endOfMonth(m), { weekStartsOn: 1 }),
          });
          return (
            <div key={mi} className={cn(mi === 1 && "hidden sm:block")}>
              <div className="mb-3 flex items-center justify-between">
                <span className="font-display text-[15px] font-semibold capitalize text-ink">
                  {format(m, "LLLL yyyy", { locale: az })}
                </span>
                {((mi === 0 && months === 1) || (months === 2 && mi === 1)) && (
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
                      disabled={offset >= 11}
                      aria-label="Növbəti ay"
                      className={cn(
                        "grid size-8 place-items-center rounded-full border border-line text-ink-soft transition hover:bg-cream cursor-pointer",
                        offset >= 11 && "pointer-events-none opacity-30",
                      )}
                    >
                      <ChevronRight className="size-4" />
                    </button>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-7 gap-0.5">
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
                  const inMonth = isSameMonth(day, m);
                  const past = isBefore(day, today);
                  const isBlocked = blocked.has(key);
                  const disabled = !inMonth || past || isBlocked;
                  const isStart = key === start;
                  const isEnd = key === end;
                  const todayMark = isToday(day);
                  const inRange = !!start && !!end && key > start && key < end;
                  const preview =
                    !!previewEnd && key > (start as string) && key < previewEnd;
                  const isPreviewEnd = previewEnd === key;

                  return (
                    <div key={key} className={cn("relative", !inMonth && "invisible")}>
                      {(inRange || preview) && (
                        <div
                          className={cn(
                            "absolute inset-y-[3px] inset-x-0",
                            preview ? "bg-ember-soft/60" : "bg-ember-soft",
                          )}
                        />
                      )}
                      {isStart && (end || previewEnd) && (
                        <div className="absolute inset-y-[3px] left-1/2 right-0 bg-ember-soft" />
                      )}
                      {(isEnd || isPreviewEnd) && start && (
                        <div
                          className={cn(
                            "absolute inset-y-[3px] left-0 right-1/2",
                            isPreviewEnd && !end ? "bg-ember-soft/60" : "bg-ember-soft",
                          )}
                        />
                      )}
                      <button
                        type="button"
                        disabled={disabled}
                        onClick={() => handleDay(key)}
                        onMouseEnter={() => !disabled && setHoverKey(key)}
                        onMouseLeave={() => setHoverKey(null)}
                        aria-label={format(day, "d MMMM", { locale: az })}
                        className={cn(
                          "relative z-10 grid h-10 w-full place-items-center rounded-xl text-[13px] font-medium transition-all duration-150 cursor-pointer",
                          isStart || isEnd
                            ? "bg-ink text-paper shadow-soft scale-[1.02]"
                            : isBlocked
                              ? "cursor-not-allowed bg-rose-50 text-rose-400 line-through decoration-rose-300"
                              : past
                                ? "cursor-not-allowed text-ink-faint/50"
                                : "text-ink-soft hover:bg-cream hover:text-ink",
                          todayMark && !isStart && !isEnd && "ring-1 ring-ember/40",
                        )}
                      >
                        {format(day, "d")}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-line pt-3.5 text-[11px] text-ink-faint">
        <span className="flex items-center gap-1.5">
          <span className="size-2.5 rounded-full bg-ink" /> Seçilmiş
        </span>
        <span className="flex items-center gap-1.5">
          <span className="size-2.5 rounded-full bg-rose-200 ring-1 ring-rose-300" /> Dolu
        </span>
        <span className="flex items-center gap-1.5">
          <span className="size-2.5 rounded-full bg-cream ring-1 ring-line" /> Boş
        </span>
      </div>
    </div>
  );
}
