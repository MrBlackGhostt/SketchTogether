import React, { useState } from "react";

async function joinRom(params: string) {
  console.log("before the req");
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQ2MmMyZTYwLTA1ZjYtNDUxNC1iZTkxLTkzOGFkZjRlMjZkNSJ9.v1OBzoI6RVB3Db_CZX13rbBB0dlp3l6bf0utRwjoHOk";

  try {
    const res = await fetch("http://localhost:3001/joinroom", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ roomName: params }),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("Error in req", error);
    return null;
  }
}

const Join = () => {
  const [EnterroomName, setEnterRoomName] = useState<string>("");

  const handleJoinRoom = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await joinRom(EnterroomName);
    console.log("🚀 ~ Join ~ response:", response);
  };
  return (
    <div className="w-10">
      <form onSubmit={handleJoinRoom}>
        <input
          type="text"
          onChange={(e) => setEnterRoomName(e.target.value)}
          placeholder="Enter the room name"
        />
        <button type="submit">Join room</button>
      </form>
    </div>
  );
};

export default Join;
