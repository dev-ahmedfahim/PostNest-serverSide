import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const uri = process.env.MONGODB_URI;
const options = {
  serverApi: { version: "1", strict: true, deprecationErrors: true },
};

let client;
let db;

export const connectDB = async () => {
  if (db) return db;

  try {
    client = await MongoClient.connect(uri, options);
    db = client.db(process.env.DB_NAME);
    console.log("✅ MongoDB connected (Vercel serverless)");
    return db;
  } catch (err) {
    console.error("❌ DB connection error:", err);
    throw err;
  }
};

export const getDB = () => db;
