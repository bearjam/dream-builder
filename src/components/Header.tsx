import { useRouter } from "next/router"
import React from "react"
import { Flipped } from "react-flip-toolkit"
import Link from "./Link"

type Link = {
  href: string
  label: string
  children?: Link[]
}

const links: Link[] = [
  { href: "/create", label: "create" },
  { href: "/explore", label: "explore" },
]

const Header = () => {
  const router = useRouter()

  return (
    <nav className="fixed w-full z-10 bg-yellow-600 flex justify-center items-center h-16">
      {links.map(({ href, label }) => {
        const active =
          href === "/"
            ? router.pathname === "/"
            : router.pathname.startsWith(href)
        return (
          <div key={href} className="relative inline-block mr-4">
            <Link href={href}>
              <a>
                <span>{label}</span>
                {active ? (
                  <Flipped flipId="underline">
                    <div className="absolute w-full bottom-0 border-2 border-black" />
                  </Flipped>
                ) : null}
              </a>
            </Link>
          </div>
        )
      })}
    </nav>
  )
}

export default Header
