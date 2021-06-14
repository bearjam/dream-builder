import * as React from "react";

function SvgBackIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      {...props}
    >
      <g data-name="Layer 15">
        <rect
          x={4.19}
          y={27.79}
          width={56}
          height={16}
          rx={8}
          ry={8}
          transform="rotate(-45 32.184 35.789)"
        />
        <rect
          x={4.21}
          y={56.19}
          width={56}
          height={16}
          rx={8}
          ry={8}
          transform="rotate(45 32.202 64.189)"
        />
        <rect x={10} y={42} width={80} height={16} rx={8} ry={8} />
      </g>
    </svg>
  );
}

export default SvgBackIcon;

