import { useThree } from "@react-three/fiber"
import { pipe } from "fp-ts/function"
import { map } from "fp-ts/ReadonlyArray"
import { Fragment, useEffect } from "react"
import { useCanvasStore } from "stores/canvas"
import { DOWNLOAD_PNG_EVENT } from "../../lib/events"
import ThreeCanvasImage from "./ThreeCanvasImage"
import ThreeCanvasText from "./ThreeCanvasText"

// const Background = () => {
//   const [size, viewport] = useThree((three) => [three.size, three.viewport])
//   const [width, height] = [size.width, size.height]
//   const dispatch = useCanvasStore((store) => store.dispatch)
//   return (
//     <mesh
//       onClick={() =>
//         void dispatch({
//           type: "SELECT_ITEM",
//           payload: { itemId: "" },
//           undoable: false,
//         })
//       }
//     >
//       <planeBufferGeometry args={[width, height]} />
//       <meshBasicMaterial color="white" />
//     </mesh>
//   )
// }

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
    dispatch({
      type: "CLEAR_CROP_INSET",
      undoable: false,
    })
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

  return (
    <Fragment>
      {/* <Background /> */}
      {children}
    </Fragment>
  )
}

export default CreateCanvas
