import { fetchCatApi } from './apiClient'
import type { TVotePayload } from '../types/vote'


export function voteCat(payload: TVotePayload) {
  return fetchCatApi<{ id: number }>('/votes', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export function deleteVote(vote_id: number) {
  return fetchCatApi<void>(`/votes/${vote_id}`, { method: 'DELETE' })
}
