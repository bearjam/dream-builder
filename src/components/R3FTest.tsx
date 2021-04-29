import { OrbitControls } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import React, { useMemo } from "react"
import * as THREE from "three"

const Main = () => {
  const geom = useMemo(() => new THREE.PlaneBufferGeometry(), [])
  return (
    <group>
      <mesh>
        <primitive object={geom} attach="geometry" />
        <meshBasicMaterial color="steelblue" side={2} />
      </mesh>
      <lineSegments>
        {/* <edgesGeometry args={[geom]} /> */}
        <edgesGeometry args={[geom]} />
        <lineDashedMaterial
          color="red"
          scale={1}
          dashSize={0.3}
          gapSize={0.1}
          linewidth={5}
        />
      </lineSegments>
    </group>
  )
}

const R3FTest = () => {
  return (
    <div className="absolute w-full h-full bg-indigo-200">
      <Canvas>
        <Main />
        <OrbitControls />
      </Canvas>
    </div>
  )
}

export default R3FTest
