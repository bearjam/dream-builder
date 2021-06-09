import React, { Fragment, SVGProps } from "react"
import {
  SvgIconGitHub,
  SvgIconInstagram,
  SvgIconLinkedIn,
  SvgIconTwitter,
} from "./social-icons"

const icons = {
  twitter: SvgIconTwitter,
  github: SvgIconGitHub,
  instagram: SvgIconInstagram,
  linkedin: SvgIconLinkedIn,
}

type Site = keyof typeof icons

export type SocialLinksData = { site: Site; href: string }[]

type C = {
  site: Site
  href: string
  Icon: (props: SVGProps<SVGSVGElement>) => JSX.Element
}

type Props = {
  children: (c: C) => JSX.Element
  data: SocialLinksData
}

const SocialLinks = ({ children, data }: Props) => {
  return (
    <>
      {data.map(({ site, ...rest }) => (
        <Fragment key={site}>
          {children({ site, Icon: icons[site], ...rest })}
        </Fragment>
      ))}
    </>
  )
}

export default SocialLinks
