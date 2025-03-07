const express = require("express");
const router = express.Router();
const StudyRoom = require("../models/StudyRoom");

// Get all study rooms
router.get("/", async (req, res) => {
  try {
    const rooms = await StudyRoom.find();
    res.json(rooms);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// Get all study rooms by id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const rooms = await StudyRoom.findById(id);
    res.json(rooms);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// Create a new Study Room
router.post("/", async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name || !description) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newRoom = new StudyRoom({ name, description, members: [] });
    await newRoom.save();

    res.status(201).json(newRoom);
  } catch (error) {
    console.error("Error creating room:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
