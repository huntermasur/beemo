import { run } from "../run.js";
import type { BMOConfig } from "../config.js";

export async function installStep(config: BMOConfig): Promise<void> {
  await run("npm", ["install", "--no-fund", "--no-audit"], {
    cwd: config.targetDir,
    stdio: "pipe",
    timeout: 420_000,
  });
}
