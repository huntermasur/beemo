# Beemo 🎮

> "Who wants to play video games?"

Beemo is a BMO-themed CLI for starting new projects the right way. It scaffolds a
[Vite](https://vitejs.dev) app, then layers on a complete AI-ready setup so every
project begins with the same file structure and the same default behavior for AI
coding agents.

## What it sets up

- **Vite app** — any official framework/variant via `npm create vite`
- **AGENTS.md** — agent-agnostic instruction hub (plus `CLAUDE.md` pointer and
  optional per-agent adapters)
- **AI constitution** (`ai/CONSTITUTION.md`), **domain rules**, and **AI workflow
  instructions**
- **Docs tree** — knowledge map, architecture doc, documentation guide with
  granularity levels, ADRs
- **MCP config** (`.mcp.json`) — codegraph, playwright, context7, github (your pick)
- **Skills** — checklist of top [skills.sh](https://skills.sh) skills
- **codegraph** — [colbymchenry/codegraph](https://github.com/colbymchenry/codegraph)
  index for surgical AI context
- **Docker** — multi-stage Dockerfile + compose for dev and prod
- **Git** — init, .gitignore, initial commit, dependencies installed

## Usage

```bash
npm install
npm run build
npm link        # makes `beemo` available globally

beemo new my-app          # interactive BMO wizard
beemo new my-app --yes    # accept all defaults
beemo doctor              # check your environment
```

## Development

See [CLAUDE.md](CLAUDE.md) for architecture and conventions, and
[TASKS.md](TASKS.md) for the milestone checklist.
