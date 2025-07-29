import jwt from "jsonwebtoken";
import dotenv from "dotenv";

// Initialize dotenv to use environment variables
dotenv.config();

// This function's only job is to create a JWT.
export const createToken = async (req, res) => {
  try {
    const user = req.body; // Get user info (like email) from the request

    // Make sure we received an email to create a token for
    if (!user || !user.email) {
      return res.status(400).send({ message: "User email is required." });
    }

    const payload = { email: user.email };

    // Create the token using our secret key from the .env file
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "9h", // This token will expire in 1 hour
    });

    // Send the new token back to the client
    res.status(200).send({ token });
  } catch (error) {
    console.error("Error creating JWT:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};
