import type { TSearchImage, TUploadedImage } from "../types/image"
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
      return fetchCatApi<TSearchImage[]>(`/images/search?${queryString}`)
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage: TSearchImage[], allPages: TSearchImage[][]) => {
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
  }
}
