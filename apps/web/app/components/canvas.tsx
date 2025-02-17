"use client";
import { useRef, useEffect, useState } from "react";
import Toolbar from "./toolbar";
import {
  handleMouseDown,
  handleMouseLeave,
  handleMouseMove,
  handleMouseUp,
  handleWheel,
} from "../utils/canvasFun";
import Join from "./join";

import CreateRoom from "./createRoom";
import { connectToWebSocket } from "../utils/ws";
import Signin from "./signin";
import { json } from "stream/consumers";

const InfiniteCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [scale, setScale] = useState(1);
  const [translateX, setTranslateX] = useState(0);
  const [translateY, setTranslateY] = useState(0);
  const [isDrawing, setIsDrawing] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [tempRect, setTempRect] = useState<Item | null>(null);
  const [currentWidth, setCurrentWidth] = useState<number>(0);
  const [currentHeight, setCurrentHeight] = useState<number>(0);
  const [currentRadius, setCurrentRadius] = useState<number>(0);
  const [selectItem, setSelectItem] = useState<"rectangle" | "circle">(
    "rectangle"
  );
  const [latestItem, setLatestItem] = useState<Item | null>(null);
  const [roomId, setRoomId] = useState<string>("");

  const [userId, setUserId] = useState<string>("");
  console.log("🚀 ~ InfiniteCanvas ~ userId:", userId);

  type Item = {
    type: "rectangle" | "circle";
    x: number;
    y: number;
    width?: number;
    height?: number;
    radius?: number;
  };

  const [items, setItems] = useState<Item[]>([]);
  const url = process.env.NEXT_PUBLIC_WEBSOCKET_URL;

  useEffect(() => {
    if (roomId) {
      const ws = new WebSocket(`${url}?roomId=${roomId}&userId=${userId}`!);
      // connectToWebSocket(roomId, userId, tempRect);
      ws.onopen = () => {
        console.log("connection successfuill");
        const data = JSON.stringify(latestItem);

        ws.send(data);
      };
      ws.onmessage = (event) => {
        const dataReceived = JSON.parse(event.data);
        console.log("🚀 ~ useEffect ~ dataReceived:", dataReceived.message);
        if (dataReceived) {
          const receiveItem = JSON.parse(dataReceived.message);
          console.log("🚀 ~ useEffect ~ receiveItem:", receiveItem);
          setItems((prev) => [...prev, receiveItem]);
        }
      };
    }
  }, [roomId, latestItem]);

  useEffect(() => {
    const canvas = canvasRef.current as HTMLCanvasElement;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      console.log("Ctx is null");
      return;
    }
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const draw = () => {
      ctx.save();
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.translate(translateX, translateY);
      ctx.scale(scale, scale);

      // Example drawing: An infinite grid
      const gridSize = 50;
      const width = canvas.width;
      const height = canvas.height;

      // Calculate the top-left corner of the grid to start drawing
      const startX = Math.floor(-translateX / scale / gridSize) * gridSize;
      const startY = Math.floor(-translateY / scale / gridSize) * gridSize;

      for (
        let x = startX;
        x < width / scale - translateX / scale;
        x += gridSize
      ) {
        for (
          let y = startY;
          y < height / scale - translateY / scale;
          y += gridSize
        ) {
          ctx.strokeRect(x, y, gridSize, gridSize);
        }
      }

      // Draw added items
      items.forEach((item) => {
        if (item.type === "rectangle") {
          ctx.strokeStyle = "blue";
          ctx.strokeRect(
            item.x,
            item.y,
            item.width as number,
            item.height as number
          );
        } else if (item.type === "circle") {
          ctx.beginPath();
          ctx.arc(item.x, item.y, item.radius!, 0, 2 * Math.PI);
          ctx.stroke();
        }
      });

      if (tempRect) {
        // ws.send(data);
        ctx.strokeStyle = "red";
        if (selectItem == "rectangle") {
          ctx.strokeRect(
            tempRect.x,
            tempRect.y,
            tempRect.width!,
            tempRect.height!
          );
        } else if (tempRect.type == "circle") {
          ctx.strokeStyle = "red";
          ctx.beginPath();
          ctx.arc(tempRect.x, tempRect.y, tempRect.radius!, 0, 2 * Math.PI);
          ctx.stroke();
        }
      }

      ctx.restore();
    };

    draw();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      draw();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [
    scale,
    translateX,
    translateY,
    currentHeight,
    currentWidth,
    currentRadius,
  ]);

  return (
    <div>
      <div className="flex justify-between w-full bg-red-500 z-10">
        <div className="text-center text-red font-bold text-md  fixed bottom-0  left-4  z-10 bg-white-100 p-2 rounded shadow">
          Zoom: {(scale * 100).toFixed(0)}%
        </div>
        <Toolbar setSelectItem={setSelectItem} />
        <div style={{ position: "absolute", top: 0, right: 0 }}>
          <Signin setUserId={setUserId} />
        </div>
        <div>
          <Join setRoomId={setRoomId} />
          <CreateRoom />
        </div>
      </div>
      <div style={{ position: "relative", width: "100%", height: "100%" }}>
        <canvas
          ref={canvasRef}
          onWheel={(event) =>
            handleWheel(
              event,
              canvasRef.current,
              setTranslateX,
              setTranslateY,
              translateX,
              translateY,
              scale,
              setScale
            )
          }
          onMouseDown={(event) =>
            handleMouseDown(
              event,
              scale,
              setIsDrawing,
              setStartX,
              setStartY,
              translateX,
              translateY
            )
          }
          onMouseMove={(event) =>
            handleMouseMove(
              event,
              isDrawing,
              startX,
              startY,
              translateX,
              translateY,
              selectItem,
              setTempRect,
              setCurrentHeight,
              setCurrentWidth,
              setCurrentRadius,
              scale
            )
          }
          onMouseUp={() =>
            handleMouseUp(
              setItems,
              selectItem,
              startX,
              startY,
              translateX,
              translateY,
              currentHeight,
              currentWidth,
              currentRadius,
              setIsDrawing,
              setTempRect,
              tempRect,
              setLatestItem
            )
          }
          onMouseLeave={() => handleMouseLeave(setIsDrawing)}
          style={{ width: "100%", height: "100%", display: "block" }}
        />
      </div>
    </div>
  );
};

export default InfiniteCanvas;
