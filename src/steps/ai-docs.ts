import path from "node:path";
import { renderDir, renderFile, type TemplateVars } from "../template.js";
import type { BeemoConfig, ViteTemplate } from "../config.js";

const STACK_NAMES: Record<string, string> = {
  react: "React",
  "react-swc": "React (SWC)",
  vue: "Vue",
  svelte: "Svelte",
  solid: "Solid",
  preact: "Preact",
  lit: "Lit",
  qwik: "Qwik",
  vanilla: "Vanilla",
};

export function stackLabel(template: ViteTemplate): string {
  const isTs = template.endsWith("-ts");
  const base = isTs ? template.slice(0, -3) : template;
  const name = STACK_NAMES[base] ?? base;
  return `${name} + ${isTs ? "TypeScript" : "JavaScript"} + Vite`;
}

export function templateVars(config: BeemoConfig): TemplateVars {
  const date = new Date().toISOString().slice(0, 10);

  const toolingLines: string[] = [];
  if (config.mcpServers.length) {
    toolingLines.push(`- **MCP servers** (configured in \`.mcp.json\`): ${config.mcpServers.join(", ")}.`);
  }
  if (config.mcpServers.includes("codegraph")) {
    toolingLines.push(
      "- **codegraph**: a local knowledge-graph index of this codebase (`.codegraph/`, gitignored). " +
        "Prefer querying it over manual file exploration; it auto-syncs on file changes.",
    );
  }
  if (config.skills.length) {
    toolingLines.push(`- **Skills** installed from skills.sh: ${config.skills.join(", ")}.`);
  }
  if (!toolingLines.length) {
    toolingLines.push("- No MCP servers or skills configured yet.");
  }

  return {
    projectName: config.projectName,
    template: config.template,
    stack: stackLabel(config.template),
    date,
    extraCommands: config.docker ? "docker compose up dev   # dev server in Docker\n" : "",
    toolingNotes: toolingLines.join("\n"),
    codegraphOrientation: config.mcpServers.includes("codegraph")
      ? "For code questions (where is X defined, what calls Y), query the codegraph MCP server before manual exploration."
      : "",
    extraFolderRows: config.docker ? "| `Dockerfile`, `docker-compose.yml` | Container setup for dev and prod |" : "",
    stackExtras: config.docker
      ? "- **Containers:** multi-stage Dockerfile (dev server + nginx prod) with docker-compose"
      : "",
    dockerCommands: config.docker
      ? "\n# with Docker\ndocker compose up dev          # dev server with HMR\ndocker compose up prod         # production build behind nginx\n"
      : "",
    aiExtras: config.mcpServers.length
      ? `\nConfigured MCP servers: ${config.mcpServers.join(", ")} (see [.mcp.json](.mcp.json)).`
      : "",
  };
}

/** Generate AGENTS.md, agent adapters, ai/, docs/, and the project README. */
export async function aiDocsStep(config: BeemoConfig): Promise<void> {
  const vars = templateVars(config);
  const dest = config.targetDir;

  renderFile("agents/AGENTS.md", path.join(dest, "AGENTS.md"), vars);
  if (config.agents.includes("claude")) {
    renderFile("agents/CLAUDE.md", path.join(dest, "CLAUDE.md"), vars);
  }
  if (config.agents.includes("gemini")) {
    renderFile("agents/GEMINI.md", path.join(dest, "GEMINI.md"), vars);
  }
  if (config.agents.includes("cursor")) {
    renderFile("agents/cursor-rules.mdc", path.join(dest, ".cursor", "rules", "project.mdc"), vars);
  }
  // Codex CLI reads AGENTS.md natively — no adapter needed.

  renderDir("ai", path.join(dest, "ai"), vars);
  renderDir("docs", path.join(dest, "docs"), vars);
  renderFile("project/README.md", path.join(dest, "README.md"), vars);
}
