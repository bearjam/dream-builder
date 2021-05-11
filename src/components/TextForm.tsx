import { zodResolver } from "@hookform/resolvers/zod"
import React, { HTMLProps, useEffect, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"
import Submit from "./inputs/Submit"
import TextInput from "./inputs/TextInput"
import FontPicker from "font-picker-react"
import { useCanvasStore } from "stores/canvas"
import { CanvasTextItem, Font } from "types/canvas"
import { insertCanvasTextItemAction } from "stores/canvas/actions"

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

  const fontPickerRef = useRef<FontPicker | null>(null)

  useEffect(() => {
    if (fontPickerRef.current?.state.loadingStatus !== "finished") return

    const textItems = state.items.filter(
      ({ type, id }) => state.selectedItems.includes(id) && type === "TEXT"
    ) as CanvasTextItem[]

    if (textItems.length > 0) {
      setFont(textItems[0].font)
    }
  }, [state.selectedItems])

  async function submitHandler({ text }: { text: string }) {
    if (!font) return
    dispatch(
      insertCanvasTextItemAction({
        text,
        font,
      })
    )
    reset()
  }

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <TextInput name="text" ref={register} />
      <FontPicker
        ref={fontPickerRef}
        activeFontFamily={font?.family ?? "Open Sans"}
        apiKey={process.env.NEXT_PUBLIC_GOOGLE_FONTS_API_KEY!}
        variants={["regular"]}
        onChange={(nextFont) => {
          setFont(nextFont)
        }}
      />
      <Submit />
    </form>
  )
}

export default TextForm
