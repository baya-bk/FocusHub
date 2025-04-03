// /frontend/src/pages/RoomSession.jsx
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  CheckCircleIcon,
  ArrowPathIcon,
  XCircleIcon,
} from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Chat from "../features/chat/Chat";
import { useSocket } from "../features/chat/useSocket";
import PomodoroTimer from "../features/timer/Pomodoro";

const RoomSession = () => {
  const { id: roomId } = useParams();
  const { socket, connectionStatus } = useSocket(roomId); // Get both socket and status
  const [room, setRoom] = useState(null);

  const getStatusDisplay = () => {
    switch (connectionStatus) {
      case "connected":
        return (
          <div className="flex items-center gap-1">
            <CheckCircleIcon className="h-5 w-5 text-green-500" />
            <span className="text-sm text-green-500">Connected</span>
          </div>
        );
      case "disconnected":
        return (
          <div className="flex items-center gap-1">
            <XCircleIcon className="h-5 w-5 text-red-500" />
            <span className="text-sm text-red-500">Disconnected</span>
          </div>
        );
      case "reconnecting":
        return (
          <div className="flex items-center gap-1">
            <ArrowPathIcon className="h-5 w-5 text-yellow-500 animate-spin" />
            <span className="text-sm text-yellow-500">Reconnecting...</span>
          </div>
        );
      default:
        return null;
    }
  };

  useEffect(() => {
    const fetchRoomDetails = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/study-rooms/${roomId}`
        );
        const data = await res.json();
        setRoom(data);
      } catch (error) {
        console.error("Error fetching room details:", error);
      }
    };

    fetchRoomDetails();

    return () => {
      if (socket) socket.emit("leaveRoom", roomId);
    };
  }, [roomId, socket]);

  if (!room || !socket) return <div>Loading...</div>;

  return (
    <div className="flex flex-col items-center p-6">
      <Card className="w-full max-w-3xl">
        <CardHeader className="flex flex-row justify-between items-center">
          <h2 className="text-xl font-semibold">{room.name}</h2>
          {getStatusDisplay()}
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2 border rounded-lg h-72">
              <Chat
                roomId={roomId}
                socket={socket}
                connectionStatus={connectionStatus}
              />
            </div>
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
          <div className="mt-4">
            <PomodoroTimer
              roomId={roomId}
              socket={socket}
              connectionStatus={connectionStatus}
            />
          </div>
          <Button variant="destructive" className="mt-4 w-full">
            Leave Room
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default RoomSession;
