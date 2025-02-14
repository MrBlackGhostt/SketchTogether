import { WebSocketServer, WebSocket } from "ws";
import { client } from "@repo/db/client";

const wss = new WebSocketServer({ port: 8080 });

// Store room connections
const rooms = new Map<string, Set<WebSocket>>();

wss.on("connection", function connection(ws, req) {
  const url = new URL(req.url || "", "http://localhost");
  const roomId = url.searchParams.get("roomId");
  const userId = url.searchParams.get("userId");

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
    await client.chat.create({
      data: {
        roomId: roomId,
        message: data.toString(),
        userId: userId,
      },
    });

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
