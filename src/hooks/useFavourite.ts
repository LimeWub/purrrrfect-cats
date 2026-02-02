import { useMutation, useQueryClient, type UseMutationResult } from '@tanstack/react-query'
import { toast } from 'sonner'
import { addFavourite } from '../api/favouriteMutations'
import { FAVOURITES_QUERY_KEY } from '../api/favouritesQueryOptions'
import type { TFavourite } from '../types/favourite'
import { useUser } from '../context/UserContext'

export function useFavourite(): UseMutationResult<Awaited<ReturnType<typeof addFavourite>>, Error, string> {
  const queryClient = useQueryClient()
  const { userName } = useUser()
  const queryKey = [...FAVOURITES_QUERY_KEY, userName] as const
  
  const mutation = useMutation({
    mutationFn: (image_id: string) => addFavourite(image_id, userName),
    onMutate: async (image_id) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey })

      // Snapshot previous value
      const previousFavourites = queryClient.getQueryData<TFavourite[]>(queryKey)

      // Optimistically update cache
      queryClient.setQueryData<TFavourite[]>(queryKey, (old = []) => {
        // Create a temporary favourite object (will be replaced by server response)
        const tempFavourite: TFavourite = {
          id: Date.now(), // Temporary ID
          image_id,
          sub_id: userName,
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
        queryClient.setQueryData(queryKey, context.previousFavourites)
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
      queryClient.invalidateQueries({ queryKey })
    },
  })
  
  return mutation
}
