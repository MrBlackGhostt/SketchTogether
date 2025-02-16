type Item = {
  type: "rectangle" | "circle";
  x: number;
  y: number;
  width?: number;
  height?: number;
  radius?: number;
};
export const connectToWebSocket = (roomId: string, userId: string) => {
  console.log("🚀 ~ connectToWebSocket ~ userId:", userId);
  const url = process.env.NEXT_PUBLIC_WEBSOCKET_URL;
  const ws = new WebSocket(`${url}?roomId=${roomId}&userId=${userId}`);

  ws.onopen = () => {
    console.log("✅ WebSocket Connected");
  };

  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    console.log("📩 Message received:", data);
  };

  ws.onclose = () => {
    console.log("❌ WebSocket Disconnected");
  };

  ws.onerror = (error) => {
    console.log("⚠️ WebSocket Error:", error);
  };

  return ws;
};
