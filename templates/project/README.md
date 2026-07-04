# {{projectName}}

{{stack}} app scaffolded with [BMO](https://github.com/huntermasur/bmo) on {{date}}.

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
- `.agents/` — AI agent hub: [constitution](.agents/CONSTITUTION.md), [workflow](.agents/AI_INSTRUCTIONS.md), [knowledge map](.agents/KNOWLEDGE_MAP.md), [file index](.agents/INDEX.md), and `skills/` for installed skills.sh skills
- `docs/` — documentation: [commands](docs/COMMANDS.md), [architecture](docs/architecture/ARCHITECTURE.md), [domain](docs/domain/DOMAIN_DOCUMENTATION.md), ADRs, and [user files](docs/files/)

## Working with AI agents

This project is AI-ready. Agents should start at [.agents/AI_INSTRUCTIONS.md](.agents/AI_INSTRUCTIONS.md); it enforces a
documentation policy ([docs/domain/DOMAIN_DOCUMENTATION.md](docs/domain/DOMAIN_DOCUMENTATION.md)) so the
docs stay trustworthy as the code evolves.
{{aiExtras}}
