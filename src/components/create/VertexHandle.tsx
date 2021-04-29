import { MeshProps } from "@react-three/fiber"
import React from "react"
import { animated } from "@react-spring/three"

type Props = MeshProps & {
  radius?: number
  segments?: number
}

const VertexHandle = animated(
  ({ radius = 50, segments = 64, ...props }: Props) => {
    return (
      <mesh {...props}>
        <circleBufferGeometry args={[radius, segments]} />
        <meshBasicMaterial color="green" />
      </mesh>
    )
  }
)

export default VertexHandle
