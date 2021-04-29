import { Canvas as FiberCanvas } from "@react-three/fiber"
import React from "react"
import AssetTools from "./AssetTools"
import CreateCanvas from "./CreateCanvas"
import css from "./index.module.css"
import TransformTools from "./TransformTools"

const Create = () => {
  return (
    <div className={css.canvasContainer}>
      <FiberCanvas orthographic>
        <CreateCanvas />
      </FiberCanvas>
      <TransformTools />
      <AssetTools />
    </div>
  )
}

export default Create
