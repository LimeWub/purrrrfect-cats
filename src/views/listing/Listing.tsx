import { useUserUploadedImages } from "@/hooks/useUserUploadedImages"
import type { TImage } from "@/types/image"
const API_USER = import.meta.env.VITE_CAT_API_USER ?? ''
import { Card } from "./card/Card"
import type { HTMLAttributes } from "react"
import { Button } from "@/components/button/Button"
// import { ErrorState } from "@/components/error-state/ErrorState"

export const Listing = (props:  HTMLAttributes<HTMLDivElement>) => {
    const queryResult = useUserUploadedImages({ limit: 20, sub_id: API_USER })
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, error } = queryResult
  
    const allImages = data?.pages.flat() ?? []
    const hasLoadedFirstPage = (data?.pages.length ?? 0) > 0
  
    if (isLoading) {
      return <div>Loader/Spinner/Suspense here</div>
    }
  
    if (error) {
      return (
    //   <ErrorState className="listing__error">
    //     <ErrorState.Title>Error loading</ErrorState.Title>
    //     <ErrorState.Description>{error.message}</ErrorState.Description>
    //   </ErrorState>
    <div>Error loading: {error.message}</div>)
    }
  
    return (
      <div className="listing" {...props}>
        <div className="listing__grid">
          {allImages.map((image: TImage) => (
            <Card key={image.id} image={image} />
          ))}
        </div>
        {hasLoadedFirstPage && hasNextPage && (
          <div className="listing__load-more">
            <Button
              onClick={() => fetchNextPage()}
              disabled={isFetchingNextPage}
            >
              {isFetchingNextPage ? 'Loading...' : 'Load More Cats 🐱'}
            </Button>
          </div>
        )}
        {/* {!hasNextPage && allImages.length > 0 && (
          <div className="listing__end">No more cats to load</div>
        )} */}
      </div>
    )
  }