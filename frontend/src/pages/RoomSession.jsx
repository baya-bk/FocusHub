import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000"); // Adjust if using a different backend URL

const RoomSession = () => {
  const { id: roomId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    // Join the study room
    socket.emit("joinRoom", roomId);

    // Listen for incoming messages
    socket.on("receiveMessage", (messageData) => {
      setMessages((prevMessages) => [...prevMessages, messageData]);
    });

    return () => {
      socket.off("receiveMessage"); // Clean up event listener
    };
  }, [roomId]);

  // Send message
  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const messageData = {
      roomId,
      message: newMessage,
      sender: "User", // Replace with actual username
    };

    socket.emit("sendMessage", messageData); // Send message to backend
    setNewMessage(""); // Clear input
  };

  return (
    <div className="flex flex-col items-center p-6">
      <Card className="w-full max-w-3xl">
        <CardHeader>
          <h2 className="text-xl font-semibold">Study Room Chat</h2>
        </CardHeader>
        <CardContent>
          {/* Chat Messages */}
          <div className="border p-4 rounded-lg h-72 overflow-y-auto">
            {messages.map((msg, index) => (
              <div key={index} className="mb-2">
                <span className="font-bold">{msg.sender}:</span> {msg.message}
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className="mt-4 flex">
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
        </CardContent>
      </Card>
    </div>
  );
};

export default RoomSession;
