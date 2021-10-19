import { animated, useSpring } from "@react-spring/three"
import { Text } from "@react-three/drei"
import { FullGestureState, useDrag, useGesture } from "@use-gesture/react"
import { AnimatedCanvasImageMaterial } from "components/materials/CanvasImageMaterial"
import { pipe } from "fp-ts/function"
import { VERTEX_RADIUS } from "lib/constants"
import { clamp, getMode, springConfig } from "lib/util"
import React, { Fragment, useEffect, useMemo, useState } from "react"
import { useCanvasStore } from "stores/canvas"
import * as THREE from "three"
import { CanvasTextItem, GestureHandlers } from "types/canvas"
import Handle from "./Handle"

const { PI } = Math

const AnimatedText = animated(Text)

const clampScale = clamp(0.1, 10)

type Props = {
  item: CanvasTextItem
}

const ThreeCanvasText = ({ item }: Props) => {
  const [state, dispatch] = useCanvasStore((store) => [
    store.state,
    store.dispatch,
  ])
  const u_mode = getMode(state.mode)
  const { width, height, z = 0 } = item
  const color = useMemo(() => {
    const c = new THREE.Color(item.color as string)
    c.convertGammaToLinear(3)
    return c
  }, [item.color])
  const selected = state.selectedItems.includes(item.id)
  const threeBorderColor = new THREE.Color("green")

  const [{ rotate, translate, scale }, spring] = useSpring(
    () => ({
      rotate: item.rotate,
      translate: item.translate,
      scale: item.scale,
      config: springConfig,
    }),
    [item.rotate, item.translate, item.scale]
  )

  const [hovered, setHovered] = useState(false)
  const hoverProps = {
    onPointerOver: (e: React.SyntheticEvent) => (
      e.stopPropagation(), setHovered(true)
    ),
    onPointerOut: () => setHovered(false),
  }
  useEffect(
    () => void (document.body.style.cursor = hovered ? "grab" : "auto"),
    [hovered]
  )
  function modeGestureHandlers(): GestureHandlers {
    switch (state.mode) {
      case "SELECT":
      case "CROP":
      case "SCALE":
        return {
          onDrag: async ({
            down,
            movement: [dx, dy],
            event,
          }: FullGestureState<"drag">) => {
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
                undoable: true,
              })
            }
          },
        }
      case "ROTATE": {
        return {
          onDrag: async ({
            down,
            movement: [dx, dy],
            event,
          }: FullGestureState<"drag">) => {
            event.stopPropagation()
            const next = item.rotate + Math.atan2(dy, dx)
            if (down) spring.start({ rotate: next })
          },
        }
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
        dispatch({
          type: "SELECT_ITEM",
          payload: { itemId: item.id },
          undoable: true,
        })
      },
      ...modeGestureHandlers(),
    },
    {
      drag: {
        transform: ([x, y]) => [x, -y],
      },
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
        const op =
          (xmult: number, ymult: number) =>
          async ({
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
                undoable: true,
              })
            }
          }

        return (
          <Fragment>
            <Handle
              position={[width / 2, height / 2, 0]}
              radius={scale.to((v) => VERTEX_RADIUS / v)}
              thetaStart={PI}
              thetaEnd={PI / 2}
              {...(handleBind(op(1, 1)) as any)}
              {...hoverProps}
            />
            <Handle
              position={[-(width / 2), height / 2, 0]}
              radius={scale.to((v) => VERTEX_RADIUS / v)}
              thetaStart={(PI / 2) * 3}
              thetaEnd={PI / 2}
              {...(handleBind(op(-1, 1)) as any)}
              {...hoverProps}
            />
            <Handle
              position={[width / 2, -(height / 2), 0]}
              radius={scale.to((v) => VERTEX_RADIUS / v)}
              thetaStart={PI / 2}
              thetaEnd={PI / 2}
              {...(handleBind(op(1, -1)) as any)}
              {...hoverProps}
            />
            <Handle
              position={[-(width / 2), -(height / 2), 0]}
              radius={scale.to((v) => VERTEX_RADIUS / v)}
              thetaStart={0}
              thetaEnd={PI / 2}
              {...(handleBind(op(-1, -1)) as any)}
              {...hoverProps}
            />
          </Fragment>
        )
      }
      default:
        return null
    }
  }

  const thickness = 10

  return (
    <Fragment>
      {selected && (
        <animated.mesh
          rotation-z={rotate.to((v) => v)}
          position-x={translate.to((x) => x)}
          position-y={translate.to((_x, y) => y)}
          position-z={z}
          scale-x={scale}
          scale-y={scale}
          scale-z={1}
          {...(itemBind() as any)}
          {...(["SELECT", "ROTATE"].includes(state.mode) ? hoverProps : {})}
        >
          <planeBufferGeometry args={[width, height]} />

          <AnimatedCanvasImageMaterial
            uniforms-u_mode-value={u_mode}
            uniforms-u_border_thickness-value={[
              thickness / width,
              thickness / height,
            ]}
            uniforms-u_border_color-value={threeBorderColor}
            uniforms-u_scale-value={scale}
            transparent
          />
          {modeChildren()}
        </animated.mesh>
      )}
      <AnimatedText
        color={color}
        fontSize={32}
        lineHeight={undefined}
        font={item.font?.files?.regular}
        fillOpacity={1}
        rotation-z={rotate.to((v) => v)}
        position-x={translate.to((x) => x)}
        position-y={translate.to((_x, y) => y)}
        position-z={z}
        scale-x={scale}
        scale-y={scale}
        scale-z={1}
        {...(itemBind() as any)}
      >
        {item.text}
      </AnimatedText>
    </Fragment>
  )
}

export default ThreeCanvasText
