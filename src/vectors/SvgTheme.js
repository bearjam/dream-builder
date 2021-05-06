import * as React from "react";

function SvgTheme(props) {
  return (
    <svg
      width={215}
      height={144}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#theme_svg__clip0)">
        <path
          d="M61.48 122.601c33.956 0 61.481-27.445 61.481-61.3C122.961 27.445 95.436 0 61.481 0S0 27.445 0 61.3c0 33.856 27.526 61.301 61.48 61.301z"
          fill="#F2B6BC"
        />
        <path
          d="M61.48 103.391c23.315 0 42.215-18.844 42.215-42.09 0-23.246-18.9-42.09-42.214-42.09-23.315 0-42.215 18.844-42.215 42.09 0 23.246 18.9 42.09 42.215 42.09z"
          fill="#28A745"
        />
        <path
          d="M61.48 86.667c14.051 0 25.442-11.357 25.442-25.366 0-14.01-11.39-25.367-25.441-25.367-14.051 0-25.442 11.357-25.442 25.367 0 14.01 11.39 25.366 25.442 25.366z"
          fill="#FFCB2F"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M215 144h-66.763l33.382-57.649L215 144z"
          fill="#FFCB2F"
        />
      </g>
      <defs>
        <clipPath id="theme_svg__clip0">
          <path fill="#fff" d="M0 0h215v144H0z" />
        </clipPath>
      </defs>
    </svg>
  );
}

export default SvgTheme;

