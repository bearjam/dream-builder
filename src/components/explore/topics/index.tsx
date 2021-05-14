import React from "react"
import useSWR from "swr"
import Link from "components/Link"
import { fetcher } from "lib/util"
import { UnsplashTopic } from "types/unsplash"
import css from "./index.module.css"
import UnsplashPhoto from "components/UnsplashPhoto"

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
        <h1>Choose a collection</h1>
        <div className={css.topicsContainer}>
          {data.results.map((topic) => (
            <div key={topic.id}>
              <Link href={`/explore/topics/${topic.slug}`}>
                <a>
                  <div className={css.cover}>
                    <h2>{topic.title}</h2>
                    <div className={css.image}>
                      <UnsplashPhoto
                        photo={topic.cover_photo!}
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                  </div>
                </a>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Explore
