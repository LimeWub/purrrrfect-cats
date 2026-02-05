import { useQuery } from '@tanstack/react-query'
import { getFavouritesQueryOptions } from '@/api/favouritesQueryOptions'
import { useUser } from '@/hooks/useUser'

export function useFavourites() {
  const { userName } = useUser()
  return useQuery(getFavouritesQueryOptions(userName))
}
