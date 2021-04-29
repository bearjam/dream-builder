import { useSpring } from "react-spring"
import { useDrag } from "react-use-gesture"

export const useMove = ({
  update,
}: {
  update?: (xy: [number, number]) => any
}) => {
  const [style, set] = useSpring(() => ({
    x: 0,
    y: 0,
  }))
  const bind = useDrag(async ({ down, movement, offset }) => {
    if (update) {
      const [x, y] = movement
      await set({
        x,
        y,
      })
      if (!down) {
        await set({ x: 0, y: 0, immediate: true })
        update([x, y])
      }
    } else {
      const [x, y] = offset
      set({
        x,
        y,
      })
    }
  })
  return [style, bind] as const
}

export default useMove
