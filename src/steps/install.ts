import type { NEPTRConfig } from "../config.js";
import { run } from "../run.js";

export async function installStep(config: NEPTRConfig): Promise<void> {
  await run("npm", ["install", "--no-fund", "--no-audit"], {
    cwd: config.targetDir,
    stdio: "pipe",
    timeout: 420_000,
  });
}
