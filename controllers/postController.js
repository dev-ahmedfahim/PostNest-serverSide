import { getDB } from "../config/db.js";
import { ObjectId } from "mongodb"; 

// --- Controller to get a single post by its ID ---
export const getPostById = async (req, res) => {
  try {
    const db = getDB();
    const postsCollection = db.collection("posts");
    const id = req.params.id; 

    // 2. Validate the ID format before querying
    if (!ObjectId.isValid(id)) {
      return res.status(400).send({ message: "Invalid post ID format." });
    }

    // 3. Find the post by its _id
    const post = await postsCollection.findOne({ _id: new ObjectId(id) });

    if (!post) {
      return res.status(404).send({ message: "Post not found." });
    }

    res.status(200).send(post);
  } catch (error) {
    console.error("Error fetching single post:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

// --- Controller to get all posts ---
export const getAllPosts = async (req, res) => {
  try {
    const db = getDB();
    const postsCollection = db.collection("posts");
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
    const authorEmail = req.decoded.email;
    const usersCollection = db.collection("users");
    const author = await usersCollection.findOne({ email: authorEmail });

    if (!author) {
      return res.status(404).send({ message: "Author not found." });
    }

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
