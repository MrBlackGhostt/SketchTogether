import React from "react";
import { iconsProps } from "../utils/type";

const PointerIcon = ({ width, height }: iconsProps) => {
  return (
    <div id="svg-div">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-mouse-pointer"
      >
        <path d="M12.586 12.586 19 19" />
        <path d="M3.688 3.037a.497.497 0 0 0-.651.651l6.5 15.999a.501.501 0 0 0 .947-.062l1.569-6.083a2 2 0 0 1 1.448-1.479l6.124-1.579a.5.5 0 0 0 .063-.947z" />
      </svg>
    </div>
  );
};

export default PointerIcon;
