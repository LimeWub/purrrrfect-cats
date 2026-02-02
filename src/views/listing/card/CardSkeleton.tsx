import { Skeleton } from '@/components/skeleton'
import { cn } from '@/utils/cn'

export const CardSkeleton = ({ className, ...props }: React.ComponentProps<'div'>) => {
    return (
        <div className={cn("relative", className)} {...props}>
            <div className="w-full h-full rounded-sm min-h-48 md:aspect-square bg-tonal-50" />
            <div className="p-2 absolute bottom-0 left-0 w-full flex justify-between items-center">
                <Skeleton className="h-8 w-24 rounded-lg" />
                <Skeleton className="h-10 w-10 rounded-full" />
            </div>
        </div>
    )
}
