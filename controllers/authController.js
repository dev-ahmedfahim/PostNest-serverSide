import jwt from "jsonwebtoken";
import dotenv from "dotenv";

// Initialize dotenv to use environment variables
dotenv.config();


export const createToken = async (req, res) => {
  try {
    const user = req.body; 

    
    if (!user || !user?.email) {
      return res.status(400).send({ message: "User email is required." });
    }

    const payload = { email: user.email };

    
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "9h", 
    });

    // Send the new token back to the client
    res.status(200).send({ token });
  } catch (error) {
    console.error("Error creating JWT:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};
