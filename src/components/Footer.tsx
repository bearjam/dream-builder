import clsx from "clsx"
import React, { HTMLProps } from "react"
import css from "./Footer.module.css"
import SvgBearjamAvatar from "./SvgBearjamAvatar"
import SvgBearjamTitle from "./SvgBearjamTitle"
import Nav from "./Nav"
import Link from "./Link"
import { AnimateSharedLayout, motion } from "framer-motion"

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
        </div>
        <div>
          <AnimateSharedLayout>
            <Nav className="flex flex-col text-center sm:flex-row mt-8 sm:mt-12">
              {({
                href,
                label,
                active,
              }: {
                href: string
                label: string
                active: boolean
              }) => (
                <Link href={href} key={href}>
                  <a className="mb-4 text-gray-100 sm:mx-8 lg:mx-12 sm:mt-8 sm:mb-3">
                    <span>{label}</span>
                    {active && <motion.div layoutId="underline" />}
                  </a>
                </Link>
              )}
            </Nav>
          </AnimateSharedLayout>
        </div>
      </footer>
    </div>
  )
}
export default Footer
