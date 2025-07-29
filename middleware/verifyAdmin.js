import { getDB } from "../config/db.js";

// Middleware to verify if the user has an 'admin' role
const verifyAdmin = async (req, res, next) => {
  try {
    // The user's email should have been attached to the request by the previous verifyJWT middleware
    const email = req.decoded.email;

    if (!email) {
      return res
        .status(403)
        .send({ message: "Forbidden access. User email not found in token." });
    }

    const db = getDB();
    const usersCollection = db.collection("users");

    // Find the user in the database
    const user = await usersCollection.findOne({ email: email });

    // Check if the user exists and if their role is 'admin'
    if (!user || user.role !== "admin") {
      return res
        .status(403)
        .send({
          message: "Forbidden access. You do not have admin privileges.",
        });
    }

    // If the user is an admin, proceed to the next function (the controller)
    next();
  } catch (error) {
    console.error("Error in verifyAdmin middleware:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

export default verifyAdmin;
