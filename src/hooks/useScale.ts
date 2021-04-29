import { useSpring } from "@react-spring/core"
import { useGesture } from "react-use-gesture"

export const useScale = ({ update }: { update?: (v: number) => any }) => {
  const [{ z }, set] = useSpring(() => ({
    z: 0,
  }))
  const bind = useGesture({
    onWheel: async ({ movement: [_, my], wheeling }) => {
      await set({ z: my })
      if (!wheeling && update) {
        await set({ z: 0, immediate: true })
        update(my)
      }
    },
  })
}
