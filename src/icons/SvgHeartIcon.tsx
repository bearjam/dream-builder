import * as React from "react"

function SvgHeartIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 90 90" width="1em" height="1em" {...props}>
      <path d="M65.787 4.876c-8.753 0-16.353 4.689-20.787 11.613C40.566 9.565 32.967 4.876 24.213 4.876 10.841 4.876 0 15.717 0 29.089c0 4.435 1.525 8.92 3.414 12.893 5.02 10.553 14.145 19.414 22.597 27.252C32.059 74.842 38.398 80.177 45 85.124c6.602-4.948 12.941-10.283 18.989-15.891 8.452-7.837 17.577-16.698 22.597-27.252C88.475 38.01 90 33.525 90 29.089 90 15.717 79.159 4.876 65.787 4.876z" />
    </svg>
  )
}

export default SvgHeartIcon
