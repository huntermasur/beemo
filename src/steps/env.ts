import fs from "node:fs";
import path from "node:path";
import { renderFile } from "../template.js";
import { templateVars } from "./ai-docs.js";
import type { NEPTRConfig } from "../config.js";

/**
 * Generates the environment files: a committed `.env.example` template and a local
 * `.env` (gitignored) seeded from it. Runs before git so `.gitignore` can exclude
 * `.env` while keeping `.env.example` tracked.
 */
export async function envStep(config: NEPTRConfig): Promise<void> {
  const vars = templateVars(config);
  const examplePath = path.join(config.targetDir, ".env.example");
  const envPath = path.join(config.targetDir, ".env");

  renderFile("project/.env.example", examplePath, vars);

  // Seed a local .env from the example, but never clobber one Vite already created.
  if (!fs.existsSync(envPath)) {
    fs.copyFileSync(examplePath, envPath);
  }
}
