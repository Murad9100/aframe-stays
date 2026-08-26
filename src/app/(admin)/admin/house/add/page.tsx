import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { HouseForm } from "@/components/admin/HouseForm";

export const dynamic = "force-dynamic";

export const metadata: Metadata = { title: "Yeni Ev" };

export default function AddHousePage() {
  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-6">
        <Link
          href="/admin"
          className="mb-3 inline-flex items-center gap-2 text-sm font-medium text-ink-soft transition hover:text-ink"
        >
          <ArrowLeft className="size-4" />
          Panele qayıt
        </Link>
        <h1 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
          Yeni Ev Əlavə Et
        </h1>
        <p className="mt-1 text-sm text-ink-faint">
          Məlumatları doldurun — ev dərhal saytda görünəcək.
        </p>
      </div>
      <HouseForm />
    </div>
  );
}
