import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <>
      <Skeleton className="h-8 w-60 my-5" />

      <div className="product-grid gap-3 p-3">
        {new Array(10).fill(0).map((_, idx) => (
          <Skeleton key={idx} className="w-full product-list-image-height" />
        ))}
      </div>
    </>
  );
}
