import { useSuspenseInfiniteQuery } from '@tanstack/react-query'
import { getUserUploadedListingQueryOptions } from '@/api/imagesQueryOptions'
import type { TUserUploadedListingParams } from '@/types/listing'

export function useUserUploadedImages(params: TUserUploadedListingParams) {
  return useSuspenseInfiniteQuery(getUserUploadedListingQueryOptions(params))
}
