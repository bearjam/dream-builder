import clsx from "clsx"
import React, { HTMLProps } from "react"
import css from "./Footer.module.css"
import SvgBearjamAvatar from "./SvgBearjamAvatar"
import SvgBearjamTitle from "./SvgBearjamTitle"
import Nav from "./Nav"
import Link from "./Link"
import SocialLinks, { SocialLinksData } from "./SocialLinks"

const socialLinks: SocialLinksData = [
  { site: "github", href: "https://github.com/bearjam" },
  { site: "twitter", href: "https://twitter.com/bearjamdev" },
  { site: "linkedin", href: "https://linkedin.com/company/bearjam" },
]

const defaultClassName =
  "py-10 flex flex-col items-center sm:relative sm:pt-12 sm:pb-4"

const Footer = ({ className, ...restProps }: HTMLProps<HTMLDivElement>) => {
  return (
    <div className={css.root} {...restProps}>
      <footer
        className={clsx(css.footer, defaultClassName, className)}
        {...restProps}
      >
        <div className="flex flex-col items-center sm:absolute sm:top-0 sm:mt-3">
          <SvgBearjamAvatar className="w-12 mt-4 sm:w-10" />
          <SvgBearjamTitle className="w-32 mt-4 sm:w-16" />

          {/* <div className="flex mt-4 sm:mb-3 sm:mt-3">
            <SocialLinks data={socialLinks}>
              {({ Icon, href }) => (
                <a href={href}>
                  <Icon className="w-5 text-white fill-current mx-2" />
                </a>
              )}
            </SocialLinks>
          </div> */}
        </div>
        <div>
          <h3>Dream Builder</h3>
          <Nav className="flex flex-col text-center sm:flex-row">
            {({ href, label }: { href: string; label: string }) => (
              <Link href={href} key={href}>
                <a className="mb-4 text-gray-100 sm:mx-8 lg:mx-12 sm:mt-8 sm:mb-3">
                  {label}
                </a>
              </Link>
            )}
          </Nav>
        </div>
        <div>
          <h3>Small Print</h3>
        </div>
      </footer>
    </div>
  )
}
export default Footer
