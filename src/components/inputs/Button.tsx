import { ButtonHTMLAttributes } from "react"
import css from "./index.module.css"
import clsx from "clsx"

const Button = <P extends ButtonHTMLAttributes<HTMLButtonElement>>({
  className,
  ...props
}: P) => <button className={clsx(css.button, className)} {...props} />

export default Button
