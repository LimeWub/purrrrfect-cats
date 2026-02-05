import { useSuspenseInfiniteQuery } from '@tanstack/react-query'
import { getSearchListingQueryOptions } from '@/api/imagesQueryOptions'
import type { TSearchListingParams } from '@/types/listing'

export function useSearchImages(params: TSearchListingParams) {
  return useSuspenseInfiniteQuery(getSearchListingQueryOptions(params))
}
