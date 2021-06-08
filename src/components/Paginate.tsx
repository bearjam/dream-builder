import React from "react"
import Button from "./inputs/Button"
import css from "./Paginate.module.css"

const { ceil } = Math

interface Props {
  count: number
  limit: number
  page: number
  setPage: (x: number) => void
}

const Paginate = ({ count, limit, page, setPage }: Props) => {
  return (
    <div className={css["page-numbers"]}>
      {Array(ceil(count / limit))
        .fill(0)
        .map((_, i) => i + 1)
        .map((pageNumber) => (
          <Button
            key={`pageNumber-${pageNumber}`}
            onClick={() => void setPage(pageNumber)}
            data-active={pageNumber === page}
          >
            {pageNumber}
          </Button>
        ))}
    </div>
  )
}

export default Paginate
