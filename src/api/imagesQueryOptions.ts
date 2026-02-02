import type { TImage, TUploadedImage } from "../types/image"
import type { TSearchListingParams, TUserUploadedListingParams } from "../types/listing"
import { fetchCatApi } from './apiClient'

export const IMAGES_QUERY_KEY = ['cat-images'] as const
const DEFAULT_PAGE_LIMIT = 10

function buildQueryString(params: Record<string, unknown>): string {
  return Object.entries(params)
    .filter(([_, value]) => value != null && value !== '')
    .map(([key, value]) => `${key}=${encodeURIComponent(String(value))}`)
    .join('&')
}

export function getSearchListingQueryOptions(params: Omit<TSearchListingParams, 'page'>) {
  return {
    queryKey: [...IMAGES_QUERY_KEY, 'search', params] as const,
    queryFn: async ({ pageParam = 0 }: { pageParam: number }) => {
      const queryString = buildQueryString({ ...params, page: pageParam })
      return fetchCatApi<TImage[]>(`/images/search?${queryString}`)
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage: TImage[], allPages: TImage[][]) => {
      return lastPage.length >= (params.limit ?? DEFAULT_PAGE_LIMIT) ? allPages.length : undefined
    },
  }
}


export function getUserUploadedListingQueryOptions(params: Omit<TUserUploadedListingParams, 'page'>) {
  return {
    queryKey: [...IMAGES_QUERY_KEY, 'uploaded', params] as const,
    queryFn: async ({ pageParam = 0 }: { pageParam: number }) => {
      const queryString = buildQueryString({ ...params, page: pageParam })
      return fetchCatApi<TUploadedImage[]>(`/images?${queryString}`)
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage: TUploadedImage[], allPages: TUploadedImage[][]) => {
      return lastPage.length >= (params.limit ?? DEFAULT_PAGE_LIMIT) ? allPages.length : undefined
    },
    getPreviousPageParam: (_firstPage: TUploadedImage[], allPages: TUploadedImage[][]) => {
      return allPages.length > 1 ? allPages.length - 2 : undefined // @TODO: Very much not convinced by this approach. -2 seems to be a magic number.
    },
  }
}