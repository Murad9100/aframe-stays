"use client";

import { motion } from "framer-motion";
import { ArrowDown, MapPin, MessageCircle } from "lucide-react";
import { WHATSAPP_NUMBER } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const HERO_VIDEO =
  "https://videos.pexels.com/video-files/35428333/15022573_3840_2160_60fps.mp4";
const HERO_POSTER =
  "https://images.pexels.com/videos/35428333/pexels-photo-35428333.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=630&w=1200";

export function Hero({ houseCount }: { houseCount: number }) {
  return (
    <section className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden">
      <motion.div
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0"
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          poster={HERO_POSTER}
          className="h-full w-full object-cover"
        >
          <source src={HERO_VIDEO} type="video/mp4" />
        </video>
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-b from-ink/55 via-ink/15 to-paper" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/35 via-transparent to-transparent" />

      <div className="relative mx-auto w-full max-w-7xl px-5 pb-20 pt-40 sm:px-6">
        <motion.div
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.14, delayChildren: 0.25 } } }}
        >
          <motion.div
            variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
          >
            <span className="inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-ink">
              <MapPin className="size-3.5 text-ember" />
              Azərbaycanın Dağlarında
            </span>
          </motion.div>

          <motion.h1
            variants={{ hidden: { opacity: 0, y: 34 }, show: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.85, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="mt-6 max-w-3xl font-display text-[42px] font-bold leading-[1.05] tracking-tight text-white drop-shadow-lg sm:text-6xl md:text-7xl"
          >
            Şəhərin səs-küyündən,
            <br />
            <span className="text-paper/90">təbiətin </span>
            <span className="relative inline-block text-ember-soft">
              səssizliyinə
              <svg
                viewBox="0 0 240 14"
                className="absolute -bottom-1 left-0 w-full text-ember"
                fill="none"
                preserveAspectRatio="none"
              >
                <path
                  d="M3 10.5C60 4 140 3 237 8.5"
                  stroke="currentColor"
                  strokeWidth="5"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            .
          </motion.h1>

          <motion.p
            variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="mt-6 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg"
          >
            Qusar, Qəbələ və Şəkidə əl ilə seçilmiş premium A-Frame evləri. Tarixləri seçin —
            sifarişinizi saniyələr içində WhatsApp ilə tamamlayın.
          </motion.p>

          <motion.div
            variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <Button
              variant="ember"
              size="lg"
              onClick={() => {
                document.getElementById("houses")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Evləri Kəşf Et
              <ArrowDown className="size-4" />
            </Button>
            <Button
              variant="glass"
              size="lg"
              onClick={() => window.open(`https://wa.me/${WHATSAPP_NUMBER}`, "_blank")}
            >
              <MessageCircle className="size-4" />
              WhatsApp
            </Button>
          </motion.div>

          <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="mt-10 flex flex-wrap gap-2.5"
          >
            {[
              { big: String(houseCount), small: "Premium Ev" },
              { big: "5+", small: "Region" },
              { big: "24/7", small: "Dəstək" },
            ].map((s) => (
              <div
                key={s.small}
                className="flex items-baseline gap-2 rounded-2xl glass-dark px-5 py-3 text-paper"
              >
                <span className="font-display text-xl font-bold">{s.big}</span>
                <span className="text-xs text-paper/60">{s.small}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 md:block"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          className="grid size-10 place-items-center rounded-full border border-ink/15 text-ink/50"
        >
          <ArrowDown className="size-4" />
        </motion.div>
      </motion.div>
    </section>
  );
}
