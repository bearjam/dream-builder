import { useEffect, useRef } from "react"
import * as M from "rematrix"

const useMatrix = <E extends HTMLElement | SVGElement = HTMLDivElement>(
  initialMatrix?: M.Matrix3D
) => {
  const ref = useRef<E>(null)
  const matrix = useRef(initialMatrix ?? M.identity())

  useEffect(() => {
    if (ref.current) {
      ref.current.style.transform = M.toString(matrix.current)
    }
  }, [])

  const setMatrix = (input: ((m: M.Matrix3D) => M.Matrix3D) | M.Matrix3D) => {
    if (typeof input === "function") {
      matrix.current = input(matrix.current)
    } else {
      matrix.current = input
    }
    if (ref.current) {
      ref.current.style.transform = M.toString(matrix.current)
    }
  }

  return [ref, setMatrix] as const
}

export default useMatrix
