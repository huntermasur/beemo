# {{projectName}} — Agent Instructions

This file is the entry point for every AI coding agent working in this repository.
Read it fully before making changes. It was scaffolded by Beemo on {{date}}.

## Stack

{{stack}} (Vite template: `{{template}}`)

## Required reading, in order

1. [ai/CONSTITUTION.md](ai/CONSTITUTION.md) — non-negotiable principles. Never violate these.
2. [ai/AI_INSTRUCTIONS.md](ai/AI_INSTRUCTIONS.md) — how to work in this repo (workflow, docs policy).
3. [ai/DOMAIN_RULES.md](ai/DOMAIN_RULES.md) — rules specific to this project's domain.
4. [docs/KNOWLEDGE_MAP.md](docs/KNOWLEDGE_MAP.md) — map of the codebase and index of all docs.
   Consult this FIRST when orienting yourself; keep it current when structure changes.

## Commands

```bash
npm run dev       # start the Vite dev server
npm run build     # production build
npm run preview   # preview the production build
{{extraCommands}}```

## Documentation policy (mandatory)

Whenever you make a **notable change** — new feature, changed behavior, new/moved/deleted
files, new dependency, architectural decision — you MUST update the documentation in the
same change set. [docs/DOCUMENTATION_GUIDE.md](docs/DOCUMENTATION_GUIDE.md) defines the
granularity levels and contains the change-type → documents table. At minimum:

- Structure changed → update [docs/KNOWLEDGE_MAP.md](docs/KNOWLEDGE_MAP.md)
- Architecture/data-flow changed → update [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) and add an ADR in `docs/adr/`
- User-facing behavior changed → update [README.md](README.md)

A change is not complete until its documentation is updated.

## Tooling available to agents
{{toolingNotes}}
