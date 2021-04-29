import { ImageProps } from "next/image"
import { stringifyUrl } from "query-string"
import React from "react"
import { UnsplashPhotoT } from "../types/unsplash"
import Image from "./Image"

type Props = Omit<ImageProps, "width" | "src"> & {
  photo: UnsplashPhotoT
  width?: number
}

const UnsplashPhoto = ({
  photo,
  width = window?.innerWidth ?? 600,
  ...props
}: Props) => {
  const ratio = photo.height / photo.width
  const url = stringifyUrl({
    url: photo.urls.raw,
    query: { w: width },
  })
  return <Image src={url} width={width} height={ratio * width} {...props} />
}

export default UnsplashPhoto
