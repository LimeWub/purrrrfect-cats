import { useFavourites } from "@/hooks/useFavourites"
import type { TSearchImage, TUploadedImage } from "@/types/image"
import { Card } from "../card/Card"
import { ErrorState, ErrorStateTitle, ErrorStateDescription } from "@/components/error-state"
import { LoadingErrorState } from "../loading-error-state"

export const ListingFavourites = () => {
  const favouritesQueryResult = useFavourites()

  const favouritesImages = favouritesQueryResult.data?.map(favourite => favourite.image) ?? []
  const favouritesHasLoadedFirstPage = (favouritesQueryResult.data?.length ?? 0) > 0

  if (favouritesQueryResult.isLoading) {
    return <div>Loader/Spinner/Suspense here</div>
  }

  if (favouritesQueryResult.error) {
    return <LoadingErrorState errorMessage={favouritesQueryResult.error?.message} />
  }

  if (favouritesHasLoadedFirstPage && favouritesImages.length === 0) {
    return (
      <ErrorState>
        <ErrorStateTitle>No favourites yet!</ErrorStateTitle>
        <ErrorStateDescription>Start favouriting cats to see them here.</ErrorStateDescription>
      </ErrorState>
    )
  }

  if (favouritesImages.length === 0) {
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
        {favouritesImages.map((image: TSearchImage | TUploadedImage) => (
          <Card key={image.id} image={image} />
        ))}
      </div>
      {/* @TODO: Favourites pagination doesn't exist yet but could be good in future */}
    </>
  )
}
