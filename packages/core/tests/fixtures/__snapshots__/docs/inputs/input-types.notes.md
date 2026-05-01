# Marked failing during sweep but no specific issue surfaced

The user marked this fixture as `❌` during snapshot review, but the
generated HTML/React/Tailwind snapshots all show the 10 input types
rendering with their correct `type="..."` attributes.

**Action:** re-investigate during the next sweep. If a real issue
exists, replace this note with `.expected-fail.invariants.ts`. If the
sweep was a misclick, remove this file.
