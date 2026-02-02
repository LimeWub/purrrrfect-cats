import { queryOptions } from '@tanstack/react-query'
import { fetchCatApi } from './apiClient'
import type { TFavourite } from '../types/favourite'

export const FAVOURITES_QUERY_KEY = ['favourites'] as const

export function getFavouritesQueryOptions(sub_id?: string) {
  const queryParams = sub_id ? `?sub_id=${encodeURIComponent(sub_id)}` : ''
  return queryOptions({
    queryKey: [...FAVOURITES_QUERY_KEY, sub_id] as const,
    queryFn: () => fetchCatApi<TFavourite[]>(`/favourites${queryParams}`),
  })
}
