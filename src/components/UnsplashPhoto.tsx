import { ImageProps } from "next/image"
import { stringifyUrl, parseUrl } from "query-string"
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
  objectFit,
  objectPosition,
}: Props) => {
  const ratio = aspectRatio ?? photo.height / photo.width
  const { url, query, fragmentIdentifier } = parseUrl(photo.urls.raw)
  const url2 = stringifyUrl({
    url,
    query: { w: width, ...query },
    fragmentIdentifier,
  })
  switch (layout) {
    case "intrinsic":
      return (
        <Image
          src={url2}
          width={width}
          height={height ?? ratio * Number(width)}
        />
      )
    case "fill":
      return (
        <Image src={url} layout={layout} {...{ objectFit, objectPosition }} />
      )
    default:
      return null
  }
}

export default UnsplashPhoto
