import { useRouter } from "next/router"
import React, { HTMLProps } from "react"
import Link from "./Link"

type Link = {
  href: string
  label: string
}

const links: Link[] = [
  { href: "/", label: "About" },
  { href: "/explore", label: "Explore" },
  { href: "/create", label: "Create" },
]

type NavLinkProps = Link & {
  children: (
    arg: Link & {
      active: boolean
    }
  ) => JSX.Element
}

const NavLink = ({ children, href, label, ...props }: NavLinkProps) => {
  const router = useRouter()
  const pathBeginning = `/${router.pathname.split("/")[1]}`
  const active = pathBeginning === href
  return children ? (
    children({ href, label, active, ...props })
  ) : (
    <Link href={href} {...props}>
      <a>{label}</a>
    </Link>
  )
}

type NavProps = Omit<HTMLProps<HTMLDivElement>, "children"> & {
  children: (arg: {
    href: string
    label: string
    active: boolean
  }) => JSX.Element
}

const Nav = ({ children, ...props }: NavProps) => {
  return (
    <nav {...props}>
      {links.map((linkProps) => (
        <NavLink key={linkProps.href} children={children} {...linkProps} />
      ))}
    </nav>
  )
}

export default Nav
