import Link from "components/Link"
import Paginate from "components/Paginate"
import UnsplashPhoto from "components/UnsplashPhoto"
import { pipe } from "fp-ts/function"
import { map } from "fp-ts/ReadonlyArray"
import SvgBackIcon from "icons/SvgBackIcon"
import SvgHeartIcon from "icons/SvgHeartIcon"
import { fetcher } from "lib/util"
import { useRouter } from "next/router"
import { stringifyUrl } from "query-string"
import React from "react"
import { usePhotoStore } from "stores/photos"
import useSWR from "swr"
import { Photos } from "unsplash-js/dist/methods/search/types/response"
import shallow from "zustand/shallow"
import css from "./topics/topic.module.css"

const { min } = Math

const SearchResults = ({ query }: { query: string }) => {
  const router = useRouter()
  const p = Number(router.query.p)
  const page = isNaN(p) ? 1 : p
  const setPage = (p: number) =>
    void router.push({ query: { ...router.query, p } })

  const [ids, dispatch] = usePhotoStore(
    (store) => [store.state.photos.map((p) => p.id), store.dispatch],
    shallow
  )
  const { data, error } = useSWR<Photos>(
    stringifyUrl({
      url: `/api/unsplash/search`,
      query: {
        q: query,
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
      <Link href="/explore">
        <a>
          <h3>
            <span>
              <SvgBackIcon />
            </span>
            <span>Back to collections</span>
          </h3>
        </a>
      </Link>
      <div className={css.images}>
        {pipe(
          data.results,
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

const ExploreSearch = () => {
  const router = useRouter()
  return router.query?.q ? (
    <SearchResults query={router.query.q as string} />
  ) : null
}

export default ExploreSearch
