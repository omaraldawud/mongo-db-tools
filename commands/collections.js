// commands/collections.js
import { connectDB } from "../db/connect-to-shipping-app.js";

export const listCollections = async () => {
  const db = await connectDB();
  const collections = await db.listCollections().toArray();
  console.log("📂 Collections:");
  collections.forEach((c) => console.log(`- ${c.name}`));
};

export const clearCollection = async (collection) => {
  const db = await connectDB();
  const result = await db.collection(collection).deleteMany({});
  console.log(`🧹 Cleared ${result.deletedCount} documents from ${collection}`);
};

export const statsCollection = async (collection) => {
  const db = await connectDB();
  const count = await db.collection(collection).countDocuments();
  const indexes = await db.collection(collection).indexes();
  console.log(`📊 Stats for '${collection}':`);
  console.log(`- Total Documents: ${count}`);
  console.log(`- Indexes: ${indexes.map((i) => i.name).join(", ")}`);
};
