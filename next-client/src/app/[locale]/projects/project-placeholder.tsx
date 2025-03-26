import { Skeleton } from "@/components/ui/skeleton";

export const Placeholder = () => (
  <div className="max-w-[800px] mx-auto mt-6">
    <div className="flex gap-4">
      <Skeleton className="size-50" />
      <div className="flex flex-col gap-2">
        <Skeleton className="h-4 w-95" />
        <Skeleton className="h-4 w-86" />
        <Skeleton className="h-4 w-88" />
        <Skeleton className="h-4 w-90" />
        <Skeleton className="h-4 w-80" />
        <Skeleton className="h-4 w-101" />
        <Skeleton className="h-4 w-87" />
        <Skeleton className="h-4 w-81" />
        <Skeleton className="h-4 w-92" />
      </div>
    </div>
    <div className="mt-10 flex flex-col gap-2">
      <Skeleton className="h-4 w-140" />
      <Skeleton className="h-4 w-142" />
      <Skeleton className="h-4 w-134" />
      <Skeleton className="h-4 w-155" />
      <Skeleton className="h-4 w-141" />
      <Skeleton className="h-4 w-141" />
      <Skeleton className="h-4 w-147 mt-5" />
      <Skeleton className="h-4 w-159" />
      <Skeleton className="h-4 w-150" />
      <Skeleton className="h-4 w-137" />
      <Skeleton className="h-4 w-153" />
      <Skeleton className="h-4 w-149" />
    </div>
    <div className="mt-10">
      <Skeleton className="h-90 w-170" />
    </div>
  </div>
);