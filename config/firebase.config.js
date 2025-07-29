const admin = require("firebase-admin");
require("dotenv").config();

// --- Format the private key ---
// The private key from the .env file often has "\\n" which needs to be replaced with "\n"
const privateKey = process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n");

// --- Firebase Service Account Credentials ---
const serviceAccount = {
  type: "service_account",
  project_id: process.env.PROJECT_ID, // Correctly reads from your server's .env file
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
  private_key: privateKey,
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_CLIENT_ID,
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: process.env.FIREBASE_CLIENT_CERT_URL,
};

// --- Initialize Firebase Admin ---
try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
  console.log("✅ Firebase Admin SDK initialized successfully.");
} catch (error) {
  console.error("🔥 Firebase Admin SDK initialization error:", error);
}

module.exports = admin;
