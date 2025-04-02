// /backend/socket/socket.js
import { Server } from "socket.io";

export const initializeSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
      credentials: true,
    },
    transports: ["websocket", "polling"],
  });

  const rooms = {}; // Store timer state per room

  io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on("joinRoom", (roomId) => {
      socket.join(roomId);
      console.log(`User ${socket.id} joined room: ${roomId}`);
      if (rooms[roomId]) {
        socket.emit("updateTimer", rooms[roomId]); // Send current state to new user
      }
    });

    socket.on("sendMessage", (data) => {
      io.to(data.roomId).emit("receiveMessage", data);
    });

    socket.on("updateTimer", ({ roomId, time, running }) => {
      if (!rooms[roomId]) {
        rooms[roomId] = { time: 25 * 60, running: false, interval: null };
      }

      // Update room state based on client request
      rooms[roomId].time = time;
      rooms[roomId].running = running;

      // Clear any existing interval
      if (rooms[roomId].interval) {
        clearInterval(rooms[roomId].interval);
        rooms[roomId].interval = null;
      }

      // Start timer if running
      if (running) {
        rooms[roomId].interval = setInterval(() => {
          if (rooms[roomId].time > 0) {
            rooms[roomId].time -= 1;
            io.to(roomId).emit("updateTimer", {
              time: rooms[roomId].time,
              running: rooms[roomId].running,
            });
          } else {
            clearInterval(rooms[roomId].interval);
            rooms[roomId].interval = null;
            rooms[roomId].running = false;
            io.to(roomId).emit("updateTimer", {
              time: 0,
              running: false,
            });
          }
        }, 1000);
      }

      // Broadcast the update immediately
      io.to(roomId).emit("updateTimer", {
        time: rooms[roomId].time,
        running: rooms[roomId].running,
      });
    });

    socket.on("disconnect", (reason) => {
      console.log(`User disconnected: ${socket.id} - Reason: ${reason}`);
    });
  });

  return io;
};
