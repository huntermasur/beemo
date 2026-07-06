# NEPTR 🤖

> "NEPTR, deploy!"

NEPTR is a NEPTR-themed CLI for starting new projects the right way. It scaffolds a
[Vite](https://vitejs.dev) app, then layers on a complete AI-ready setup so every
project begins with the same file structure and the same default behavior for AI
coding agents.

## What it sets up

- **Vite app** — any official framework/variant via `npm create vite`
- **`.agents/` hub** — the **AI constitution** (`CONSTITUTION.md`), **workflow
  instructions** (`AI_INSTRUCTIONS.md`), and a single **knowledge map**
  (`KNOWLEDGE_MAP.md`) — plus a `skills/`
  folder for installed skills.sh skills — with rules that keep the map in sync with the code
- **`.docs/` tree** — `environment.md` (how to run the project), `module-map.md` (where
  each component type lives), an `architecture/` folder (architecture doc, specs, ADRs), a
  `feature/` folder for `neptr feature` workspaces, and a `documents/` folder for user documents
- **MCP config** (`.mcp.json` for Claude + `.cursor/mcp.json` for Cursor, kept in sync) — playwright, context7, github (your pick)
- **Skills** — checklist of top [skills.sh](https://skills.sh) skills
- **Docker** — multi-stage Dockerfile + compose for dev and prod
- **Git** — init, .gitignore, initial commit, dependencies installed

## Usage

```bash
npm install
npm run build
npm link        # makes `neptr` available globally

neptr new my-app          # interactive NEPTR wizard
neptr new my-app --yes    # accept all defaults
neptr doctor              # check your environment
neptr feature             # start a plan → implement → review feature workspace
neptr skill web design    # find & install security-checked skills from skills.sh
neptr mcp postgres        # find & install safety-checked MCP servers from the MCP registry
```

## Installing skills

Inside a project, `neptr skill <search terms>` searches [skills.sh](https://skills.sh),
keeps only skills with a healthy install count (`--min-installs`, default 1000)
whose security audits **all pass**, and lets you pick any number to install into
`.agents/skills/` without leaving your editor. Pass `--include-unverified` to also
see skills with audit warnings or no audits yet (their status is shown inline).

Two non-interactive modes drive the feature workflow: `--search-only` lists the
audit-passing matches and installs nothing (used by the plan phase to discover
skills), and `--yes` installs every shown skill without prompting (used by the
implement phase to add the skills the plan recommended).

## Installing MCP servers

Inside a project, `neptr mcp <search terms>` searches the [official MCP
registry](https://registry.modelcontextprotocol.io) (the upstream that GitHub's
MCP registry mirrors) and runs its own safety check on each server, showing a
transparent checklist: verified vendor (via the registry's DNS-verified
namespace), repo activity and issue backlog (from the GitHub API — set
`GITHUB_TOKEN` to raise the rate limit), broad-access surface, local/Docker
runnability, and version pinning. Each server gets a **safe / caution / avoid**
verdict; by default only `safe` servers are shown. Pass `--include-unverified` to
also see `caution`/`avoid` servers with their checklists.

Pick any number to add to the project's MCP config without leaving your editor.
Servers are written to **both** `.mcp.json` (read by Claude Code and other
AGENTS.md-era tools) and `.cursor/mcp.json` (read by Cursor), kept in sync so
either editor sees the same servers — always **version-pinned** (npm → `npx -y
<pkg>@<version>`, PyPI → `uvx <pkg>@<version>`, OCI → `docker run`). Existing
entries in either file are preserved, and servers that declare credentials are
flagged so you can fill them in by hand.

As with `neptr skill`, `--search-only` lists the safety-checked matches without
installing (for the plan phase) and `--yes` adds every shown safe server without
prompting (for the implement phase). Remote-only servers with no local package
are wired to their hosted endpoint; anything with no launch command is listed so
you can configure it by hand.

## Feature workflow

Inside a project, `neptr feature` breaks a feature into three agent-driven phases
so you can use a smart (expensive) model to plan and review while a cheaper model
does the coding. It asks for a name and description, scaffolds
`.docs/feature/<slug>/` (plan, task list, status, notes, and per-phase agent
instructions), and prints three copy-paste prompts — one per phase. Run each
prompt in a fresh agent session; every phase ends by updating the workspace's
`STATUS.md` and pausing so you stay in control between phases.

## Development

See [CLAUDE.md](CLAUDE.md) for architecture and conventions, and
[TASKS.md](TASKS.md) for the milestone checklist.
