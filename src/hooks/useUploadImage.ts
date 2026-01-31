import { useMutation, useQueryClient, type UseMutationResult } from '@tanstack/react-query'
import { uploadImage } from '../api/imageMutations'
import { IMAGES_QUERY_KEY } from '../api/imagesQueryOptions'

export function useUploadImage(): UseMutationResult<Awaited<ReturnType<typeof uploadImage>>, Error, FormData> {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: uploadImage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: IMAGES_QUERY_KEY })
    },
  })
}
