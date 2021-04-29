import { pipe } from "fp-ts/function"
import { map } from "fp-ts/ReadonlyArray"
import { getWidthHeight } from "lib/util"
import React, { HTMLProps } from "react"
import { insertCanvasImageItemAction } from "stores/canvas/actions"
import { useCanvasStore } from "../../stores/canvas"
import { usePhotoStore } from "../../stores/photos"
import Link from "../Link"
import UnsplashPhoto from "../UnsplashPhoto"
import css from "./index.module.css"

type Props = HTMLProps<HTMLDivElement> & {
  onDispatch?: () => void
}

const PhotoBin = ({ onDispatch = () => {}, ...props }: Props) => {
  const photos = usePhotoStore((store) => store.state.photos)
  const dispatchCanvas = useCanvasStore((store) => store.dispatch)

  return (
    <div className={css.photoBin} {...props}>
      {photos.length < 1 ? (
        <article>
          <h4>Photo Bin Empty!</h4>
          <Link href="/explore">
            <a>
              <h5>Explore Photos?</h5>
            </a>
          </Link>
        </article>
      ) : (
        <div>
          {pipe(
            photos,
            map((photo) => (
              <UnsplashPhoto
                key={photo.id}
                photo={photo}
                onClick={() => {
                  dispatchCanvas(
                    insertCanvasImageItemAction({
                      id: Buffer.from(
                        [photo.id, Date.now()].join("-")
                      ).toString("hex"),
                      src: photo.urls.regular,
                      naturalWidth: photo.width,
                      naturalHeight: photo.height,
                      ...getWidthHeight(photo),
                    })
                  )
                  onDispatch()
                }}
              />
            ))
          )}
        </div>
      )}
    </div>
  )
}

export default PhotoBin
