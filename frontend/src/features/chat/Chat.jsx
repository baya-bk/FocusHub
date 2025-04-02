// /frontend/src/features/chat/Chat.jsx
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

const Chat = ({ roomId, socket }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    socket.on("receiveMessage", (messageData) => {
      setMessages((prev) => [...prev, messageData]);
    });

    return () => socket.off("receiveMessage");
  }, [socket]);

  const sendMessage = () => {
    if (!newMessage.trim() || !socket.connected) return;
    const messageData = { roomId, message: newMessage, sender: "User" };
    socket.emit("sendMessage", messageData);
    setNewMessage("");
  };

  return (
    <div className="flex flex-col h-full">
      <div className="border p-4 rounded-lg h-72 overflow-y-auto">
        {messages.map((msg, index) => (
          <div key={index} className="mb-2">
            <span className="font-bold">{msg.sender}:</span> {msg.message}
          </div>
        ))}
      </div>
      <div className="mt-auto flex">
        <input
          type="text"
          className="border rounded-lg p-2 w-full"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <Button onClick={sendMessage} className="ml-2">
          Send
        </Button>
      </div>
    </div>
  );
};

export default Chat;
