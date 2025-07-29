import { getDB } from "../config/db.js";
import { ObjectId } from "mongodb";

// --- Controller to get all comments for a specific post ---
export const getCommentsByPostId = async (req, res) => {
  try {
    const db = getDB();
    const commentsCollection = db.collection("comments");
    const { postId } = req.params;

    if (!ObjectId.isValid(postId)) {
      return res.status(400).send({ message: "Invalid Post ID format." });
    }

    const comments = await commentsCollection
      .find({ postId: postId })
      .sort({ createdAt: -1 })
      .toArray();
    res.status(200).send(comments);
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

// --- Controller to create a new comment (a protected action) ---
export const createComment = async (req, res) => {
  try {
    const db = getDB();
    const commentsCollection = db.collection("comments");
    const commentData = req.body;
    const commenterEmail = req.decoded.email;

    const usersCollection = db.collection("users");
    const commenter = await usersCollection.findOne({ email: commenterEmail });

    if (!commenter) {
      return res.status(404).send({ message: "Commenter not found." });
    }

    if (!commentData.postId || !commentData.commentText) {
      return res
        .status(400)
        .send({ message: "Post ID and comment text are required." });
    }

    const newComment = {
      postId: commentData.postId,
      commentText: commentData.commentText,
      commenterName: commenter.name,
      commenterImage: commenter.photoURL,
      commenterEmail: commenter.email,
      createdAt: new Date(),
    };

    const result = await commentsCollection.insertOne(newComment);
    res.status(201).send(result);
  } catch (error) {
    console.error("Error creating comment:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};
