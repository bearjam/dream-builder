import React from "react"
import { Flipped } from "react-flip-toolkit"
import Link from "./Link"
import Nav from "./Nav"

const Header = () => {
  return (
    <Nav className="fixed w-full z-10 bg-coral flex justify-center items-center h-16">
      {({ href, label, active }) => {
        return (
          <div key={href} className="relative inline-block mr-4">
            <Link href={href}>
              <a>
                <h3>{label}</h3>

                {active ? (
                  <Flipped flipId="underline">
                    <div className="absolute w-full bottom-0 border-b-2 border-black" />
                  </Flipped>
                ) : null}
              </a>
            </Link>
          </div>
        )
      }}
    </Nav>
  )
}

export default Header
