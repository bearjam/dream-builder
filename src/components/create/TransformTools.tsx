import { pipe } from "fp-ts/function"
import { map } from "fp-ts/ReadonlyArray"
import SvgCloseIcon from "icons/SvgCloseIcon"
import SvgDeleteIcon from "icons/SvgDeleteIcon"
import SvgPlusIcon from "icons/SvgPlusIcon"
import React, { Fragment, SVGProps } from "react"
import { animated, Spring } from "react-spring"
import shallow from "zustand/shallow"
import SvgCropIcon from "icons/SvgCropIcon"
import SvgRotateIcon from "icons/SvgRotateIcon"
import SvgScaleIcon from "icons/SvgScaleIcon"
import SvgSelectIcon from "icons/SvgSelectIcon"
import SvgTickIcon from "icons/SvgTickIcon"
import { useCanvasStore } from "stores/canvas"
import { CanvasMode } from "types/canvas"
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
  const [state, dispatch] = useCanvasStore(
    (store) => [store.state, store.dispatch],
    shallow
  )
  return (
    <div className={css.transformTools}>
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
              })
            }
          >
            <SvgDeleteIcon />
          </div>
        </Fragment>
      )}
      {state.mode === "CROP" && state.crop !== null && (
        <Fragment>
          <div className="border-t-2 border-black w-full h-1 my-4" />
          <div
            key="EXECUTE_CROP"
            onClick={() =>
              dispatch({
                type: "EXECUTE_CROP",
              })
            }
          >
            <SvgTickIcon stroke="none" fill="green" />
          </div>
          <div
            key="CLEAR_CROP_INSET"
            onClick={() =>
              dispatch({
                type: "CLEAR_CROP_INSET",
              })
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
