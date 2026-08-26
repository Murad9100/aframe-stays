"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Link2 } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function CopyLinkButton({
  path,
  label = "Linki Kopyala",
  className,
}: {
  path: string;
  label?: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    const url = `${window.location.origin}${path}`;
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = url;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
    }
    setCopied(true);
    toast.success("Link kopyalandı!", { description: url });
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <Button variant="outline" size="sm" onClick={copy} className={cn("gap-2", className)}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={copied ? "check" : "link"}
          initial={{ scale: 0.4, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.4, opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="grid place-items-center"
        >
          {copied ? <Check className="size-4 text-emerald-600" /> : <Link2 className="size-4" />}
        </motion.span>
      </AnimatePresence>
      {copied ? "Kopyalandı" : label}
    </Button>
  );
}
