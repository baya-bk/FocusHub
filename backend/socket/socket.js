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

  const rooms = {};

  io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on("joinRoom", (roomId) => {
      socket.join(roomId);
      console.log(`User ${socket.id} joined room: ${roomId}`);
      if (rooms[roomId]) {
        const { interval, ...timerState } = rooms[roomId]; // Exclude interval
        socket.emit("updateTimer", timerState);
      }
    });

    socket.on("sendMessage", (data) => {
      io.to(data.roomId).emit("receiveMessage", data);
    });

    socket.on("updateTimer", ({ roomId, time, running, phase, cycleCount }) => {
      try {
        if (!roomId) throw new Error("roomId is required");

        if (!rooms[roomId]) {
          rooms[roomId] = {
            time: 25 * 60,
            running: false,
            interval: null,
            phase: "work",
            cycleCount: 0,
          };
        }

        rooms[roomId].time = time;
        rooms[roomId].running = running;
        if (phase) rooms[roomId].phase = phase;
        if (cycleCount !== undefined) rooms[roomId].cycleCount = cycleCount;

        if (rooms[roomId].interval) {
          clearInterval(rooms[roomId].interval);
          rooms[roomId].interval = null;
        }

        const emitTimerState = () => {
          const { interval, ...timerState } = rooms[roomId]; // Exclude interval
          io.to(roomId).emit("updateTimer", timerState);
        };

        if (running) {
          console.log(`Starting timer for room ${roomId}:`, rooms[roomId]);
          rooms[roomId].interval = setInterval(() => {
            try {
              if (rooms[roomId].time > 0) {
                rooms[roomId].time -= 1;
                emitTimerState();
              } else {
                clearInterval(rooms[roomId].interval);
                rooms[roomId].interval = null;
                rooms[roomId].running = false;

                if (rooms[roomId].phase === "work") {
                  rooms[roomId].cycleCount += 1;
                  rooms[roomId].phase =
                    rooms[roomId].cycleCount % 4 === 0
                      ? "longBreak"
                      : "shortBreak";
                  rooms[roomId].time =
                    rooms[roomId].phase === "longBreak" ? 15 * 60 : 5 * 60;
                } else {
                  rooms[roomId].phase = "work";
                  rooms[roomId].time = 25 * 60;
                }
                emitTimerState();
              }
            } catch (error) {
              console.error(
                `Error in timer interval for room ${roomId}:`,
                error
              );
              clearInterval(rooms[roomId].interval);
              rooms[roomId].interval = null;
            }
          }, 1000);
        }

        emitTimerState(); // Initial emit after state update
      } catch (error) {
        console.error(`Error in updateTimer for room ${roomId}:`, error);
      }
    });

    socket.on("disconnect", (reason) => {
      console.log(`User disconnected: ${socket.id} - Reason: ${reason}`);
    });
  });

  return io;
};
