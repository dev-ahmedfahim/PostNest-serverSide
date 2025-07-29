import { getDB } from "../config/db.js";

// --- Controller to get all posts ---

export const getAllPosts = async (req, res) => {
  try {
    const db = getDB();
    const postsCollection = db.collection("posts");
    // Find all posts and sort them by creation time, newest first.
    const posts = await postsCollection
      .find({})
      .sort({ createdAt: -1 })
      .toArray();
    res.status(200).send(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

// --- Controller to create a new post (a protected action) ---
export const createPost = async (req, res) => {
  try {
    const db = getDB();
    const postsCollection = db.collection("posts");
    const postData = req.body;

    // Get the author's email from the decoded JWT
    const authorEmail = req.decoded.email;

    // Find the author in the users collection to get their name and image
    const usersCollection = db.collection("users");
    const author = await usersCollection.findOne({ email: authorEmail });

    if (!author) {
      return res.status(404).send({ message: "Author not found." });
    }

    // --- Create the new post document ---
    const newPost = {
      authorName: author.name,
      authorImage: author.photoURL,
      authorEmail: author.email,
      postTitle: postData.postTitle,
      postDescription: postData.postDescription,
      tags: postData.tags,
      upVote: 0, 
      downVote: 0, 
      createdAt: new Date(),
    };

    const result = await postsCollection.insertOne(newPost);
    res.status(201).send(result);
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};
