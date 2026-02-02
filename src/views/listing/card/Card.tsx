import type { TSearchImage, TUploadedImage } from '@/types/image'
import { CardVoteControls } from '../card-vote-controls/CardVoteControls'
import { CardFavouriteControls } from '../card-favourite-controls/CardFavouriteControls'
import { CardLightbox, CardLightboxTrigger, CardLightboxContent } from '../card-lightbox'

export const Card = ({ image }: { image: TSearchImage | TUploadedImage }) => {

  return (
    <div className="relative">
      <CardLightbox>
        <CardLightboxTrigger className="w-full h-full pointer-events-none sm:pointer-events-auto">
          <img
            src={image.url}
            className="w-full h-full object-cover rounded-sm min-h-48 sm:aspect-square"
            alt='' // There is no helpful description for these cat images unfortunately
            loading="lazy"
          />
        </CardLightboxTrigger>
        <CardLightboxContent image={image} />
      </CardLightbox>
      <div className="p-2 absolute bottom-0 left-0 w-full flex justify-between items-center">
        <CardVoteControls imageId={image.id} />
        <CardFavouriteControls imageId={image.id} />
      </div>
    </div>
  )
}
