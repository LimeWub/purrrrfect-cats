"use client"

import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { cn } from "@/utils/cn"
import { X } from "lucide-react"
import { Button } from "@/components/button"
import type { TSearchImage, TUploadedImage } from '@/types/image'
import { CardVoteControls } from "../card-vote-controls/CardVoteControls"
import { CardFavouriteControls } from "../card-favourite-controls/CardFavouriteControls"

function CardLightbox({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Root>) {
  return <DialogPrimitive.Root data-slot="card-lightbox" {...props} />
}

function CardLightboxTrigger({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
  return (
    <DialogPrimitive.Trigger
      data-slot="card-lightbox-trigger"
      className={cn("cursor-pointer", className)}
      {...props}
    />
  )
}

type TCardLightboxContentProps = React.ComponentProps<typeof DialogPrimitive.Content> & {
  image: TSearchImage | TUploadedImage
}

function CardLightboxContent({
  className,
  image,
  ...props
}: TCardLightboxContentProps) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="fixed inset-0 z-1 bg-black/80" />
      <DialogPrimitive.Content
        data-slot="card-lightbox-content"
        className={cn(
          "fixed left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 rounded-sm overflow-hidden w-max max-w-[95svw]",
          className
        )}
        {...props}
      >
        <div className="relative">
          <DialogPrimitive.Close asChild>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-2 text-tonal-50"
            >
              <X className="size-8" />
              <span className="sr-only">Close lightbox</span>
            </Button>
          </DialogPrimitive.Close>
          <div className="flex items-center flex-col justify-center">
            <img
              src={image.url}
              alt={'original_filename' in image ? image.original_filename : ''}
              className="max-h-[80vh] max-w-full object-contain"
            />
            <div className="flex items-center justify-between w-full p-2 bg-primary-700">
              <CardVoteControls imageId={image.id} />
              <CardFavouriteControls imageId={image.id} />
            </div>
          </div>
        </div>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  )
}

export { CardLightbox, CardLightboxTrigger, CardLightboxContent }
