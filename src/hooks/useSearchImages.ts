import { useInfiniteQuery } from '@tanstack/react-query'
import { getSearchListingQueryOptions } from '@/api/imagesQueryOptions'
import type { TSearchListingParams } from '@/types/listing'

export function useSearchImages(params: Omit<TSearchListingParams, 'page'>) {
  return useInfiniteQuery(getSearchListingQueryOptions(params))
}
