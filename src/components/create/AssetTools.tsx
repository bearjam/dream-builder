import { Tab, TabList, TabPanel, Tabs as ReactTabs } from "react-tabs"
import "react-tabs/style/react-tabs.css"
import css from "./index.module.css"
import PhotoBin from "./PhotoBin"
import { zodResolver } from "@hookform/resolvers/zod"
import { FONT_FAMILY_DEFAULT } from "@samuelmeuli/font-manager"
import FontPicker from "font-picker-react"
import React, { useEffect, useRef, useState } from "react"
import { Color, SliderPicker, TwitterPicker } from "react-color"
import { useForm } from "react-hook-form"
import { useCanvasStore } from "stores/canvas"
import { insertCanvasTextItemAction } from "stores/canvas/actions"
import { CanvasTextItem, Font } from "types/canvas"
import * as z from "zod"
import Submit from "../inputs/Submit"
import TextInput from "../inputs/TextInput"
import { useDebounce } from "use-debounce"
import { httpsFont } from "lib/util"

const schema = z.object({
  text: z.string().nonempty(),
})

const TextForm = () => {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      text: "",
    },
    resolver: zodResolver(schema),
  })

  const [state, dispatch] = useCanvasStore((store) => [
    store.state,
    store.dispatch,
  ])

  const [font, setFont] = useState<Font | null>(null)
  const [color, setColor] = useState<Color>("#FF6900")
  const [debouncedColor] = useDebounce(color, 300)

  useEffect(() => {
    const textItems = state.items.filter(
      ({ type, id }) => state.selectedItems.includes(id) && type === "TEXT"
    ) as CanvasTextItem[]
    textItems.forEach((item) => {
      dispatch({
        type: "UPDATE_ITEM",
        payload: {
          itemId: item.id,
          color: debouncedColor,
          font: font ? httpsFont(font) : undefined,
        },
        undoable: true,
      })
    })
  }, [debouncedColor, font])

  const fontPickerRef = useRef<FontPicker | null>(null)

  useEffect(() => {
    const [id] = state.selectedItems
    const item = state.items.find((x) => x.id === id)
    if (item && item.type === "TEXT") {
      setColor(item.color)
    }
  }, [state.selectedItems])

  async function submitHandler({ text }: { text: string }) {
    if (!font) {
      const fontPickerFont = fontPickerRef.current?.fontManager.getActiveFont()
      if (!fontPickerFont) return
      else {
        setFont(fontPickerFont)
        dispatch(
          insertCanvasTextItemAction({
            text,
            font: httpsFont(fontPickerFont),
            color,
          })
        )
        reset()
        return
      }
    }
    dispatch(
      insertCanvasTextItemAction({
        text,
        font: httpsFont(font),
        color,
      })
    )
    reset()
  }

  return (
    <form onSubmit={handleSubmit(submitHandler)} className={css["text-form"]}>
      <TextInput name="text" ref={register} autoComplete="off" />
      <FontPicker
        ref={fontPickerRef}
        activeFontFamily={font?.family ?? FONT_FAMILY_DEFAULT}
        apiKey={process.env.NEXT_PUBLIC_GOOGLE_FONTS_API_KEY!}
        variants={["regular"]}
        onChange={(nextFont) => {
          setFont(nextFont)
        }}
      />
      <SliderPicker color={color} onChange={(color) => setColor(color.hex)} />
      <Submit className="bg-blue" />
    </form>
  )
}

const AssetTools = () => {
  return (
    <div className={css.assetTools}>
      <ReactTabs>
        <TabList>
          <Tab>Images</Tab>
          <Tab>Text</Tab>
        </TabList>
        <TabPanel>
          <PhotoBin />
        </TabPanel>
        <TabPanel>
          <TextForm />
        </TabPanel>
      </ReactTabs>
    </div>
  )
}

export default AssetTools
