import { useMutation, useQueryClient, type UseMutationResult } from '@tanstack/react-query'
import { toast } from 'sonner'
import { removeFavourite } from '@/api/favouriteMutations'
import { FAVOURITES_QUERY_KEY } from '@/api/favouritesQueryOptions'
import type { TFavourite, TRemoveFavouritePayload } from '@/types/favourite'
import { useUser } from '@/context/UserContext'

export function useRemoveFavourite(): UseMutationResult<Awaited<ReturnType<typeof removeFavourite>>, Error, TRemoveFavouritePayload> {
  const queryClient = useQueryClient()
  const { userName } = useUser()
  const queryKey = [...FAVOURITES_QUERY_KEY, userName] as const
  
  const mutation = useMutation({
    mutationFn: removeFavourite,
    onMutate: async (payload) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey })

      // Snapshot previous value
      const previousFavourites = queryClient.getQueryData<TFavourite[]>(queryKey)

      // Optimistically update cache
      queryClient.setQueryData<TFavourite[]>(queryKey, (old = []) => {
        return old.filter(favourite => favourite.id !== payload.id)
      })

      return { previousFavourites }
    },
    onError: (err, payload, context) => {
      // Rollback on error
      if (context?.previousFavourites) {
        queryClient.setQueryData(queryKey, context.previousFavourites)
      }
      toast.error(`Failed to remove favourite: ${err.message}`, {
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
      queryClient.invalidateQueries({ queryKey })
    },
  })
  
  return mutation
}
