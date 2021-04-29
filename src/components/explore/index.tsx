import Link from "components/Link"
import React from "react"

const IndexPage = () => {
  return (
    <article>
      <h2>exploreIndex</h2>
      <Link href="/explore/topics">
        <a>Topics</a>
      </Link>
      <Link href="/explore/search">
        <a>Search</a>
      </Link>
    </article>
  )
}

export default IndexPage
