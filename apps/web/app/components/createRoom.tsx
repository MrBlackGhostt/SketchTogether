import Input from "@repo/ui/input";
import React, { useState } from "react";
import { useRoom } from "../utils/contexts/Room-Context";

const CreateRoom = () => {
  const [EnterroomName, setEnterRoomName] = useState<string>("");
  const { CreateRoom, error } = useRoom();
  const handleCreateRoom = async (e: React.FormEvent) => {
    e.preventDefault();
    await CreateRoom(EnterroomName);
    if (error) {
      console.log("ERROR", error);
      throw new Error(error);
    }
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
