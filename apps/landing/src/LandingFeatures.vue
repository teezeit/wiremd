<template>
  <div class="lf">

    <!-- 01 Create -->
    <section class="lf-section">
      <div class="lf-kicker">01 — Create</div>
      <h2 class="lf-headline">Write it, see it instantly.</h2>
      <p class="lf-sub">Describe a screen in plain English — Claude writes and renders the wireframe. Or write wiremd Markdown directly in the browser editor. <span class="lf-coming">Drag-and-drop coming soon.</span></p>
      <div class="lf-shots lf-shots--2">
        <figure class="lf-shot">
          <div class="lf-shot__label">
            <img src="/wiremd/assets/logos/logo-claude.png" class="lf-shot__logo" alt="" />
            <span>In Claude</span>
          </div>
          <img src="/wiremd/assets/guides/guide-screenshot-claude-desktop.png" alt="Wireframe created inside Claude" class="lf-shot__img" />
        </figure>
        <figure class="lf-shot">
          <div class="lf-shot__label">
            <img src="/wiremd/assets/logos/logo-chrome.jpg" class="lf-shot__logo" alt="" />
            <span>In the editor</span>
          </div>
          <img src="/wiremd/assets/guides/guide-screenshot-webeditor.png" alt="Wireframe created in the browser editor" class="lf-shot__img" />
        </figure>
      </div>
      <div class="lf-stats">
        <div class="lf-stat">
          <span class="lf-stat__number">10×</span>
          <span class="lf-stat__label">faster to create</span>
        </div>
        <div class="lf-stat">
          <span class="lf-stat__number">10×</span>
          <span class="lf-stat__label">fewer tokens</span>
        </div>
      </div>
    </section>

    <!-- 02 Share -->
    <section class="lf-section">
      <div class="lf-kicker">02 — Share &amp; discuss</div>
      <h2 class="lf-headline">Goes wherever your team works.</h2>
      <p class="lf-sub">Copy a link, embed in Notion, drop in Jira or Obsidian. The wireframe travels with the spec — not locked in a separate design tool.</p>

      <a class="lf-url-bar" :href="shareUrl" target="_blank" rel="noopener">
        <span class="lf-url-bar__dot lf-url-bar__dot--red"></span>
        <span class="lf-url-bar__dot lf-url-bar__dot--yellow"></span>
        <span class="lf-url-bar__dot lf-url-bar__dot--green"></span>
        <span class="lf-url-bar__input">teezeit.github.io/wiremd/editor/#code=<span class="lf-url-bar__hash">MTAEBEEMGcAs…</span></span>
        <span class="lf-url-bar__open">↗</span>
      </a>

      <div class="lf-shots lf-shots--2" style="margin-top:1rem">
        <figure class="lf-shot">
          <div class="lf-shot__label">
            <img src="/wiremd/assets/logos/logo-notion-with-text.png" class="lf-shot__logo lf-shot__logo--wide" alt="Notion" />
          </div>
          <img src="/wiremd/assets/guides/guide-screenshot-notion.png" alt="Wireframe embedded in Notion" class="lf-shot__img" />
        </figure>
        <figure class="lf-shot">
          <div class="lf-shot__label">
            <img src="/wiremd/assets/logos/logo-jira-with-text.png" class="lf-shot__logo lf-shot__logo--wide" alt="Jira" />
          </div>
          <img src="/wiremd/assets/guides/guide-screenshot-jira.png" alt="Wireframe linked in Jira" class="lf-shot__img" />
        </figure>
      </div>
      <p class="lf-aside">Also works with Obsidian, Linear, Confluence — anywhere you can paste a URL or Markdown.</p>
    </section>

    <!-- 03 The spec -->
    <section class="lf-section">
      <div class="lf-kicker">03 — The spec</div>
      <h2 class="lf-headline">Plain text your whole team can read.</h2>
      <p class="lf-sub">Wireframes are <code>.md</code> files — version-controlled, diff-able, readable by any LLM. Try it: edit the Markdown, switch styles.</p>
      <MiniEditor :initial-index="4" variant="docs" />
    </section>

    <!-- 04 Hand off -->
    <section class="lf-section">
      <div class="lf-kicker">04 — Hand off</div>
      <h2 class="lf-headline">Give it to any LLM or copilot.</h2>
      <p class="lf-sub">Open the <code>.md</code> file in VS Code, pass it to Claude Code, drop it into a ticket — every tool can read plain text. No screenshots, no lost context, no translation layer.</p>
      <div class="lf-shots lf-shots--1">
        <figure class="lf-shot">
          <div class="lf-shot__label">
            <img src="/wiremd/assets/logos/logo-vscode.png" class="lf-shot__logo" alt="" />
            <span>VS Code · Claude Code · any LLM copilot</span>
          </div>
          <img src="/wiremd/assets/guides/guide-screenshot-vscode.png" alt="Wireframe open in VS Code with Claude Code" class="lf-shot__img" />
        </figure>
      </div>
    </section>

  </div>
</template>

<script setup lang="ts">
import MiniEditor from './MiniEditor.vue'

const shareUrl = 'https://teezeit.github.io/wiremd/editor/#code=MTAEBEEMGcAsCMD2kBOATAUBgXL0BzFASzQFoBmUAY1UwxDGytlQBdtQAlAUwDduAdgFduGAFRiAJAEYATABYANAFYADKokZAiYSgAHAFJQvaKAA2iAa1hYGobEOjcUHAIJVWRfqABVNxRocTFyRV15WU0dOUNjMwtrW3tHEFAAYVt+EKJbMPkAOll9TUBkwlBVIvJ9LFxsLAAfLNdWRCt3UG6WzxshO1AWgGVWSFZXHowm0lm5+dmZhcXluabp0G9OrMQUAAce0EklWXUhoYAFSBImgG8i6CEqKm5oaABfbqGNgHFTRHg3AAHqAAJICKjnGSRNTnJoXQRoIgCfB3IoAd1QAmR+E+TSAA'
</script>

<style scoped>
.lf {
  max-width: 900px;
  margin: 0 auto;
  padding: 0 32px 80px;
}

.lf-section {
  padding-top: 72px;
  margin-top: 72px;
}

.lf-section:first-child {
  margin-top: 24px;
}

.lf-kicker {
  font-family: var(--vp-font-family-mono);
  font-size: 0.7rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--vp-c-text-3);
  margin-bottom: 0.75rem;
}

.lf-headline {
  font-size: 1.75rem;
  font-weight: 700;
  line-height: 1.2;
  color: var(--vp-c-text-1);
  margin: 0 0 0.75rem;
  letter-spacing: -0.02em;
}

.lf-headline code {
  font-size: 1.5rem;
  font-family: var(--vp-font-family-mono);
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  padding: 0 6px;
}

.lf-sub {
  font-size: 1rem;
  color: var(--vp-c-text-2);
  line-height: 1.65;
  margin: 0 0 1.75rem;
  max-width: 600px;
}

.lf-sub code {
  font-size: 0.9rem;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 3px;
  padding: 0 4px;
}

.lf-coming {
  color: var(--vp-c-text-3);
  font-size: 0.88rem;
}

.lf-aside {
  margin-top: 0.75rem;
  font-size: 0.82rem;
  color: var(--vp-c-text-3);
  font-family: var(--vp-font-family-mono);
}

/* ── URL bar ── */

.lf-url-bar {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0.5rem 0.85rem;
  background: var(--vp-c-bg);
  border: 1.5px solid var(--vp-c-divider);
  border-radius: 8px;
  text-decoration: none !important;
  transition: border-color 0.15s;
  cursor: pointer;
}

.lf-url-bar:hover {
  border-color: var(--vp-c-brand-1);
}

.lf-url-bar__dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  flex-shrink: 0;
}

.lf-url-bar__dot--red    { background: #ff5f57; }
.lf-url-bar__dot--yellow { background: #febc2e; }
.lf-url-bar__dot--green  { background: #28c840; }

.lf-url-bar__input {
  flex: 1;
  font-family: var(--vp-font-family-mono);
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.lf-url-bar__hash {
  color: var(--vp-c-text-3);
}

.lf-url-bar__open {
  font-size: 0.85rem;
  color: var(--vp-c-text-3);
  flex-shrink: 0;
}

/* ── screenshots ── */

.lf-shots {
  display: grid;
  gap: 1rem;
}

.lf-shots--2 { grid-template-columns: 1fr 1fr; }
.lf-shots--1 { grid-template-columns: 1fr; }

.lf-shot {
  margin: 0;
  border: 1.5px solid var(--vp-c-divider);
  border-radius: 8px;
  overflow: hidden;
  background: var(--vp-c-bg-soft);
  display: flex;
  flex-direction: column;
}

.lf-shot__label {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0.55rem 0.85rem;
  border-bottom: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  font-size: 0.78rem;
  font-weight: 500;
  color: var(--vp-c-text-2);
  min-height: 36px;
}

.lf-shot__logo {
  width: 18px;
  height: 18px;
  object-fit: contain;
  border-radius: 3px;
  flex-shrink: 0;
}

.lf-shot__logo--wide {
  width: auto;
  height: 16px;
}

.lf-shot__img {
  width: 100%;
  display: block;
}

/* ── stats ── */

.lf-stats {
  display: flex;
  gap: 2rem;
  margin-top: 1.75rem;
}

.lf-stat {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.lf-stat__number {
  font-size: 2.5rem;
  font-weight: 800;
  color: var(--vp-c-text-1);
  line-height: 1;
  letter-spacing: -0.03em;
}

.lf-stat__label {
  font-size: 0.8rem;
  color: var(--vp-c-text-3);
  font-family: var(--vp-font-family-mono);
}

/* ── responsive ── */

@media (max-width: 640px) {
  .lf { padding: 0 20px 60px; }
  .lf-shots--2 { grid-template-columns: 1fr; }
  .lf-headline { font-size: 1.4rem; }
  .lf-stat__number { font-size: 2rem; }
  .lf-editor-frame { height: 420px; }
}
</style>
