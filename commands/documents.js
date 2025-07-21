// commands/documents.js
import { ObjectId } from "mongodb";
import { connectDB } from "../db/connect-to-shipping-app.js";

export const findAll = async (collection, options) => {
  const db = await connectDB();
  let filter = {};
  try {
    if (options.filter) filter = JSON.parse(options.filter);
  } catch {
    console.error("❌ Invalid JSON for filter option");
    process.exit(1);
  }

  let cursor = db.collection(collection).find(filter);

  if (options.limit) {
    cursor = cursor.limit(parseInt(options.limit));
  }
  if (options.skip) {
    cursor = cursor.skip(parseInt(options.skip));
  }

  const docs = await cursor.toArray();
  console.log(JSON.stringify(docs, null, 2));
};

export const insertSample = async (collection) => {
  // This function should be defined or imported from your seed data
  console.log("⚠️ insertSample command is not implemented yet.");
};

export const deleteById = async (collection, id) => {
  const db = await connectDB();
  try {
    const result = await db
      .collection(collection)
      .deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount) {
      console.log(`🗑️ Deleted record ${id} from ${collection}`);
    } else {
      console.log(`⚠️ No record found with ID: ${id}`);
    }
  } catch {
    console.error("❌ Invalid ID format");
  }
};

export const updateDocument = async (collection, id, jsonData) => {
  console.log("⚠️ Update command is not implemented yet.");
};
