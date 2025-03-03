"use client";
import { useRef, useEffect, useState } from "react";

import {
  handleMouseDown,
  handleMouseLeave,
  handleMouseMove,
  handleMouseUp,
  handleWheel,
} from "../utils/canvasFun";

import Signin from "./signin";
import { useSelectItem } from "../utils/contexts/ItemSelectContext";
import { useRoom } from "../utils/contexts/Room-Context";
import { WS_URL } from "../../config";
import { useAuth } from "../utils/contexts/AuthContext";
import { client } from "@repo/db/client";
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

  const [latestItem, setLatestItem] = useState<Item | null>(null);

  const { itemSelect, pickColor } = useSelectItem();

  const { roomId, element } = useRoom();

  const { userData } = useAuth();
  const userId = userData.userId;
  type Item = {
    type: "rectangle" | "circle";
    x: number;
    y: number;
    color?: string | null;
    width?: number;
    height?: number;
    radius?: number;
  };

  const [items, setItems] = useState<Item[]>([]);

  const url = WS_URL;

  useEffect(() => {
    if (roomId) {
      const ws = new WebSocket(`${url}?roomId=${roomId}&userId=${userId}`!);
      // connectToWebSocket(roomId, userId, tempRect);
      ws.onopen = () => {
        console.log("connection successfuill");
        if (element && element.length > 0) {
          console.log("🚀 ~ InfiniteCanvas ~ element:", element);
          setItems(element);
        }
        if (latestItem) {
          const data = JSON.stringify(latestItem);
          console.log("🚀 ~ useEffect ~ data:", data);

          ws.send(data);
        }
      };
      ws.onmessage = (event) => {
        const dataReceived = JSON.parse(event.data);
        if (dataReceived) {
          const receiveItem = JSON.parse(dataReceived.message);

          if (latestItem) {
            setItems((prev) => {
              const newItem = [...prev, latestItem];

              console.log("New Item", newItem);
              return newItem;
            });
          }
        }
      };
    }
  }, [latestItem, roomId, url, userId, element]);

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
      console.log("Items", items);
      items.forEach((item) => {
        if (item.type && item.type === "rectangle") {
          ctx.strokeStyle = item.color ? item.color : "blue";
          ctx.strokeRect(
            item.x,
            item.y,
            item.width as number,
            item.height as number
          );
        } else if (item.type === "circle") {
          ctx.beginPath();
          ctx.strokeStyle = item.color ? item.color : "blue";
          ctx.arc(item.x, item.y, item.radius!, 0, 2 * Math.PI);
          ctx.stroke();
        }
      });

      if (tempRect) {
        // ws.send(data);

        ctx.strokeStyle = pickColor || "blue";
        if (itemSelect == "rectangle") {
          ctx.strokeRect(
            tempRect.x,
            tempRect.y,
            tempRect.width!,
            tempRect.height!
          );
        } else if (tempRect.type == "circle") {
          ctx.strokeStyle = pickColor || "blue";
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
    tempRect,
    itemSelect,
    pickColor,
    items,
  ]);

  return (
    <div>
      <div className="flex justify-between w-full bg-red-500 z-10">
        <div className="text-center text-red font-bold text-md  fixed bottom-0  left-4  z-10 bg-white-100 p-2 rounded shadow">
          Zoom: {(scale * 100).toFixed(0)}%
        </div>
        {/* <Toolbar setItemSelect={setItemSelect} /> */}
        {/* <div style={{ position: "absolute", top: 0, right: 0 }}>
          <Signin setUserId={setUserId} />
        </div>/ */}
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
              itemSelect,
              setTempRect,
              setCurrentHeight,
              setCurrentWidth,
              setCurrentRadius,
              scale,
              pickColor
            )
          }
          onMouseUp={() =>
            handleMouseUp(
              setItems,
              itemSelect,
              startX,
              startY,
              currentHeight,
              currentWidth,
              currentRadius,
              setIsDrawing,
              setTempRect,
              tempRect,
              setLatestItem,
              pickColor
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
