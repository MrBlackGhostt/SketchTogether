import React, { Dispatch, SetStateAction, useState } from "react";
import { useRoom } from "../utils/contexts/Room-Context";
import { error } from "console";

const Join = () => {
  const [EnterroomName, setEnterRoomName] = useState<string>("");
  const { JoinRoom, error, element } = useRoom();
  const handleJoinRoom = async (e: React.FormEvent) => {
    e.preventDefault();
    await JoinRoom(EnterroomName);
    console.log(element);

    if (error) {
      console.log("ERROR", error);
      throw new Error(error);
    }
  };
  return (
    <div className="room-input-div">
      <form onSubmit={handleJoinRoom} className="room-input-form">
        <input
          className="room-input"
          type="text"
          onChange={(e) => setEnterRoomName(e.target.value)}
          placeholder="Enter the room name"
        />
        <button type="submit" className="room-btn">
          Join room
        </button>
      </form>
    </div>
  );
};

export default Join;
