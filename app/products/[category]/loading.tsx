import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <>
      <Skeleton className="h-8 w-60 my-5" />

      <div className="grid gap-4 grid-cols-2">
        <Skeleton className="w-full h-56" />
        <Skeleton className="w-full h-56" />
        <Skeleton className="w-full h-56" />
        <Skeleton className="w-full h-56" />
      </div>
    </>
  );
}
