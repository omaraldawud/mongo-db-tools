import { ObjectId } from "mongodb";
import fs from "fs";
import path from "path";
import * as data from "./sampleData/index.js";
import { connectDB, closeDB } from "./db/connect-to-shipping-app.js"; // <-- new import

export const listCollections = async () => {
  const db = await connectDB();
  const collections = await db.listCollections().toArray();
  console.log("📂 Collections:");
  collections.forEach((c) => console.log(`- ${c.name}`));
  await closeDB();
};

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

  if (options.limit) cursor = cursor.limit(parseInt(options.limit));
  if (options.skip) cursor = cursor.skip(parseInt(options.skip));

  const docs = await cursor.toArray();
  console.log(JSON.stringify(docs, null, 2));
  await closeDB();
};

export const insertSample = async (collection) => {
  const db = await connectDB();
  const docs = data[collection];
  if (!docs) {
    console.log(`⚠️ No sample data defined for '${collection}'.`);
    await closeDB();
    return;
  }
  try {
    const result = await db.collection(collection).insertOne(docs[0]);
    console.log(
      `🌱 Inserted sample document with ID ${result.insertedId} into '${collection}'.`
    );
  } catch (err) {
    console.error(`❌ Error inserting sample:`, err.message);
  }
  await closeDB();
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
  await closeDB();
};

export const clearCollection = async (collection) => {
  const db = await connectDB();
  const result = await db.collection(collection).deleteMany({});
  console.log(`🧹 Cleared ${result.deletedCount} documents from ${collection}`);
  await closeDB();
};

export const seedCollection = async (collection) => {
  const db = await connectDB();
  const docs = data[collection];
  if (!docs) {
    console.log(`⚠️ No seed data defined for '${collection}'. Skipping.`);
    await closeDB();
    return;
  }
  try {
    const result = await db.collection(collection).insertMany(docs);
    console.log(`🌱 Seeded ${result.insertedCount} records into ${collection}`);
  } catch (err) {
    console.error(`❌ Error seeding ${collection}:`, err.message);
  }
  await closeDB();
};

export const statsCollection = async (collection) => {
  const db = await connectDB();
  const count = await db.collection(collection).countDocuments();
  const indexes = await db.collection(collection).indexes();
  console.log(`📊 Stats for '${collection}':`);
  console.log(`- Total Documents: ${count}`);
  console.log(`- Indexes: ${indexes.map((i) => i.name).join(", ")}`);
  await closeDB();
};

export const updateDocument = async (collection, id, jsonData) => {
  console.log("⚠️ Update command is not implemented yet.");
  // Placeholder
  await closeDB();
};

export const exportCollection = async (collection) => {
  const db = await connectDB();
  try {
    const docs = await db.collection(collection).find().toArray();
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const folder = path.join(process.cwd(), "exportedData");
    if (!fs.existsSync(folder)) fs.mkdirSync(folder);
    const filename = `exported-${collection}-${timestamp}.json`;
    const filepath = path.join(folder, filename);
    fs.writeFileSync(filepath, JSON.stringify(docs, null, 2));
    console.log(
      `✅ Exported ${docs.length} documents from '${collection}' to '${filepath}'`
    );
  } catch (err) {
    console.error(`❌ Failed to export '${collection}':`, err.message);
  }
  await closeDB();
};

export const importCollection = async (collection, filename) => {
  console.log("⚠️ Import command is not implemented yet.");
  // Placeholder
  await closeDB();
};

export const createIndex = async (collection, jsonIndex) => {
  const db = await connectDB();
  try {
    const spec = JSON.parse(jsonIndex);
    const result = await db.collection(collection).createIndex(spec);
    console.log(`✅ Created index: ${result}`);
  } catch (err) {
    console.error("❌ Error creating index:", err.message);
  }
  await closeDB();
};

export const dropIndex = async (collection, indexName) => {
  const db = await connectDB();
  try {
    await db.collection(collection).dropIndex(indexName);
    console.log(`✅ Dropped index: ${indexName}`);
  } catch (err) {
    console.error("❌ Failed to drop index:", err.message);
  }
  await closeDB();
};

export const countDocuments = async (collection, filter) => {
  const db = await connectDB();
  try {
    const parsedFilter = filter ? JSON.parse(filter) : {};
    const count = await db.collection(collection).countDocuments(parsedFilter);
    console.log(`📊 ${collection} contains ${count} matching document(s).`);
  } catch (err) {
    console.error("❌ Error counting documents:", err.message);
  }
  await closeDB();
};
