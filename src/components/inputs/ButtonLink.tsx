import clsx from "clsx"
import Link from "components/Link"
import { LinkProps } from "next/link"
import { PropsWithChildren, PropsWithoutRef } from "react"
import css from "./index.module.css"

export const ButtonLink = ({
  href,
  className,
  ...props
}: PropsWithChildren<LinkProps> &
  PropsWithoutRef<JSX.IntrinsicElements["a"]>) => (
  <Link href={href}>
    <a className={clsx(css.button, className)} {...props} />
  </Link>
)
export default ButtonLink
