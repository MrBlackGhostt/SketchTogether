"use client";
import { createContext, useContext, useEffect, useState } from "react";

import { AuthContextProps, SignInProps, SignUpProps } from "../type";
import Cookies from "js-cookie";

const AuthContext = createContext<AuthContextProps | null>(null);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState({ username: "", userId: "" });
  const [accountCreated, setCreateAccount] = useState(false);
  const [error, setError] = useState<string | null>("");

  const url = process.env.NEXT_PUBLIC_BACKEND_URL;
  useEffect(() => {
    const username = Cookies.get("username");
    const userId = Cookies.get("userId");
    if (!username && !userId) return;
    if (username) {
      setIsAuthenticated(true);
      setUserData({ username: username, userId: userId as string });
    }
  }, []);
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
        setError(null);
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
        credentials: "include",
      });
      console.log("🚀 ~ res headers:", res.headers);
      const dataGet = await res.json();
      console.log("🚀 ~ SignIn ~ dataGet:", dataGet);
      if (dataGet) {
        Cookies.set("username", dataGet.username, { secure: true }); // ✅ Set Cookie in Client
        Cookies.set("userId", dataGet.userId, { secure: true });
        setIsAuthenticated(true);
        setUserData({ username: dataGet.username, userId: dataGet.userId });
        setError(null);
      }
    } catch (error) {
      console.log("Error in context Singup", error);
      setError("Error in SignIn");
    }
  };
  console.log(userData);
  const SignOut = () => {
    console.log("Signout");
    setIsAuthenticated(false);
    setUserData({ username: "null", userId: "null" });

    //Deleting the cookies
    Cookies.remove("username");
    Cookies.remove("userId");
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
        SignOut,
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
