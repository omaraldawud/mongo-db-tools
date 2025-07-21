#!/usr/bin/env node

import cliProgram from "./cli/commander.js";
import { closeDB } from "./db/connect-to-shipping-app.js";

async function main() {
  try {
    await cliProgram.parseAsync(process.argv);
  } catch (err) {
    console.error("Unhandled error:", err);
  } finally {
    await closeDB(); // Close DB connection once all commands finish
  }
}

main();
