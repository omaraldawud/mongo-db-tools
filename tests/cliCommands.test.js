import { exec } from "child_process";
import { describe, it, expect } from "vitest";
import path from "path";

const cliPath = path.resolve("shipping-db-tool.js");

function runCLI(args = "") {
  return new Promise((resolve, reject) => {
    exec(`node ${cliPath} ${args}`, (error, stdout, stderr) => {
      if (error) return reject(stderr || stdout);
      resolve(stdout);
    });
  });
}

describe("Mongo CLI Tool commands", () => {
  it("displays help output", async () => {
    const output = await runCLI("--help");
    expect(output).toContain("Usage");
  });

  it("lists collections", async () => {
    const output = await runCLI("list");
    expect(output).toMatch(/customers|users/);
  });

  it("shows database stats", async () => {
    const output = await runCLI("stats customers");
    expect(output).to.match(/Total Documents|Indexes|customers/i);
  });

  it("finds documents", async () => {
    const output = await runCLI("find customers");
    expect(output).toContain("{");
  });
});
