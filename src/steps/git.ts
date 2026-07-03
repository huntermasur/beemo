import path from "node:path";
import fs from "node:fs";
import { run } from "../run.js";
import type { BeemoConfig } from "../config.js";

const EXTRA_IGNORES = `
# Beemo additions
.codegraph/
.env
.env.*
!.env.example
`;

/**
 * Runs last: augments .gitignore, initializes the repo, and commits everything
 * the scaffold produced as the initial commit.
 */
export async function gitStep(config: BeemoConfig): Promise<void> {
  const gitignorePath = path.join(config.targetDir, ".gitignore");
  const existing = fs.existsSync(gitignorePath) ? fs.readFileSync(gitignorePath, "utf8") : "";
  if (!existing.includes(".codegraph/")) {
    fs.writeFileSync(gitignorePath, existing.trimEnd() + "\n" + EXTRA_IGNORES);
  }

  const opts = { cwd: config.targetDir, stdio: "pipe" as const, timeout: 60_000 };
  await run("git", ["init", "-b", "main"], opts);
  await run("git", ["add", "-A"], opts);
  await run("git", ["commit", "-m", "Initial commit from Beemo"], opts);
}
