# Beemo — Development Task Checklist

Milestone checklist for building the Beemo CLI. Check items off as they land.
Full plan context lives in the project README and CLAUDE.md.

## M0 — Bootstrap
- [x] git repo, package.json, tsconfig, tsup config, .gitignore
- [x] TASKS.md, CLAUDE.md, README.md for the Beemo repo itself
- [x] `src/cli.ts` + `src/theme.ts`: `beemo` prints BMO banner, `beemo --help` works
- [x] Verified: `npm run build && npm link && beemo --help`

## M1 — Core scaffold
- [x] Wizard skeleton (`src/wizard.ts`, `src/config.ts`): project name + Vite template
- [x] `steps/vite.ts` — wraps `npm create vite@latest`
- [x] `steps/install.ts` — npm install in the new project
- [x] `steps/git.ts` — git init, .gitignore augmentation, initial commit
- [x] Verified: `beemo new test-app` produces a running Vite app with git history

## M2 — AI & docs layer
- [ ] `src/template.ts` — {{var}} renderer + directory copier
- [ ] Templates: AGENTS.md, CLAUDE.md, ai/ (CONSTITUTION, DOMAIN_RULES, AI_INSTRUCTIONS)
- [ ] Templates: docs/ (KNOWLEDGE_MAP, ARCHITECTURE, DOCUMENTATION_GUIDE, adr/0001)
- [ ] README regeneration for scaffolded projects
- [ ] Verified: scaffolded project has full docs tree with placeholders resolved

## M3 — MCP + agent adapters
- [ ] `.mcp.json` generation from server checklist (codegraph, playwright, context7, github)
- [ ] `.cursor/rules` adapter when Cursor selected
- [ ] Verified: generated JSON valid, servers resolve in Claude Code

## M4 — Skills
- [ ] Curated bundled list of top skills.sh skills
- [ ] Optional live fetch of leaderboard with fallback to bundled list
- [ ] `npx skills add <owner/repo>` per selection, per-skill success/fail reporting
- [ ] Verified: selected skills installed in scaffolded project

## M5 — codegraph
- [ ] Detect codegraph binary; offer global install if missing
- [ ] Run `codegraph init` in new project; ensure `.codegraph/` gitignored
- [ ] Graceful skip when declined or install fails
- [ ] Verified: `.codegraph/` index exists after scaffold

## M6 — Docker
- [ ] Multi-stage Dockerfile (dev / build / nginx prod), docker-compose.yml, .dockerignore, nginx.conf
- [ ] Optional `docker compose build` at end when daemon detected
- [ ] Verified: dev service serves the app, prod image builds

## M7 — Polish + doctor
- [ ] `beemo doctor` — environment checks (node, git, docker, codegraph, network)
- [ ] `--yes` non-interactive mode + full flag coverage
- [ ] Failure tolerance: step failures warn + continue, end-of-run summary with manual fixes
- [ ] Verified: `beemo new test-app --yes` runs clean end to end

## M8 — Final E2E verification
- [ ] Scaffold real project exercising every option
- [ ] Verify each artifact: dev server, docker, .mcp.json, skills, codegraph, doc cross-links
- [ ] TASKS.md fully checked; Beemo README/CLAUDE.md updated to final state
