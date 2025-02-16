import Input from "@repo/ui/input";
import React, { useState } from "react";

async function createRoom(params: string) {
  console.log("before the req");
  const url = process.env.NEXT_PUBLIC_BACKEND_URL;
  try {
    const res = await fetch(`${url}/createroom`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: params }),
      credentials: "include",
    });
    const data = await res.json();

    return data;
  } catch (error) {
    console.log("Error in req", error);
    return null;
  }
}

const CreateRoom = () => {
  const [EnterroomName, setEnterRoomName] = useState<string>("");

  const handleCreateRoom = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await createRoom(EnterroomName);
    console.log("🚀 ~ CreateRoom ~ response:", response);
  };
  return (
    <div className="w-10">
      <form onSubmit={handleCreateRoom}>
        <Input
          type="text"
          setFun={setEnterRoomName}
          placeholder="Enter the room name"
        />
        <button type="submit">CreateRoom </button>
      </form>
    </div>
  );
};

export default CreateRoom;
