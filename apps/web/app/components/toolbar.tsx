"use client";
import React, { Dispatch, SetStateAction } from "react";

interface propsToolBar {
  setSelectItem: Dispatch<SetStateAction<"rectangle" | "circle">>;
}

const Toolbar = ({ setSelectItem }: propsToolBar) => {
  return (
    <div className="flex justify-between w-full  relative top-4 left-10 bg-white p-4 rounded shadow z-10">
      <div className="gap-4 flex flex-row">
        <button onClick={() => setSelectItem("rectangle")}>
          Add Rectangle
        </button>
        <button onClick={() => setSelectItem("circle")}>Add Circle</button>
      </div>
    </div>
  );
};

export default Toolbar;
