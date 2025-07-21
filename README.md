# mongo-db-tools
🧰 A simple, extensible Node.js CLI tool for MongoDB database management. Perform operations like listing collections, viewing documents, seeding test data, clearing collections, and viewing collection stats — all from the command line.


# 🧰 Mongo CLI Tool

A simple Node.js CLI tool to manage MongoDB collections with commands like:

- `list` – List all collections
- `view <collection>` – View all documents in a collection
- `seed <collection>` – Seed test data into a collection
- `clear <collection>` – Delete all documents from a collection
- `stats <collection>` – Show stats for a collection
- `help` – Show all available commands

## 🔧 Usage

```bash
node shipping-db-tool.js list
node shipping-db-tool.js view customers
node shipping-db-tool.js seed users
node shipping-db-tool.js clear users
node shipping-db-tool.js stats customers

