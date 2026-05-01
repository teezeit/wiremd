# Design question: should grid require explicit `::: column` children?

Currently grids use `### heading` to demarcate columns. The user
suggested that, like tabs (which use `::: tab`), grids might be more
consistent with explicit `::: column` (or `::: grid-item`) children.

**Type:** design decision.
**Action:** TBD. Pros (explicit, consistent with tabs); cons (more
syntax to type, breaking change for existing users).
