"use client";
import { useState } from "react";

import NavContent from "./NavContent";
import SidebarIcon from "../icons/sidebar";
import UserControl from "./UserControl";

const Navbar = () => {
  return (
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
      <div>
        <SidebarIcon width="24" height="24" />
      </div>
      <div>
        <NavContent />
      </div>
      <div>
        <UserControl />
      </div>
    </div>
  );
};

export default Navbar;
