import { ErrorStateDescription, ErrorState, ErrorStateTitle } from '@/components/error-state'
import { useUserUploadedImages } from '@/hooks/useUserUploadedImages'
import { UploadedListingItem } from './UploadedListingItem'
import { Button } from '@/components/button'
import { CatIcon } from 'lucide-react'
import { useUser } from '@/hooks/useUser'
import { cn } from '@/utils/cn'

export const UploadedListing = ({ className, ...props }: React.ComponentProps<'div'>) => {
    const { userName } = useUser()
    const queryResult = useUserUploadedImages({ limit: 20, sub_id: userName })
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, error } = queryResult

    const allImages = data.pages.flat()
    
    if (error) {
        return (
            <ErrorState>
                <ErrorStateTitle>Could not load your uploaded images</ErrorStateTitle>
                <ErrorStateDescription>{error.message}</ErrorStateDescription>
            </ErrorState>
        )
    }

    if (allImages.length === 0) {
        return (
            <ErrorState>
                <CatIcon className="w-24 h-24 stroke-1 stroke-tonal-700" />
                <ErrorStateTitle>No images found</ErrorStateTitle>
                <ErrorStateDescription>Your uploaded images will appear here.</ErrorStateDescription>
            </ErrorState>
        )
    }

    return (
        <div className={cn("flex flex-col gap-2 ", className)} {...props}>
            {allImages.map((image) => <UploadedListingItem key={image.id} image={image} />)}
            {hasNextPage && (
                <Button
                    className="mx-auto block"
                    onClick={() => fetchNextPage()}
                    disabled={isFetchingNextPage}
                >
                    {isFetchingNextPage ? 'Loading...' : 'Load More'}
                </Button>
            )}
        </div>
    )
}
