import React, { forwardRef, HTMLProps } from "react"

const Textarea = forwardRef<
  HTMLTextAreaElement,
  HTMLProps<HTMLTextAreaElement>
>((props, ref) => {
  return (
    <textarea
      className="border border-black"
      name="text"
      ref={ref}
      {...props}
    />
  )
})

export default Textarea
