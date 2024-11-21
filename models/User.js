const mongoose = require("mongoose");

// Sub-schema for Topics
const topicSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Topic name
  description: { type: String, default: "" }, // Optional description
});

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    bio: { type: String, default: "" },
    profilePicture: { type: String, default: "" },
    role: {
      type: String,
      enum: ["student", "admin"],
      default: "student",
    },
    topicsOfInterest: {
      type: [String], // High-level interests
      default: [],
    },
    syllabus: {
      type: [String], // Array of syllabus items
      default: [],
    },
    coursework: {
      type: [String], // Array of coursework items
      default: [],
    },
   
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);