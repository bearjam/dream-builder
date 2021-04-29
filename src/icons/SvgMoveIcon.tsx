import * as React from "react"

function SvgMoveIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg height="1em" width="1em" viewBox="0 0 100 100" {...props}>
      <path
        style={{
          textIndent: 0,
          textAlign: "start",
          lineHeight: "normal",
          textTransform: "none",
          // blockProgression: "tb",
          marker: "none",
          // InkscapeFontSpecification: "Sans",
        }}
        d="M49.656 5a3 3 0 00-1.781.875l-12 12a3 3 0 104.25 4.219L47 15.219V47H15.25l6.875-6.906a3 3 0 00-2.469-5.125 3 3 0 00-1.781.906l-12 12a3 3 0 000 4.219l12 12a3 3 0 104.25-4.219L15.25 53H47v31.75l-6.875-6.875a3 3 0 00-2.469-.906 3 3 0 00-1.781 5.125l12 12a3 3 0 004.25 0l12-12a3 3 0 10-4.25-4.219L53 84.75V53h31.75l-6.875 6.875a3 3 0 104.25 4.219l12-12a3 3 0 000-4.219l-12-12a3 3 0 00-2.469-.906 3 3 0 00-1.781 5.125L84.75 47H53V15.219l6.875 6.875a3 3 0 104.25-4.219l-12-12A3 3 0 0049.656 5z"
        fontWeight={400}
        color="#000"
        overflow="visible"
        fontFamily="Sans"
      />
    </svg>
  )
}

export default SvgMoveIcon
