import { Tab, TabList, TabPanel, Tabs as ReactTabs } from "react-tabs"
import "react-tabs/style/react-tabs.css"
import css from "./index.module.css"
import PhotoBin from "./PhotoBin"
import { zodResolver } from "@hookform/resolvers/zod"
import { FONT_FAMILY_DEFAULT } from "@samuelmeuli/font-manager"
import FontPicker from "font-picker-react"
import React, { useEffect, useRef, useState } from "react"
import { Color, TwitterPicker } from "react-color"
import { useForm } from "react-hook-form"
import { useCanvasStore } from "stores/canvas"
import { insertCanvasTextItemAction } from "stores/canvas/actions"
import { CanvasTextItem, Font } from "types/canvas"
import * as z from "zod"
import Submit from "../inputs/Submit"
import TextInput from "../inputs/TextInput"

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

  useEffect(() => {
    const textItems = state.items.filter(
      ({ type, id }) => state.selectedItems.includes(id) && type === "TEXT"
    ) as CanvasTextItem[]
    textItems.forEach((item) => {
      dispatch({
        type: "UPDATE_ITEM",
        payload: {
          itemId: item.id,
          color,
          ...(font ? { font } : undefined),
        },
      })
    })
  }, [color, font])

  const fontPickerRef = useRef<FontPicker | null>(null)

  // useEffect(() => {
  //   if (fontPickerRef.current?.state.loadingStatus !== "finished") return

  //   const textItems = state.items.filter(
  //     ({ type, id }) => state.selectedItems.includes(id) && type === "TEXT"
  //   ) as CanvasTextItem[]

  //   if (textItems.length > 0) {
  //     setFont(textItems[0].font)
  //   }
  // }, [state.selectedItems])

  async function submitHandler({ text }: { text: string }) {
    if (!font) {
      const fontPickerFont = fontPickerRef.current?.fontManager.getActiveFont()
      if (!fontPickerFont) return
      else {
        setFont(fontPickerFont)
        dispatch(
          insertCanvasTextItemAction({
            text,
            font: fontPickerFont,
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
        font,
        color,
      })
    )
    reset()
  }

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <TextInput name="text" ref={register} />
      <FontPicker
        ref={fontPickerRef}
        activeFontFamily={font?.family ?? FONT_FAMILY_DEFAULT}
        apiKey={process.env.NEXT_PUBLIC_GOOGLE_FONTS_API_KEY!}
        variants={["regular"]}
        onChange={(nextFont) => {
          setFont(nextFont)
        }}
      />
      <TwitterPicker
        color={color}
        onChangeComplete={(color) => setColor(color.hex)}
        triangle="hide"
      />
      <Submit />
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
