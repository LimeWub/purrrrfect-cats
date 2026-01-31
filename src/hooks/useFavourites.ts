import { useQuery, type UseQueryResult } from '@tanstack/react-query'
import { getFavouritesQueryOptions } from '../api/favouritesQueryOptions'
import type { TFavourite } from '../types/favourite'

export function useFavourites(): UseQueryResult<TFavourite[], Error> {
  return useQuery(getFavouritesQueryOptions())
}
