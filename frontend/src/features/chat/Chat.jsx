// Chat.jsx
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

const Chat = ({ roomId, socket }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    // Listen for incoming messages
    socket.on("receiveMessage", (messageData) => {
      setMessages((prevMessages) => [...prevMessages, messageData]);
    });

    return () => {
      socket.off("receiveMessage"); // Clean up event listener
    };
  }, [socket]); //  [socket] as a dependency.  This ensures that the effect only re-runs when the socket instance changes.  This is crucial because you want the component to use the same socket connection throughout its lifecycle.

  // Send message
  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const messageData = {
      roomId,
      message: newMessage,
      sender: "User", // Replace with actual username (fetch from user context later)
    };

    socket.emit("sendMessage", messageData); // Send message to backend
    setMessages((prevMessages) => [...prevMessages, messageData]); // Optimistically update UI
    setNewMessage(""); // Clear input
  };

  return (
    <div className="flex flex-col h-full">
      {" "}
      {/* Added h-full */}
      {/* Chat Messages */}
      <div className="border p-4 rounded-lg h-72 overflow-y-auto">
        {messages.map((msg, index) => (
          <div key={index} className="mb-2">
            <span className="font-bold">{msg.sender}:</span> {msg.message}
          </div>
        ))}
      </div>
      {/* Message Input */}
      <div className="mt-auto flex">
        {" "}
        {/* mt-auto pushes this to the bottom */}
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
