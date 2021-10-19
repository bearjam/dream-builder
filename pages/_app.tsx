import { AppPropsType } from "next/dist/shared/lib/utils"
import React from "react"
import DefaultLayout from "src/layouts"
import { LayoutType } from "types/layouts"
import { NextComponentType } from "next"
import "./_app.css"

function MyApp({
  Component,
  pageProps,
}: Omit<AppPropsType, "Component"> & {
  Component: NextComponentType & { Layout?: LayoutType }
}) {
  const Layout = Component?.Layout ?? DefaultLayout

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
