import React, { Dispatch, SetStateAction, useState } from "react";

async function joinRom(params: string) {
  console.log("before the req");
  const url = process.env.NEXT_PUBLIC_BACKEND_URL;
  try {
    const res = await fetch(`${url}/joinroom`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ roomName: params }),
      credentials: "include",
    });
    const data = await res.json();

    return data;
  } catch (error) {
    console.log("Error in req", error);
    return null;
  }
}

const Join = ({
  setRoomId,
  // wsConnect,
}: {
  setRoomId: Dispatch<SetStateAction<string>>;
  // wsConnect: WebSocket;
}) => {
  const [EnterroomName, setEnterRoomName] = useState<string>("");

  const handleJoinRoom = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await joinRom(EnterroomName);
    console.log("🚀 ~ Join ~ response:", response);
    setRoomId(response.roomId);
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
