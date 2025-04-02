// /frontend/src/features/chat/useSocket.js
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const SOCKET_SERVER_URL = "http://localhost:5000";

export const useSocket = (roomId) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io(SOCKET_SERVER_URL, {
      transports: ["websocket"],
      reconnection: true,
      reconnectionAttempts: Infinity,
      reconnectionDelay: 1000,
      timeout: 10000,
    });

    newSocket.on("connect", () => {
      console.log(`✅ Connected: ${newSocket.id}`);
      if (roomId) newSocket.emit("joinRoom", roomId);
    });

    newSocket.on("connect_error", (err) =>
      console.error("❌ Connection error:", err)
    );
    newSocket.on("disconnect", (reason) =>
      console.warn(`⚠️ Disconnected: ${reason}`)
    );

    setSocket(newSocket);

    return () => newSocket.disconnect();
  }, [roomId]);

  return socket;
};
