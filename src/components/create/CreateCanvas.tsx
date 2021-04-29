import { pipe } from "fp-ts/function"
import { map } from "fp-ts/ReadonlyArray"
import { Fragment, useEffect } from "react"
import { useCanvasStore } from "stores/canvas"
import ThreeCanvasImage from "./ThreeCanvasImage"
import ThreeCanvasText from "./ThreeCanvasText"

const CreateCanvas = () => {
  const [state, dispatch] = useCanvasStore((store) => [
    store.state,
    store.dispatch,
  ])
  useEffect(() => {
    dispatch({
      type: "CLEAR_CROP_INSET",
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
  return <Fragment>{children}</Fragment>
}

export default CreateCanvas
