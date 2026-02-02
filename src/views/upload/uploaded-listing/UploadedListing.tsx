import { ErrorStateDescription, ErrorState, ErrorStateTitle } from '@/components/error-state'
import { useUserUploadedImages } from '@/hooks/useUserUploadedImages'
import { UploadedListingItem } from './UploadedListingItem'
import { Button } from '@/components/button'
import { CatIcon, ChevronLeft, ChevronRight } from 'lucide-react'
import { useUser } from '@/hooks/useUser'
import { ButtonGroup } from '@/components/button-group'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/tooltip'
import { cn } from '@/utils/cn'

export const UploadedListing = ({ className, ...props }: React.ComponentProps<'div'>) => {
    const { userName } = useUser()
    const queryResult = useUserUploadedImages({ limit: 20, sub_id: userName })
    const { data, fetchNextPage, hasNextPage, fetchPreviousPage, hasPreviousPage, isFetchingNextPage, isFetchingPreviousPage } = queryResult

    const allImages = data.pages.flat()
    
    if (queryResult.error) {
        return (
            <ErrorState>
                <ErrorStateTitle>Could not load your uploaded images</ErrorStateTitle>
                <ErrorStateDescription>{queryResult.error?.message}</ErrorStateDescription>
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
            <ButtonGroup orientation="horizontal" className="ml-auto">
                {hasPreviousPage && (
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant="outline"
                                onClick={() => fetchPreviousPage()}
                                disabled={isFetchingPreviousPage}
                            >
                                <ChevronLeft />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            Previous Page
                        </TooltipContent>
                    </Tooltip>
                )}
                {hasNextPage && (
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant="outline"
                                onClick={() => fetchNextPage()}
                                disabled={isFetchingNextPage}
                            >
                                <ChevronRight />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            Next Page
                        </TooltipContent>
                    </Tooltip>
                )}
            </ButtonGroup>
        </div>
    )
}
