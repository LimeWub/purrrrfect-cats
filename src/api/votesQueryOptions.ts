import { queryOptions } from '@tanstack/react-query'
import { fetchCatApi } from './apiClient'
import type { TVote } from '@/types/vote'

export const VOTES_QUERY_KEY = ['votes'] as const

export function getVotesQueryOptions() {
  return queryOptions({
    queryKey: VOTES_QUERY_KEY,
    queryFn: () => fetchCatApi<TVote[]>('/votes'),
  })
}
