import type { TUploadedImage } from "@/types/image"
import { Button } from "@/components/button"
import { useDeleteImage } from "@/hooks/useDeleteImage"
import { Trash2 } from "lucide-react"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/tooltip"
import { toast } from "sonner"

export const UploadedListingItem = ({ image }: { image: TUploadedImage }) => {
    const deleteMutation = useDeleteImage()
    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this image?')) {
            deleteMutation.mutate({ image_id: image.id }, {
                onSuccess: () => {
                    toast.success('Image deleted successfully!')
                },
                onError: (error) => {
                    toast.error(`Failed to delete image: ${error.message}`)
                }
            })
        }
    }
    return (
        <div className="flex gap-2 bg-tonal-50 rounded-sm p-2 items-start border border-tonal-100">
            <img className="w-28 h-28 object-cover rounded-xs" src={image.url} alt={image.original_filename} />
            <div className="flex flex-col gap-1">
                <p className="text-sm font-medium text-tonal-900">{image.original_filename}</p>
                <div className="flex gap-1 items-center text-muted-foreground text-sm"><p className="font-medium">Status:</p>
                    {image.approved ?
                        <><div className="w-3 h-3 bg-[radial-gradient(circle_at_center,_theme(colors.success-dark),_theme(colors.success),_theme(colors.success-light))] rounded-full" /><p className="text-sm">Approved</p></> :
                        <><div className="w-3 h-3 bg-[radial-gradient(circle_at_center,_theme(colors.warning-dark),_theme(colors.warning),_theme(colors.warning-light))] rounded-full" /><p className="text-sm">Pending</p></>
                    }
                </div>
                <p className="text-sm text-muted-foreground"><span className="font-medium">Size:</span> {image.width}x{image.height}</p>
            </div>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button aria-label="Delete Image" className="ml-auto" variant="destructive" size="sm" disabled={deleteMutation.isPending} onClick={handleDelete}><Trash2 /></Button>
                </TooltipTrigger>
                <TooltipContent>
                    Delete Image
                </TooltipContent>
            </Tooltip>
        </div>
    )
}