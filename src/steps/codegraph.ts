import { commandExists, run } from "../run.js";
import type { NEPTRConfig } from "../config.js";

/**
 * Build the project's codegraph index. Installs the codegraph CLI globally
 * first if it's missing (selecting the codegraph MCP server in the wizard is
 * the consent for that). Project-level MCP wiring is handled by .mcp.json,
 * so `codegraph install` is not needed here.
 */
export async function codegraphStep(config: NEPTRConfig): Promise<string | void> {
  let installedNow = false;
  if (!(await commandExists("codegraph"))) {
    await run("npm", ["install", "-g", "@colbymchenry/codegraph"], {
      stdio: "pipe",
      timeout: 300_000,
    });
    installedNow = true;
  }
  await run("codegraph", ["init"], {
    cwd: config.targetDir,
    stdio: "pipe",
    timeout: 300_000,
  });
  return installedNow ? "installed codegraph globally and built the index" : "index built";
}
