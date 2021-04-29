import * as React from "react"

function SvgCropIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg height="1em" width="1em" viewBox="0 0 32 32" {...props}>
      <path d="M30.707 2.707a1 1 0 00-1.414-1.414L24.586 6H8V2a1 1 0 00-2 0v4H2a1 1 0 000 2h4v17a1.02 1.02 0 001 1h17v4a1 1 0 002 0v-4h4a1 1 0 000-2h-4V7.414zM8 8h14.586L8 22.586zm16 16H9.414L24 9.414z" />
    </svg>
  )
}

export default SvgCropIcon
