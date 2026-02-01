import { fetchCatApi } from './apiClient'

export function addFavourite(image_id: string, sub_id: string) {
  return fetchCatApi<{ id: number }>('/favourites', {
    method: 'POST',
    body: JSON.stringify({
      image_id, 
      ...(sub_id && { sub_id })
    }),
  })
}

export function removeFavourite(favourite_id: number) {
  return fetchCatApi<void>(`/favourites/${favourite_id}`, { method: 'DELETE' })
}
