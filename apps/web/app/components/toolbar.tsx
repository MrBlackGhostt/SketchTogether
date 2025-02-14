"use client";
import React from "react";

interface propsToolBar {
  addItem: (x: "rectangle" | "circle") => void;
}

const Toolbar = ({ addItem }: propsToolBar) => {
  return (
    <div className="relative top-4 left-10 bg-white p-4 rounded shadow z-10">
      <div className="gap-4 flex flex-row">
        <button onClick={() => addItem("rectangle")}>Add Rectangle</button>
        <button onClick={() => addItem("circle")}>Add Circle</button>
      </div>
    </div>
  );
};

export default Toolbar;
