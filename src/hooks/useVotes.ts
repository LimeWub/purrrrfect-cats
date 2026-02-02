import { useQuery, type UseQueryResult } from '@tanstack/react-query'
import { getVotesQueryOptions } from '@/api/votesQueryOptions'
import type { TVote } from '@/types/vote'
import { useUser } from '@/context/UserContext'

export function useVotes(imageId?: string): UseQueryResult<TVote[], Error> {
  const baseOptions = getVotesQueryOptions()
  
  return useQuery({
    ...baseOptions,
    select: imageId 
      ? (data: TVote[]) => data.filter(vote => vote.image_id === imageId)
      : undefined,
  })
}

export function useUserVotes(
  imageId: string
): UseQueryResult<TVote | undefined, Error> {
  const baseOptions = getVotesQueryOptions()
  const { userName } = useUser()
  
  return useQuery({
    ...baseOptions,
    select: (data: TVote[]): TVote | undefined => {
      if (!userName) return undefined
      return data.find(vote => vote.image_id === imageId && vote.sub_id === userName)
    },
    enabled: !!userName
  })
}