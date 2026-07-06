# Feature workspaces

Each subfolder in `.docs/feature/` is one feature moving through
**plan → implement → review**, created by `neptr feature`.

| File | Purpose |
| --- | --- |
| `PLAN.md` | The plan: description, context, approach, files to touch |
| `TASKS.md` | Ordered checklist the implementer works through |
| `PROMPTS.md` | Copy-paste prompts per phase; the plan phase may replace the implement prompt with per-milestone prompts |
| `STATUS.md` | Current phase — check its `Status:` line |
| `NOTES.md` | Implementer → reviewer notes: decisions, gotchas |
| `phases/` | Instructions for the agent running each phase |

Statuses: `created → planned → implementing → implemented → done` —
`implementing` may span several milestone sessions.

**Agents:** if your task relates to a feature folder here, read its `STATUS.md`
and `PLAN.md` first, and follow the matching `phases/` instructions.
