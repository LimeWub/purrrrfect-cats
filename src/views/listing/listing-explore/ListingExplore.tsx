import { useSearchImages } from "@/hooks/useSearchImages"
import type { TImage, TUploadedImage } from "@/types/image"
import { Card } from "../card/Card"
import { Button } from "@/components/button"
import { LoadingErrorState } from "../loading-error-state"
import { ErrorState, ErrorStateDescription, ErrorStateTitle } from "@/components/error-state"
import { Link } from "react-router-dom"

export const ListingExplore = () => {
  const searchQueryResult = useSearchImages({ limit: 20 })
  
  const searchImages = searchQueryResult.data?.pages.flat() ?? []
  const searchHasNextPage = searchQueryResult.hasNextPage ?? false
  const searchIsFetchingNextPage = searchQueryResult.isFetchingNextPage ?? false
  const searchHasLoadedFirstPage = (searchQueryResult.data?.pages.length ?? 0) > 0

  if (searchQueryResult.isLoading) {
    return <div>Loader/Spinner/Suspense here</div>
  }

  if (searchQueryResult.error) {
    return <LoadingErrorState errorMessage={searchQueryResult.error?.message} />
  }

  if (searchHasLoadedFirstPage && searchImages.length === 0) {
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
        {searchImages.map((image: TImage | TUploadedImage) => (
          <Card key={image.id} image={image} />
        ))}
      </div>
      {searchHasLoadedFirstPage && searchHasNextPage && (
        <Button
          className="mt-4 mx-auto block"
          onClick={() => searchQueryResult.fetchNextPage()}
          disabled={searchIsFetchingNextPage}
        >
          {searchIsFetchingNextPage ? 'Loading...' : 'Load More'}
        </Button>
      )}
    </>
  )
}
