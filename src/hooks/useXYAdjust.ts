import { useThree } from "@react-three/fiber"
import { pipe } from "fp-ts/function"
import { map } from "fp-ts/ReadonlyArray"

export const useXYAdjust = () => {
  const {
    viewport: { width, height, factor, distance },
    size,
  } = useThree()

  const [left, top] = [size.width, size.height].map((v) => v / factor)

  return (xy: [number, number]) =>
    pipe(
      xy,
      map((v) => v / factor),
      ([x, y]) => [x - (width / 2 + left), -1 * y + (height / 2 + top)]
    )
}

export default useXYAdjust
