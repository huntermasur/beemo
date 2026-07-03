import path from "node:path";

export const VITE_TEMPLATES = [
  "react-ts",
  "react",
  "react-swc-ts",
  "react-swc",
  "vue-ts",
  "vue",
  "svelte-ts",
  "svelte",
  "solid-ts",
  "solid",
  "preact-ts",
  "preact",
  "lit-ts",
  "lit",
  "qwik-ts",
  "qwik",
  "vanilla-ts",
  "vanilla",
] as const;
export type ViteTemplate = (typeof VITE_TEMPLATES)[number];

export const AGENTS = ["claude", "cursor", "codex", "gemini"] as const;
export type Agent = (typeof AGENTS)[number];

export const MCP_SERVERS = ["codegraph", "playwright", "context7", "github"] as const;
export type McpServer = (typeof MCP_SERVERS)[number];

/** Curated shortlist of the most-installed skills on skills.sh (fallback when live fetch fails). */
export interface SkillChoice {
  /** Argument passed to `npx skills add` */
  installArg: string;
  name: string;
  hint: string;
}

export const CURATED_SKILLS: SkillChoice[] = [
  { installArg: "vercel-labs/skills", name: "find-skills", hint: "lets your agent discover and install more skills" },
  { installArg: "anthropics/skills", name: "anthropics/skills", hint: "Anthropic's official skills (frontend-design & more)" },
  { installArg: "vercel-labs/agent-skills", name: "vercel-react-best-practices", hint: "React/Next.js best practices" },
  { installArg: "vercel-labs/agent-browser", name: "agent-browser", hint: "browser automation for agents" },
  { installArg: "mattpocock/skills", name: "grill-me", hint: "brutally honest code review" },
];

export interface BeemoConfig {
  projectName: string;
  /** Absolute path of the directory the project is created in. */
  targetDir: string;
  template: ViteTemplate;
  agents: Agent[];
  mcpServers: McpServer[];
  /** `npx skills add` arguments to install. */
  skills: string[];
  docker: boolean;
  git: boolean;
  installDeps: boolean;
  /** Accepted all defaults / non-interactive. */
  yes: boolean;
}

/** Raw commander flag values for `beemo new`. */
export interface NewFlags {
  template?: string;
  agents?: string;
  mcp?: string;
  skills?: string;
  docker?: boolean;
  git?: boolean;
  install?: boolean;
  yes?: boolean;
}

export const DEFAULTS = {
  template: "react-ts" as ViteTemplate,
  agents: ["claude"] as Agent[],
  mcpServers: ["codegraph"] as McpServer[],
  skills: [] as string[],
  docker: true,
  git: true,
  installDeps: true,
};

export function validateProjectName(name: string): string | undefined {
  if (!name) return "Project name is required";
  if (!/^[a-z0-9][a-z0-9._-]*$/.test(name)) {
    return "Use lowercase letters, numbers, dots, dashes and underscores (must start with a letter or number)";
  }
  return undefined;
}

function parseList<T extends string>(raw: string | undefined, allowed: readonly T[], label: string): T[] | undefined {
  if (raw === undefined) return undefined;
  if (raw.trim() === "" || raw === "none") return [];
  const items = raw.split(",").map((s) => s.trim()).filter(Boolean);
  for (const item of items) {
    if (!(allowed as readonly string[]).includes(item)) {
      throw new Error(`Unknown ${label} "${item}". Valid options: ${allowed.join(", ")}`);
    }
  }
  return items as T[];
}

/**
 * Merge CLI flags over defaults. Returns a partial config; the wizard fills in
 * anything left undefined (or defaults fill it when --yes).
 */
export function configFromFlags(name: string | undefined, flags: NewFlags): Partial<BeemoConfig> {
  const partial: Partial<BeemoConfig> = {};
  if (name !== undefined) {
    const err = validateProjectName(name);
    if (err) throw new Error(err);
    partial.projectName = name;
  }
  if (flags.template !== undefined) {
    if (!(VITE_TEMPLATES as readonly string[]).includes(flags.template)) {
      throw new Error(`Unknown template "${flags.template}". Valid options: ${VITE_TEMPLATES.join(", ")}`);
    }
    partial.template = flags.template as ViteTemplate;
  }
  partial.agents = parseList(flags.agents, AGENTS, "agent");
  partial.mcpServers = parseList(flags.mcp, MCP_SERVERS, "MCP server");
  if (flags.skills !== undefined) {
    partial.skills = flags.skills === "none" || flags.skills.trim() === ""
      ? []
      : flags.skills.split(",").map((s) => s.trim()).filter(Boolean);
  }
  if (flags.docker !== undefined) partial.docker = flags.docker;
  if (flags.git !== undefined) partial.git = flags.git;
  if (flags.install !== undefined) partial.installDeps = flags.install;
  partial.yes = flags.yes ?? false;
  return partial;
}

/** Fill any gaps in a partial config with defaults (used by --yes mode). */
export function withDefaults(partial: Partial<BeemoConfig>): BeemoConfig {
  if (!partial.projectName) throw new Error("Project name is required in --yes mode (beemo new <name> --yes)");
  return {
    projectName: partial.projectName,
    targetDir: path.resolve(process.cwd(), partial.projectName),
    template: partial.template ?? DEFAULTS.template,
    agents: partial.agents ?? DEFAULTS.agents,
    mcpServers: partial.mcpServers ?? DEFAULTS.mcpServers,
    skills: partial.skills ?? DEFAULTS.skills,
    docker: partial.docker ?? DEFAULTS.docker,
    git: partial.git ?? DEFAULTS.git,
    installDeps: partial.installDeps ?? DEFAULTS.installDeps,
    yes: partial.yes ?? false,
  };
}
