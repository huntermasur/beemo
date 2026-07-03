import * as p from "@clack/prompts";
import path from "node:path";
import fs from "node:fs";
import pc from "picocolors";
import {
  AGENTS,
  CURATED_SKILLS,
  DEFAULTS,
  MCP_SERVERS,
  VITE_TEMPLATES,
  validateProjectName,
  withDefaults,
  type Agent,
  type BeemoConfig,
  type McpServer,
  type ViteTemplate,
} from "./config.js";

const AGENT_LABELS: Record<Agent, string> = {
  claude: "Claude Code",
  cursor: "Cursor",
  codex: "Codex CLI",
  gemini: "Gemini CLI",
};

const MCP_HINTS: Record<McpServer, string> = {
  codegraph: "local code knowledge graph (surgical AI context)",
  playwright: "browser automation — let the agent drive your app",
  context7: "up-to-date library docs for the agent",
  github: "PRs, issues, and repo workflows",
};

function bail(): never {
  p.cancel("BMO powers down... come back and play soon!");
  process.exit(0);
}

function ensure<T>(value: T | symbol): T {
  if (p.isCancel(value)) bail();
  return value as T;
}

/**
 * Interactive wizard. Anything already provided via flags (in `partial`) is
 * skipped; with --yes every gap is filled from DEFAULTS instead of prompting.
 */
export async function runWizard(partial: Partial<BeemoConfig>): Promise<BeemoConfig> {
  if (partial.yes) return withDefaults(partial);

  p.intro(pc.bgGreen(pc.black(" beemo new ")));

  let projectName = partial.projectName;
  if (!projectName) {
    projectName = ensure(
      await p.text({
        message: "What shall we name your new project?",
        placeholder: "my-rad-app",
        validate: (v) => validateProjectName(v ?? ""),
      }),
    );
  }
  const targetDir = path.resolve(process.cwd(), projectName);
  if (fs.existsSync(targetDir)) {
    p.log.error(`Directory ${projectName} already exists here. Beemo does not overwrite friends.`);
    process.exit(1);
  }

  const template =
    partial.template ??
    ensure(
      await p.select<ViteTemplate>({
        message: "Which Vite template?",
        initialValue: DEFAULTS.template,
        options: VITE_TEMPLATES.map((t) => ({ value: t, label: t })),
      }),
    );

  const agents =
    partial.agents ??
    ensure(
      await p.multiselect<Agent>({
        message: "Which AI agents do you use? (AGENTS.md is always generated — this adds agent-specific adapters)",
        initialValues: DEFAULTS.agents,
        required: false,
        options: AGENTS.map((a) => ({ value: a, label: AGENT_LABELS[a] })),
      }),
    );

  const mcpServers =
    partial.mcpServers ??
    ensure(
      await p.multiselect<McpServer>({
        message: "Which MCP servers should the project be wired up with?",
        initialValues: DEFAULTS.mcpServers,
        required: false,
        options: MCP_SERVERS.map((s) => ({ value: s, label: s, hint: MCP_HINTS[s] })),
      }),
    );

  const skills =
    partial.skills ??
    ensure(
      await p.multiselect<string>({
        message: "Any skills from skills.sh? (installed via npx skills add)",
        required: false,
        options: CURATED_SKILLS.map((s) => ({ value: s.installArg, label: s.name, hint: s.hint })),
      }),
    );

  const docker =
    partial.docker ??
    ensure(await p.confirm({ message: "Set up Docker? (Dockerfile + compose)", initialValue: DEFAULTS.docker }));

  const git =
    partial.git ??
    ensure(await p.confirm({ message: "Initialize git with an initial commit?", initialValue: DEFAULTS.git }));

  const installDeps =
    partial.installDeps ??
    ensure(await p.confirm({ message: "Install dependencies (npm install)?", initialValue: DEFAULTS.installDeps }));

  const summary = [
    `${pc.dim("project")}   ${projectName} (${template})`,
    `${pc.dim("agents")}    ${agents.length ? agents.map((a) => AGENT_LABELS[a]).join(", ") : "AGENTS.md only"}`,
    `${pc.dim("mcp")}       ${mcpServers.length ? mcpServers.join(", ") : "none"}`,
    `${pc.dim("skills")}    ${skills.length ? skills.join(", ") : "none"}`,
    `${pc.dim("docker")}    ${docker ? "yes" : "no"}   ${pc.dim("git")} ${git ? "yes" : "no"}   ${pc.dim("install")} ${installDeps ? "yes" : "no"}`,
  ].join("\n");
  p.note(summary, "Here is the plan!");

  const go = ensure(await p.confirm({ message: "Shall we play?", initialValue: true }));
  if (!go) bail();

  return {
    projectName,
    targetDir,
    template,
    agents,
    mcpServers,
    skills,
    docker,
    git,
    installDeps,
    yes: false,
  };
}
