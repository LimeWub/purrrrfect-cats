import { fetchCatApi } from './apiClient'
const API_USER = import.meta.env.VITE_CAT_API_USER ?? ''

export function addFavourite(image_id: string) {
  return fetchCatApi<{ id: number }>('/favourites', {
    method: 'POST',
    body: JSON.stringify({ image_id, sub_id: API_USER }),
  })
}

export function removeFavourite(favourite_id: number) {
  return fetchCatApi<void>(`/favourites/${favourite_id}`, { method: 'DELETE' })
}
