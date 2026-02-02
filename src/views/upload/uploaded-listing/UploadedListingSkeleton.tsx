import { cn } from '@/utils/cn'
import { UploadedListingItemSkeleton } from './UploadedListingItemSkeleton'

export const UploadedListingSkeleton = ({ className, ...props }: React.ComponentProps<'div'>) => {
    return (
        <div className={cn("flex flex-col gap-2 ", className)} {...props}>
            <UploadedListingItemSkeleton />
            <UploadedListingItemSkeleton className="opacity-70" />
            <UploadedListingItemSkeleton className="opacity-50" />
        </div>
    )
}
