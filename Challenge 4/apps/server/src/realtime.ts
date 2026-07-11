import type { Server } from "node:http";
import { WebSocketServer } from "ws";
import { getRealtimeSnapshot } from "./data/operations";

export function attachRealtime(server: Server) {
  const wss = new WebSocketServer({ server });
  const broadcast = () => {
    const payload = JSON.stringify({ type: "snapshot", data: getRealtimeSnapshot() });
    for (const client of wss.clients) {
      if (client.readyState === client.OPEN) client.send(payload);
    }
  };
  wss.on("connection", (socket) => {
    socket.send(JSON.stringify({ type: "snapshot", data: getRealtimeSnapshot() }));
  });
  setInterval(broadcast, 5000).unref();
}
