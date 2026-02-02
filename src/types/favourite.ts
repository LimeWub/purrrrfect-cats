import type { TSearchImage, TUploadedImage } from "./image"

export type TFavourite = {
  id: number
  image_id: string
  sub_id?: string
  created_at: string
  image: TSearchImage | TUploadedImage
}

export type TFavouritePayload = {
  image_id: TFavourite['image_id']
}

export type TRemoveFavouritePayload = {
  id: TFavourite['id']
}