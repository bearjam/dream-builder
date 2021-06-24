import { animated } from "@react-spring/three"
import { shaderMaterial } from "@react-three/drei"
import { extend } from "@react-three/fiber"
import glsl from "glslify"
import * as THREE from "three"
import fragmentShader from "./fragment.glsl"
import vertexShader from "./vertex.glsl"

const CanvasImageMaterial = shaderMaterial(
  {
    u_mode: 0,
    u_texture: new THREE.Texture(),
    u_border_color: new THREE.Color(),
    u_border_thickness: new THREE.Vector2(0, 0),
    u_inset: new THREE.Vector4(0, 0, 0, 0),
    u_handle_length: 0.5,
    u_scale: 1,
  },
  glsl(vertexShader),
  glsl(fragmentShader)
)

export type CanvasImageMaterialImpl = {
  u_mode?: { value: number }
  u_texture?: { value: THREE.Texture }
  u_border_color?: { value: THREE.Color }
  u_border_thickness?: { value: THREE.Vector2 }
  u_inset?: { value: THREE.Vector4 }
  u_handle_length?: { value: number }
  u_scale?: { value: number }
} & JSX.IntrinsicElements["shaderMaterial"]

extend({ CanvasImageMaterial })

declare global {
  namespace JSX {
    interface IntrinsicElements {
      canvasImageMaterial: CanvasImageMaterialImpl
    }
  }
}

export const AnimatedCanvasImageMaterial = animated(
  (props: CanvasImageMaterialImpl) => <canvasImageMaterial {...props} />
)
