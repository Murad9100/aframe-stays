"use client";

import { motion } from "framer-motion";
import { resolveFeatureIcon } from "@/lib/features";

export function FeaturesList({ features }: { features: string[] }) {
  if (!features.length) return null;
  return (
    <motion.ul
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-40px" }}
      variants={{ show: { transition: { staggerChildren: 0.05 } } }}
      className="grid gap-2.5 sm:grid-cols-2"
    >
      {features.map((f) => {
        const Icon = resolveFeatureIcon(f);
        return (
          <motion.li
            key={f}
            variants={{
              hidden: { opacity: 0, y: 16 },
              show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
            }}
            className="flex items-center gap-3 rounded-2xl border border-line bg-white/60 px-4 py-3.5"
          >
            <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-cream text-ember-deep">
              <Icon className="size-4.5" />
            </span>
            <span className="text-sm font-medium text-ink-soft">{f}</span>
          </motion.li>
        );
      })}
    </motion.ul>
  );
}
