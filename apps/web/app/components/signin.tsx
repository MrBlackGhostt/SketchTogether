"use client";
import Input from "@repo/ui/input";

import { Dispatch, SetStateAction, useState } from "react";

const Signin = ({
  setUserId,
}: {
  setUserId: Dispatch<SetStateAction<string>>;
}) => {
  const [userEmail, setUserEmail] = useState<string>("");
  const [userPassword, setUserPassword] = useState<string>("");

  const handleSignin = async (e: React.FormEvent) => {
    e.preventDefault();

    const url = process.env.NEXT_PUBLIC_BACKEND_URL;

    const payload = {
      email: userEmail,
      password: userPassword,
    };
    const res = await fetch(`${url}/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      credentials: "include",
    });
    const da̵ta = await res.json();
    console.log("🚀 ~ handleSignin ~ da̵ta:", da̵ta);
    const userId = da̵ta.userId;
    setUserId(userId);
    document.cookie = `token=${da̵ta.token}; path=/; secure; samesite=strict`;
    console.log("🚀 ~ handleSignin ~ da̵ta:", da̵ta);
    return da̵ta;
  };
  return (
    <form
      onSubmit={handleSignin}
      style={{
        display: "flex",
      }}
    >
      <div style={{ display: "flex", flexDirection: "row", gap: "4px" }}>
        <Input
          type="email"
          placeholder="Enter your email"
          setFun={setUserEmail}
        />
        <Input
          type="password"
          placeholder="Enter your password"
          setFun={setUserPassword}
        />
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

export default Signin;
