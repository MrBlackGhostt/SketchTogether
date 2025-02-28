import { WebSocketServer, WebSocket } from "ws";
import { client } from "@repo/db/client";
import { verifyToken } from "@repo/auth/token";
import cookie from "cookie";
const wss = new WebSocketServer({ port: 8080 });

// Store room connections
const rooms = new Map<string, Set<WebSocket>>();

wss.on("connection", function connection(ws, req) {
  const url = req.url;
  if (!url) return;
  const queryParams = new URLSearchParams(url.split("?")[1]);

  const roomId = queryParams.get("roomId");
  const userId = queryParams.get("userId");

  console.log(roomId);
  console.log(userId);
  if (!userId) {
    console.log("❌ Invalid token, closing connection");
    ws.close();
    return;
  }

  if (!roomId || !userId) {
    ws.close();
    return;
  }

  // Add user to room
  if (!rooms.has(roomId)) {
    rooms.set(roomId, new Set());
  }
  rooms.get(roomId)!.add(ws);

  ws.on("message", async function message(data) {
    console.log("Received:", data.toString());

    // Save to database
    const elementData = JSON.parse(data.toString());
    console.log("🚀 ~ message ~ elementData:", elementData);
    if (elementData) {
      await client.element.create({
        data: {
          type: elementData.type,
          x: elementData.x,
          y: elementData.y,
          width: elementData?.width,
          height: elementData?.height,
          roomId: roomId,
          // radius: elementData?.radius,
        },
      });
    }

    // Broadcast message to everyone in the room
    rooms.get(roomId)?.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({ userId, message: data.toString() }));
      }
    });
  });

  ws.on("close", () => {
    // Remove user from room

    rooms.get(roomId)?.delete(ws);
    if (rooms.get(roomId)?.size === 0) {
      rooms.delete(roomId);
    }
  });

  ws.send("Connected to room " + roomId);
});
