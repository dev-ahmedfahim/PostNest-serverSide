import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// Middleware to verify the JSON Web Token
const verifyJWT = (req, res, next) => {
  // 1. Get the authorization header from the incoming request
  const authHeader = req.headers.authorization;

  // 2. Check if the header exists and is in the correct "Bearer <token>" format
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    // If no token is provided, send a 401 Unauthorized error
    return res
      .status(401)
      .send({ message: "Unauthorized access. No token provided." });
  }

  // 3. If the header exists, split it to get only the token part
  const token = authHeader.split(" ")[1];

  // 4. Verify the token using our secret key
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    // If there's an error (e.g., token is invalid or expired)
    if (err) {
      // Send a 403 Forbidden error because the token is bad
      return res
        .status(403)
        .send({ message: "Forbidden access. Token is invalid." });
    }

    // 5. If the token is valid, attach the decoded payload (e.g., user email) to the request
    req.decoded = decoded;

    // 6. Everything is okay, so move on to the next function (the actual controller)
    next();
  });
};

export default verifyJWT;
