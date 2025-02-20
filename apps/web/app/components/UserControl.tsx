"use client";
import React, { useState } from "react";
import Sign from "./Sign";

const UserControl = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"signIn" | "signUp" | null>(null);

  const handleSignIn = () => {
    setUsername("MRBlackGhost"); // Replace with actual login logic
    setIsAuthenticated(true);
    setIsModalOpen(false);
  };

  const handleSignOut = () => {
    setIsAuthenticated(false);
    setUsername("");
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
        <div
          style={{
            padding: "5px 15px",
            backgroundColor: "black",
            color: "white",
            borderRadius: "15px",
            cursor: "pointer",
            display: "inline-block",
          }}
          onClick={handleSignOut}
        >
          {username.slice(0, 3).toUpperCase()}{" "}
          {/* Shows "MRB" for "MRBlackGhost" */}
        </div>
      ) : (
        <>
          <button
            style={{
              marginRight: "10px",
              padding: "5px 10px",
              cursor: "pointer",
              backgroundColor: "black",
              color: "white",
              border: "none",
              borderRadius: "5px",
            }}
            onClick={() => handleOpenModal("signIn")}
          >
            Sign In
          </button>
          <button
            style={{
              padding: "5px 10px",
              cursor: "pointer",
              backgroundColor: "black",
              color: "white",
              border: "none",
              borderRadius: "5px",
            }}
            onClick={() => handleOpenModal("signUp")}
          >
            Sign Up
          </button>
        </>
      )}

      {/* Modal */}
      {isModalOpen && (
        <Sign modalType={modalType} closeModal={handleCloseModal} />
      )}
    </div>
  );
};

export default UserControl;
