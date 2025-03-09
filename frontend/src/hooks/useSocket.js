import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const SOCKET_SERVER_URL = "http://localhost:5000";

export const useSocket = (roomId) => {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const newSocket = io(SOCKET_SERVER_URL);
    setSocket(newSocket);

    // Join room
    if (roomId) newSocket.emit("join_room", roomId);

    // Listen for incoming messages
    newSocket.on("receive_message", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      newSocket.disconnect();
    };
  }, [roomId]);

  const sendMessage = (message, sender) => {
    if (socket) {
      socket.emit("send_message", { roomId, message, sender });
    }
  };

  return { messages, sendMessage };
};
