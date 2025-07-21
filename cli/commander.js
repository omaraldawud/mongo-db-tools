#!/usr/bin/env node
import { Command } from "commander";
import {
  listCollections,
  clearCollection,
  statsCollection,
  findAll,
  insertSample,
  deleteById,
  updateDocument,
  seedCollection,
  exportCollection,
  importCollection,
} from "../commands/index.js";

const program = new Command();

program
  .name("shipping-db-tool")
  .description(
    "CLI utility for MongoDB operations in the Shipping SaaS platform"
  )
  .version("1.0.0");

// 🟢 Generic collection commands
program
  .command("list")
  .description("List all collections in the database")
  .action(listCollections);

program
  .command("clear <collection>")
  .description("Delete all documents from the specified collection")
  .action(clearCollection);

program
  .command("stats <collection>")
  .description("Show document count and indexes of a collection")
  .action(statsCollection);

// 🔵 Document-level operations
program
  .command("find <collection>")
  .description(
    "Find all documents in a collection (use --filter for custom queries)"
  )
  .option("-f, --filter <json>", "JSON filter query")
  .option("-l, --limit <number>", "Limit the number of results")
  .option("-s, --skip <number>", "Skip number of documents")
  .action(findAll);

program
  .command("insert <collection>")
  .description("Insert sample data into a collection (NOT IMPLEMENTED YET)")
  .action(insertSample);

program
  .command("delete <collection> <id>")
  .description("Delete a document by ID")
  .action(deleteById);

program
  .command("update <collection> <id> <json>")
  .description("Update a document by ID with new data (NOT IMPLEMENTED YET)")
  .action(updateDocument);

// 🌱 Seed and export/import
program
  .command("seed <collection>")
  .description("Seed a collection with sample data")
  .action(seedCollection);

program
  .command("export <collection>")
  .description("Export a collection to a timestamped JSON file")
  .action(exportCollection);

program
  .command("import <collection> <filename>")
  .description(
    "Import data from a JSON file into a collection (NOT IMPLEMENTED YET)"
  )
  .action(importCollection);

// 🚀 Parse arguments
program.parse(process.argv);
export default program;
