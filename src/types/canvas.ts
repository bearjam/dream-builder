import { Dispatcher, Patcher } from "@bearjam/tom"
import {
  EventTypes,
  NativeHandlers,
  UserHandlers,
} from "react-use-gesture/dist/types"
import { Transforms2D, Dimensions2D } from "./geometry"

export type CanvasItemGeometry = Dimensions2D & Transforms2D

export type CanvasItemBase = CanvasItemGeometry & {
  id: string
  z?: number
}

export type CanvasImageItem = CanvasItemBase & {
  type: "IMAGE"
  src: string
  naturalWidth: number
  naturalHeight: number
}

export type CanvasTextItem = CanvasItemBase & {
  type: "TEXT"
  text: string
}

export type CanvasItemT = CanvasImageItem | CanvasTextItem

export type CanvasMode = "SELECT" | "SCALE" | "ROTATE" | "CROP"

export type CanvasState = {
  mode: CanvasMode
  items: CanvasItemT[]
  selectedItems: string[]
  crop: null | {
    itemId: string
    inset: [number, number, number, number]
    htmlImage: HTMLImageElement
  }
}

export type InsertCanvasItemAction = {
  type: "INSERT_ITEM"
  payload: CanvasItemT
}

export type DeleteSelectedItemsAction = {
  type: "DELETE_SELECTED_ITEMS"
}

export type DeleteAllCanvasItemsAction = {
  type: "DELETE_ALL_ITEMS"
}

export type UpdateCanvasAction = {
  type: "UPDATE_CANVAS"
  payload: Partial<CanvasState>
}

export type MoveCanvasItemAction = {
  type: "MOVE_ITEM"
  payload: {
    itemId: string
    dx: number
    dy: number
  }
}

export type PanCanvasAction = {
  type: "PAN_CANVAS"
  payload: {
    translate: [number, number]
  }
}

export type SelectItemAction = {
  type: "SELECT_ITEM"
  payload: {
    itemId: string
  }
}

export type ZoomCanvasAction = {
  type: "ZOOM_CANVAS"
  payload: {
    scaleDelta: number
  }
}

export type ScaleCanvasItemAction = {
  type: "SCALE_ITEM"
  payload: {
    itemId: string
    scaleDelta: number
  }
}

export type UpdateCanvasItemAction = {
  type: "UPDATE_ITEM"
  payload: {
    itemId: string
  } & Partial<CanvasItemT>
}

export type ExecuteCropAction = {
  type: "EXECUTE_CROP"
}

export type UpdateCropInsetAction = {
  type: "UPDATE_CROP_INSET"
  payload: {
    itemId: string
    inset: [number, number, number, number]
    htmlImage: HTMLImageElement
  }
}

export type ClearCropInsetAction = {
  type: "CLEAR_CROP_INSET"
}

export type CanvasAction =
  | InsertCanvasItemAction
  | DeleteSelectedItemsAction
  | DeleteAllCanvasItemsAction
  | UpdateCanvasAction
  | MoveCanvasItemAction
  | PanCanvasAction
  | ZoomCanvasAction
  | SelectItemAction
  | ScaleCanvasItemAction
  | UpdateCanvasItemAction
  | ExecuteCropAction
  | UpdateCropInsetAction
  | ClearCropInsetAction

export type CanvasStore = Dispatcher<CanvasState, CanvasAction> & Patcher

export type CanvasDispatch = (a: CanvasAction) => CanvasAction

export type GestureHandlers = Partial<
  UserHandlers<EventTypes> & NativeHandlers<EventTypes>
>

export type CanvasTransform = {
  x: number
  y: number
  scale: number
}
