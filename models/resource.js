const mongoose = require("mongoose");

const resourceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  fileUrl: { type: String, required: true },
  topic: { type: mongoose.Schema.Types.ObjectId, ref: "Topic", required: true },
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  description: { type: String, default: "" },
});

module.exports = mongoose.model("Resource", resourceSchema);
