import React, { Dispatch, SetStateAction, useState } from "react";
import { useRoom } from "../utils/contexts/Room-Context";
import { error } from "console";

const Join = () => {
  const [EnterroomName, setEnterRoomName] = useState<string>("");
  const { JoinRoom, error } = useRoom();

  const handleJoinRoom = async (e: React.FormEvent) => {
    e.preventDefault();
    await JoinRoom(EnterroomName);
    if (error) {
      console.log("ERROR", error);
      throw new Error(error);
    }
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
