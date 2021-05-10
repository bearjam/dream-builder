import React from "react"
import useSWR from "swr"
import Link from "components/Link"
import UnsplashPhoto from "components/UnsplashPhoto"
import { fetcher } from "lib/util"
import { UnsplashTopic } from "types/unsplash"
import css from "./index.module.css"

const Explore = () => {
  const { data, error } = useSWR<{ results: UnsplashTopic[]; total: number }>(
    `/api/unsplash/topics`,
    fetcher
  )

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  return (
    <div className={css.root}>
      <section className={css.collections}>
        <h2>Choose a collection</h2>
        {data.results.map((topic) => (
          <Link key={topic.id} href={`/explore/topics/${topic.slug}`}>
            <a>
              <div>
                <h2>{topic.title}</h2>
                <UnsplashPhoto
                  photo={topic.cover_photo!}
                  className="max-h-12"
                />
              </div>
            </a>
          </Link>
        ))}
      </section>
    </div>
  )
}

export default Explore
