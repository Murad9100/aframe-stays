"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Ban, ExternalLink, MapPin, Pencil, Trash2, Users } from "lucide-react";
import { toast } from "sonner";
import type { House } from "@/types";
import { formatPrice } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { ConfirmDialog } from "@/components/ui/modal";
import { CopyLinkButton } from "@/components/shared/CopyLinkButton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function HousesTable({
  houses,
  blockedSummary,
}: {
  houses: House[];
  blockedSummary: Record<string, number>;
}) {
  const router = useRouter();
  const [toDelete, setToDelete] = useState<House | null>(null);
  const [deleting, setDeleting] = useState(false);

  const confirmDelete = async () => {
    if (!toDelete) return;
    setDeleting(true);
    const res = await fetch(`/api/admin/houses/${toDelete.id}`, { method: "DELETE" });
    setDeleting(false);
    if (res.ok) {
      toast.success("Ev silindi", { description: toDelete.title });
      setToDelete(null);
      router.refresh();
    } else {
      toast.error("Silinmə zamanı xəta baş verdi");
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="overflow-hidden rounded-3xl border border-line bg-white/80 shadow-soft"
      >
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead>Ev</TableHead>
              <TableHead>Region</TableHead>
              <TableHead>Qiymət</TableHead>
              <TableHead>Qonaq</TableHead>
              <TableHead>Bloklu gün</TableHead>
              <TableHead className="text-right">Əməliyyatlar</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {houses.map((h) => (
              <TableRow key={h.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <img
                      src={h.images[0]}
                      alt={h.title}
                      className="size-11 rounded-xl object-cover"
                    />
                    <div className="min-w-0">
                      <div className="max-w-[220px] truncate font-semibold text-ink">{h.title}</div>
                      <div className="text-xs text-ink-faint">{h.images.length} şəkil</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="flex items-center gap-1.5 text-ink-soft">
                    <MapPin className="size-3.5 text-ink-faint" />
                    {h.region}
                  </span>
                </TableCell>
                <TableCell>
                  <span className="font-semibold text-ink">{formatPrice(h.dailyPrice)}</span>
                  <span className="text-xs text-ink-faint"> /gecə</span>
                </TableCell>
                <TableCell>
                  <span className="flex items-center gap-1.5 text-ink-soft">
                    <Users className="size-3.5 text-ink-faint" />
                    {h.guests}
                  </span>
                </TableCell>
                <TableCell>
                  <Badge variant={(blockedSummary[h.id] ?? 0) > 0 ? "ember" : "sand"}>
                    <Ban className="size-3" />
                    {blockedSummary[h.id] ?? 0} gün
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center justify-end gap-1.5">
                    <CopyLinkButton path={`/house/${h.id}`} label="Link" />
                    <Link
                      href={`/house/${h.id}`}
                      target="_blank"
                      aria-label="Saytda aç"
                      className="grid size-9 place-items-center rounded-full text-ink-soft transition hover:bg-cream hover:text-ink"
                    >
                      <ExternalLink className="size-4" />
                    </Link>
                    <Link
                      href={`/admin/house/${h.id}/edit`}
                      aria-label="Redaktə et"
                      className="grid size-9 place-items-center rounded-full text-ink-soft transition hover:bg-cream hover:text-ink"
                    >
                      <Pencil className="size-4" />
                    </Link>
                    <button
                      onClick={() => setToDelete(h)}
                      aria-label="Sil"
                      className="grid size-9 place-items-center rounded-full text-rose-500 transition hover:bg-rose-50 cursor-pointer"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {houses.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="py-14 text-center text-ink-faint">
                  Hələ ev əlavə olunmayıb — yuxarıdakı «Yeni Ev» düyməsi ilə başlayın.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </motion.div>

      <ConfirmDialog
        open={!!toDelete}
        onClose={() => setToDelete(null)}
        onConfirm={confirmDelete}
        loading={deleting}
        title="Evi silmək istəyirsiniz?"
        description={`"${toDelete?.title}" və ona aid bütün bloklanmış günlər həmişəlik silinəcək. Bu əməliyyat geri qaytarıla bilməz.`}
      />
    </>
  );
}
