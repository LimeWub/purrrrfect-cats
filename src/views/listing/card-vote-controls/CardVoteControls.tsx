import { useVote } from '@/hooks/useVote'
import { useDeleteVote } from '@/hooks/useDeleteVote'
import type { TSearchImage, TUploadedImage } from '@/types/image'
import { useVotes, useUserVotes } from '@/hooks/useVotes'
import type { TVotePayload } from '@/types/vote'
import { Button } from '@/components/button'
import { ButtonGroup, ButtonGroupText } from '@/components/button-group'
import { ArrowUp, ArrowDown } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/tooltip'

export const CardVoteControls = ({ imageId }: { imageId: TSearchImage['id'] | TUploadedImage['id'] }) => {
  const deleteVoteMutation = useDeleteVote()
  const votesQuery = useVotes(imageId)
  const voteCount = votesQuery.data?.reduce((acc, vote) => acc + vote.value, 0) ?? 0
  const userVoteQuery = useUserVotes(imageId)
  const voteCastByUser = userVoteQuery.data
  const isUpvoted = voteCastByUser?.value === 1
  const isDownvoted = voteCastByUser?.value === -1
  const voteMutation = useVote()

  const handleVote = (value: TVotePayload['value']) => {
    voteMutation.mutate({ image_id: imageId, value })
  }

  const handleDeleteVote = () => {
    if (!voteCastByUser) return
    deleteVoteMutation.mutate({ id: voteCastByUser.id })
  }

  return (
    <ButtonGroup orientation="horizontal" className="bg-white rounded-lg p-0.5">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button aria-label="Upvote" variant='ghost' className={isUpvoted ? 'bg-tonal-100' : ''} size="icon-sm" onClick={() => isUpvoted ? handleDeleteVote() : handleVote(1)} disabled={voteMutation.isPending}>
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
          <Button aria-label="Downvote" variant='ghost' className={isDownvoted ? 'bg-tonal-100' : ''} size="icon-sm" onClick={() => isDownvoted ? handleDeleteVote() : handleVote(-1)} disabled={voteMutation.isPending}>
            <ArrowDown />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          {isDownvoted ? 'Remove vote' : 'Downvote'}
        </TooltipContent>
      </Tooltip>
    </ButtonGroup>
  )
}
