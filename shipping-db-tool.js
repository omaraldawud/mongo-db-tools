#!/usr/bin/env node

import { MongoClient, ObjectId } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const uri = process.env.MONGO_URI;
const dbName = "shippingDB";
const client = new MongoClient(uri);

const commandsHelp = `
📦 Supported Commands:

node shipping-db-tool.js list
  → List all collections in ${dbName}

node shipping-db-tool.js find <collection>
  → Show all records in a collection

node shipping-db-tool.js insert <collection>
  → Insert sample record into a collection

node shipping-db-tool.js delete <collection> <_id>
  → Delete a record by its _id

node shipping-db-tool.js clear <collection>
  → Delete all records in a collection

node shipping-db-tool.js seed <collection>
  → Seed test data into a collection

node shipping-db-tool.js stats <collection>
  → Show count and stats for a collection

node shipping-db-tool.js commands
  → List all supported commands
`;

const showCommands = () => console.log(commandsHelp);

const connectDB = async () => {
  try {
    await client.connect();
    return client.db(dbName);
  } catch (err) {
    console.error("❌ Failed to connect to DB:", err);
    process.exit(1);
  }
};

const listCollections = async () => {
  const db = await connectDB();
  const collections = await db.listCollections().toArray();
  console.log("📂 Collections:");
  collections.forEach((c) => console.log(`- ${c.name}`));
};

const findAll = async (collection) => {
  const db = await connectDB();
  const docs = await db.collection(collection).find({}).toArray();
  console.log(JSON.stringify(docs, null, 2));
};

const insertSample = async (collection) => {
  const db = await connectDB();
  const sample = {
    customers: { name: "John Doe", email: "john@example.com" },
    users: { username: "admin", role: "admin" },
    contracts: { title: "Sample Contract", status: "active" },
  };
  const data = sample[collection] || { createdAt: new Date(), dummy: true };
  const result = await db.collection(collection).insertOne(data);
  console.log(`✅ Inserted into ${collection}:`, result.insertedId);
};

const deleteById = async (collection, id) => {
  const db = await connectDB();
  const result = await db
    .collection(collection)
    .deleteOne({ _id: new ObjectId(id) });
  if (result.deletedCount) {
    console.log(`🗑️ Deleted record ${id} from ${collection}`);
  } else {
    console.log(`⚠️ No record found with ID: ${id}`);
  }
};

const clearCollection = async (collection) => {
  const db = await connectDB();
  const result = await db.collection(collection).deleteMany({});
  console.log(`🧹 Cleared ${result.deletedCount} documents from ${collection}`);
};

const seedCollection = async (collection) => {
  const db = await connectDB();
  const data = {
    customers: [
      { name: "Alice", email: "alice@example.com" },
      { name: "Bob", email: "bob@example.com" },
    ],
    users: [
      { username: "admin", role: "admin" },
      { username: "user", role: "customer" },
    ],
    contracts: [
      { title: "Contract A", status: "active" },
      { title: "Contract B", status: "draft" },
    ],
  };
  const docs = data[collection];
  if (!docs) {
    console.log(`⚠️ No seed data defined for '${collection}'. Skipping.`);
    return;
  }
  const result = await db.collection(collection).insertMany(docs);
  console.log(`🌱 Seeded ${result.insertedCount} records into ${collection}`);
};

const statsCollection = async (collection) => {
  const db = await connectDB();
  const count = await db.collection(collection).countDocuments();
  const indexes = await db.collection(collection).indexes();
  console.log(`📊 Stats for '${collection}':`);
  console.log(`- Total Documents: ${count}`);
  console.log(`- Indexes: ${indexes.map((i) => i.name).join(", ")}`);
};

const main = async () => {
  const [, , cmd, collection, arg] = process.argv;

  if (!cmd || cmd === "commands" || cmd === "help") {
    showCommands();
    return;
  }

  const validCommands = [
    "list",
    "find",
    "insert",
    "delete",
    "clear",
    "seed",
    "stats",
  ];
  if (!validCommands.includes(cmd)) {
    console.error(`❌ Unknown command: ${cmd}`);
    showCommands();
    return;
  }

  if (
    ["find", "insert", "clear", "seed", "stats"].includes(cmd) &&
    !collection
  ) {
    console.error(`❗ Missing collection name for command '${cmd}'`);
    return;
  }

  switch (cmd) {
    case "list":
      await listCollections();
      break;
    case "find":
      await findAll(collection);
      break;
    case "insert":
      await insertSample(collection);
      break;
    case "delete":
      if (!arg) {
        console.error(`❗ Missing ID to delete from '${collection}'`);
        return;
      }
      await deleteById(collection, arg);
      break;
    case "clear":
      await clearCollection(collection);
      break;
    case "seed":
      await seedCollection(collection);
      break;
    case "stats":
      await statsCollection(collection);
      break;
    default:
      showCommands();
  }

  await client.close();
};

main();
