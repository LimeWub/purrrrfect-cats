import { queryOptions } from '@tanstack/react-query'
import { fetchCatApi } from './apiClient'
import type { TFavourite } from '../types/favourite'

export const FAVOURITES_QUERY_KEY = ['favourites'] as const

export function getFavouritesQueryOptions() {
  return queryOptions({
    queryKey: FAVOURITES_QUERY_KEY,
    queryFn: () => fetchCatApi<TFavourite[]>('/favourites'),
  })
}
