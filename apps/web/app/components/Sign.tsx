import React, { useState } from "react";
import { useAuth } from "../utils/contexts/AuthContext";

const Sign = ({
  modalType,
  closeModal,
}: {
  modalType: string | null;
  closeModal: () => void;
}) => {
  const { SignIn, SignUp, error } = useAuth();

  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (modalType == "signIn") {
      await SignIn({ email, password });
      if (!error) {
        closeModal();
      }
    } else {
      await SignUp({ username, email, password });
      if (!error) {
        closeModal();
      }
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      onClick={closeModal}
    >
      <div
        style={{
          backgroundColor: "gray",
          padding: "20px",
          borderRadius: "10px",
          minWidth: "300px",
          position: "relative",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            cursor: "pointer",
            background: "none",
            border: "none",
            fontSize: "16px",
          }}
          onClick={closeModal}
        >
          ✖
        </button>
        <h2>{modalType === "signIn" ? "Sign In" : "Sign Up"}</h2>
        <form onSubmit={handleSubmit}>
          {modalType == "signUp" && (
            <input
              type="text"
              className="sign"
              placeholder="Username"
              onChange={(e) => setUserName(e.target.value)}
              style={{
                display: "block",
                border: "none",
                borderRadius: "10px",
                margin: "10px 0",
                padding: "5px",
                width: "100%",
              }}
            />
          )}
          <input
            type="email"
            className="sign"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="sign"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            style={{
              padding: "5px 10px",
              cursor: "pointer",
              backgroundColor: "black",
              color: "white",
              border: "none",
              borderRadius: "5px",
              width: "100%",
            }}
          >
            {modalType === "signIn" ? "Sign In" : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Sign;
