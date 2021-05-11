import { theme } from "tailwind.config"
import { v4 as uuid } from "uuid"
import {
  CanvasImageItem,
  CanvasTextItem,
  InsertCanvasItemAction,
} from "../../types/canvas"

type InsertCanvasTextItemActionProps = Partial<
  Omit<CanvasTextItem, "type" | "font">
> &
  Pick<CanvasTextItem, "font">

export const insertCanvasTextItemAction = ({
  id = uuid(),
  text = "hello world",
  width = 100,
  height = 100,
  rotate = 0,
  translate = [0, 0],
  scale = 1,
  font,
  color = theme.colors.coral,
}: InsertCanvasTextItemActionProps): InsertCanvasItemAction => ({
  type: "INSERT_ITEM",
  payload: {
    type: "TEXT",
    id,
    text,
    width,
    height,
    rotate,
    translate,
    scale,
    font,
    color,
  },
})

type InsertCanvasImageItemActionArgsT = Pick<
  Partial<CanvasImageItem>,
  "rotate" | "translate" | "scale"
> &
  Omit<CanvasImageItem, "type" | "rotate" | "translate" | "scale">

export const insertCanvasImageItemAction = ({
  id,
  src,
  width,
  height,
  rotate = 0,
  translate = [0, 0],
  scale = 1,
  naturalWidth,
  naturalHeight,
}: InsertCanvasImageItemActionArgsT): InsertCanvasItemAction => ({
  type: "INSERT_ITEM",
  payload: {
    type: "IMAGE",
    id,
    src,
    width,
    height,
    rotate,
    translate,
    scale,
    naturalWidth,
    naturalHeight,
  },
})
