// db/connect-to-shipping-app.js
import dotenv from "dotenv";
dotenv.config();

import { MongoClient } from "mongodb";

const uri = process.env.MONGO_URI;
const dbName = "shippingDB";

if (!uri) {
  throw new Error("❌ MONGO_URI is not defined");
}

const client = new MongoClient(uri);

export const connectDB = async () => {
  try {
    await client.connect();
    return client.db(dbName);
  } catch (err) {
    console.error("❌ Failed to connect to DB:", err);
    process.exit(1);
  }
};

export const closeDB = async () => {
  try {
    await client.close();
  } catch (err) {
    console.error("❌ Error closing DB connection:", err);
  }
};
