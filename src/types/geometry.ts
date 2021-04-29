import { SpringRef, SpringValue, SpringValues } from "@react-spring/core"

export type Dimensions2D = {
  width: number
  height: number
}

export type Vector2 = [number, number]

export type Transforms2D = {
  rotate: number
  translate: Vector2
  scale: number
}

export type Vector3 = [number, number, number]

export type Springify<T> = {
  [K in keyof T]: SpringValue<T[K]>
}

export type Transforms2DSpring = Springify<Transforms2D>

export type FullSpring<T> = [SpringValues<T>, SpringRef<T>]
// | [Springify<T>, SpringStartFn<T>]
// | [Springify<T>, SpringStartFn<T>, SpringStopFn<T>]
