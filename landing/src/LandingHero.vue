<script setup lang="ts">
import { docsUrl, editorUrl } from './urls.ts'
</script>

<template>
  <section class="lh">
    <h1 class="lh-headline">Mermaid for wireframes.</h1>
    <p class="lh-tagline"><span class="lh-em">10×</span> cheaper than Claude Design. <span class="lh-em">10×</span> faster. Saved as <code>textfile.md</code>.</p>
    <div class="lh-ctas">
      <a :href="editorUrl()" class="lh-cta lh-cta--primary" target="_blank" rel="noopener">
        <img src="/wiremd/assets/logos/logo-chrome.jpg" class="lh-cta__logo" alt="" />
        Open Editor
      </a>
      <a :href="docsUrl('/guide/claude.html')" class="lh-cta lh-cta--secondary">
        <img src="/wiremd/assets/logos/logo-claude.png" class="lh-cta__logo" alt="" />
        Install for Claude
      </a>
    </div>
  </section>
</template>

<style scoped>
.lh {
  max-width: 900px;
  margin: 0 auto;
  padding: 72px 32px 0;
  text-align: center;
}


.lh-headline {
  font-size: clamp(2rem, 5vw, 3.25rem);
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -0.03em;
  color: var(--vp-c-text-1);
  margin: 0 0 1.25rem;
}

.lh-tagline {
  font-size: 1.15rem;
  font-weight: 500;
  color: var(--vp-c-text-2);
  margin: 0 0 2rem;
}

.lh-em {
  font-weight: 700;
  color: var(--vp-c-text-1);
}

.lh-tagline code {
  font-size: 1rem;
  font-family: var(--vp-font-family-mono);
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 3px;
  padding: 0 4px;
}


.lh-ctas {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  justify-content: center;
}

.lh-cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  min-width: 175px;
  padding: 0.55rem 1.25rem;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 500;
  text-decoration: none !important;
  transition: background 0.15s, border-color 0.15s;
}

.lh-cta__logo {
  width: 16px;
  height: 16px;
  object-fit: contain;
  border-radius: 3px;
  flex-shrink: 0;
}

.lh-cta--primary {
  background: var(--vp-c-text-1);
  color: var(--vp-c-bg) !important;
}

.lh-cta--primary:hover {
  background: var(--vp-c-text-2);
}

.lh-cta--secondary {
  background: transparent;
  border: 1.5px solid var(--vp-c-divider);
  color: var(--vp-c-text-1) !important;
}

.lh-cta--secondary:hover {
  border-color: var(--vp-c-text-2);
  background: var(--vp-c-bg-soft);
}

@media (max-width: 640px) {
  .lh {
    padding: 48px 20px 0;
  }
}
</style>
