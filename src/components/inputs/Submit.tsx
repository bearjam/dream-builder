import clsx from "clsx"
import React, { HTMLProps } from "react"
import css from "./index.module.css"

const Submit = ({ className, ...props }: HTMLProps<HTMLInputElement>) => {
  return (
    <input type="submit" className={clsx(css.button, className)} {...props} />
  )
}

export default Submit
