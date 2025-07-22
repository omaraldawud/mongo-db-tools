# Developer Guide for mongo-db-tools

Welcome to the developer guide! This document helps you understand the project structure, coding conventions, how to run the project locally, testing, and development workflow.

---

## Project Overview

`mongo-db-tools` is a modular CLI utility for managing MongoDB collections. It’s designed with clean separation of concerns (SoC) to facilitate maintainability and scalability.

---

## Project Structure

```
mongo-cli-tool/
├── cli/                    # CLI entry point and command registration (commander.js)
├── commands/               # Business logic split by command (list, stats, find, etc.)
├── db/                     # MongoDB connection abstraction (connect-to-shipping-app.js)
├── sampleData/             # Sample data for seeding/testing
├── exportedData/           # Folder for exported JSON files
├── project-documentation/  # Docs for developers and contributors
└── .env                    # MongoDB URI (not committed, use .env.example)
```

---

## Setup & Installation

1. Clone the repo

```bash
git clone https://github.com/omaraldawud/mongo-db-tools.git
cd mongo-db-tools
```

2. Install dependencies

```bash
npm install
```

3. Create a `.env` file in the root with:

```
MONGO_URI=mongodb+srv://<username>:<password>@cluster-url/test
```

---

## Running the CLI

Run commands using:

```bash
node shipping-db-tool.js <command> [options]
```

Example:

```bash
node shipping-db-tool.js list
node shipping-db-tool.js stats customers
node shipping-db-tool.js find users
```

---

## Testing

- Tests are written with **Vitest** and located in `/tests`.
- Run all tests with:

```bash
npm test
```

- Tests run automatically on CI (GitHub Actions).

---

## Development Workflow

1. **Create a feature branch:**

```bash
git checkout -b feature/my-new-command
```

2. **Write clean, modular code** inside `/commands` or other appropriate folders.

3. **Add/Update tests** to cover your changes in `/tests`.

4. **Run tests locally:**

```bash
npm test
```

5. **Commit with meaningful message:**

```
git commit -m "feat: add new export command"
```

6. **Push and open a Pull Request (PR)** against `main` branch.

7. Ensure CI checks pass before merging.

---

## Coding Conventions

- Use **ES Modules (ESM)** syntax (`import` / `export`).
- Prefer async/await for asynchronous operations.
- Follow existing code style for formatting and naming.
- Keep each command focused on a single responsibility (SoC).

---

## Database Connection

- Centralized MongoDB connection logic lives in `db/connect-to-shipping-app.js`.
- Use exported `connectDB()` and `closeDB()` functions for safe connection handling.

---

## Common Utilities

- Shared utilities or helpers can be added in a `utils/` folder (to be created as needed).
- Avoid duplicating code across commands.

---

## Git Hooks & Code Quality

- Husky manages Git hooks for pre-commit tests.
- Running `npm test` is enforced before commits.
- (Future) ESLint and Prettier integration planned for linting/formatting.

---

## Troubleshooting

- If you encounter DB connection errors, check your `.env` and network access.
- Use verbose logging in commands by modifying CLI code as needed.
- Review GitHub Actions logs for CI issues.

---

## Getting Help

- Open issues or discussions on GitHub for questions or bug reports.
- Submit PRs for bug fixes or new features.

---

Thank you for contributing to `mongo-db-tools`!

---

# Contributing to mongo-db-tools

Thank you for your interest in contributing! This guide explains how to contribute effectively.

---

## Ways to Contribute

- Reporting bugs or suggesting enhancements via GitHub Issues.
- Writing or improving tests.
- Adding new commands or improving existing ones.
- Enhancing documentation.
- Helping with code reviews and discussions.

---

## How to Contribute

### 1. Fork the Repository

Click the “Fork” button on GitHub to create your copy.

### 2. Create a Branch

```bash
git checkout -b feature/my-feature
```

### 3. Make Changes

- Follow the project’s coding conventions.
- Write clear, descriptive commit messages.
- Add tests for your changes.
- Run tests locally with `npm test`.

### 4. Submit a Pull Request

- Push your branch to your fork.
- Open a PR against the main `omaraldawud/mongo-db-tools` repo.
- Provide a clear description and link to related issues.

---

## Commit Message Guidelines

Use conventional commit format, for example:

- `feat:` for new features
- `fix:` for bug fixes
- `docs:` for documentation changes
- `test:` for test-related changes
- `chore:` for maintenance or build process changes

Example:

```
feat: add export command for collections
fix: handle empty filter in find command
test: add tests for stats command
```

---

## Code Reviews

- Respond promptly to review comments.
- Make requested changes on your branch.
- Keep discussions constructive and respectful.

---

## Code Style

- Use ES Modules (`import` / `export`).
- Use async/await.
- Follow existing project formatting.
- Keep functions focused and maintain SoC.

---

## Running Tests

Ensure all tests pass before submitting a PR:

```bash
npm test
```

---

## Additional Notes

- For large features or breaking changes, open an issue first to discuss.
- Maintain backwards compatibility where possible.

---

Thank you for helping improve `mongo-db-tools`!
