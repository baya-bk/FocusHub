// /backend/server.js
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const userRoutes = require("./routes/userRoutes");
const studyRoomRoutes = require("./routes/studyRoomRoutes");
const { initializeSocket } = require("./socket/socket");

const app = express();
const PORT = process.env.PORT || 5000;
const server = http.createServer(app);
const io = initializeSocket(server); // Use socket.js

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use(
  "/api/study-rooms",
  (req, res, next) => {
    req.io = io;
    next();
  },
  studyRoomRoutes
);

// MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error("MongoDB connection error:", err));

app.get("/", (req, res) => res.send("FocusHub Backend is Running..."));
