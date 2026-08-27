import Link from "next/link";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}
import { LogoMark } from "@/components/shared/Logo";
import { WHATSAPP_NUMBER } from "@/lib/utils";

const REGIONS = ["Qusar", "Qəbələ", "Quba", "Şəki", "İsmayıllı", "Zaqatala"];

export function Footer() {
  return (
    <footer id="contact" className="relative mt-24 overflow-hidden bg-forest text-paper">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-10 left-1/2 -translate-x-1/2 select-none font-display text-[22vw] font-800 leading-none text-white/[0.04]"
        style={{ fontWeight: 800 }}
      >
        N&F CABINS
      </div>

      <div className="relative mx-auto max-w-7xl px-5 pb-10 pt-16 sm:px-6">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <LogoMark className="bg-paper text-ink group-hover:bg-ember group-hover:text-white" />
              <span className="font-display text-lg font-bold tracking-tight">
                <span className="text-ember">N&F</span> Cabins
              </span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-paper/60">
              Azərbaycanın dağlarında əl ilə seçilmiş premium A-Frame evləri. Şəhərdən qaçın —
              təbiətə qayıdın.
            </p>
            <div className="mt-6 flex gap-2">
              {[
                { icon: InstagramIcon, href: "https://instagram.com", label: "Instagram" },
                { icon: MessageCircle, href: `https://wa.me/${WHATSAPP_NUMBER}`, label: "WhatsApp" },
                { icon: Mail, href: "mailto:salam@aframe.az", label: "E-poçt" },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="grid size-10 place-items-center rounded-full border border-white/15 text-paper/70 transition hover:border-ember hover:bg-ember hover:text-white"
                >
                  <s.icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-paper/40">
              Naviqasiya
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              {[
                { href: "/#houses", label: "Bütün Evlər" },
                { href: "/#why", label: "Niyə Biz?" },
                { href: "/login", label: "Admin Girişi" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-paper/70 transition hover:text-paper">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-paper/40">
              Əlaqə
            </h4>
            <ul className="mt-4 space-y-3 text-sm text-paper/70">
              <li className="flex items-center gap-2.5">
                <Phone className="size-4 text-ember" /> +994 50 555 07 07
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="size-4 text-ember" /> salam@aframe.az
              </li>
              <li className="flex items-center gap-2.5">
                <MapPin className="size-4 text-ember" /> Bakı, Azərbaycan
              </li>
            </ul>
            <div className="mt-5 flex flex-wrap gap-1.5">
              {REGIONS.map((r) => (
                <span
                  key={r}
                  className="rounded-full border border-white/10 px-3 py-1 text-[11px] text-paper/50"
                >
                  {r}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-paper/40 sm:flex-row">
          <span>© 2026 N&F CABINS STAYS. Bütün hüquqlar qorunur.</span>
          <span>Premium A-Frame Dağ Evləri · Azərbaycan</span>
        </div>
      </div>
    </footer>
  );
}
