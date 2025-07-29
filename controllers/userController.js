import { getDB } from "../config/db.js";


export const createUser = async (req, res) => {
  try {
    const db = getDB();
    const usersCollection = db.collection("users");
    const user = req.body; 

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
