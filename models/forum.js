const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  content: { type: String, required: true },
  upvotes: { type: Number, default: 0 },
  downvotes: { type: Number, default: 0 },
  replies: [this], // Recursive subdocument for replies
});

const forumPostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  comments: [commentSchema],
  tags: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("ForumPost", forumPostSchema);
