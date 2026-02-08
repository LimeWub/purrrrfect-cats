import { useMutation, useQueryClient } from '@tanstack/react-query'
import { uploadImage } from '@/api/imageMutations'
import { IMAGES_QUERY_KEY } from '@/api/imagesQueryOptions'
import { useUser } from '@/hooks/useUser'

export function useUploadImage() {
  const queryClient = useQueryClient()
  const { userName } = useUser()

  return useMutation({
    mutationFn: (formData: FormData) => uploadImage(formData, userName),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [...IMAGES_QUERY_KEY, 'uploaded'] })
    },
  })
}
