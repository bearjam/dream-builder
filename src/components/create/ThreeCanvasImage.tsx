import { animated, useSpring } from "@react-spring/three"
import { useLoader } from "@react-three/fiber"
import { AnimatedCanvasImageMaterial } from "components/materials/CanvasImageMaterial"
import { pipe } from "fp-ts/function"
import { map } from "fp-ts/ReadonlyArray"
import produce from "immer"
import { VERTEX_RADIUS } from "lib/constants"
import { clamp, getMode, springConfig, withSuspense } from "lib/util"
import { Fragment, useEffect, useRef } from "react"
import { FullGestureState, useDrag, useGesture } from "@use-gesture/react"
import { useCanvasStore } from "stores/canvas"
import * as THREE from "three"
import { CanvasImageItem, GestureHandlers } from "types/canvas"
import Handle from "./Handle"

const clampScale = clamp(0.1, 10)
const cropHandleSize = 0.5
const { PI } = Math

type Props = { item: CanvasImageItem }

const ThreeCanvasImage = ({ item }: Props) => {
  const [state, dispatch] = useCanvasStore((store) => [
    store.state,
    store.dispatch,
  ])

  const { width, height, src, z = 0 } = item
  const selected = state.selectedItems.includes(item.id)
  const u_mode = selected ? getMode(state.mode) : 0
  const texture = useLoader(THREE.TextureLoader, src)
  const htmlImage = useRef(new Image())
  const threeBorderColor = new THREE.Color("green")

  useEffect(() => {
    htmlImage.current.crossOrigin = "anonymous"
    htmlImage.current.src = item.src
  }, [item.src])

  const inset_ =
    state.crop?.itemId === item.id
      ? state.crop.inset
      : ([0, 0, 0, 0] as [number, number, number, number])

  const [{ rotate, translate, scale, inset }, spring] = useSpring(
    () => ({
      rotate: item.rotate,
      translate: item.translate,
      scale: item.scale,
      inset: inset_,
      config: springConfig,
    }),
    [item.rotate, item.translate, item.scale]
  )

  useEffect(() => {
    if (state.crop === null)
      spring.start({ inset: [0, 0, 0, 0], immediate: true })
  }, [state.crop])

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
            />
            <Handle
              position={[-(width / 2), height / 2, 0]}
              radius={scale.to((v) => VERTEX_RADIUS / v)}
              thetaStart={(PI / 2) * 3}
              thetaEnd={PI / 2}
              {...(handleBind(op(-1, 1)) as any)}
            />
            <Handle
              position={[width / 2, -(height / 2), 0]}
              radius={scale.to((v) => VERTEX_RADIUS / v)}
              thetaStart={PI / 2}
              thetaEnd={PI / 2}
              {...(handleBind(op(1, -1)) as any)}
            />
            <Handle
              position={[-(width / 2), -(height / 2), 0]}
              radius={scale.to((v) => VERTEX_RADIUS / v)}
              thetaStart={0}
              thetaEnd={PI / 2}
              {...(handleBind(op(-1, -1)) as any)}
            />
          </Fragment>
        )
      }
      case "CROP": {
        const op =
          (ord: number) =>
          async ({ movement, event, down }: FullGestureState<"drag">) => {
            event?.stopPropagation()
            const m = pipe(
              movement,
              map((v) => v / item.scale),
              ([x, y]) => [x / item.width, y / item.height] as const
            )
            const s = ord < 2 ? -1 : 1
            const next = produce(inset.get(), (draft) => {
              draft[ord] = clamp(0, 1)(inset_[ord] + s * m[(ord + 1) % 2])
            })
            if (down) {
              spring.start({ inset: next })
            } else {
              await spring.start({ inset: next })
              dispatch({
                type: "UPDATE_CROP_INSET",
                payload: {
                  itemId: item.id,
                  inset: next,
                  htmlImage: htmlImage.current,
                },
              })
            }
          }
        return (
          <Fragment>
            <Handle
              radius={scale.to((v) => VERTEX_RADIUS / v)}
              thetaStart={PI}
              position-x={inset.to(
                (_t, r, _b, l) => (l * width - r * width) / 2
              )}
              position-y={inset.to((t) => height / 2 - height * t)}
              position-z={0}
              {...(handleBind(op(0)) as any)}
            />
            <Handle
              radius={scale.to((v) => VERTEX_RADIUS / v)}
              thetaStart={PI / 2}
              position-x={inset.to((t, r, b, l) => width / 2 - width * r)}
              position-y={inset.to(
                (t, _r, b, _l) => (b * item.height - t * item.height) / 2
              )}
              position-z={0}
              {...(handleBind(op(1)) as any)}
            />
            <Handle
              radius={scale.to((v) => VERTEX_RADIUS / v)}
              position-x={inset.to(
                (_t, r, _b, l) => (l * item.width - r * item.width) / 2
              )}
              position-y={inset.to(
                (_t, _r, b) => -(height / 2) + item.height * b
              )}
              position-z={0}
              {...(handleBind(op(2)) as any)}
            />
            <Handle
              radius={scale.to((v) => VERTEX_RADIUS / v)}
              thetaStart={(PI / 2) * 3}
              position-x={inset.to((_t, _r, _b, l) => -(width / 2) + width * l)}
              position-y={inset.to(
                (t, _r, b, _l) => (b * item.height - t * item.height) / 2
              )}
              position-z={0}
              {...(handleBind(op(3)) as any)}
            />
          </Fragment>
        )
      }
    }
  }
  const thickness = 10
  return (
    <Fragment>
      <animated.mesh
        position-x={translate.to((x) => x)}
        position-y={translate.to((_x, y) => y)}
        position-z={z}
        scale-x={scale}
        scale-y={scale}
        scale-z={1}
        {...(itemBind() as any)}
      >
        <planeBufferGeometry args={[width, height]} />
        <AnimatedCanvasImageMaterial
          uniforms-u_texture-value={texture}
          uniforms-u_mode-value={u_mode}
          uniforms-u_inset-value={inset}
          uniforms-u_handle_size-value={cropHandleSize}
          uniforms-u_border_thickness-value={[
            thickness / width,
            thickness / height,
          ]}
          uniforms-u_border_color-value={threeBorderColor}
          uniforms-u_scale-value={scale}
        />
      </animated.mesh>
      {selected && (
        <animated.mesh
          position-x={translate.to((x) => x)}
          position-y={translate.to((_x, y) => y)}
          position-z={z + 1}
          scale-x={scale}
          scale-y={scale}
          scale-z={1}
        >
          <planeBufferGeometry args={[width, height]} />
          <meshBasicMaterial transparent opacity={0} />
          {modeChildren()}
        </animated.mesh>
      )}
    </Fragment>
  )
}

export default withSuspense(ThreeCanvasImage)
