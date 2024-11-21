const ForumPost = require("../models/forum");

// Create a new post
const createPost = async (req, res) => {
  const { title, content, tags } = req.body;

  try {
    const newPost = new ForumPost({
      title,
      content,
      user: req.user.id,
      tags,
    });

    await newPost.save();
    res.status(201).json(newPost);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};

// Add comment to a post
const addComment = async (req, res) => {
  const { postId, content } = req.body;

  try {
    const post = await ForumPost.findById(postId);
    if (!post) return res.status(404).json({ msg: "Post not found" });

    const comment = {
      user: req.user.id,
      content,
      upvotes: 0,
      downvotes: 0,
    };

    post.comments.push(comment);
    await post.save();
    res.status(200).json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};

// Upvote or downvote a comment
const voteComment = async (req, res) => {
  const { postId, commentId, voteType } = req.body;

  try {
    const post = await ForumPost.findById(postId);
    if (!post) return res.status(404).json({ msg: "Post not found" });

    const comment = post.comments.id(commentId);
    if (!comment) return res.status(404).json({ msg: "Comment not found" });

    if (voteType === "upvote") {
      comment.upvotes += 1;
    } else if (voteType === "downvote") {
      comment.downvotes += 1;
    } else {
      return res.status(400).json({ msg: "Invalid vote type" });
    }

    await post.save();
    res.status(200).json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};

module.exports = { createPost, addComment, voteComment };
