import { getDB } from "../config/db.js";

// --- Controller to get all users (a protected action) ---
export const getAllUsers = async (req, res) => {
  try {
    const db = getDB();
    const usersCollection = db.collection("users");
    const users = await usersCollection.find({}).toArray();
    res.status(200).send(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

// --- Controller to create a new user ---
export const createUser = async (req, res) => {
  try {
    const db = getDB();
    const usersCollection = db.collection("users");
    const user = req.body; // User data from the client

    // --- Debugging and Validation Step ---
    if (!user || Object.keys(user).length === 0) {
      return res
        .status(400)
        .send({
          message: "Bad Request: User data is missing in the request body.",
        });
    }

    // --- Check if the user already exists ---
    const existingUser = await usersCollection.findOne({ email: user.email });
    if (existingUser) {
      return res
        .status(409)
        .send({ message: "User with this email already exists." });
    }

    // --- Create a new user document ---
    const newUser = {
      ...user, 
      role: "user", 
      badge: "Bronze", 
      createdAt: new Date(),
    };

    // --- Insert the new user into the database ---
    const result = await usersCollection.insertOne(newUser);
    res.status(201).send(result);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};
