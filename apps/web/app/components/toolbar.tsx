"use client";
import React, { Dispatch, SetStateAction } from "react";

interface propsToolBar {
  setAddItem: Dispatch<SetStateAction<"rectangle" | "circle">>;
}

const Toolbar = ({ setAddItem }: propsToolBar) => {
  return (
    <div className="relative top-4 left-10 bg-white p-4 rounded shadow z-10">
      <div className="gap-4 flex flex-row">
        <button onClick={() => setAddItem("rectangle")}>Add Rectangle</button>
        <button onClick={() => setAddItem("circle")}>Add Circle</button>
      </div>
    </div>
  );
};

export default Toolbar;
