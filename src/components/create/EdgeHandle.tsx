import React from "react"
import { MeshProps } from "@react-three/fiber"
import { animated } from "@react-spring/three"

type Props = MeshProps & {
  width?: number
  height?: number
}

const EdgeHandle = animated(
  ({ width = 100, height = 100, ...props }: Props) => {
    return (
      <mesh {...props}>
        <planeBufferGeometry args={[width, height]} />
        <meshBasicMaterial color="indigo" />
      </mesh>
    )
  }
)

export default EdgeHandle
