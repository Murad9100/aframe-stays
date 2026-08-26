import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { isAdmin } from "@/lib/auth";
import { LoginForm } from "@/components/admin/LoginForm";

export const dynamic = "force-dynamic";

export const metadata = { title: "Admin Girişi" };

export default async function LoginPage() {
  if (await isAdmin()) redirect("/admin");

  return (
    <div className="relative grid min-h-dvh place-items-center overflow-hidden bg-paper px-4">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 top-[-10%] size-[420px] rounded-full bg-ember/[0.12] blur-[110px]" />
        <div className="absolute -right-24 bottom-[-15%] size-[460px] rounded-full bg-forest/[0.14] blur-[120px]" />
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="absolute left-[8%] top-[16%] size-16 rotate-12 text-line"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
        >
          <path d="M12 4.5 21 20H3L12 4.5Z" strokeLinejoin="round" />
        </svg>
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="absolute bottom-[18%] right-[10%] size-24 -rotate-6 text-line"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
        >
          <path d="M12 4.5 21 20H3L12 4.5Z" strokeLinejoin="round" />
        </svg>
      </div>

      <Link
        href="/"
        className="absolute left-5 top-5 z-10 flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium text-ink-soft transition hover:bg-cream hover:text-ink"
      >
        <ArrowLeft className="size-4" />
        Sayta qayıt
      </Link>

      <div className="relative z-10">
        <LoginForm showDefaultHint={!process.env.ADMIN_PASSWORD} />
      </div>
    </div>
  );
}
