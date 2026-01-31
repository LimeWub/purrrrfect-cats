import { useMutation, useQueryClient, type UseMutationResult } from '@tanstack/react-query'
import { deleteImage } from '../api/imageMutations'
import { IMAGES_QUERY_KEY } from '../api/imagesQueryOptions'

export type DeleteImageParams = { image_id: string }

export function useDeleteImage(): UseMutationResult<Awaited<ReturnType<typeof deleteImage>>, Error, DeleteImageParams> {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ image_id }) => deleteImage(image_id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: IMAGES_QUERY_KEY })
    },
  })
}
