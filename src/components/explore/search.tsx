import TextForm from "components/TextForm"
import UnsplashPhoto from "components/UnsplashPhoto"
import { pipe } from "fp-ts/function"
import { filter, map } from "fp-ts/ReadonlyArray"
import { fetcher } from "lib/util"
import { useRouter } from "next/router"
import { stringifyUrl } from "query-string"
import React from "react"
import { usePhotoStore } from "stores/photos"
import useSWR from "swr"
import { Photos } from "unsplash-js/dist/methods/search/types/response"
import shallow from "zustand/shallow"

const SearchResults = ({ query }: { query: string }) => {
  const [ids, dispatch] = usePhotoStore(
    (store) => [store.state.photos.map((p) => p.id), store.dispatch],
    shallow
  )
  const { data, error } = useSWR<Photos>(
    stringifyUrl({
      url: `/api/unsplash/search`,
      query: {
        q: query,
      },
    }),
    fetcher
  )

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  return (
    <div className="flex flex-wrap">
      {pipe(
        data.results,
        filter((x) => !ids.includes(x.id)),
        map((result) => (
          <div
            key={result.id}
            className="w-64 p-4"
            onClick={() => dispatch({ type: "INSERT", payload: result })}
          >
            <UnsplashPhoto photo={result} />
          </div>
        ))
      )}
    </div>
  )
}

const ExploreSearch = () => {
  const router = useRouter()
  return (
    <article>
      <h2>exploreSearch</h2>
      <TextForm
        onSubmit={(text) =>
          void router.push({
            query: {
              q: text,
            },
          })
        }
      />
      {router.query?.q ? (
        <SearchResults query={router.query.q as string} />
      ) : null}
    </article>
  )
}

export default ExploreSearch
