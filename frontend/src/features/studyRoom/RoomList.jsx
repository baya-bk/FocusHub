import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CreateRoom from "./CreateRoom";

const API_URL = import.meta.env.VITE_API_URL + "/api/study-rooms";

const StudyRoom = () => {
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const response = await axios.get(API_URL);
      setRooms(response.data);
    } catch (error) {
      console.error("Error fetching rooms:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRoomCreated = (newRoom) => {
    setRooms((prevRooms) => [...prevRooms, newRoom]); // Add new room to the UI
  };

  if (loading) return <p>Loading study rooms...</p>;

  return (
    <div className="p-6">
      <CreateRoom onRoomCreated={handleRoomCreated} />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {rooms.map((room) => (
          <Dialog key={room._id}>
            <DialogTrigger asChild>
              <Card
                className="cursor-pointer hover:shadow-lg transition"
                onClick={() => setSelectedRoom(room)}
              >
                <CardHeader>
                  <h3 className="text-lg font-semibold">{room.name}</h3>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{room.description}</p>
                </CardContent>
              </Card>
            </DialogTrigger>

            {selectedRoom && (
              <DialogContent>
                <DialogTitle>{selectedRoom.name}</DialogTitle>
                <DialogDescription>
                  {selectedRoom.description}
                </DialogDescription>

                <Button
                  onClick={() => navigate(`/study-room/${selectedRoom._id}`)}
                >
                  {" "}
                  {/* Use _id here */}
                  Join Room
                </Button>
              </DialogContent>
            )}
          </Dialog>
        ))}
      </div>
    </div>
  );
};

export default StudyRoom;
