import * as React from "react";

function SvgProcess(props) {
  return (
    <svg
      width={190}
      height={141}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#process_svg__clip0)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M3.143 19.64L190 69.782a96.844 96.844 0 01-45.17 58.39 96.6 96.6 0 01-73.139 9.528 96.74 96.74 0 01-58.583-44.874 96.989 96.989 0 01-9.965-73.184z"
          fill="#F2B6BC"
        />
        <path
          d="M120.86 51.561c14.218 0 25.744-11.542 25.744-25.78C146.604 11.542 135.078 0 120.86 0c-14.217 0-25.743 11.542-25.743 25.78 0 14.239 11.526 25.781 25.743 25.781z"
          fill="#28A745"
        />
      </g>
      <defs>
        <clipPath id="process_svg__clip0">
          <path fill="#fff" d="M0 0h190v141H0z" />
        </clipPath>
      </defs>
    </svg>
  );
}

export default SvgProcess;

