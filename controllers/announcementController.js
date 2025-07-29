import { getDB } from "../config/db.js";

// --- Controller to get all announcements ---

export const getAllAnnouncements = async (req, res) => {
  try {
    const db = getDB();
    const announcementsCollection = db.collection("announcements");
    // Find all announcements and sort them by creation time, newest first.
    const announcements = await announcementsCollection
      .find({})
      .sort({ createdAt: -1 })
      .toArray();
    res.status(200).send(announcements);
  } catch (error) {
    console.error("Error fetching announcements:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

// --- Controller to create a new announcement (an admin-only action) ---
export const createAnnouncement = async (req, res) => {
  try {
    const db = getDB();
    const announcementsCollection = db.collection("announcements");
    const announcementData = req.body; 

    // Get the admin's email from the decoded JWT
    const authorEmail = req.decoded.email;

    // Find the admin in the users collection to get their name and image
    const usersCollection = db.collection("users");
    const author = await usersCollection.findOne({ email: authorEmail });

    if (!author) {
      return res.status(404).send({ message: "Author (admin) not found." });
    }

    // --- Create the new announcement document ---
    const newAnnouncement = {
      authorName: author.name,
      authorImage: author.photoURL,
      title: announcementData.title,
      description: announcementData.description,
      createdAt: new Date(),
    };

    const result = await announcementsCollection.insertOne(newAnnouncement);
    res.status(201).send(result);
  } catch (error) {
    console.error("Error creating announcement:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};
