import React, { PropsWithChildren } from "react"
import NextLink, { LinkProps } from "next/link"

const Link = (props: PropsWithChildren<LinkProps>) => {
  return <NextLink {...props} />
}

export default Link
