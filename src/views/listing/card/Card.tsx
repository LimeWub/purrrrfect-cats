import { useVote } from '@/hooks/useVote'
import { useDeleteVote } from '@/hooks/useDeleteVote'
import { useFavourite } from '@/hooks/useFavourite'
import { useRemoveFavourite } from '@/hooks/useRemoveFavourite'
import type { TImage, TUploadedImage } from '@/types/image'
import { useVotes } from '@/hooks/useVotes'
import type { TVotePayload } from '@/types/vote'
import { useFavourites } from '@/hooks/useFavourites'
import { useUser } from '@/context/UserContext'
import { Button } from '@/components/button'
import { ButtonGroup, ButtonGroupText } from '@/components/button-group'
import { ArrowUp, ArrowDown } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/tooltip'

export const Card = ({ image }: { image: TImage | TUploadedImage }) => {
  const { userName } = useUser()
  const deleteVoteMutation = useDeleteVote()
  const votesQuery = useVotes()
  const votes = votesQuery.data?.filter(vote => vote.image_id === image.id)
  const voteCount = votes?.reduce((acc, vote) => acc + vote.value, 0) ?? 0
  const voteCastByUser = votes?.find(vote => vote.sub_id === userName)
  const isUpvoted = voteCastByUser?.value === 1
  const isDownvoted = voteCastByUser?.value === -1
  const voteMutation = useVote()

  const handleVote = (value: TVotePayload['value']) => {
    const payload: TVotePayload = { image_id: image.id, value }
    if (userName) {
      payload.sub_id = userName
    }
    voteMutation.mutate(payload)
  }

  const favouriteMutation = useFavourite()
  const removeFavouriteMutation = useRemoveFavourite()
  const favouritesQuery = useFavourites()
  const favouriteId = favouritesQuery.data?.find(favourite => favourite.image_id === image.id)?.id
  const isFavourite = !!favouriteId

  const handleFavourite = () => {
    if (isFavourite) {
      removeFavouriteMutation.mutate(favouriteId)
    } else {
      favouriteMutation.mutate(image.id)
    }
  }

  return (
    <div className="relative">
      <img
        src={image.url}
        className="w-full h-full object-cover rounded-sm min-h-48 md:aspect-square"
        alt='' // There is no helpful description for these cat images unfortunately
        loading="lazy"
      />
      <div className="p-2 absolute bottom-0 left-0 w-full flex justify-between items-center">
        <ButtonGroup orientation="horizontal" className="bg-white rounded-lg p-0.5">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant='ghost' className={isUpvoted ? 'bg-tonal-100' : ''} size="icon-sm" onClick={() => isUpvoted ? deleteVoteMutation.mutate(voteCastByUser?.id) : handleVote(1)} disabled={voteMutation.isPending}>
                <ArrowUp />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              {isUpvoted ? 'Remove vote' : 'Upvote'}
            </TooltipContent>
          </Tooltip>
          <ButtonGroupText className='border-none bg-transparent'>
            <p className="text-sm font-medium text-muted-foreground">{voteCount}</p>
          </ButtonGroupText>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant='ghost' className={isDownvoted ? 'bg-tonal-100' : ''} size="icon-sm" onClick={() => isDownvoted ? deleteVoteMutation.mutate(voteCastByUser?.id) : handleVote(-1)} disabled={voteMutation.isPending}>
                <ArrowDown />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              {isDownvoted ? 'Remove vote' : 'Downvote'}
            </TooltipContent>
          </Tooltip>
        </ButtonGroup>
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
      </div>
    </div>
  )
}
