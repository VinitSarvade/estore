import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className="lg:grid lg:grid-cols-[3fr_2fr] xl:grid-cols-[2fr_1fr]">
      <div className="flex flex-nowrap lg:grid lg:grid-cols-1 xl:grid-cols-2 gap-1">
        <Skeleton className="w-full h-[50dvh] lg:h-[calc(100dvh-81px)]" />
        <Skeleton className="h-[calc(100dvh-81px)] delay-500 hidden xl:block" />
      </div>

      <div className="px-6 py-10 lg:sticky lg:top-20 self-start">
        <Skeleton className="h-10 w-80 mb-3" />
        <Skeleton className="h-8 w-24" />

        <div className="space-y-8 mt-10">
          <div className="flex flex-wrap gap-4">
            {Array.from({ length: 5 }, (_, idx) => (
              <Skeleton key={idx} className="h-20 w-14" />
            ))}
          </div>

          <div className="space-y-10">
            <div className="flex flex-wrap gap-4">
              {Array.from({ length: 4 }, (_, idx) => (
                <Skeleton key={idx} className="h-8 w-16" />
              ))}
            </div>
            <Skeleton className="h-10 w-full" />
          </div>

          <div>
            <Skeleton className="h-5 w-full mb-2" />
            <Skeleton className="h-5 w-full mb-2" />
            <Skeleton className="h-5 w-1/3 mb-8" />

            <Skeleton className="h-5 w-full mb-2" />
            <Skeleton className="h-5 w-full mb-2" />
            <Skeleton className="h-5 w-1/3 mb-8" />

            <Skeleton className="h-5 w-full mb-2" />
            <Skeleton className="h-5 w-full mb-2" />
            <Skeleton className="h-5 w-1/3 mb-8" />
          </div>
        </div>
      </div>
    </div>
  );
}
