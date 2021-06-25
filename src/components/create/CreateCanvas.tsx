import { useThree } from "@react-three/fiber"
import { pipe } from "fp-ts/function"
import { map } from "fp-ts/ReadonlyArray"
import { Fragment, useEffect } from "react"
import { useCanvasStore } from "stores/canvas"
import { DOWNLOAD_PNG_EVENT, RESET_INSET_EVENT } from "../../lib/events"
import ThreeCanvasImage from "./ThreeCanvasImage"
import ThreeCanvasText from "./ThreeCanvasText"

const CreateCanvas = () => {
  const [state, dispatch] = useCanvasStore((store) => [
    store.state,
    store.dispatch,
  ])

  const gl = useThree((three) => three.gl)

  useEffect(() => {
    const downloadCanvasImage = () => {
      var link = document.createElement("a")
      link.download = `dream-builder-${Date.now()}.png`
      link.href = gl.domElement.toDataURL("image/png")
      link.click()
    }
    addEventListener(DOWNLOAD_PNG_EVENT, downloadCanvasImage)
    return () => removeEventListener(DOWNLOAD_PNG_EVENT, downloadCanvasImage)
  }, [])

  useEffect(() => {
    dispatchEvent(new CustomEvent(RESET_INSET_EVENT))
  }, [state.selectedItems])

  const children = pipe(
    state.items,
    map((item) => {
      switch (item.type) {
        case "IMAGE":
          return <ThreeCanvasImage key={item.id} item={item} />
        case "TEXT":
          return <ThreeCanvasText key={item.id} item={item} />
        default:
          return null
      }
    })
  )

  return <Fragment>{children}</Fragment>
}

export default CreateCanvas
