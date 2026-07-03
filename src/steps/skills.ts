import { run } from "../run.js";
import type { Agent, BeemoConfig } from "../config.js";

/** Beemo agent ids → skills-CLI agent ids. */
const SKILLS_AGENT_IDS: Record<Agent, string> = {
  claude: "claude-code",
  cursor: "cursor",
  codex: "codex",
  gemini: "gemini",
};

/**
 * Install each selected skills.sh skill via `npx skills add`. Failures are
 * collected per skill so one bad repo doesn't block the rest.
 */
export async function skillsStep(config: BeemoConfig): Promise<string | void> {
  if (!config.skills.length) return "no skills selected";

  const agentArgs = config.agents.length
    ? ["--agent", ...config.agents.map((a) => SKILLS_AGENT_IDS[a])]
    : ["--all"];

  const failed: string[] = [];
  for (const skill of config.skills) {
    try {
      await run("npx", ["-y", "skills", "add", skill, "--yes", "--skill", "*", ...agentArgs], {
        cwd: config.targetDir,
        stdio: "pipe",
        timeout: 180_000,
      });
    } catch {
      failed.push(skill);
    }
  }
  if (failed.length === config.skills.length) {
    throw new Error(`every skill failed to install (${failed.join(", ")})`);
  }
  if (failed.length) {
    return `installed ${config.skills.length - failed.length}/${config.skills.length}; failed: ${failed.join(", ")} (retry: npx skills add <repo>)`;
  }
  return `installed ${config.skills.length} skill(s)`;
}
