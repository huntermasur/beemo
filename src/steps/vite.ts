import fs from "node:fs";
import path from "node:path";
import type { NEPTRConfig } from "../config.js";
import { run } from "../run.js";

/** Scaffold the base app with the official Vite scaffolder. */
export async function viteStep(config: NEPTRConfig): Promise<void> {
  const parent = path.dirname(config.targetDir);
  await run("npm", ["--yes", "create", "vite@latest", config.projectName, "--", "--template", config.template], {
    cwd: parent,
    stdio: "pipe",
    timeout: 180_000,
  });
  if (!fs.existsSync(path.join(config.targetDir, "package.json"))) {
    throw new Error("Vite scaffolder finished but no package.json was created");
  }
}
