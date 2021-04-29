import React from "react"
import dynamic from "next/dynamic"
import { NoopLayout } from "src/layouts"
const R3FTest = dynamic(() => import("components/R3FTest"), { ssr: false })

const R3FTestPage = () => {
  return <R3FTest />
}

R3FTestPage.Layout = NoopLayout

export default R3FTestPage
