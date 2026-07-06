# Phase 1 — Plan

You are the planning agent for the feature workspace at `{{featurePath}}/`. Your
job is to produce a plan good enough that a less capable model can implement it
without guessing — and to recommend, per prompt, which model should run it.

## Model guide

You size every downstream prompt to its complexity and record the pick on its
`**Model:**` line in [../PROMPTS.md](../PROMPTS.md). Choose from this menu:

{{modelMenu}}

## Steps

1. Read the feature description in [../PLAN.md](../PLAN.md).
2. Orient yourself in the codebase. If the project has a `.agents/` hub
   (AI_INSTRUCTIONS.md, KNOWLEDGE_MAP.md), read it first; otherwise
   explore the code directly.
3. Investigate the code the feature touches: existing utilities, patterns, and
   conventions the implementation should reuse.
4. Fill in every section of [../PLAN.md](../PLAN.md): Context, Approach, Files to
   touch, Risks & open questions, Out of scope. Be specific — name files,
   functions, and patterns. If something important is ambiguous, ask the user
   before finalizing the plan.
5. Once the approach is settled, find **and install** the skills this feature
   needs. For each capability the feature needs (a framework, a tricky
   integration, a well-known pattern), run `neptr skill "<keywords>" --search-only`
   from the project root to see the audit-passing candidates on
   [skills.sh](https://skills.sh) (this installs nothing). Then download the ones
   worth using by running `neptr skill "<keywords>" --yes` — it re-checks the
   security audit and installs only passing skills into `.agents/skills/`. For
   every skill you install, add a row to the **Recommended skills** section of
   [../PLAN.md](../PLAN.md) with the concrete tasks it should be used for — a skill
   nobody is told when to use is a skill nobody uses — and a row to the **Installed
   for this feature** section of [../NOTES.md](../NOTES.md) so the review phase can
   remove it when the feature is done (record only skills that were newly
   downloaded — skip any already present in `.agents/skills/`). If nothing fits,
   write "None needed."
6. Find **and install** the MCP servers the feature needs the same way. For each
   external system the feature talks to (a database, a browser, GitHub, a SaaS API,
   the filesystem…), run `neptr mcp "<keywords>" --search-only` from the project
   root to see each candidate with its safety checklist (verified vendor, repo
   activity, access surface, local/Docker runnability, version pinning; installs
   nothing). Then add the ones worth using with `neptr mcp "<keywords>" --yes` — it
   re-runs the safety check and adds only servers marked `safe` (version-pinned) to
   both `.mcp.json` (for Claude) and `.cursor/mcp.json` (for Cursor). Prefer servers
   marked `safe`. Any server that declares credentials/environment variables needs
   them filled in by hand — note that in PLAN.md. For every server you add, record a
   row in the **Recommended MCP servers** section of [../PLAN.md](../PLAN.md) with
   the concrete tasks it should be used for, and a row in the **Installed for this
   feature** section of [../NOTES.md](../NOTES.md) so the review phase can remove it.
   If nothing fits, write "None needed."
7. Rewrite [../TASKS.md](../TASKS.md) as an ordered checklist. Each task must be
   small, concrete, and independently verifiable, with enough detail that the
   implementer never has to re-derive the approach. The recommended skills and MCP
   servers are already installed, so do NOT add tasks to install them — instead tag
   every task a recommended skill or MCP server applies to by ending its line with
   `(skill: <name>)` or `(MCP: <server>)`; the implementer treats those tags as
   instructions, not suggestions.
8. Decide whether the feature needs **milestones**. Split when any of these
   holds: TASKS.md has more than ~12 tasks; the tasks span 3+ unrelated areas of
   the codebase; or an implementer would need more files in context than fits
   one session (roughly 15+ files to read or change). If it fits one session,
   do NOT split — leave TASKS.md flat and leave the block between the
   `<!-- neptr:implement-prompts:start/end -->` markers in
   [../PROMPTS.md](../PROMPTS.md) as one prompt (you still set its `**Model:**`
   line in step 9). If splitting:
   - Regroup TASKS.md under `## Milestone 1 — <name>`, `## Milestone 2 — <name>`,
     … headings, in dependency order. Aim for 2–5 milestones, each sized to one
     agent session. Every milestone must leave the project green (typecheck/
     build/tests pass) and be independently verifiable — never split mid-task.
   - In [../PROMPTS.md](../PROMPTS.md), replace everything **between**
     `<!-- neptr:implement-prompts:start -->` and
     `<!-- neptr:implement-prompts:end -->` (keep the marker lines) with one
     block per milestone. Each block is a `### Milestone N — <name>` heading,
     then a `**Model:** <pick from the Model guide> — <≤6-word reason>` line
     (sized per step 9), then this exact prompt:
     `Read {{featurePath}}/phases/implement.md and follow it exactly, scoped to Milestone N (<name>) only: implement that milestone's tasks per {{featurePath}}/PLAN.md, checking off TASKS.md and updating NOTES.md and STATUS.md as you go. Do not start other milestones.`
   - Do not add per-milestone review prompts — there is one plan phase and one
     final review phase.
9. **Recommend a model for every prompt.** Using the Model guide above, set the
   `**Model:**` line on each prompt in [../PROMPTS.md](../PROMPTS.md) to the model
   that fits its complexity, with a short reason (≤6 words):
   - Implement: one line per milestone (set in step 8), or the single implement
     prompt's line if you did not split — a mechanical milestone can drop to Low,
     an intricate one rise to High.
   - Review: usually High, but lower it if the change is small and self-contained.
   - Leave the Plan line as is — that prompt has already run.
   Give the Claude Code model name; the reader maps it to their editor via the guide.

## Rules

- Do NOT write or change any implementation code in this phase. Installing skills
  and MCP servers (steps 5–6) is allowed — that is tooling setup, not code.
- Write for an implementer with less context than you: spell out paths, names,
  and edge cases.

## When done

1. In [../STATUS.md](../STATUS.md), set the status line to `Status: planned` and
   append a log row.
2. Stop. Tell the user the plan is ready for their review, and that the next
   step is the implement phase (`{{featurePath}}/phases/implement.md`). If you
   created milestones, say how many and that each implement prompt in
   `{{featurePath}}/PROMPTS.md` runs in a fresh agent session, in order.
