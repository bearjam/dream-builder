import { animated } from "@react-spring/three"
import { MeshProps } from "@react-three/fiber"
import React from "react"

const { PI } = Math

type Props = MeshProps & {
  radius?: number
  segments?: number
  thetaStart?: number
  thetaEnd?: number
}

const Handle = animated(
  ({
    radius = 1,
    segments = 32,
    thetaStart = 0,
    thetaEnd = PI,
    ...props
  }: Props) => {
    return (
      <mesh {...props}>
        <circleBufferGeometry args={[radius, segments, thetaStart, thetaEnd]} />
        <meshBasicMaterial color="green" wireframe transparent opacity={0} />
      </mesh>
    )
  }
)

export default Handle
