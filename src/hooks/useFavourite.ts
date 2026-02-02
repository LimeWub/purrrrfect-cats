import { useMutation, useQueryClient, type UseMutationResult } from '@tanstack/react-query'
import { toast } from 'sonner'
import { addFavourite } from '@/api/favouriteMutations'
import { FAVOURITES_QUERY_KEY } from '@/api/favouritesQueryOptions'
import type { TFavourite, TFavouritePayload } from '@/types/favourite'
import { useUser } from '@/hooks/useUser'

export function useFavourite(): UseMutationResult<Awaited<ReturnType<typeof addFavourite>>, Error, TFavouritePayload> {
  const queryClient = useQueryClient()
  const { userName } = useUser()
  const queryKey = [...FAVOURITES_QUERY_KEY, userName] as const
  
  const mutation = useMutation({
    mutationFn: (payload: TFavouritePayload) => addFavourite(payload, userName),
    onMutate: async (payload) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey })

      // Snapshot previous value
      const previousFavourites = queryClient.getQueryData<TFavourite[]>(queryKey)

      // Optimistically update cache
      queryClient.setQueryData<TFavourite[]>(queryKey, (old = []) => {
        // Create a temporary favourite object (will be replaced by server response)
        const tempFavourite: TFavourite = {
          id: Date.now(), // Temporary ID
          image_id: payload.image_id,
          sub_id: userName,
          created_at: new Date().toISOString(),
          image: { id: payload.image_id, url: '', mime_type: 'image/jpeg' }, // Will be populated by server
        }
        return [...old, tempFavourite]
      })

      return { previousFavourites }
    },
    onError: (err, payload, context) => {
      // Rollback on error
      if (context?.previousFavourites) {
        queryClient.setQueryData(queryKey, context.previousFavourites)
      }
      toast.error(`Failed to favourite: ${err.message}`, {
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
