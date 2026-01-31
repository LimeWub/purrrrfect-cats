export type TSearchListingParams = Partial<{
    size: 'full' | 'med' | 'small'
    mime_types: string
    has_breeds: boolean
    order: 'DESC' | 'ASC' | 'RANDOM'
    page: number
    limit: number
    include_breeds: number
    include_categories: number
  }>

  export type TUserUploadedListingParams = Partial<{
    order: 'DESC' | 'ASC' | 'RANDOM'
    page: number
    limit: number
    sub_id: string
  }>