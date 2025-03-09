import { useState } from "react";
import axios from "axios";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const API_URL = "http://localhost:5000/api/study-rooms"; // Ensure the URL matches

const CreateRoom = ({ onRoomCreated }) => {
  const [roomName, setRoomName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCreateRoom = async () => {
    if (!roomName || !description) {
      setError("All fields are required");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.post(API_URL, {
        name: roomName,
        description,
        members: [],
      });
      onRoomCreated(response.data); // Update UI with the new room
      setRoomName("");
      setDescription("");
    } catch (err) {
      setError("Failed to create room. Try again.");
      console.error("Error creating room:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="mb-4">Create New Room</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogTitle>Create Study Room</DialogTitle>
        <DialogDescription>
          Enter room details to create a new study session.
        </DialogDescription>

        {error && <p className="text-red-500">{error}</p>}

        <div className="space-y-2">
          <Label htmlFor="roomName">Room Name</Label>
          <Input
            id="roomName"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
          />

          <Label htmlFor="description">Description</Label>
          <Input
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <Button
          className="mt-4 w-full"
          onClick={handleCreateRoom}
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Room"}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default CreateRoom;
