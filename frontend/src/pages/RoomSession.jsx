// RoomSession.jsx
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import Chat from "../features/chat/Chat"; // Import the Chat component
import PomodoroTimer from "../features/timer/Pomodoro"; // Import the Pomodoro component

const socket = io("http://localhost:5000"); // Adjust if using a different backend URL

const RoomSession = () => {
  const { id: roomId } = useParams();
  const [room, setRoom] = useState(null); // Use state to store room data

  useEffect(() => {
    // Join the study room
    socket.emit("joinRoom", roomId);

    // Fetch room details (replace with your actual API call)
    const fetchRoomDetails = async () => {
      // Mock API call (replace with your actual API endpoint)
      //Simulate API Call
      await new Promise((resolve) => setTimeout(resolve, 500));
      const mockRoomData = {
        id: roomId,
        name: "Advanced Algorithms Study",
        members: ["Alice", "Bob", "Charlie"],
      };
      setRoom(mockRoomData);
    };

    fetchRoomDetails();

    return () => {
      socket.emit("leaveRoom", roomId); // Optional: Notify server on leave
    };
  }, [roomId]);

  if (!room) {
    return <div>Loading...</div>; // Or a better loading indicator
  }

  return (
    <div className="flex flex-col items-center p-6">
      <Card className="w-full max-w-3xl">
        <CardHeader>
          <h2 className="text-xl font-semibold">{room.name}</h2>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            {/* Chat Section */}
            <div className="col-span-2 border rounded-lg h-72">
              <Chat roomId={roomId} socket={socket} />
            </div>

            {/* Users List */}
            <div className="border p-4 rounded-lg">
              <h3 className="font-semibold">Members</h3>
              <ul className="mt-2">
                {room.members.map((user, index) => (
                  <li key={index} className="text-sm text-gray-700">
                    {user}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Pomodoro Timer */}
          <div className="mt-4">
            <PomodoroTimer />
          </div>

          {/* Leave Room Button */}
          <Button variant="destructive" className="mt-4 w-full">
            Leave Room
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default RoomSession;
