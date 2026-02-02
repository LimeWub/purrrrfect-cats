export type TSearchImage = {
    id: string
    url: string
    width?: number
    height?: number
    mime_type: string
    breeds?: Array<{
      id: string
      name: string
      temperament?: string
      origin?: string
    }>
    favourite?: boolean
    categories?: Array<{
      id: number
      name: string
    }>
  }

  export type TUploadedImage = {
    id: string
    url: string
    sub_id: string
    width: number
    height: number
    original_filename: string
    pending: number
    approved: number
  }