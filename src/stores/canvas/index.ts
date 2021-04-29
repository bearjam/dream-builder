import { withUndoableReducer } from "@bearjam/tom"
import { pipe } from "fp-ts/function"
import produce, { Draft } from "immer"
import { WritableDraft } from "immer/dist/internal"
import executeCrop from "lib/crop"
import localForage from "localforage"
import create from "zustand"
import { persist } from "zustand/middleware"
import { CanvasAction, CanvasItemT, CanvasState } from "../../types/canvas"

const initialState: CanvasState = {
  mode: "SELECT",
  items: [],
  selectedItems: [],
  crop: null,
}

const reducer = (state: CanvasState, action: CanvasAction): CanvasState => {
  switch (action.type) {
    case "EXECUTE_CROP":
      if (state.crop === null) return state
      const { htmlImage, inset, itemId } = state.crop
      return {
        ...produce(state, (draft) => {
          const i = draft.items.findIndex((item) => item.id === itemId)
          if (i !== -1) {
            draft.items[i] = {
              ...draft.items[i],
              ...executeCrop(htmlImage, inset),
            } as CanvasItemT
          }
        }),
        crop: null,
      }
    case "CLEAR_CROP_INSET": {
      return {
        ...state,
        crop: null,
      }
    }
    case "UPDATE_CROP_INSET": {
      return {
        ...state,
        crop: action.payload,
      }
    }
    case "SELECT_ITEM":
      return pipe(
        state,
        produce((draft) => {
          draft.selectedItems = [action.payload.itemId]
        }),
        produce((draft) => {
          const i = draft.items.findIndex(
            (item: CanvasItemT) => item.id === action.payload.itemId
          )
          if (i !== -1) {
            let j = draft.items.length
            draft.items[i].z = j--
            draft.items.forEach((item: CanvasItemT, ii: number) => {
              if (ii === i) return
              item.z = j--
            })
          }
        })
      )
    case "UPDATE_CANVAS":
      return {
        ...state,
        ...action.payload,
      }
    case "UPDATE_ITEM":
      return produce(state, (draft) => {
        let { itemId: id, ...itemRest } = action.payload
        const i = draft.items.findIndex((item) => item.id === id)
        if (i !== -1) {
          draft.items[i] = {
            ...draft.items[i],
            ...itemRest,
          } as CanvasItemT
        }
      })
    case "MOVE_ITEM":
      return produce(state, (draft) => {
        const item = draft.items.find(
          (item) => item.id === action.payload.itemId
        )
        if (item) {
          item.translate[0] += action.payload.dx
          item.translate[1] += action.payload.dy
        }
      })
    case "INSERT_ITEM":
      return {
        ...state,
        items: [...state.items, action.payload],
        selectedItems: [action.payload.id],
      }
    case "DELETE_SELECTED_ITEMS":
      return produce(state, (draft) => {
        draft.items = draft.items.filter(
          (item) => !draft.selectedItems.includes(item.id)
        )
        draft.selectedItems = []
      })
    default:
      return state
  }
}

export const useCanvasStore = create(
  persist(withUndoableReducer(reducer, initialState), {
    name: "canvasStore",
    getStorage: () => localForage as any,
  })
)

// export const useCanvasStore = create(withUndoableReducer(reducer, initialState))
