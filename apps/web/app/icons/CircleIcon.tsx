import React from "react";
import { iconsProps } from "../utils/type";

const CircleIcon = ({ width, height }: iconsProps) => {
  return (
    <div id="svg-div">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-circle"
      >
        <circle cx="12" cy="12" r="10" />
      </svg>
    </div>
  );
};

export default CircleIcon;
