import type { HTMLAttributes, ImgHTMLAttributes, PropsWithChildren } from "react"
import { Slot } from "@radix-ui/react-slot"
import { cn } from "@/utils/cn"

export const ErrorStateImage = ({className, ...props}: ImgHTMLAttributes<HTMLImageElement>) => {
    return <img className={cn("w-28 h-28", className)} {...props} alt="" />
}

export const ErrorStateTitle = ({asChild, className, ...props}: HTMLAttributes<HTMLHeadingElement> & { asChild?: boolean }) => {
    const Comp = asChild ? Slot : "h3"
    return <Comp className={cn("text-lg font-medium text-tonal-800", className)} {...props} />
}

export const ErrorStateDescription = ({className, ...props}: HTMLAttributes<HTMLParagraphElement>) => {
    return <p className={cn("text-md text-muted-foreground", className)} {...props} />
}

export const ErrorState = ({ children, className, ...props }: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) => {
    return (
        <div className={cn("flex flex-col items-center justify-center gap-2", className)} {...props}>
            {children}
        </div>
    )
}
