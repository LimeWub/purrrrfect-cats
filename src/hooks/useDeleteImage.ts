import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { deleteImage } from '@/api/imageMutations'
import { IMAGES_QUERY_KEY } from '@/api/imagesQueryOptions'

export type DeleteImageParams = { image_id: string }

export function useDeleteImage() {
  const queryClient = useQueryClient()
  
  const mutation = useMutation<Awaited<ReturnType<typeof deleteImage>>, Error, DeleteImageParams>({
    mutationFn: ({ image_id }) => deleteImage(image_id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [...IMAGES_QUERY_KEY, 'uploaded'] })
    },
    onError: (err, params) => {
      toast.error(`Failed to delete: ${err.message}`, {
        action: {
          label: 'Retry',
          onClick: () => {
            mutation.mutate(params)
          },
        },
      })
    },
  })
  
  return mutation
}
