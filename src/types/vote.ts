export type TVote = {
  id: number
  image_id: string
  sub_id?: string
  created_at: string
  value: -1 | 1
  image: {
    id: string
    url: string
  }
}

export type TVotePayload = {
  image_id: TVote['image_id']
  sub_id?: TVote['sub_id']
  value: TVote['value']
}