"use client";

import { useState } from "react";
import { useAuth } from "../utils/contexts/AuthContext";
import Sign from "./Sign";
import UserIcon from "../icons/UserIcon";
import LogoutIcon from "../icons/Logout";
import Join from "./join";
import CreateRoom from "./createRoom";
// import { LogOut, Download, User } from "lucide-react";

const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"signIn" | "signUp" | null>(null);
  const [roomId, setRoomId] = useState<string>("");
  const { isAuthenticated, userData, SignOut } = useAuth();

  const handleSignOut = () => {
    SignOut();
  };

  const handleOpenModal = (type: "signIn" | "signUp") => {
    setModalType(type);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      {isAuthenticated ? (
        <div className="user-menu">
          <button className="avatar-button" onClick={() => setIsOpen(!isOpen)}>
            <div className="avatar">
              {userData.username &&
                userData?.username.slice(0, 2).toUpperCase()}
            </div>
          </button>
          {isOpen && (
            <div className="dropdown-menu">
              <div className="menu-item">
                <UserIcon width="16" height="16" /> Profile
              </div>
              <div className="menu-item">
                <Join /> Room
              </div>
              <div className="menu-item">
                <CreateRoom /> Room
              </div>

              <div className="menu-item logout" onClick={handleSignOut}>
                <LogoutIcon width="16" height="16" /> Sign Out
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="auth-buttons">
          <button
            className="auth-button"
            onClick={() => handleOpenModal("signIn")}
          >
            Sign In
          </button>
          <button
            className="auth-button"
            onClick={() => handleOpenModal("signUp")}
          >
            Sign Up
          </button>
        </div>
      )}
      {isModalOpen && (
        <Sign modalType={modalType} closeModal={handleCloseModal} />
      )}
    </div>
  );
};

export default UserMenu;
