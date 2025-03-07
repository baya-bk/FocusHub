const mongoose = require("mongoose");

const StudyRoomSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    members: [{ type: String }], // Store members as an array of usernames
  },
  { timestamps: true }
);

module.exports = mongoose.model("StudyRoom", StudyRoomSchema);
