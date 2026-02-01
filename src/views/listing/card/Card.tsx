import { useVote } from '@/hooks/useVote'
import { useDeleteVote } from '@/hooks/useDeleteVote'
import { useFavourite } from '@/hooks/useFavourite'
import { useRemoveFavourite } from '@/hooks/useRemoveFavourite'
import { useDeleteImage } from '@/hooks/useDeleteImage'
import type { TImage } from '@/types/image'
import './Card.css'
import { useVotes } from '@/hooks/useVotes'
import type { TVotePayload } from '@/types/vote'
import { useFavourites } from '@/hooks/useFavourites'
const API_USER = import.meta.env.VITE_CAT_API_USER ?? ''

export const Card = ({ image }: { image: TImage }) => {
    const deleteMutation = useDeleteImage()
    const deleteVoteMutation = useDeleteVote()
    const votesQuery = useVotes()
    const votes = votesQuery.data?.filter(vote => vote.image_id === image.id)
    const voteCount = votes?.reduce((acc, vote) => acc + vote.value, 0) ?? 0
    const voteCastByUser = votes?.find(vote => vote.sub_id === API_USER)
    const isUpvoted = voteCastByUser?.value === 1
    const isDownvoted =  voteCastByUser?.value === -1
    const voteMutation = useVote()
  
    const handleVote = (value: TVotePayload['value']) => {
      voteMutation.mutate({ image_id: image.id, sub_id: API_USER, value })
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
  
    const handleDelete = () => {
      if (window.confirm('Are you sure you want to delete this image?')) {
        deleteMutation.mutate({ image_id: image.id })
      }
    }
  
    return (
      <div className="card">
        <img 
          src={image.url} 
          alt={image.breeds?.[0]?.name || 'Cat'} 
          loading="lazy"
        />
        <div className="card__actions">
          <button
            onClick={() => isUpvoted ? deleteVoteMutation.mutate(voteCastByUser?.id) : handleVote(1)}
            disabled={voteMutation.isPending}
            className={`card__button card__button--upvote ${isUpvoted ? 'active' : ''}`}
            title="Upvote"
          >
            ↑
          </button>
          <button
            onClick={() => isDownvoted ? deleteVoteMutation.mutate(voteCastByUser?.id) : handleVote(-1)}
            disabled={voteMutation.isPending}
            className={`vote-button downvote ${isDownvoted ? 'active' : ''}`}
            title="Downvote"
          >
            ↓
          </button>
          <span className="vote-count">{voteCount}</span>
          <button
            onClick={handleFavourite}
            disabled={favouriteMutation.isPending}
            className={`favourite-button ${isFavourite ? 'active' : ''}`}
            title={isFavourite ? 'Remove favourite' : 'Add favourite'}
          >
            {isFavourite ? '❤️' : '🤍'}
          </button>
          <button
            onClick={handleDelete}
            disabled={deleteMutation.isPending}
            className="delete-button"
            title="Delete image"
          >
            🗑️
          </button>
        </div>
  
        {/* {image.breeds?.[0] && (
          <div className="card__info">
            <p className="card__info-name">{image.breeds[0].name}</p>
          </div>
        )} */}
      </div>
    )
  }
  