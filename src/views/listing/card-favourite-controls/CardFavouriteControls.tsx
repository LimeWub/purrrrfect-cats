import { useFavourite } from '@/hooks/useFavourite'
import { useRemoveFavourite } from '@/hooks/useRemoveFavourite'
import type { TSearchImage, TUploadedImage } from '@/types/image'
import { useFavourites } from '@/hooks/useFavourites'
import { Button } from '@/components/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/tooltip'

export const CardFavouriteControls = ({ imageId }: { imageId: TSearchImage['id'] | TUploadedImage['id'] }) => {
  const favouriteMutation = useFavourite()
  const removeFavouriteMutation = useRemoveFavourite()
  const favouritesQuery = useFavourites()
  const favouriteId = favouritesQuery.data?.find(favourite => favourite.image_id === imageId)?.id
  const isFavourite = !!favouriteId

  const handleFavourite = () => {
    if (isFavourite) {
      removeFavouriteMutation.mutate({ id: favouriteId })
    } else {
      favouriteMutation.mutate({ image_id: imageId })
    }
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          size="icon"
          variant={null}
          onClick={handleFavourite}
          disabled={favouriteMutation.isPending}
          className='text-2xl opacity-50 hover:opacity-100 focus:opacity-100'
        >
          {isFavourite ? '❤️' : '🤍'}
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        {isFavourite ? 'In favourites' : 'Add to favourites'}
      </TooltipContent>
    </Tooltip>
  )
}
