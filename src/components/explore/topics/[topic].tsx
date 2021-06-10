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
import { stringifyUrl } from "query-string"
import Paginate from "components/Paginate"
import SvgHeartIcon from "icons/SvgHeartIcon"

const { min } = Math

type Props = {
  topic: string
}

const TopicImages = ({ topic }: Props) => {
  const router = useRouter()
  const query = router.query

  const p = Number(query.p)
  const page = isNaN(p) ? 1 : p
  const setPage = (p: number) => void router.push({ query: { ...query, p } })

  const [ids, dispatch] = usePhotoStore(
    (store) => [store.state.photos.map((p) => p.id), store.dispatch],
    shallow
  )

  const { data, error } = useSWR<{ results: UnsplashPhotoT[]; total: number }>(
    stringifyUrl({
      url: `/api/unsplash/topics/${topic}`,
      query: {
        page,
      },
    }),
    fetcher
  )

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  const count = min(data.total, 500)
  const limit = 50
  const heartColor = "white"

  return (
    <div className={css.root}>
      <h3>Back to collections</h3>
      <div className={css.images}>
        {pipe(
          data.results,
          // filter((x) => !ids.includes(x.id)),
          map((result) => (
            <div
              key={result.id}
              onClick={() =>
                !ids.includes(result.id)
                  ? dispatch({ type: "INSERT", payload: result })
                  : dispatch({ type: "DELETE", payload: result })
              }
              className="relative"
            >
              <UnsplashPhoto photo={result} />
              <SvgHeartIcon
                className="absolute top-0 right-0 mt-8 mr-4"
                overflow="visible"
                fill={ids.includes(result.id) ? heartColor : "none"}
                stroke={heartColor}
                strokeWidth={10}
                width="2em"
                height="2em"
              />
            </div>
          ))
        )}
      </div>
      <Paginate count={count} limit={limit} page={page} setPage={setPage} />
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
