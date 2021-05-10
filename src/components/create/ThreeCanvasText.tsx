import { useSpring, animated } from "@react-spring/three"
import { Text } from "@react-three/drei"
import { pipe } from "fp-ts/function"
import { VERTEX_RADIUS } from "lib/constants"
import { clamp, springConfig } from "lib/util"
import React, { Fragment } from "react"
import { useDrag, useGesture } from "react-use-gesture"
import { FullGestureState } from "react-use-gesture/dist/types"
import { useCanvasStore } from "stores/canvas"
import { colors } from "tailwindcss/defaultTheme"
import { CanvasTextItem, GestureHandlers } from "types/canvas"
import VertexHandle from "./VertexHandle"

const AnimatedText = animated(Text)

const clampScale = clamp(0.1, 10)

type Props = {
  item: CanvasTextItem
}

const ThreeCanvasText = ({ item }: Props) => {
  const { width, height, z = 0 } = item
  const [state, dispatch] = useCanvasStore((store) => [
    store.state,
    store.dispatch,
  ])
  const selected = state.selectedItems.includes(item.id)

  const [{ rotate, translate, scale }, spring] = useSpring(
    () => ({
      rotate: item.rotate,
      translate: item.translate,
      scale: item.scale,
      config: springConfig,
    }),
    [item.rotate, item.translate, item.scale]
  )

  function modeGestureHandlers(): GestureHandlers {
    switch (state.mode) {
      case "SELECT":
      case "CROP":
      case "SCALE":
        return {
          onDrag: async ({ down, movement: [dx, dy], event }) => {
            event.stopPropagation()
            const next = pipe(item.translate, ([x, y]) => [x + dx, y + dy]) as [
              number,
              number
            ]
            if (down) spring.start({ translate: next })
            else {
              await spring.start({ translate: next })
              dispatch({
                type: "UPDATE_ITEM",
                payload: {
                  itemId: item.id,
                  translate: next,
                },
              })
            }
          },
        }
      default:
        return {
          onDrag: () => {},
        }
    }
  }

  const itemBind = useGesture(
    {
      onPointerDown: ({ event }) => {
        event.stopPropagation()
        dispatch({ type: "SELECT_ITEM", payload: { itemId: item.id } })
      },
      ...modeGestureHandlers(),
    },
    {
      transform: ([x, y]) => [x, -y],
    }
  )

  const handleBind = useDrag(
    (state) =>
      // @ts-ignore
      void pipe(state, ...state.args),
    { transform: ([x, y]) => [x, -y] }
  )

  function modeChildren() {
    switch (state.mode) {
      case "SCALE": {
        const op = (xmult: number, ymult: number) => async ({
          movement: [mx, my],
          event,
          down,
        }: FullGestureState<"drag">) => {
          event?.stopPropagation()
          const next = clampScale(
            item.scale + (xmult * mx + ymult * my) / ((width + height) / 2)
          )
          if (down) {
            spring.set({ scale: next })
          } else {
            await spring.set({ scale: next })
            dispatch({
              type: "UPDATE_ITEM",
              payload: {
                itemId: item.id,
                scale: next,
              },
            })
          }
        }

        return (
          <Fragment>
            <VertexHandle
              position={[width / 2, height / 2, 0]}
              radius={scale.to((v) => VERTEX_RADIUS / v)}
              {...(handleBind(op(1, 1)) as any)}
            />
            <VertexHandle
              position={[-(width / 2), height / 2, 0]}
              radius={scale.to((v) => VERTEX_RADIUS / v)}
              {...(handleBind(op(-1, 1)) as any)}
            />
            <VertexHandle
              position={[width / 2, -(height / 2), 0]}
              radius={scale.to((v) => VERTEX_RADIUS / v)}
              {...(handleBind(op(1, -1)) as any)}
            />
            <VertexHandle
              position={[-(width / 2), -(height / 2), 0]}
              radius={scale.to((v) => VERTEX_RADIUS / v)}
              {...(handleBind(op(-1, -1)) as any)}
            />
          </Fragment>
        )
      }
      default:
        return null
    }
  }
  return (
    <AnimatedText
      color={colors.red[600]}
      fontSize={32}
      lineHeight={undefined}
      font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff"
      fillOpacity={1}
      position-x={translate.to((x) => x)}
      position-y={translate.to((_x, y) => y)}
      position-z={z}
      scale-x={scale}
      scale-y={scale}
      scale-z={1}
      {...(itemBind() as any)}
    >
      {item.text}
      {selected && modeChildren()}
    </AnimatedText>
  )
}

export default ThreeCanvasText
