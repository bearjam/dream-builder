import { zodResolver } from "@hookform/resolvers/zod"
import React, { HTMLProps, useState } from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"
import Submit from "./inputs/Submit"
import TextInput from "./inputs/TextInput"
import FontPicker from "font-picker-react"

type Props = Omit<HTMLProps<HTMLFormElement>, "onSubmit"> & {
  onSubmit: (text: string) => any
}

const schema = z.object({
  text: z.string().nonempty(),
})

const TextForm = ({ onSubmit, ...props }: Props) => {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      text: "",
    },
    resolver: zodResolver(schema),
  })

  const [activeFontFamily, setActiveFontFamily] = useState("Open Sans")

  async function submitHandler({ text }: { text: string }) {
    if (onSubmit) onSubmit(text)
    reset()
  }

  return (
    <form onSubmit={handleSubmit(submitHandler)} {...props}>
      <TextInput name="text" ref={register} />
      <FontPicker
        apiKey={process.env.NEXT_PUBLIC_GOOGLE_FONTS_API_KEY!}
        activeFontFamily={activeFontFamily}
        onChange={(nextFont) => void setActiveFontFamily(nextFont.family)}
      />
      <Submit />
    </form>
  )
}

export default TextForm
