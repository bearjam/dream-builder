import Header from "components/Header"
import { useRouter } from "next/router"
import React from "react"
import { Flipper } from "react-flip-toolkit"
import { LayoutType } from "types/layouts"

export const DefaultLayout: LayoutType = ({ children }) => {
  const router = useRouter()
  return (
    <Flipper flipKey={router.pathname}>
      <Header />
      {children}
    </Flipper>
  )
}

export const NoopLayout: LayoutType = ({ children }) => children as JSX.Element

export default DefaultLayout
