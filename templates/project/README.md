# {{projectName}}

{{stack}} app scaffolded with [Beemo](https://github.com/huntermasur/beemo) on {{date}}.

## Getting started

```bash
npm install
npm run dev       # start the dev server
npm run build     # production build
npm run preview   # preview the production build
{{dockerCommands}}```

## Project layout

- `src/` — application code
- `public/` — static assets
- `ai/` — rules for AI coding agents ([constitution](ai/CONSTITUTION.md), [workflow](ai/AI_INSTRUCTIONS.md), [domain rules](ai/DOMAIN_RULES.md))
- `docs/` — documentation, starting at the [knowledge map](docs/KNOWLEDGE_MAP.md)

## Working with AI agents

This project is AI-ready. Agents should start at [AGENTS.md](AGENTS.md); it enforces a
documentation policy ([docs/DOCUMENTATION_GUIDE.md](docs/DOCUMENTATION_GUIDE.md)) so the
docs stay trustworthy as the code evolves.
{{aiExtras}}
