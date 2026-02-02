import { useQuery, type UseQueryResult } from '@tanstack/react-query'
import { getFavouritesQueryOptions } from '@/api/favouritesQueryOptions'
import type { TFavourite } from '@/types/favourite'
import { useUser } from '@/hooks/useUser'

export function useFavourites(): UseQueryResult<TFavourite[], Error> {
  const { userName } = useUser()
  return useQuery(getFavouritesQueryOptions(userName))
}
