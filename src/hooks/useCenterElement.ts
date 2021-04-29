import { isSSR } from "lib/util"
import { useRef } from "react"
import { useKey } from "react-use"
import { useCanvasStore } from "stores/canvas"
const { abs } = Math

export const useCenterElement = <T extends HTMLElement = HTMLDivElement>(
  enabled = true
) => {
  const ref = useRef<T | null>(null)
  const dispatch = useCanvasStore((store) => store.dispatch)

  const getCenter = () =>
    isSSR() ? [0, 0] : [window.innerWidth / 2, window.innerHeight / 2]

  const center = () => {
    const el = ref.current
    if (!el || !enabled) return
    const rect = el.getBoundingClientRect()
    const [targetX, targetY] = getCenter()
    const currentX = rect.left + abs(rect.left - rect.right) / 2
    const currentY = rect.top + abs(rect.top - rect.bottom) / 2
    dispatch({
      type: "PAN_CANVAS",
      payload: {
        translate: [currentX - targetX, -1 * (currentY - targetY)],
      },
    })
  }

  useKey("c", center, undefined, [enabled])

  return ref
}
