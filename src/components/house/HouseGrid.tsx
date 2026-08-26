"use client";

import { motion } from "framer-motion";
import type { House } from "@/types";
import { HouseCard } from "@/components/house/HouseCard";

export function HouseGrid({ houses }: { houses: House[] }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-40px" }}
      variants={{ show: { transition: { staggerChildren: 0.08 } } }}
      className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3"
    >
      {houses.map((house) => (
        <motion.div
          key={house.id}
          variants={{
            hidden: { opacity: 0, y: 36 },
            show: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] },
            },
          }}
        >
          <HouseCard house={house} />
        </motion.div>
      ))}
    </motion.div>
  );
}
