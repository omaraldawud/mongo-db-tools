#!/usr/bin/env node

import { MongoClient, ObjectId } from "mongodb";
import dotenv from "dotenv";
import { Command } from "commander";

// for import/export functionality
import fs from "fs";
import path from "path";

//for seeding
import * as data from "./sampleData/index.js";

dotenv.config();

const uri = process.env.MONGO_URI;
const dbName = "shippingDB";
const client = new MongoClient(uri);

const program = new Command();

const connectDB = async () => {
  try {
    if (!client.isConnected?.()) await client.connect();
    return client.db(dbName);
  } catch (err) {
    console.error("❌ Failed to connect to DB:", err);
    process.exit(1);
  }
};

const closeDB = async () => {
  try {
    await client.close();
  } catch (err) {
    console.error("❌ Error closing DB connection:", err);
  }
};

// === Existing command implementations === //

const listCollections = async () => {
  const db = await connectDB();
  const collections = await db.listCollections().toArray();
  console.log("📂 Collections:");
  collections.forEach((c) => console.log(`- ${c.name}`));
};

const findAll = async (collection, options) => {
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

const deleteById = async (collection, id) => {
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

const clearCollection = async (collection) => {
  const db = await connectDB();
  const result = await db.collection(collection).deleteMany({});
  console.log(`🧹 Cleared ${result.deletedCount} documents from ${collection}`);
};

// --------------------------------------------------------------------
// seed Collection
const seedCollection = async (collection) => {
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

// --------------------------------------------------------------------
// Stats Collection
const statsCollection = async (collection) => {
  const db = await connectDB();
  const count = await db.collection(collection).countDocuments();
  const indexes = await db.collection(collection).indexes();
  console.log(`📊 Stats for '${collection}':`);
  console.log(`- Total Documents: ${count}`);
  console.log(`- Indexes: ${indexes.map((i) => i.name).join(", ")}`);
};

// === Placeholders for future commands === //

const updateDocument = async (collection, id, jsonData) => {
  console.log("⚠️ Update command is not implemented yet.");
  // Placeholder
};

//exportCollection Function

const exportCollection = async (collection) => {
  const db = await connectDB();

  try {
    const docs = await db.collection(collection).find().toArray();

    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const folder = path.join(process.cwd(), "exportedData");
    const filename = `exported-${collection}-${timestamp}.json`;
    const filepath = path.join(folder, filename);

    // Create folder if it doesn't exist
    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder);
    }

    fs.writeFileSync(filepath, JSON.stringify(docs, null, 2));
    console.log(
      `✅ Exported ${docs.length} documents from '${collection}' to '${filepath}'`
    );
  } catch (err) {
    console.error(`❌ Failed to export '${collection}':`, err.message);
  }
};

const importCollection = async (collection, filename) => {
  console.log("⚠️ Import command is not implemented yet.");
  // Placeholder
};

const createIndex = async (collection, jsonIndex) => {
  console.log("⚠️ Create-index command is not implemented yet.");
  // Placeholder
};

const dropIndex = async (collection, indexName) => {
  console.log("⚠️ Drop-index command is not implemented yet.");
  // Placeholder
};

const countDocuments = async (collection, filter) => {
  console.log("⚠️ Count command is not implemented yet.");
  // Placeholder
};

// === Commander Setup === //

program
  .name("shipping-db-tool")
  .description("MongoDB utility CLI for shippingDB")
  .version("1.0.0");

program
  .command("list")
  .description(`List all collections in ${dbName}`)
  .action(async () => {
    await listCollections();
    await client.close();
  });

program
  .command("find <collection>")
  .description("Show records in a collection")
  .option("-f, --filter <json>", "JSON filter for query", "{}")
  .option("-l, --limit <number>", "Limit number of results")
  .option("-s, --skip <number>", "Skip number of results")
  .action(async (collection, options) => {
    await findAll(collection, options);
    await client.close();
  });

program
  .command("insert <collection>")
  .description("Insert a sample record into a collection")
  .action(async (collection) => {
    await insertSample(collection);
    await client.close();
  });

program
  .command("delete <collection> <id>")
  .description("Delete a record by its _id")
  .action(async (collection, id) => {
    await deleteById(collection, id);
    await client.close();
  });

program
  .command("clear <collection>")
  .description("Delete all records in a collection")
  .action(async (collection) => {
    await clearCollection(collection);
    await client.close();
  });

program
  .command("seed <collection>")
  .description("Seed test data into a collection")
  .action(async (collection) => {
    await seedCollection(collection);
    await client.close();
  });

program
  .command("stats <collection>")
  .description("Show count and stats for a collection")
  .action(async (collection) => {
    await statsCollection(collection);
    await client.close();
  });

// Future commands placeholders:

program
  .command("update <collection> <id> <json>")
  .description("Update a document by _id with JSON data (not implemented yet)")
  .action(async (collection, id, json) => {
    await updateDocument(collection, id, json);
    await client.close();
  });

program
  .command("export <collection>")
  .description(
    "Export collection documents to an auto-named-and-time-stamped JSON file in exportedData folder"
  )
  .action(async (collection) => {
    await exportCollection(collection);
    await client.close();
  });

program
  .command("import <collection> <filename>")
  .description(
    "Import documents from a JSON file into collection (not implemented yet)"
  )
  .action(async (collection, filename) => {
    await importCollection(collection, filename);
    await client.close();
  });

program
  .command("create-index <collection> <json>")
  .description("Create an index on a collection")
  .action(async (collectionName, json) => {
    const db = await connectToDB();
    const spec = JSON.parse(json);
    try {
      const result = await db.collection(collectionName).createIndex(spec);
      console.log(`✅ Created index: ${result}`);
    } catch (err) {
      console.error("❌ Error creating index:", err.message);
    } finally {
      await client.close();
    }
  });

program
  .command("drop-index <collection> <indexName>")
  .description("Drop an index from a collection by name")
  .action(async (collection, indexName) => {
    const { db, client } = await connectToDB();
    try {
      await db.collection(collection).dropIndex(indexName);
      console.log(`✅ Index dropped: ${indexName}`);
    } catch (err) {
      console.error("❌ Failed to drop index:", err.message);
    } finally {
      await client.close;
    }
  });

//----------------------------------------------------------
//count command
program
  .command("count <collection> [filter]")
  .description("Count documents matching optional filter")
  .action(async (collectionName, filter) => {
    const db = await connectDB();
    try {
      const parsedFilter = filter ? JSON.parse(filter) : {};
      const count = await db
        .collection(collectionName)
        .countDocuments(parsedFilter);
      console.log(
        `📊 ${collectionName} contains ${count} matching document(s).`
      );
    } catch (err) {
      console.error("❌ Error counting documents:", err.message);
    } finally {
      await client.close();
    }
  });

program.parseAsync(process.argv);
