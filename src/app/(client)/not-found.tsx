import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LogoMark } from "@/components/shared/Logo";

export default function NotFound() {
  return (
    <div className="grid min-h-[80svh] place-items-center px-4">
      <div className="text-center">
        <LogoMark className="mx-auto size-14 rounded-2xl" />
        <p className="mt-6 font-display text-6xl font-bold tracking-tight text-ink sm:text-7xl">
          404
        </p>
        <p className="mt-3 text-ink-faint">Axtardığınız ev tapılmadı və ya artıq deaktivdir.</p>
        <Link href="/" className="mt-8 inline-block">
          <Button variant="ember">Ana Səhifəyə Qayıt</Button>
        </Link>
      </div>
    </div>
  );
}
