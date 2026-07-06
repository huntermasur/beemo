import type { NEPTRConfig } from "../config.js";
import { installIndexing } from "../indexer.js";

/**
 * Generates the initial repo index and wires up its auto-maintenance:
 *   - `.docs/REPO_MAP.md` — a deterministic per-file index of `src/`.
 *   - refreshed Folder map / Key files tables in `.agents/KNOWLEDGE_MAP.md`.
 *   - `.claude/settings.json` SessionStart hook running `neptr index --quiet`.
 *   - `.githooks/pre-commit` that refreshes + stages the index on every commit.
 *
 * Runs late in the pipeline (after MCP/Docker files exist) so the Key files table
 * reflects everything the scaffold produced. `gitStep` activates the pre-commit
 * hook afterwards via `core.hooksPath`.
 */
export async function indexingStep(config: NEPTRConfig): Promise<string> {
  installIndexing(config.targetDir);
  return "REPO_MAP.md + SessionStart & pre-commit hooks";
}
