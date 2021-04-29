import React, { forwardRef, HTMLProps } from "react"

const Textarea = forwardRef<HTMLInputElement, HTMLProps<HTMLInputElement>>(
  (props, ref) => {
    return (
      <input type="text" className="border border-black" {...props} ref={ref} />
    )
  }
)

export default Textarea
