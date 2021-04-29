import * as React from "react"

function SvgScaleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg height="1em" width="1em" viewBox="0 0 100 100" {...props}>
      <switch>
        <g>
          <path d="M91.1 78.6h-5.8V85h12.2V72.8h-6.4zM60.4 78.6H77V85H60.4zM15 23h6.4v16.6H15zM21.4 8.9h5.8V2.5H15v12.2h6.4zM60.4 2.5H77v6.4H60.4zM35.5 2.5h16.6v6.4H35.5zM85.3 2.5v6.4h5.8v5.8h6.4V2.5zM91.1 47.9h6.4v16.6h-6.4zM91.1 23h6.4v16.6h-6.4z" />
          <path d="M59.7 24.1h11.7L47.7 47.7H2.5v49.8h49.8V52.3L76 28.6v11.7h6.4V17.6H59.7v6.5zm-13.9 67H8.9V54.2h36.9v36.9z" />
        </g>
      </switch>
    </svg>
  )
}

export default SvgScaleIcon
