import { useRouter } from "next/router"
import { filter, map } from "fp-ts/ReadonlyArray"
import { pipe } from "fp-ts/function"
import React from "react"
import useSWR from "swr"
import shallow from "zustand/shallow"
import { fetcher } from "lib/util"
import { usePhotoStore } from "stores/photos"
import { UnsplashPhotoT } from "types/unsplash"
import UnsplashPhoto from "components/UnsplashPhoto"
import css from "./topic.module.css"

type Props = {
  topic: string
}

const TopicImages = ({ topic }: Props) => {
  const [ids, dispatch] = usePhotoStore(
    (store) => [store.state.photos.map((p) => p.id), store.dispatch],
    shallow
  )
  const { data, error } = useSWR<{ results: UnsplashPhotoT[]; total: number }>(
    `/api/unsplash/topics/${topic}`,
    fetcher
  )

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>
  return (
    <div className={css.root}>
      <h3>Back to collections</h3>
      <div className={css.images}>
        {pipe(
          data.results,
          filter((x) => !ids.includes(x.id)),
          map((result) => (
            <div
              key={result.id}
              onClick={() => dispatch({ type: "INSERT", payload: result })}
            >
              <UnsplashPhoto photo={result} />
            </div>
          ))
        )}
      </div>
    </div>
  )
}

const TopicPage = () => {
  const router = useRouter()
  const { topic } = router.query
  return typeof topic === "string" ? (
    <TopicImages topic={topic} />
  ) : (
    <div>bad topic</div>
  )
}

export default TopicPage
