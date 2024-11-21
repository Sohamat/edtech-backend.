const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  topics: [{ type: mongoose.Schema.Types.ObjectId, ref: "Topic" }],
});

module.exports = mongoose.model("Group", groupSchema);
