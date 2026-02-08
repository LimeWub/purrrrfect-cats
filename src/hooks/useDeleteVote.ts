import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { deleteVote } from '@/api/voteMutations'
import { VOTES_QUERY_KEY } from '@/api/votesQueryOptions'
import type { TVote } from '@/types/vote'

export function useDeleteVote() {
  const queryClient = useQueryClient()
  
  const mutation = useMutation({
    mutationFn: deleteVote,
    onMutate: async (payload) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: VOTES_QUERY_KEY })

      // Snapshot previous value
      const previousVotes = queryClient.getQueryData<TVote[]>(VOTES_QUERY_KEY)

      // Optimistically update cache - remove the vote
      queryClient.setQueryData<TVote[]>(VOTES_QUERY_KEY, (old = []) => {
        return old.filter(vote => vote.id !== payload.id)
      })

      return { previousVotes }
    },
    onError: (err, payload, context) => {
      // Rollback on error
      if (context?.previousVotes) {
        queryClient.setQueryData(VOTES_QUERY_KEY, context.previousVotes)
      }
      toast.error(`Failed to delete vote: ${err.message}`, {
        action: {
          label: 'Retry',
          onClick: () => {
            mutation.mutate(payload)
          },
        },
      })
    },
    onSettled: () => {
      // Refetch to ensure consistency with server
      queryClient.invalidateQueries({ queryKey: VOTES_QUERY_KEY })
    },
  })
  
  return mutation
}
