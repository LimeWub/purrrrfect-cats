import { useMutation, useQueryClient, type UseMutationResult } from '@tanstack/react-query'
import { voteCat } from '../api/voteMutations'
import { VOTES_QUERY_KEY } from '../api/votesQueryOptions'
import type { TVote, TVotePayload } from '../types/vote'

export function useVote(): UseMutationResult<Awaited<ReturnType<typeof voteCat>>, Error, TVotePayload> {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: voteCat,
    onMutate: async (newVote) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: VOTES_QUERY_KEY })

      // Snapshot previous value
      const previousVotes = queryClient.getQueryData<TVote[]>(VOTES_QUERY_KEY)

      // Optimistically update cache
      queryClient.setQueryData<TVote[]>(VOTES_QUERY_KEY, (old = []) => {
        const tempVote: TVote = {
          id: Date.now(), // Temporary ID
          image_id: newVote.image_id,
          sub_id: newVote.sub_id,
          value: newVote.value,
          created_at: new Date().toISOString(),
          image: { id: newVote.image_id, url: '' },
        }
        
        if (newVote.sub_id) return [...old.filter(vote => vote.image_id !== newVote.image_id), tempVote]
        return [...old, tempVote]
      })

      return { previousVotes }
    },
    onError: (_err, _newVote, context) => {
      // Rollback on error
      if (context?.previousVotes) {
        queryClient.setQueryData(VOTES_QUERY_KEY, context.previousVotes)
      }
    },
    onSettled: () => {
      // Refetch to get the real vote data from server
      queryClient.invalidateQueries({ queryKey: VOTES_QUERY_KEY })
    },
  })
}
