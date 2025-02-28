"use client";
import { createContext, useContext, useState } from "react";
import { Item, RoomContextProps } from "../type";

const RoomContext = createContext<RoomContextProps | null>(null);

export const RoomContextProivider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [roomId, setRoomId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [element, setElement] = useState<Item[]>([]);

  const url = process.env.NEXT_PUBLIC_BACKEND_URL;

  const JoinRoom = async (roomId: string) => {
    console.log("🚀 ~ JoinRoom ~ roomId:", roomId);
    try {
      const res = await fetch(`${url}/joinroom`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ roomName: roomId }),
        credentials: "include",
      });
      const data = await res.json();
      console.log(data);
      if (data) {
        setRoomId(data.roomId);
        setElement(data.oldElement);
        setError(null);
        return true;
      }

      setError("RData does not containt the room id");
    } catch (error) {
      console.log("Error in req", error);
      setError("Error inn joing the room");
      return null;
    }
  };
  console.log(`Element ${element}`);
  const CreateRoom = async (roomName: string) => {
    try {
      const res = await fetch(`${url}/createroom`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: roomName }),
        credentials: "include",
      });
      const data = await res.json();
      console.log("🚀 ~ CreateRoom ~ data:", data);
      if (data) {
        setRoomId(data.roomId);
        setError(null);
        return;
      }
      setError("RData does not containt the room id");
      return;
    } catch (error) {
      console.log("Error in req", error);
      setError("Error in Creating the Room");
      return null;
    }
  };

  return (
    <RoomContext.Provider
      value={{
        roomId,
        setRoomId,
        JoinRoom,
        CreateRoom,
        element,
        error,
      }}
    >
      {children}
    </RoomContext.Provider>
  );
};

export const useRoom = () => {
  const context = useContext(RoomContext);
  if (!context) {
    throw new Error("Context should be in between the Room Context");
  }
  return context;
};
