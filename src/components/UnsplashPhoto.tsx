import { ImageProps } from "next/image"
import { stringifyUrl } from "query-string"
import React from "react"
import { UnsplashPhotoT } from "../types/unsplash"
import Image from "./Image"

type Props = {
  photo: UnsplashPhotoT
  aspectRatio?: number
  layout?: "intrinsic" | "fill" | "fixed" | "responsive"
} & Partial<ImageProps>

const UnsplashPhoto = ({
  photo,
  width = window?.innerWidth ?? 600,
  height,
  aspectRatio,
  layout = "intrinsic",
  ...props
}: Props) => {
  const ratio = aspectRatio ?? photo.height / photo.width
  const url = stringifyUrl({
    url: photo.urls.raw,
    query: { w: width },
  })
  switch (layout) {
    case "intrinsic":
      return (
        <Image
          src={url}
          width={width}
          height={height ?? ratio * Number(width)}
          {...props}
        />
      )
    case "fill":
      return <Image src={url} layout={layout} {...props} />
    default:
      return null
  }
}

export default UnsplashPhoto
