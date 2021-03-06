import { pipe } from "fp-ts/function"
import { map } from "fp-ts/ReadonlyArray"
import SvgCloseIcon from "icons/SvgCloseIcon"
import SvgCropIcon from "icons/SvgCropIcon"
import SvgDeleteIcon from "icons/SvgDeleteIcon"
import SvgRedoIcon from "icons/SvgRedoIcon"
import SvgRotateIcon from "icons/SvgRotateIcon"
import SvgScaleIcon from "icons/SvgScaleIcon"
import SvgSelectIcon from "icons/SvgSelectIcon"
import SvgTickIcon from "icons/SvgTickIcon"
import SvgUndoIcon from "icons/SvgUndoIcon"
import { EXECUTE_CROP_EVENT, RESET_INSET_EVENT } from "lib/events"
import React, { Fragment, SVGProps } from "react"
import { animated, Spring } from "react-spring"
import { useCanvasStore } from "stores/canvas"
import { CanvasMode } from "types/canvas"
import shallow from "zustand/shallow"
import css from "./index.module.css"

const modeIcons: [
  CanvasMode,
  (props: SVGProps<SVGSVGElement>) => JSX.Element
][] = [
  ["SELECT", SvgSelectIcon],
  ["SCALE", SvgScaleIcon],
  ["ROTATE", SvgRotateIcon],
  ["CROP", SvgCropIcon],
]

const TransformTools = () => {
  const [state, dispatch, undo, redo, canUndo, canRedo] = useCanvasStore(
    (store) => [
      store.state,
      store.dispatch,
      store.undo,
      store.redo,
      store.canUndo,
      store.canRedo,
    ],
    shallow
  )

  return (
    <div className={css.transformTools}>
      <div className={css["undo-redo"]}>
        <div>
          <Spring
            from={{ scale: 0.66, opacity: 0.8 }}
            to={{ scale: 1.33, opacity: 1 }}
            reverse={!canUndo}
          >
            {(style) => (
              <animated.div
                style={style as any}
                onClick={() => void (canUndo ? undo() : null)}
              >
                <SvgUndoIcon />
              </animated.div>
            )}
          </Spring>
        </div>
        <div>
          <Spring
            from={{ scale: 0.66, opacity: 0.8 }}
            to={{ scale: 1.33, opacity: 1 }}
            reverse={!canRedo}
          >
            {(style) => (
              <animated.div
                style={style as any}
                onClick={() => void (canRedo ? redo() : null)}
              >
                <SvgRedoIcon />
              </animated.div>
            )}
          </Spring>
        </div>
      </div>
      {pipe(
        modeIcons,
        map(([iconMode, Icon]) => (
          <Spring
            key={iconMode}
            from={{ scale: 0.66, opacity: 0.8 }}
            to={{ scale: 1.33, opacity: 1 }}
            reverse={iconMode !== state.mode}
          >
            {(style) => (
              <animated.div
                style={style as any}
                onClick={() =>
                  dispatch({
                    type: "UPDATE_CANVAS",
                    payload: { mode: iconMode },
                  })
                }
              >
                <Icon />
              </animated.div>
            )}
          </Spring>
        ))
      )}
      {state.selectedItems.length > 0 && (
        <Fragment>
          <div className="border-t-2 border-black w-full h-1 my-4" />
          <div
            key="DELETE_SELECTED_ITEMS"
            onClick={() =>
              dispatch({
                type: "DELETE_SELECTED_ITEMS",
                undoable: true,
              })
            }
          >
            <SvgDeleteIcon />
          </div>
        </Fragment>
      )}
      {state.mode === "CROP" && (
        <Fragment>
          <div className="border-t-2 border-black w-full h-1 my-4" />
          <div
            key="EXECUTE_CROP"
            onClick={() =>
              void dispatchEvent(new CustomEvent(EXECUTE_CROP_EVENT))
            }
          >
            <SvgTickIcon stroke="none" fill="green" />
          </div>
          <div
            key="RESET_INSET"
            onClick={() =>
              void dispatchEvent(new CustomEvent(RESET_INSET_EVENT))
            }
          >
            <SvgCloseIcon stroke="none" fill="red" />
          </div>
        </Fragment>
      )}
    </div>
  )
}

export default TransformTools
