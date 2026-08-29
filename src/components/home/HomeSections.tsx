"use client";

import { motion } from "framer-motion";
import {
  ArrowUpRight,
  CalendarCheck2,
  Check,
  MapPin,
  MessageCircle,
  ShieldCheck,
} from "lucide-react";
import { Reveal } from "@/components/shared/Reveal";
import { Button } from "@/components/ui/button";
import { WHATSAPP_NUMBER } from "@/lib/utils";

/* ---------- Marquee ---------- */

export function MarqueeStrip({ regions }: { regions: string[] }) {
  if (regions.length === 0) return null;
  const base = regions.map((r) => r.toUpperCase());
  const minItems = 8;
  const repeated = Array.from(
    { length: Math.max(1, Math.ceil(minItems / base.length)) },
    () => base,
  ).flat();
  const row = [...repeated, ...repeated];
  return (
    <div className="overflow-hidden border-y border-line bg-cream/60 py-4">
      <div className="flex w-max animate-marquee items-center gap-10">
        {[0, 1].map((half) => (
          <div key={half} className="flex items-center gap-10" aria-hidden={half === 1}>
            {row.map((item, i) => (
              <span key={`${half}-${i}`} className="flex items-center gap-10">
                <span className="font-display text-sm font-semibold tracking-[0.3em] text-ink-soft/70">
                  {item}
                </span>
                <svg viewBox="0 0 24 24" className="size-2.5 text-ember" fill="currentColor">
                  <path d="M12 2 22 12 12 22 2 12Z" />
                </svg>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- Trust strip ---------- */

const TRUST = [
  {
    icon: CalendarCheck2,
    title: "Ani Rezervasiya",
    desc: "Tarixləri seçin, qiyməti görün — sifariş saniyələrlə tamamlanır.",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp Dəstəyi",
    desc: "Sifarişiniz hazır mesajla birbaşa menecerə çatır.",
  },
  {
    icon: MapPin,
    title: "Dəqiq Lokasiya",
    desc: "Hər evin real geo-koordinatı interaktiv xəritədə göstərilir.",
  },
  {
    icon: ShieldCheck,
    title: "Şəffaf Qiymət",
    desc: "Gizli ödəniş yoxdur — gecə sayı × günlük qiymət, nöqtə.",
  },
];

export function TrustStrip() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-16 sm:px-6">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        variants={{ show: { transition: { staggerChildren: 0.09 } } }}
        className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
      >
        {TRUST.map((t) => (
          <motion.div
            key={t.title}
            variants={{
              hidden: { opacity: 0, y: 28 },
              show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.21, 0.47, 0.32, 0.98] } },
            }}
            className="group rounded-3xl border border-line bg-white/70 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-soft"
          >
            <div className="grid size-11 place-items-center rounded-2xl bg-cream text-ember-deep transition-colors duration-300 group-hover:bg-ember group-hover:text-white">
              <t.icon className="size-5" />
            </div>
            <h3 className="mt-4 font-display text-[15px] font-semibold text-ink">{t.title}</h3>
            <p className="mt-1.5 text-[13px] leading-relaxed text-ink-faint">{t.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

/* ---------- Editorial ---------- */

const EDITORIAL_POINTS = [
  "Qusarda — Şahdağ Dağ Kurortuna avtomobillə cəmi 15-20 dəqiqə məsafədə",
  "Bakıdan cəmi ~180 km (təxminən 2 saat) — bir günlük qaçış üçün əlverişli",
  "İsti kamin, tam mətbəx və dağ mənzərəsi standartdır",
];

export function Editorial() {
  return (
    <section id="why" className="mx-auto max-w-7xl scroll-mt-28 px-5 py-16 sm:px-6">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div>
          <Reveal>
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-ember">
              Niyə A-Frame?
            </span>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight tracking-tight text-ink sm:text-5xl">
              Təbiətin qoynunda,
              <br />
              komfortun zirvəsində.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 max-w-md leading-relaxed text-ink-soft">
              Qusardakı evimiz avtomobillə cəmi 15-20 dəqiqədə Şahdağ Dağ Kurortuna çatdırır —
              dağ təbiətinin sükunəti ilə Bakıya yalnız 2 saatlıq yaxınlığı özündə birləşdirir.
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <ul className="mt-7 space-y-3.5">
              {EDITORIAL_POINTS.map((p) => (
                <li key={p} className="flex items-start gap-3 text-sm text-ink-soft">
                  <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-forest text-paper">
                    <Check className="size-3" />
                  </span>
                  {p}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.26}>
            <Button
              variant="default"
              className="mt-8"
              onClick={() => {
                document.getElementById("houses")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Kataloqa Bax
              <ArrowUpRight className="size-4" />
            </Button>
          </Reveal>
        </div>

        <div className="relative">
          <motion.div
            initial={{ opacity: 0, y: 40, rotate: 2 }}
            whileInView={{ opacity: 1, y: 0, rotate: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="relative z-10 overflow-hidden rounded-[28px] shadow-lift"
          >
            <img
              src="https://images.pexels.com/photos/2324562/pexels-photo-2324562.jpeg?auto=compress&cs=tinysrgb&h=800&fit=crop&w=800"
              alt="Şahdağ dağ mənzərəsi"
              className="aspect-[4/5] w-full object-cover sm:aspect-[5/5]"
              loading="lazy"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 40, rotate: -4 }}
            whileInView={{ opacity: 1, y: 0, rotate: -3 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="absolute -bottom-8 -left-6 z-20 w-40 overflow-hidden rounded-2xl border-4 border-paper shadow-lift sm:-left-10 sm:w-52"
          >
            <img
              src="https://images.pexels.com/photos/6832351/pexels-photo-6832351.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
              alt="Kamin alovu"
              className="aspect-square w-full object-cover"
              loading="lazy"
            />
          </motion.div>
          <div className="absolute -right-10 -top-10 size-44 rounded-full bg-ember/10 blur-3xl" />
        </div>
      </div>
    </section>
  );
}

/* ---------- CTA banner ---------- */

export function CtaBanner() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-16 sm:px-6">
      <Reveal>
        <div className="relative overflow-hidden rounded-[32px] bg-forest px-6 py-16 text-center shadow-lift sm:px-12 sm:py-20">
          <img
            src="https://images.pexels.com/photos/38855502/pexels-photo-38855502.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200"
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-30"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/90 via-forest/60 to-forest/40" />
          <div className="relative">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-ember-soft/80">
              Hazırsınız?
            </span>
            <h2 className="mx-auto mt-4 max-w-2xl font-display text-3xl font-bold leading-tight text-paper sm:text-5xl">
              Növbəti qaçamğınızı bu gün planlaşdırın
            </h2>
            <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-paper/65 sm:text-base">
              Boş tarixlər məhduddur — xüsusilə həftə sonları. Yerinizi indi ayırtdırın.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button
                variant="ember"
                size="lg"
                onClick={() => {
                  document.getElementById("houses")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Evlərə Bax
              </Button>
              <Button
                variant="glass"
                size="lg"
                onClick={() => window.open(`https://wa.me/${WHATSAPP_NUMBER}`, "_blank")}
              >
                <MessageCircle className="size-4" />
                Sual Verin
              </Button>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}