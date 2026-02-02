import { fetchCatApi } from './apiClient'
import type { TFavouritePayload, TRemoveFavouritePayload } from '@/types/favourite'

export function addFavourite(payload: TFavouritePayload, sub_id?: string) {
  return fetchCatApi<{ id: number }>('/favourites', {
    method: 'POST',
    body: JSON.stringify({
      ...payload,
      ...(sub_id && { sub_id })
    }),
  })
}

export function removeFavourite(payload: TRemoveFavouritePayload) {
  return fetchCatApi<void>(`/favourites/${payload.id}`, { method: 'DELETE' })
}
