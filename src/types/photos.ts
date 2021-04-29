import { UnsplashPhotoT } from "./unsplash"

export type PhotoStoreState = {
  photos: UnsplashPhotoT[]
}

export type InsertPhotoAction = {
  type: "INSERT"
  payload: UnsplashPhotoT
}

export type DeletePhotoAction = {
  type: "DELETE"
  payload: {
    id: string
  }
}

export type DeleteAllPhotosAction = {
  type: "DELETE_ALL"
}

export type PhotoStoreAction =
  | InsertPhotoAction
  | DeletePhotoAction
  | DeleteAllPhotosAction
