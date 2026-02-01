/*
 * Shadcn UI Skeleton Component
 * https://ui.shadcn.com/docs/components/skeleton
 */
import { cn } from "@/utils/cn"

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("bg-muted rounded-md animate-pulse", className)}
      {...props}
    />
  )
}

export { Skeleton }
