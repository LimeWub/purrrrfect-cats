import { useSearchImages } from "@/hooks/useSearchImages"
import type { TSearchImage } from "@/types/image"
import { Card } from "../card"
import { Button } from "@/components/button"
import { LoadingErrorState } from "../loading-error-state"
import { ErrorState, ErrorStateDescription, ErrorStateTitle } from "@/components/error-state"
import { Link } from "react-router-dom"
import { Loader2 } from "lucide-react"

export const ListingExplore = () => {
  const { hasNextPage, isFetchingNextPage, isSuccess, data, error, fetchNextPage, isFetching } = useSearchImages({ limit: 20 })
  
  const images = data.pages.flat()

  if (error) {
    return <LoadingErrorState errorMessage={error?.message} />
  }

  if (isSuccess && images.length === 0) {
    return (
        <ErrorState>
          <ErrorStateTitle>No images to explore yet!</ErrorStateTitle>
          <ErrorStateDescription>Make a start by <Link className="text-primary-500 underline" to="/upload">uploading the first cat picture</Link>.</ErrorStateDescription>
        </ErrorState>
      )
    }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 relative">
        {(isFetching) && (
          <p className="absolute right-0 top-0 z-1 font-medium text-tonal-50 m-2">
           <Loader2 className="animate-spin inline" /> Fetching...
        </p>)}
        {images.map((image: TSearchImage, index: number) => (
          <Card key={image.id} image={image} index={index} />
        ))}
      </div>
      {hasNextPage && (
        <Button
          className="mt-4 mx-auto block"
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
        >
          {isFetchingNextPage ? 'Loading...' : 'Load More'}
        </Button>
      )}
    </>
  )
}
