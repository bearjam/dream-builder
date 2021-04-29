import React from "react"
import useSWR from "swr"
import Link from "components/Link"
import UnsplashPhoto from "components/UnsplashPhoto"
import { fetcher } from "lib/util"
import { UnsplashTopic } from "types/unsplash"

const Explore = () => {
  const { data, error } = useSWR<{ results: UnsplashTopic[]; total: number }>(
    `/api/unsplash/topics`,
    fetcher
  )

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  return (
    <div>
      <h2>topics</h2>
      {data.results.map((topic) => (
        <Link key={topic.id} href={`/explore/topics/${topic.slug}`}>
          <a>
            <div>
              <h2>{topic.title}</h2>
              <UnsplashPhoto photo={topic.cover_photo!} />
            </div>
          </a>
        </Link>
      ))}
    </div>
  )
}

export default Explore
