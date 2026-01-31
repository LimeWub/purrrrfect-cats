import { fetchCatApi } from './apiClient'

export function uploadImage(formData: FormData) {
  return fetchCatApi<{ id: number }>('/images/upload', {
    method: 'POST',
    body: formData,
  })
}

export function deleteImage(image_id: string) {
  return fetchCatApi<void>(`/images/${image_id}`, {
    method: 'DELETE',
  })
}
