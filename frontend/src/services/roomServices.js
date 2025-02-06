import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL + "/api/rooms";

// Fetch all study rooms
const getRooms = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Create a new study room
const createRoom = async (roomData) => {
  const response = await axios.post(API_URL, roomData);
  return response.data;
};

// Join a study room
const joinRoom = async (roomId, userData) => {
  const response = await axios.post(`${API_URL}/${roomId}/join`, userData);
  return response.data;
};

const roomService = {
  getRooms,
  createRoom,
  joinRoom,
};

export default roomService;
