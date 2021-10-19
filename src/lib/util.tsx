import { Ord } from "fp-ts/number"
import { clamp as fptsClamp } from "fp-ts/Ord"
import { map } from "fp-ts/ReadonlyRecord"
import { parseUrl } from "query-string"
import { Suspense } from "react"
import { CanvasMode, Font } from "types/canvas"
import { Vector2 } from "types/geometry"
import { UnsplashPhotoT } from "types/unsplash"
import * as z from "zod"

const { abs, min } = Math

export const identity = <T extends unknown>(x: T) => x

export const parseWidthHeight = (url: string, ratio: number) => {
  const {
    query: { w: width },
  } = z
    .object({
      query: z
        .object({
          w: z.string(),
        })
        .nonstrict(),
    })
    .nonstrict()
    .parse(parseUrl(url))
  return { width, height: ratio * parseInt(width) }
}

export const nearestNumber = (xs: number[]) => (x: number) =>
  xs.reduce((acc, v) => (abs(v - x) < abs(acc - x) ? v : acc))

export const fetcher = <T extends unknown = any>(url: string): Promise<T> =>
  fetch(url).then((r) => r.json())

export const getWidth = () => {
  return !window ? 600 : min(window.innerWidth / 2, 600)
}

export const springConfig = {
  mass: 0.5,
  tension: 500,
  friction: 25,
}

export const isSSR = () => typeof window === "undefined"

export const getWidthHeight = (photo: UnsplashPhotoT) => {
  let width = getWidth()
  return { width, height: (photo.height / photo.width) * width }
}

export const withSuspense =
  (Component: (props: any) => JSX.Element) => (props: any) =>
    (
      <Suspense fallback={null}>
        <Component {...props} />
      </Suspense>
    )

export const clamp = fptsClamp(Ord)

export const vectorAdd = ([x0, y0]: Vector2, [x1, y1]: Vector2): Vector2 => [
  x0 + x1,
  y0 + y1,
]

export const getMode = (mode: CanvasMode): number =>
  ({
    DEFAULT: 0,
    SELECT: 1,
    SCALE: 2,
    CROP: 3,
    // ROTATE: 4,
    ROTATE: 1, // same as select for now
  }[mode])

export const httpsFont = (input: Font): Font => {
  let output: Font = input
  if (input.files) {
    output.files = map((v: string) => v.replace("http:", "https:"))(input.files)
  }
  return output as Font
}
