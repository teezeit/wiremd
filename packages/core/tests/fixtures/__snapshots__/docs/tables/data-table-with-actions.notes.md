# Action buttons render correctly; badges in cells don't

This fixture exercises both action buttons (working) and badges in
cells (not working). The badge issue is the same as
`tables/with-badges` and `badges/in-a-table` — see those fixtures for
the executable contract via `.expected-fail.invariants.ts`.

**Type:** parser bug (badge syntax in table cells).
**Action:** fix once for the badge-in-cell case; this fixture's
snapshot will update.
