import { useQuery, type UseQueryResult } from '@tanstack/react-query'
import { getVotesQueryOptions } from '../api/votesQueryOptions'
import type { TVote } from '../types/vote'

export function useVotes(): UseQueryResult<TVote[], Error> {
  return useQuery(getVotesQueryOptions())
}
