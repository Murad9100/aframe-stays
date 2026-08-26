"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Eye, EyeOff, Loader2, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LogoMark } from "@/components/shared/Logo";

export function LoginForm({ showDefaultHint }: { showDefaultHint: boolean }) {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) return;
    setLoading(true);
    setError(null);
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    setLoading(false);
    if (res.ok) {
      router.replace("/admin");
      router.refresh();
    } else {
      setError("Şifrə yanlışdır, yenidən cəhd edin.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 28, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
      className="w-full max-w-sm rounded-3xl glass p-8 shadow-lift"
    >
      <div className="flex flex-col items-center text-center">
        <LogoMark className="size-12 rounded-2xl" />
        <h1 className="mt-4 font-display text-xl font-bold text-ink">Admin Girişi</h1>
        <p className="mt-1 text-sm text-ink-faint">İdarəetmə panelinə daxil olun</p>
      </div>

      <form onSubmit={submit} className="mt-6 space-y-4">
        <motion.div
          key={error ? "err" : "ok"}
          animate={error ? { x: [0, -9, 9, -5, 5, 0] } : {}}
          transition={{ duration: 0.45 }}
        >
          <Label htmlFor="pw">Şifrə</Label>
          <div className="relative">
            <Input
              id="pw"
              type={show ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              autoFocus
              className="pr-11"
            />
            <button
              type="button"
              onClick={() => setShow((s) => !s)}
              aria-label={show ? "Gizlət" : "Göstər"}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-faint transition hover:text-ink cursor-pointer"
            >
              {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </button>
          </div>
          {error && <p className="mt-2 text-xs font-medium text-rose-500">{error}</p>}
        </motion.div>

        <Button type="submit" variant="ember" className="w-full" disabled={loading || !password}>
          {loading ? <Loader2 className="size-4 animate-spin" /> : <Lock className="size-4" />}
          {loading ? "Yoxlanılır..." : "Daxil Ol"}
        </Button>

        {showDefaultHint && (
          <p className="rounded-xl bg-cream px-3 py-2 text-center text-[11px] leading-relaxed text-ink-faint">
            Standart şifrə: <span className="font-mono font-semibold">admin123</span> — təhlükəsizlik
            üçün <span className="font-mono">.env</span>-də <span className="font-mono">ADMIN_PASSWORD</span> təyin edin.
          </p>
        )}
      </form>
    </motion.div>
  );
}
