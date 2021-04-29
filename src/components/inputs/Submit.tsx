import React, { HTMLProps } from "react"

const Submit = (props: HTMLProps<HTMLInputElement>) => {
  return <input type="submit" {...props} />
}

export default Submit
