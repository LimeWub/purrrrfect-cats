import { CardSkeleton } from "../card"
import { cn } from "@/utils/cn"

export const LoadingSkeleton = ({ className, ...props }: React.ComponentProps<'div'>) => {
    return (
      <div className={cn("grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4", className)} {...props}>
          <CardSkeleton />
          <CardSkeleton className="opacity-70"/>
          <CardSkeleton className="opacity-50"/>
      </div>
    )
}
