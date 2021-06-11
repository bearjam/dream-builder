import * as React from "react"

function SvgUndoIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      height="1em"
      width="1em"
      // xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 150 205"
      transform="scale(-1, 1)"
      // fillRule="evenodd"
      // clipRule="evenodd"
      // shapeRendering="geometricPrecision"
      // textRendering="geometricPrecision"
      // imageRendering="optimizeQuality"
      {...props}
    >
      <path d="M150 40L81 0v28c-110 7-108 177 7 177h51v-22H88C2 183 0 58 81 51v29l69-40z" />
    </svg>
  )
}

export default SvgUndoIcon
