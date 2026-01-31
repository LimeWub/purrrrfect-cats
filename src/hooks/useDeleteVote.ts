import { useMutation, useQueryClient, type UseMutationResult } from '@tanstack/react-query'
import { deleteVote } from '../api/voteMutations'
import { VOTES_QUERY_KEY } from '../api/votesQueryOptions'
import type { TVote } from '../types/vote'

export function useDeleteVote(): UseMutationResult<Awaited<ReturnType<typeof deleteVote>>, Error, number> {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: deleteVote,
    onMutate: async (voteId) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: VOTES_QUERY_KEY })

      // Snapshot previous value
      const previousVotes = queryClient.getQueryData<TVote[]>(VOTES_QUERY_KEY)

      // Optimistically update cache - remove the vote
      queryClient.setQueryData<TVote[]>(VOTES_QUERY_KEY, (old = []) => {
        return old.filter(vote => vote.id !== voteId)
      })

      return { previousVotes }
    },
    onError: (_err, _voteId, context) => {
      // Rollback on error
      if (context?.previousVotes) {
        queryClient.setQueryData(VOTES_QUERY_KEY, context.previousVotes)
      }
    },
    onSettled: () => {
      // Refetch to ensure consistency with server
      queryClient.invalidateQueries({ queryKey: VOTES_QUERY_KEY })
    },
  })
}
