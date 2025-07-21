# 🛠️ shipping-db-tool

A modular, developer-friendly CLI utility for MongoDB — built to help you inspect, manage, and seed collections easily from the command line.

> ✨ Designed for clarity, scalability, and contributions.

---

<p align="center">
  <img alt="GitHub Repo stars" src="https://img.shields.io/github/stars/omaraldawud/mongo-db-tools?style=social">
  <img alt="Forks" src="https://img.shields.io/github/forks/omaraldawud/mongo-db-tools?style=social">
  <img alt="Watchers" src="https://img.shields.io/github/watchers/omaraldawud/mongo-db-tools?style=social">
</p>

<p align="center">
  <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/omaraldawud/mongo-db-tools">
  <img alt="GitHub issues" src="https://img.shields.io/github/issues/omaraldawud/mongo-db-tools">
  <img alt="GitHub pull requests" src="https://img.shields.io/github/issues-pr/omaraldawud/mongo-db-tools">
  <img alt="License" src="https://img.shields.io/github/license/omaraldawud/mongo-db-tools">
</p>

<p align="center">
  <img alt="Node.js version" src="https://img.shields.io/badge/node-%3E%3D18.0.0-green">
  <img alt="PRs Welcome" src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg">
</p>

---

## 📦 Features

- 🔍 List and inspect MongoDB collections
- 📊 Show collection stats (document count, indexes)
- 🧹 Clear collection contents
- 🔎 Find documents with optional filters
- 📤 Export collections to JSON
- 📥 Import data (coming soon)
- 🌱 Seed sample data for development
- 🔐 Secure MongoDB connection via `.env`

---

## 🧱 Project Structure

mongo-cli-tool/
├── cli/ # Entry point CLI definition
│ └── commander.js
├── commands/ # Separated commands by concern (clean SoC)
│ ├── collections.js
│ ├── documents.js
│ ├── exportImport.js
│ ├── seed.js
│ └── index.js
├── db/
│ └── connect-to-mongodb.js
├── sampleData/ # JSON/data generators for seeding
│ └── index.js
├── exportedData/ # Where exported JSON files are saved
└── .env # Your MongoDB URI (not committed)

---

## ⚙️ Setup

### 1. Clone the repo

```bash
git clone https://github.com/omaraldawud/shipping-db-tool.git
cd shipping-db-tool

npm install

Configure MongoDB connection
    Create a .env file in the project root:
    MONGO_URI=mongodb+srv://<username>:<password>@<cluster-url>/test

🚀 Usage
You can run the CLI using:
    🧠 Developer Notes
All command logic lives in /commands/ for clean separation of concerns.

MongoDB connection is abstracted in /db/connect-to-mongodb.js.

Seed logic and sample data are modular via /sampleData/index.js.

🤝 Contributing
We welcome PRs! To contribute:

Fork the repo

Create a feature branch: git checkout -b feature/my-command

Follow the existing command structure (e.g., commands/myFeature.js)

Write clean code and submit a PR with clear description

📝 License
MIT — feel free to use and adapt.

📬 Contact
Created by omaraldawud.
For issues, suggestions, or PRs — open a ticket or pull request.

```
