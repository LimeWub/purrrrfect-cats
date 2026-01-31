import { useMutation, useQueryClient, type UseMutationResult } from '@tanstack/react-query'
import { removeFavourite } from '../api/favouriteMutations'
import { FAVOURITES_QUERY_KEY } from '../api/favouritesQueryOptions'
import type { TFavourite } from '../types/favourite'

export function useRemoveFavourite(): UseMutationResult<Awaited<ReturnType<typeof removeFavourite>>, Error, number> {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: removeFavourite,
    onMutate: async (favouriteId) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: FAVOURITES_QUERY_KEY })

      // Snapshot previous value
      const previousFavourites = queryClient.getQueryData<TFavourite[]>(FAVOURITES_QUERY_KEY)

      // Optimistically update cache
      queryClient.setQueryData<TFavourite[]>(FAVOURITES_QUERY_KEY, (old = []) => {
        return old.filter(favourite => favourite.id !== favouriteId)
      })

      return { previousFavourites }
    },
    onError: (_err, _favouriteId, context) => {
      // Rollback on error
      if (context?.previousFavourites) {
        queryClient.setQueryData(FAVOURITES_QUERY_KEY, context.previousFavourites)
      }
    },
    onSettled: () => {
      // Refetch to ensure consistency with server
      queryClient.invalidateQueries({ queryKey: FAVOURITES_QUERY_KEY })
    },
  })
}
