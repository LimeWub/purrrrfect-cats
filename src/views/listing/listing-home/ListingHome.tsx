import { useUserUploadedImages } from "@/hooks/useUserUploadedImages"
import type { TUploadedImage } from "@/types/image"
import { Card } from "../card"
import { Button } from "@/components/button"
import { LoadingErrorState } from "../loading-error-state"
import { ErrorState, ErrorStateDescription, ErrorStateTitle } from "@/components/error-state"
import { Link } from "react-router-dom"
import { Loader2 } from "lucide-react"

export const ListingHome = () => {
  // Omit sub_id from the query params ON PURPOSE to get all images uploaded using our API key
  const queryResult = useUserUploadedImages({ limit: 20 })
  
  const images = queryResult.data.pages.flat()
  const hasNextPage = queryResult.hasNextPage
  const isFetchingNextPage = queryResult.isFetchingNextPage
  const hasLoadedFirstPage = queryResult.data.pages.length > 0

  if (queryResult.error) {
    return <LoadingErrorState errorMessage={queryResult.error?.message} />
  }

  if (hasLoadedFirstPage && images.length === 0) {
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
      {(queryResult.isFetching) && (
          <p className="absolute right-0 top-0 z-1 font-medium text-tonal-50 m-2">
           <Loader2 className="animate-spin inline" /> Fetching...
        </p>)}
        {images.map((image: TUploadedImage, index: number) => (
          <Card key={image.id} image={image} index={index} />
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
