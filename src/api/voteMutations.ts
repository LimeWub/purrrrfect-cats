import { fetchCatApi } from './apiClient'
import type { TVotePayload, TDeleteVotePayload } from '@/types/vote'

export function voteCat(payload: TVotePayload, sub_id?: string) {
  return fetchCatApi<{ id: number }>('/votes', {
    method: 'POST',
    body: JSON.stringify({ ...payload, ...(sub_id && { sub_id }) }),
  })
}

export function deleteVote(payload: TDeleteVotePayload) {
  return fetchCatApi<void>(`/votes/${payload.id}`, { method: 'DELETE' })
}
