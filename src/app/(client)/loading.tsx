import { HomeGridSkeleton } from "@/components/house/HouseSkeletons";
import { Skeleton } from "@/components/ui/skeleton";

export default function HomeLoading() {
  return (
    <>
      <div className="skeleton-shimmer h-[100svh] w-full" />
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6">
        <div className="mb-10 space-y-3">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-10 w-72 max-w-full" />
        </div>
        <HomeGridSkeleton />
      </div>
    </>
  );
}
