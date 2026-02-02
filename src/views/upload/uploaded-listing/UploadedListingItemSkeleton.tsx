import { Skeleton } from '@/components/skeleton'
import { cn } from '@/utils/cn'

export const UploadedListingItemSkeleton = ({ className, ...props }: React.ComponentProps<'div'>) => {
  return (
    <div className={cn("flex gap-2 bg-tonal-50 rounded-sm p-2 items-start border border-tonal-100", className)} {...props}>
      <Skeleton className="w-28 h-28 rounded-xs" />
      <div className="flex flex-col gap-1 flex-1">
        <Skeleton className="h-5 w-48" />
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-4 w-24" />
      </div>
      <Skeleton className="h-8 w-8 rounded" />
    </div>
  )
}
