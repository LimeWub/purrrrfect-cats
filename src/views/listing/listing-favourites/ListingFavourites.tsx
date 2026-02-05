import { useFavourites } from "@/hooks/useFavourites"
import type { TSearchImage, TUploadedImage } from "@/types/image"
import { Card } from "../card"
import { ErrorState, ErrorStateTitle, ErrorStateDescription } from "@/components/error-state"
import { LoadingErrorState } from "../loading-error-state"
import { LoadingSkeleton } from "../loading-skeleton"

export const ListingFavourites = () => {
  const { isLoading, error, isSuccess, data } = useFavourites()
  const images = data?.map(favourite => favourite.image) ?? []

  if (isLoading) { // Favourites does not use Suspense so we handle this here
    return <LoadingSkeleton />
  }

  if (error) {
    return <LoadingErrorState errorMessage={error.message} />
  }

  if (isSuccess && images.length === 0) {
    return (
      <ErrorState>
        <ErrorStateTitle>No favourites yet!</ErrorStateTitle>
        <ErrorStateDescription>Start favouriting cats to see them here.</ErrorStateDescription>
      </ErrorState>
    )
  }

  if (images.length === 0) {
    return (
      <ErrorState>
        <ErrorStateTitle>Could not load favourites!</ErrorStateTitle>
        <ErrorStateDescription>Make sure you are logged in and try again.</ErrorStateDescription>
      </ErrorState>
    )
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image: TSearchImage | TUploadedImage, index: number) => (
          <Card key={image.id} image={image} index={index} />
        ))}
      </div>
      {/* Favourites pagination doesn't exist yet but could be good in future */}
    </>
  )
}
