import * as React from "react";

function SvgCloseIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
      data-name="Layer 1"
      viewBox="0 0 32 32"
      {...props}
    >
      <path d="M16 1a15 15 0 1015 15A15.017 15.017 0 0016 1zm0 28a13 13 0 1113-13 13.015 13.015 0 01-13 13z" />
      <path d="M21.657 10.343a1 1 0 00-1.414 0L16 14.586l-4.243-4.243a1 1 0 00-1.414 1.414L14.586 16l-4.243 4.243a1 1 0 101.414 1.414L16 17.414l4.243 4.243a1 1 0 101.414-1.414L17.414 16l4.243-4.243a1 1 0 000-1.414z" />
    </svg>
  );
}

export default SvgCloseIcon;

