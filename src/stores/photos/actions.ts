import { InsertPhotoAction } from "../../types/photos"
import { UnsplashPhotoT } from "../../types/unsplash"

export const insertUnsplashPhoto = (
  photo: UnsplashPhotoT
): InsertPhotoAction => ({
  type: "INSERT",
  payload: photo,
})
