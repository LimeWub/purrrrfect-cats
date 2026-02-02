import type { PropsWithChildren } from 'react'
import { ErrorStateDescription, ErrorState, ErrorStateTitle, ErrorStateImage } from '@/components/error-state'
import { useUserUploadedImages } from '@/hooks/useUserUploadedImages'
import { UploadedListingItem } from './UploadedListingItem'
import { Button } from '@/components/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useUser } from '@/context/UserContext'
import { ButtonGroup } from '@/components/button-group'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/tooltip'

export const UploadedListing = (props: PropsWithChildren) => {
    const { userName } = useUser()
    const queryResult = useUserUploadedImages({ limit: 20, sub_id: userName })
    const { data, fetchNextPage, hasNextPage, fetchPreviousPage, hasPreviousPage, isFetchingNextPage, isFetchingPreviousPage, isLoading } = queryResult

    const allImages = data?.pages.flat() ?? []

    return (
        <div {...props}>
            {allImages.length > 0 ? (
                <div className="flex flex-col gap-2 ">
                    {allImages.map((image) => <UploadedListingItem key={image.id} image={image} />)}
                    <ButtonGroup orientation="horizontal" className="ml-auto">
                        {hasPreviousPage && (
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button
                                        variant="outline"
                                        onClick={() => fetchPreviousPage()}
                                        disabled={isFetchingPreviousPage || isLoading}
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
                                        disabled={isFetchingNextPage || isLoading}
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
            ) : (
                <ErrorState>
                    <ErrorStateImage src="/images/error-state.png" alt="Error State" />
                    <ErrorStateTitle>No images found</ErrorStateTitle>
                    <ErrorStateDescription>Your uploaded images will appear here.</ErrorStateDescription>
                </ErrorState>
            )}
        </div>
    )
}
