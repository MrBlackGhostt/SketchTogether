"use client";
import React from "react";
import PointerIcon from "../icons/pointer";
import SqareIcon from "../icons/SqareIcon";
import CircleIcon from "../icons/CircleIcon";
import { useSelectItem } from "../utils/contexts/ItemSelectContext";
const NavContent = () => {
  const { itemSelect, setItemSelect } = useSelectItem();
  console.log("🚀 ~ NavContent ~ itemSelect:", itemSelect);

  return (
    <div
      style={{
        display: "flex",
        gap: "8px",
        alignItems: "center",
        height: "5vh",
        backgroundColor: "blue",
        padding: "2px 5px 2px 5px",
        borderRadius: "10px",
      }}
    >
      <div style={{}} onClick={() => setItemSelect(null)}>
        <PointerIcon width="20" height="20" />
      </div>
      <div
        onClick={() => {
          setItemSelect("rectangle");
        }}
      >
        <SqareIcon width="20" height="20" />
      </div>
      <div onClick={() => setItemSelect("circle")}>
        <CircleIcon width="20" height="20" />
      </div>
    </div>
  );
};

export default NavContent;
