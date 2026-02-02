import { useVote } from '@/hooks/useVote'
import { useDeleteVote } from '@/hooks/useDeleteVote'
import { useFavourite } from '@/hooks/useFavourite'
import { useRemoveFavourite } from '@/hooks/useRemoveFavourite'
import type { TSearchImage, TUploadedImage } from '@/types/image'
import { useVotes, useUserVotes } from '@/hooks/useVotes'
import type { TVotePayload } from '@/types/vote'
import { useFavourites } from '@/hooks/useFavourites'
import { Button } from '@/components/button'
import { ButtonGroup, ButtonGroupText } from '@/components/button-group'
import { ArrowUp, ArrowDown } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/tooltip'

export const Card = ({ image }: { image: TSearchImage | TUploadedImage }) => {
  const deleteVoteMutation = useDeleteVote()
  const votesQuery = useVotes(image.id)
  const voteCount = votesQuery.data?.reduce((acc, vote) => acc + vote.value, 0) ?? 0
  const userVoteQuery = useUserVotes(image.id)
  const voteCastByUser = userVoteQuery.data
  const isUpvoted = voteCastByUser?.value === 1
  const isDownvoted = voteCastByUser?.value === -1
  const voteMutation = useVote()

  const handleVote = (value: TVotePayload['value']) => {
    voteMutation.mutate({ image_id: image.id, value })
  }

  const handleDeleteVote = () => {
    if (!voteCastByUser) return
    deleteVoteMutation.mutate({ id: voteCastByUser.id })
  }

  const favouriteMutation = useFavourite()
  const removeFavouriteMutation = useRemoveFavourite()
  const favouritesQuery = useFavourites()
  const favouriteId = favouritesQuery.data?.find(favourite => favourite.image_id === image.id)?.id
  const isFavourite = !!favouriteId

  const handleFavourite = () => {
    if (isFavourite) {
      removeFavouriteMutation.mutate({ id: favouriteId })
    } else {
      favouriteMutation.mutate({ image_id: image.id })
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
              <Button variant='ghost' className={isUpvoted ? 'bg-tonal-100' : ''} size="icon-sm" onClick={() => isUpvoted ? handleDeleteVote() : handleVote(1)} disabled={voteMutation.isPending}>
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
              <Button variant='ghost' className={isDownvoted ? 'bg-tonal-100' : ''} size="icon-sm" onClick={() => isDownvoted ? handleDeleteVote() : handleVote(-1)} disabled={voteMutation.isPending}>
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
