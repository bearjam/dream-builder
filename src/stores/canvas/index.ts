import { withUndoableReducer } from "@bearjam/tom"
import { pipe } from "fp-ts/function"
import produce from "immer"
import localForage from "localforage"
import create from "zustand"
import { persist } from "zustand/middleware"
import { CanvasAction, CanvasItemT, CanvasState } from "../../types/canvas"

const initialState: CanvasState = {
  mode: "SELECT",
  items: [],
  selectedItems: [],
}

const reducer = (state: CanvasState, action: CanvasAction): CanvasState => {
  switch (action.type) {
    case "SELECT_ITEM":
      return pipe(
        state,
        produce((draft) => {
          draft.selectedItems = [action.payload.itemId]
        }),
        produce((draft) => {
          const i = draft.items.length
          let j = i
          draft.items
            .sort((a: CanvasItemT, b: CanvasItemT) => (b.z ?? 0) - (a.z ?? 0))
            .forEach((item: CanvasItemT) => {
              if (item.id === action.payload.itemId) {
                item.z = i
              } else {
                item.z = --j
              }
            })
        })
      )
    case "SELECT_NONE":
      return {
        ...state,
        selectedItems: [],
      }
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
      return produce(state, (draft) => {
        let z = draft.items.length + 1
        draft.items.push({ ...action.payload, z })
        draft.selectedItems = [action.payload.id]
      })
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
