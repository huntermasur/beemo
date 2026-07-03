# AI Working Instructions

Workflow rules for agents in {{projectName}}. The constitution
([CONSTITUTION.md](CONSTITUTION.md)) always wins over anything here.

## Before you start any task
1. Read [../docs/KNOWLEDGE_MAP.md](../docs/KNOWLEDGE_MAP.md) to orient yourself.
   {{codegraphOrientation}}
2. Check [DOMAIN_RULES.md](DOMAIN_RULES.md) for rules that apply to the area you're touching.
3. Look for existing utilities/patterns before writing new ones.

## While working
- Keep changes small and incremental; verify each increment (typecheck, build, run).
- Match existing code style. Comments explain *why*, not *what*.
- New files go where [../docs/ARCHITECTURE.md](../docs/ARCHITECTURE.md) says they belong.
- If you make an architectural decision (new dependency, new pattern, new boundary),
  record it as an ADR in `docs/adr/` (copy the format of the existing ADRs).

## Before you finish
1. Run the build (`npm run build`) and fix anything it surfaces.
2. Apply the documentation policy — this is mandatory, not optional:
   - Consult the change-type table in [../docs/DOCUMENTATION_GUIDE.md](../docs/DOCUMENTATION_GUIDE.md).
   - Update every document that table requires for your kind of change.
   - If files/folders were added, moved, or removed: update the folder map and
     mermaid diagram in [../docs/KNOWLEDGE_MAP.md](../docs/KNOWLEDGE_MAP.md).
3. Summarize what you did, what you verified, and which docs you updated.

## Definition of "notable change"
Any of: new feature; changed user-facing behavior; new/moved/deleted file or folder;
new dependency; changed build/dev workflow; new environment variable; architectural
decision; bug fix that reveals a misunderstanding worth documenting.
Typo fixes and pure formatting are not notable.
