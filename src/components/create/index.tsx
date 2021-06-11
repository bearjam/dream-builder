import { Canvas as FiberCanvas } from "@react-three/fiber"
import Button from "components/inputs/Button"
import { DOWNLOAD_PNG_EVENT } from "lib/events"
import React from "react"
import AssetTools from "./AssetTools"
import CreateCanvas from "./CreateCanvas"
import css from "./index.module.css"
import TransformTools from "./TransformTools"

const Create = () => {
  return (
    <div className={css.root}>
      <div className={css.canvasContainer}>
        <FiberCanvas
          orthographic
          gl={{ preserveDrawingBuffer: true }}
          camera={{ position: [0, 0, 1000], near: 0, far: 2000 }}
        >
          <CreateCanvas />
        </FiberCanvas>
        <TransformTools />
        <AssetTools />
      </div>
      <div className="absolute top-0 right-0 z-50">
        <Button
          className="bg-blue mr-4"
          onClick={() => dispatchEvent(new CustomEvent(DOWNLOAD_PNG_EVENT))}
        >
          Save
        </Button>
      </div>
    </div>
  )
}

export default Create
