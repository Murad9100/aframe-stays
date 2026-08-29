"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, MapPin, Users } from "lucide-react";
import type { House } from "@/types";
import { useTourist } from "@/context/TouristContext";
import { Badge } from "@/components/ui/badge";

const imgVariants = {
  enter: (d: number) => ({ x: d * 70, opacity: 0, scale: 1.04 }),
  center: { x: 0, opacity: 1, scale: 1 },
  exit: (d: number) => ({ x: d * -70, opacity: 0, scale: 1.02 }),
};

export function HouseCard({ house }: { house: House }) {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const images = house.images;
  const { formatPrice } = useTourist();

  const go = (next: number) => {
    if (images.length < 2) return;
    setDir(next > index ? 1 : -1);
    setIndex(((next % images.length) + images.length) % images.length);
  };

  return (
    <Link href={`/house/${house.id}`} className="group block focus:outline-none">
      <motion.div whileHover={{ y: -6 }} transition={{ type: "spring", stiffness: 300, damping: 24 }}>
        <div className="relative aspect-[4/3] overflow-hidden rounded-[22px] bg-cream shadow-soft transition-shadow duration-500 group-hover:shadow-lift">
          <AnimatePresence initial={false} custom={dir} mode="popLayout">
            <motion.img
              key={index}
              src={images[index]}
              alt={house.title}
              custom={dir}
              variants={imgVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.38, ease: [0.32, 0.72, 0, 1] }}
              draggable={false}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
            />
          </AnimatePresence>

          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-ink/40 to-transparent" />

          <div className="absolute left-3 top-3">
            <Badge variant="glass" className="text-[11px]">
              <MapPin className="size-3" />
              {house.region}
            </Badge>
          </div>

          {images.length > 1 && (
            <>
              <button
                aria-label="Əvvəlki şəkil"
                onClick={(e) => {
                  e.preventDefault();
                  go(index - 1);
                }}
                className="absolute left-2.5 top-1/2 -translate-y-1/2 grid size-8 place-items-center rounded-full glass text-ink opacity-0 transition-all duration-300 hover:bg-white group-hover:opacity-100 cursor-pointer"
              >
                <ChevronLeft className="size-4" />
              </button>
              <button
                aria-label="Növbəti şəkil"
                onClick={(e) => {
                  e.preventDefault();
                  go(index + 1);
                }}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 grid size-8 place-items-center rounded-full glass text-ink opacity-0 transition-all duration-300 hover:bg-white group-hover:opacity-100 cursor-pointer"
              >
                <ChevronRight className="size-4" />
              </button>
              <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
                {images.map((_, i) => (
                  <button
                    key={i}
                    aria-label={`Şəkil ${i + 1}`}
                    onClick={(e) => {
                      e.preventDefault();
                      go(i);
                    }}
                    className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                      i === index ? "w-5 bg-white" : "w-1.5 bg-white/50 hover:bg-white/80"
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        <div className="px-1.5 pt-4">
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-display text-[17px] font-semibold leading-snug text-ink transition-colors group-hover:text-ember">
              {house.title}
            </h3>
            <p className="shrink-0 text-right">
              <span className="font-display text-[17px] font-bold text-ink">
                {formatPrice(house.dailyPrice)}
              </span>
              <span className="text-xs text-ink-faint"> /gecə</span>
            </p>
          </div>
          <div className="mt-1.5 flex items-center gap-4 text-[13px] text-ink-faint">
            <span className="flex items-center gap-1.5">
              <Users className="size-3.5" />
              {house.guests} qonaq
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="size-3.5" />
              {house.region}
            </span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
