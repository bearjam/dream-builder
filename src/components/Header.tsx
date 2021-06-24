import {
  AnimatePresence,
  AnimateSharedLayout,
  HTMLMotionProps,
  motion,
} from "framer-motion"
import Link from "next/link"
import React, { HTMLProps, useState } from "react"
import theme from "tailwindcss/defaultTheme"
import css from "./Header.module.css"
import Nav from "./Nav"

export const Root = (props: HTMLMotionProps<"div">) => (
  <motion.header className={css.root} {...props} />
)

export const Backdrop = (props: HTMLMotionProps<"div">) => (
  <motion.div className={css.backdrop} {...props} />
)

export const Container = (props: HTMLProps<HTMLDivElement>) => (
  <div className={css.container} {...props} />
)

const Path = (props: any) => (
  <motion.path
    fill="transparent"
    strokeWidth="3"
    stroke="hsl(0, 0%, 18%)"
    strokeLinecap="round"
    {...props}
  />
)

export const MenuToggle = (props: any) => (
  <button {...props}>
    <svg width="23" height="23" viewBox="0 0 23 23">
      <Path
        variants={{
          closed: { d: "M 2 2.5 L 20 2.5" },
          open: { d: "M 3 16.5 L 17 2.5" },
        }}
      />
      <Path
        d="M 2 9.423 L 20 9.423"
        variants={{
          closed: { opacity: 1 },
          open: { opacity: 0 },
        }}
        transition={{ duration: 0.1 }}
      />
      <Path
        variants={{
          closed: { d: "M 2 16.346 L 20 16.346" },
          open: { d: "M 3 2.5 L 17 16.346" },
        }}
      />
    </svg>
  </button>
)

export const Branding = () => (
  <Link href="/">
    <a>
      <div>
        {/* <BearBookshopLogo /> */}
        <h3>Branding</h3>
      </div>
    </a>
  </Link>
)

const transition = {
  type: "spring",
  damping: 25,
  mass: 0.9,
  stiffness: 120,
}

export default function Header() {
  const [open, setOpen] = useState(false)
  const toggleOpen = () => void setOpen((p) => !p)

  return (
    <Root animate={open ? "open" : "closed"} initial="closed">
      <Backdrop
        data-open={open}
        variants={{
          closed: {
            y: `calc(-100% + ${theme.spacing[20]})`,
            transition: {
              ...transition,
              delay: 0.5,
            },
          },
          open: {
            y: 0,
            transition,
          },
        }}
      />
      <Container>
        <MenuToggle onClick={toggleOpen} className={css.menu} />
        <AnimatePresence>
          {open && (
            <Nav
              className={css.navMobile}
              variants={{
                open: {
                  transition: {
                    staggerChildren: 0.2,
                    delayChildren: 0.2,
                  },
                },
                closed: {
                  transition: {
                    staggerChildren: 0.1,
                    staggerDirection: -1,
                  },
                },
              }}
              initial="closed"
              animate="open"
              exit="closed"
            >
              {({ href, label, active }: any) => (
                <motion.div
                  initial="closed"
                  variants={{
                    open: {
                      opacity: 1,
                    },
                    closed: {
                      opacity: 0,
                    },
                  }}
                  onClick={() => void setOpen(false)}
                >
                  <Link href={href}>
                    <a data-active={active}>{label}</a>
                  </Link>
                </motion.div>
              )}
            </Nav>
          )}
        </AnimatePresence>
        <AnimateSharedLayout>
          <Nav className={css.navDesktop}>
            {({ href, label, active }: any) => (
              <Link href={href}>
                <a>
                  <span>{label}</span>
                  {active && <motion.div layoutId="underline" />}
                </a>
              </Link>
            )}
          </Nav>
        </AnimateSharedLayout>
        <div className={css.logo}>
          <Branding />
        </div>
        <div className={css.icons}>
          <div>
            {/* <Account /> */}
            account
          </div>
          <div>
            {/* <BasketIndicator className={css.basket} /> */}
            basket indicator
          </div>
        </div>
      </Container>
    </Root>
  )
}
