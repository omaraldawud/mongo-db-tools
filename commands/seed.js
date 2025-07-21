// commands/seed.js
import * as data from "../sampleData/index.js";
import { connectDB } from "../db/connect-to-shipping-app.js";

export const seedCollection = async (collection) => {
  const db = await connectDB();

  const docs = data[collection];
  if (!docs) {
    console.log(`⚠️ No seed data defined for '${collection}'. Skipping.`);
    return;
  }

  try {
    const result = await db.collection(collection).insertMany(docs);
    console.log(`🌱 Seeded ${result.insertedCount} records into ${collection}`);
  } catch (err) {
    console.error(`❌ Error seeding ${collection}:`, err.message);
  }
};
