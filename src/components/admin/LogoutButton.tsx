"use client";

import { motion } from "framer-motion";
import { LogOut } from "lucide-react";

export function LogoutButton() {
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={async () => {
        await fetch("/api/admin/logout", { method: "POST" });
        window.location.href = "/login";
      }}
      className="flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-ink-soft transition hover:bg-cream hover:text-ink cursor-pointer"
    >
      <LogOut className="size-4" />
      <span className="hidden sm:inline">Çıxış</span>
    </motion.button>
  );
}
