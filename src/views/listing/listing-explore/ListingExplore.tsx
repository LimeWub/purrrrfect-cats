import { useSearchImages } from "@/hooks/useSearchImages"
import type { TSearchImage } from "@/types/image"
import { Card } from "../card/Card"
import { Button } from "@/components/button"
import { LoadingErrorState } from "../loading-error-state"
import { ErrorState, ErrorStateDescription, ErrorStateTitle } from "@/components/error-state"
import { Link } from "react-router-dom"
import { LoadingSkeleton } from "../loading-skeleton"

export const ListingExplore = () => {
  const queryResult = useSearchImages({ limit: 20 })
  
  const images = queryResult.data?.pages.flat() ?? []
  const hasNextPage = queryResult.hasNextPage ?? false
  const isFetchingNextPage = queryResult.isFetchingNextPage ?? false
  const hasLoadedFirstPage = (queryResult.data?.pages.length ?? 0) > 0

  if (queryResult.isLoading) {
    return <LoadingSkeleton />
  }

  if (queryResult.error) {
    return <LoadingErrorState errorMessage={queryResult.error?.message} />
  }

  if (hasLoadedFirstPage && images.length === 0) {
    return (
        <ErrorState>
          <ErrorStateTitle>No images to explore yet!</ErrorStateTitle>
          <ErrorStateDescription>Make a start by <Link className="text-primary-500 underline" to="/upload">uploading the first cat picture</Link>.</ErrorStateDescription>
        </ErrorState>
      )
    }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image: TSearchImage) => (
          <Card key={image.id} image={image} />
        ))}
      </div>
      {hasLoadedFirstPage && hasNextPage && (
        <Button
          className="mt-4 mx-auto block"
          onClick={() => queryResult.fetchNextPage()}
          disabled={isFetchingNextPage}
        >
          {isFetchingNextPage ? 'Loading...' : 'Load More'}
        </Button>
      )}
    </>
  )
}
