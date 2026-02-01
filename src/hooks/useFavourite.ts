import { useMutation, useQueryClient, type UseMutationResult } from '@tanstack/react-query'
import { toast } from 'sonner'
import { addFavourite } from '../api/favouriteMutations'
import { FAVOURITES_QUERY_KEY } from '../api/favouritesQueryOptions'
import type { TFavourite } from '../types/favourite'
const API_USER = import.meta.env.VITE_CAT_API_USER ?? ''

export function useFavourite(): UseMutationResult<Awaited<ReturnType<typeof addFavourite>>, Error, string> {
  const queryClient = useQueryClient()
  
  const mutation = useMutation({
    mutationFn: addFavourite,
    onMutate: async (image_id) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: FAVOURITES_QUERY_KEY })

      // Snapshot previous value
      const previousFavourites = queryClient.getQueryData<TFavourite[]>(FAVOURITES_QUERY_KEY)

      // Optimistically update cache
      queryClient.setQueryData<TFavourite[]>(FAVOURITES_QUERY_KEY, (old = []) => {
        // Create a temporary favourite object (will be replaced by server response)
        const tempFavourite: TFavourite = {
          id: Date.now(), // Temporary ID
          image_id,
          sub_id: API_USER,
          created_at: new Date().toISOString(),
          image: { id: image_id, url: '', mime_type: 'image/jpeg' }, // Will be populated by server
        }
        return [...old, tempFavourite]
      })

      return { previousFavourites }
    },
    onError: (err, image_id, context) => {
      // Rollback on error
      if (context?.previousFavourites) {
        queryClient.setQueryData(FAVOURITES_QUERY_KEY, context.previousFavourites)
      }
      toast.error(`Failed to favourite: ${err.message}`, {
        action: {
          label: 'Retry',
          onClick: () => {
            mutation.mutate(image_id)
          },
        },
      })
    },
    onSettled: () => {
      // Refetch to ensure consistency with server
      queryClient.invalidateQueries({ queryKey: FAVOURITES_QUERY_KEY })
    },
  })
  
  return mutation
}
