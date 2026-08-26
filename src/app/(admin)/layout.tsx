import Link from "next/link";
import { redirect } from "next/navigation";
import { ExternalLink, Plus } from "lucide-react";
import { isAdmin } from "@/lib/auth";
import { Logo } from "@/components/shared/Logo";
import { LogoutButton } from "@/components/admin/LogoutButton";
import { Button } from "@/components/ui/button";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  if (!(await isAdmin())) redirect("/login");

  return (
    <div className="min-h-dvh bg-paper">
      <header className="sticky top-0 z-40 border-b border-line/70 bg-paper/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-4 py-3 sm:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <Logo />
            <span className="hidden shrink-0 rounded-full bg-forest px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-paper sm:inline">
              Admin
            </span>
          </div>
          <div className="flex shrink-0 items-center gap-1.5">
            <Link
              href="/"
              target="_blank"
              className="hidden items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-ink-soft transition hover:bg-cream hover:text-ink sm:flex"
            >
              <ExternalLink className="size-4" />
              Sayt
            </Link>
            <Link href="/admin/house/add">
              <Button variant="ember" size="sm">
                <Plus className="size-4" />
                <span className="hidden xs:inline sm:inline">Yeni Ev</span>
              </Button>
            </Link>
            <LogoutButton />
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-8 pb-16 sm:px-6">{children}</main>
    </div>
  );
}
