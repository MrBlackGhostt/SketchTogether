"use client";
import { createContext, useContext, useState } from "react";

import { AuthContextProps, SignInProps, SignUpProps } from "../type";

const AuthContext = createContext<AuthContextProps | null>(null);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState({ username: "" });
  const [accountCreated, setCreateAccount] = useState(false);
  const [error, setError] = useState("");
  const url = process.env.NEXT_PUBLIC_BACKEND_URL;

  const SignUp = async ({ username, email, password }: SignUpProps) => {
    const data = { username, email, password };
    try {
      const res = await fetch(`${url}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const dataGet = await res.json();
      if (dataGet) {
        setCreateAccount(true);
      }
    } catch (error) {
      console.log("Error in context Singup", error);
      setError("Error in SignUp");
    }
  };

  const SignIn = async ({ email, password }: SignInProps) => {
    const data = { email, password };
    try {
      const res = await fetch(`${url}/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const dataGet = await res.json();
      console.log("🚀 ~ SignIn ~ dataGet:", dataGet);
      if (dataGet) {
        setIsAuthenticated(true);
        setUserData({ username: dataGet.username });
      }
    } catch (error) {
      console.log("Error in context Singup", error);
      setError("Error in SignIn");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        userData,
        error,
        accountCreated,
        SignIn,
        SignUp,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("AuthContext should be between teh provider");
  }
  return context;
};
