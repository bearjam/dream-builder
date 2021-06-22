import { Dispatcher, Patcher } from "@bearjam/tom"
import { Font as FontManagerFont } from "@samuelmeuli/font-manager"
import { NativeHandlers, UserHandlers } from "@use-gesture/react"
import { Color } from "react-color"
import { Dimensions2D, Transforms2D } from "./geometry"

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

export type Font = Pick<FontManagerFont, "id" | "family" | "files">

export type CanvasTextItem = CanvasItemBase & {
  type: "TEXT"
  text: string
  font: Font
  color: Color
}

export type CanvasItemT = CanvasImageItem | CanvasTextItem

export type CanvasMode = "DEFAULT" | "SELECT" | "SCALE" | "ROTATE" | "CROP"

export type CanvasState = {
  mode: CanvasMode
  items: CanvasItemT[]
  selectedItems: string[]
}

export type InsertCanvasItemAction = {
  type: "INSERT_ITEM"
  payload: CanvasItemT
  undoable: true
}

export type DeleteSelectedItemsAction = {
  type: "DELETE_SELECTED_ITEMS"
  undoable: true
}

export type DeleteAllCanvasItemsAction = {
  type: "DELETE_ALL_ITEMS"
  undoable: true
}

export type UpdateCanvasAction = {
  type: "UPDATE_CANVAS"
  payload: Partial<CanvasState>
  undoable?: boolean
}

export type MoveCanvasItemAction = {
  type: "MOVE_ITEM"
  payload: {
    itemId: string
    dx: number
    dy: number
  }
  undoable: true
}

export type SelectItemAction = {
  type: "SELECT_ITEM"
  payload: {
    itemId: string
  }
  undoable: true
}

export type SelectNoneAction = {
  type: "SELECT_NONE"
  undoable: false
}

export type UpdateCanvasItemAction = {
  type: "UPDATE_ITEM"
  payload: {
    itemId: string
  } & Partial<CanvasItemT>
  undoable: boolean
}

export type CanvasAction =
  | InsertCanvasItemAction
  | DeleteSelectedItemsAction
  | DeleteAllCanvasItemsAction
  | UpdateCanvasAction
  | MoveCanvasItemAction
  | SelectItemAction
  | SelectNoneAction
  | UpdateCanvasItemAction

export type CanvasStore = Dispatcher<CanvasState, CanvasAction> & Patcher

export type CanvasDispatch = (a: CanvasAction) => CanvasAction

export type GestureHandlers = Partial<UserHandlers & NativeHandlers>

export type CanvasTransform = {
  x: number
  y: number
  scale: number
}
