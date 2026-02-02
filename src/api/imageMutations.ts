import { fetchCatApi } from './apiClient'

export function uploadImage(formData: FormData, sub_id?: string) {
  if (sub_id) {
    formData.append('sub_id', sub_id)
  }
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
