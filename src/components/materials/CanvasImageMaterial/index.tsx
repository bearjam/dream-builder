import { shaderMaterial } from "@react-three/drei"
import * as THREE from "three"
// import glsl from "glslify"
import vertexShader from "./vertex.glsl"
import fragmentShader from "./fragment.glsl"
import { extend, ShaderMaterialProps } from "@react-three/fiber"
import { animated } from "@react-spring/three"

export const CanvasImageMaterial = shaderMaterial(
  {
    u_image: new THREE.Texture(),
    u_inset: new THREE.Vector4(0, 0, 0, 0),
    u_edge_color: new THREE.Vector4(0, 0, 0, 0),
    u_vertex_color: new THREE.Vector4(0, 0, 0, 0),
  },
  // glsl(vertexShader),
  // glsl(fragmentShader)
  vertexShader,
  fragmentShader
)

extend({ CanvasImageMaterial })

type CanvasImageMaterialProps = Omit<ShaderMaterialProps, "uniforms"> & {
  uniforms?: {
    u_image?: {
      value: THREE.Texture
    }
    u_inset?: {
      value: THREE.Vector4
    }
    u_edge_color?: {
      value: THREE.Vector4
    }
    u_vertex_color?: {
      value: THREE.Vector4
    }
  }
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      canvasImageMaterial: CanvasImageMaterialProps
    }
  }
}
export const AnimatedCanvasImageMaterial = animated(
  (props: CanvasImageMaterialProps) => <canvasImageMaterial {...props} />
)
