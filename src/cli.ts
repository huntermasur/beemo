import { Command } from "commander";
import * as p from "@clack/prompts";
import pc from "picocolors";
import { BMO_BANNER, bmo, randomQuote } from "./theme.js";
import { configFromFlags, type BeemoConfig, type NewFlags } from "./config.js";
import { runWizard } from "./wizard.js";
import type { StepResult } from "./run.js";
import { viteStep } from "./steps/vite.js";
import { aiDocsStep } from "./steps/ai-docs.js";
import { installStep } from "./steps/install.js";
import { gitStep } from "./steps/git.js";

interface Step {
  name: string;
  enabled: (c: BeemoConfig) => boolean;
  run: (c: BeemoConfig) => Promise<string | void>;
  /** Manual command shown in the summary if this step fails. */
  fix: (c: BeemoConfig) => string;
  /** When true, a failure aborts the scaffold (nothing to layer onto). */
  critical?: boolean;
}

const STEPS: Step[] = [
  {
    name: "Scaffold Vite app",
    enabled: () => true,
    run: viteStep,
    fix: (c) => `npm create vite@latest ${c.projectName} -- --template ${c.template}`,
    critical: true,
  },
  {
    name: "Generate AI & docs layer",
    enabled: () => true,
    run: aiDocsStep,
    fix: () => "re-run: beemo add docs (or copy templates from the beemo repo)",
  },
  {
    name: "Install dependencies",
    enabled: (c) => c.installDeps,
    run: installStep,
    fix: () => "npm install",
  },
  {
    name: "Initialize git",
    enabled: (c) => c.git,
    run: gitStep,
    fix: () => "git init -b main && git add -A && git commit -m 'Initial commit'",
  },
];

async function scaffold(config: BeemoConfig): Promise<void> {
  const results: StepResult[] = [];
  const spinner = p.spinner();

  for (const step of STEPS) {
    if (!step.enabled(config)) {
      results.push({ name: step.name, status: "skipped" });
      continue;
    }
    spinner.start(step.name);
    try {
      const note = await step.run(config);
      results.push({ name: step.name, status: "ok", note: note ?? undefined });
      spinner.stop(`${pc.green("✔")} ${step.name}`);
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      results.push({ name: step.name, status: "failed", note: message, fix: step.fix(config) });
      spinner.stop(`${pc.red("✘")} ${step.name}`);
      if (step.critical) {
        bmo.error(`I could not even start: ${message}`);
        process.exit(1);
      }
      bmo.warn(`${step.name} did not work, but I kept going. You can do it by hand later.`);
    }
  }

  const failed = results.filter((r) => r.status === "failed");
  const lines = results
    .filter((r) => r.status !== "skipped")
    .map((r) => `${r.status === "ok" ? pc.green("✔") : pc.red("✘")} ${r.name}${r.status === "failed" && r.fix ? pc.dim(`  → fix: cd ${config.projectName} && ${r.fix}`) : ""}`);
  p.note(lines.join("\n"), failed.length ? "Done, with some boo-boos" : "All done!");

  if (failed.length === 0) {
    bmo.success(`${config.projectName} is ready! ${randomQuote()}`);
  } else {
    bmo.warn(`${config.projectName} is mostly ready — ${failed.length} step(s) need your help (see above).`);
  }
  console.log(
    `\n  ${pc.bold("Next steps:")}\n` +
      `    cd ${config.projectName}\n` +
      (config.installDeps ? "" : "    npm install\n") +
      `    npm run dev\n`,
  );
}

const program = new Command();

program
  .name("beemo")
  .description("BMO-themed project scaffolding — Vite apps with an AI-ready setup baked in")
  .version("0.1.0");

program
  .command("new")
  .argument("[name]", "project name")
  .description("Scaffold a new project")
  .option("-t, --template <template>", "Vite template (e.g. react-ts, vue-ts, svelte-ts)")
  .option("--agents <list>", "comma-separated agents: claude,cursor,codex,gemini (or 'none')")
  .option("--mcp <list>", "comma-separated MCP servers: codegraph,playwright,context7,github (or 'none')")
  .option("--skills <list>", "comma-separated skills.sh repos to install (or 'none')")
  .option("--docker", "generate Docker setup")
  .option("--no-docker", "skip Docker setup")
  .option("--no-git", "skip git init")
  .option("--no-install", "skip npm install")
  .option("-y, --yes", "accept all defaults, no prompts")
  .action(async (name: string | undefined, flags: NewFlags) => {
    console.log(BMO_BANNER);
    bmo.say(randomQuote());
    try {
      const partial = configFromFlags(name, flags);
      const config = await runWizard(partial);
      await scaffold(config);
    } catch (err) {
      bmo.error(err instanceof Error ? err.message : String(err));
      process.exit(1);
    }
  });

program
  .command("doctor")
  .description("Check that your environment has everything Beemo needs")
  .action(async () => {
    console.log(BMO_BANNER);
    bmo.warn("The 'doctor' command is still being built. I will be a magic doctor soon!");
  });

program.parseAsync();
