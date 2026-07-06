import path from "node:path";
import fs from "node:fs";
import { renderDir } from "../template.js";
import type { NEPTRConfig } from "../config.js";

/**
 * The canonical role-based sections created under `src/`. Each ships a README that
 * documents its purpose and doubles as a git-tracked placeholder so the empty folder
 * survives the initial commit. Tests live in a `tests/` folder at the project root
 * (see `templates/tests/`), following the common JS/TS convention, not under `src/`.
 */
export const SRC_SECTIONS = [
  "app",
  "modules",
  "services",
  "data",
  "integrations",
  "shared",
  "config",
] as const;

/**
 * Lay the canonical section folders into the Vite-scaffolded `src/`, plus a root-level
 * `tests/` folder. Additive: it leaves the template's own files (main, App, styles) in
 * place and only adds the sections that don't already exist.
 */
export async function srcLayoutStep(config: NEPTRConfig): Promise<void> {
  const srcDir = path.join(config.targetDir, "src");
  fs.mkdirSync(srcDir, { recursive: true });
  renderDir("src-layout", srcDir, {});
  renderDir("tests", path.join(config.targetDir, "tests"), {});
}
