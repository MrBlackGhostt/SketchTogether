"use client";
import { useState } from "react";

import NavContent from "./NavContent";
import SidebarIcon from "../icons/sidebar";
import UserControl from "./UserControl";
import PickColor from "./ColorPicker";

const Navbar = () => {
  const [openPicker, setOpenpicker] = useState<boolean>(false);
  return (
    <div>
      {openPicker && (
        <div
          style={{
            position: "absolute",
            top: "50px",
            margin: 10,
            zIndex: 10,
          }}
        >
          <PickColor />
        </div>
      )}
      <div
        style={{
          position: "sticky",
          top: 0,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          padding: "0px 15px",
          backgroundColor: "red",
        }}
      >
        <div onClick={() => setOpenpicker(!openPicker)}>
          <SidebarIcon width="24" height="24" />
        </div>

        <div>
          <NavContent />
        </div>
        <div>
          <UserControl />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
