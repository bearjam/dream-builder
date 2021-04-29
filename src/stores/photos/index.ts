import { withReducer } from "@bearjam/tom"
import { filter } from "fp-ts/ReadonlyArray"
import create from "zustand"
import { persist } from "zustand/middleware"
import { PhotoStoreAction, PhotoStoreState } from "../../types/photos"
import { UnsplashPhotoT } from "../../types/unsplash"

const initialState: PhotoStoreState = {
  photos: [],
}

const reducer = (
  state: PhotoStoreState,
  action: PhotoStoreAction
): PhotoStoreState => {
  switch (action.type) {
    case "INSERT":
      return {
        ...state,
        photos: [...state.photos, action.payload],
      }
    case "DELETE":
      return {
        ...state,
        photos: [
          ...filter<UnsplashPhotoT>((photo) => photo.id !== action.payload.id)(
            state.photos
          ),
        ],
      }
    case "DELETE_ALL":
      return {
        ...state,
        photos: [],
      }
    default:
      return state
  }
}

export const usePhotoStore = create(
  persist(withReducer(reducer, initialState), { name: "photoStore" })
)
