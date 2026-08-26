import { Skeleton } from "@/components/ui/skeleton";

export function HouseCardSkeleton() {
  return (
    <div>
      <Skeleton className="aspect-[4/3] rounded-[22px]" />
      <div className="space-y-2.5 px-1.5 pt-4">
        <div className="flex items-center justify-between gap-3">
          <Skeleton className="h-5 w-2/3" />
          <Skeleton className="h-5 w-16" />
        </div>
        <Skeleton className="h-4 w-1/2" />
      </div>
    </div>
  );
}

export function HomeGridSkeleton() {
  return (
    <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <HouseCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function DetailSkeleton() {
  return (
    <div className="mx-auto max-w-7xl px-4 pt-28 sm:px-6">
      <div className="mb-6 space-y-3">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-9 w-72 max-w-full" />
        <Skeleton className="h-4 w-48" />
      </div>
      <div className="grid grid-cols-4 grid-rows-2 gap-2.5 md:h-[460px]">
        <Skeleton className="col-span-2 row-span-2 rounded-2xl" />
        <Skeleton className="rounded-2xl" />
        <Skeleton className="rounded-2xl" />
        <Skeleton className="rounded-2xl" />
        <Skeleton className="rounded-2xl" />
      </div>
      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_400px]">
        <div className="space-y-4">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-64 w-full rounded-3xl" />
        </div>
        <Skeleton className="h-[480px] rounded-3xl" />
      </div>
    </div>
  );
}
