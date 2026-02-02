import { useUserUploadedImages } from "@/hooks/useUserUploadedImages"
import type { TUploadedImage } from "@/types/image"
import { Card } from "../card/Card"
import { Button } from "@/components/button"
import { LoadingErrorState } from "../loading-error-state"
import { ErrorState, ErrorStateDescription, ErrorStateTitle } from "@/components/error-state"
import { Link } from "react-router-dom"

export const ListingHome = () => {
  // Omit sub_id from the query params ON PURPOSE to get all images uploaded using our API key
  const uploadedQueryResult = useUserUploadedImages({ limit: 20 }) 
  
  const uploadedImages = uploadedQueryResult.data?.pages.flat() ?? []
  const uploadedHasNextPage = uploadedQueryResult.hasNextPage ?? false
  const uploadedIsFetchingNextPage = uploadedQueryResult.isFetchingNextPage ?? false
  const uploadedHasLoadedFirstPage = (uploadedQueryResult.data?.pages.length ?? 0) > 0

  if (uploadedQueryResult.isLoading) {
    return <div>Loader/Spinner/Suspense here</div>
  }

  if (uploadedQueryResult.error) {
    return <LoadingErrorState errorMessage={uploadedQueryResult.error?.message} />
  }

  if (uploadedHasLoadedFirstPage && uploadedImages.length === 0) {
    return (
        <ErrorState>
          <ErrorStateTitle>No uploaded images yet!</ErrorStateTitle>
          <ErrorStateDescription>Make a start by <Link className="text-primary-500 underline" to="/upload">uploading your first cat picture</Link>.</ErrorStateDescription>
        </ErrorState>
      )
    }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {uploadedImages.map((image: TUploadedImage) => (
          <Card key={image.id} image={image} />
        ))}
      </div>
      {uploadedHasLoadedFirstPage && uploadedHasNextPage && (
        <Button
          className="mt-4 mx-auto block"
          onClick={() => uploadedQueryResult.fetchNextPage()}
          disabled={uploadedIsFetchingNextPage}
        >
          {uploadedIsFetchingNextPage ? 'Loading...' : 'Load More'}
        </Button>
      )}
    </>
  )
}
