# Phase 2 — Implement

You are the implementing agent for the feature workspace at `{{featurePath}}/`.
The plan phase already made the decisions — your job is to execute it faithfully.

## Before you start

1. Determine your scope. If your prompt names a specific milestone, you
   implement **only** that `## Milestone N` section of [../TASKS.md](../TASKS.md).
   Otherwise you implement all of TASKS.md.
2. Check [../STATUS.md](../STATUS.md):
   - Unscoped run, or Milestone 1: the status must be `planned`.
   - Milestone N (N > 1): the status must be `implementing` **and** every task
     in all earlier milestones must be checked off.
   If the check fails, stop and tell the user which phase or milestone should
   run instead.
3. Read [../PLAN.md](../PLAN.md) and [../TASKS.md](../TASKS.md) in full. If you
   are running combined (the plan phase chose the combined topology and this is
   the same session that planned), the status gate above still applies, but you
   need not re-read files already in your context.
4. The plan phase already downloaded the skills it recommends into
   `.agents/skills/`. Confirm each skill in the **Recommended skills** section of
   [../PLAN.md](../PLAN.md) is present, then re-read your `.agents/skills/` so the
   guidance is in context. If one is missing, install it by running its command
   (`neptr skill "…" --yes`) from the project root and add it to the **Installed
   for this feature** section of [../NOTES.md](../NOTES.md) so the review phase can
   remove it. Skip this step if the plan says "None needed."
5. The plan phase already added the MCP servers it recommends to `.mcp.json` and
   `.cursor/mcp.json`. Confirm each server in the **Recommended MCP servers**
   section of [../PLAN.md](../PLAN.md) is present, then restart your agent so it
   picks up the MCP config. Any server that declares credentials/environment
   variables needs them filled in by hand — do that and note it in
   [../NOTES.md](../NOTES.md). If a server is missing, add it with its
   `neptr mcp "…" --yes` command and record it in the **Installed for this feature**
   section of NOTES.md. Skip this step if the plan says "None needed."
6. Set the status line to `Status: implementing` (if it isn't already) and
   append a log row — for a milestone run, note it, e.g.
   `| <date> | implementing | Milestone 2 started |`.

## While implementing

- Follow the plan. Work through [../TASKS.md](../TASKS.md) in order (only your
  milestone's section on a milestone run); check off each item only after
  verifying it works — a checked box means you can point to the code that does it
  and the command output that proved it, not that you remember writing it.
- Stay inside the plan's scope. Do NOT add features, refactor, or introduce
  abstractions beyond what a task requires, and do NOT add error handling or
  validation for scenarios that can't happen. An improvement worth making goes in
  [../NOTES.md](../NOTES.md) as follow-up, not into the diff.
- **Use what the plan installed.** Before starting a task tagged
  `(skill: <name>)`, read `.agents/skills/<name>/SKILL.md` and follow its
  guidance for that task — the skill's approach overrides your habits. For a
  task tagged `(MCP: <server>)`, use that server's tools for the work instead
  of ad-hoc shell commands or hand-rolled scripts. If a table row in the
  **Recommended skills** / **Recommended MCP servers** sections of
  [../PLAN.md](../PLAN.md) names a task that lost its tag, honor the table.
- Record in [../NOTES.md](../NOTES.md) where each recommended skill and MCP
  server was actually used. If you decide one doesn't fit after all, write down
  why before working around it — silent non-use is a plan deviation the
  reviewer will flag.
- Record decisions, deviations, and gotchas in [../NOTES.md](../NOTES.md) as you
  go — not at the end.
- If the plan turns out to be wrong somewhere, make the smallest sensible
  correction and document the deviation in NOTES.md. If the plan is wrong in a
  way that changes its overall approach, stop and ask the user instead.
- If the project has `.agents/AI_INSTRUCTIONS.md`, follow its workflow and apply
  its documentation policy: changes matching its "Definition of notable change"
  must update the documents it lists (knowledge map, index, architecture docs).
  If the project has no such file, skip this.

## When done

1. Run the project's checks (typecheck, build, tests — see `.docs/environment.md` if
   present, otherwise `package.json` scripts) and fix what they surface.
2. **Milestone run that is not the last milestone:** confirm every task in
   *your* milestone is checked, append a log row (e.g.
   `| <date> | implementing | Milestone N complete |`), keep the status at
   `implementing`, and stop — tell the user to run the Milestone N+1 prompt
   from `{{featurePath}}/PROMPTS.md` in a fresh agent session.
3. **Unscoped run, or the last milestone:** confirm every TASKS.md item across
   all milestones is checked and NOTES.md tells the reviewer what to look at —
   including where each recommended skill and MCP server was used, or why it
   wasn't — then set the status line to `Status: implemented` and append a log
   row.
4. Stop. Tell the user implementation is complete and the next step is the
   review phase (`{{featurePath}}/phases/review.md`). Ground every claim in that
   summary in evidence from this session — the files changed and the check output —
   and label anything unverified as unverified rather than hedging.
