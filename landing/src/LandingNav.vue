<script setup lang="ts">
import { docsUrl, editorUrl } from './urls.ts'
</script>

<template>
  <nav class="ln">
    <div class="ln-inner">
      <a href="/wiremd/" class="ln-brand">wiremd</a>
      <div class="ln-links">
        <a href="https://github.com/teezeit/wiremd" class="ln-link" target="_blank" rel="noopener" aria-label="GitHub">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/>
          </svg>
        </a>
        <a :href="docsUrl('/guide/overview.html')" class="ln-link">Docs</a>
        <a :href="editorUrl()" class="ln-cta" target="_blank" rel="noopener">Editor</a>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.ln {
  position: sticky;
  top: 0;
  z-index: 100;
  background: var(--vp-c-bg);
  border-bottom: 1px solid var(--vp-c-divider);
  backdrop-filter: saturate(180%) blur(8px);
  -webkit-backdrop-filter: saturate(180%) blur(8px);
}

.ln-inner {
  max-width: 900px;
  margin: 0 auto;
  padding: 0 32px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.ln-brand {
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
  text-decoration: none;
  letter-spacing: -0.01em;
}

.ln-links {
  display: flex;
  align-items: center;
  gap: 4px;
}

.ln-link {
  display: inline-flex;
  align-items: center;
  padding: 4px 10px;
  font-size: 0.875rem;
  color: var(--vp-c-text-2);
  text-decoration: none;
  border-radius: 4px;
  transition: color 0.15s;
}

.ln-link:hover {
  color: var(--vp-c-text-1);
}

.ln-cta {
  display: inline-flex;
  align-items: center;
  margin-left: 8px;
  padding: 3px 12px;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--vp-c-text-1);
  text-decoration: none;
  border: 1px solid var(--vp-c-text-2);
  border-radius: 4px;
  transition: background 0.15s, border-color 0.15s, color 0.15s;
}

.ln-cta:hover {
  background: var(--vp-c-text-1);
  border-color: var(--vp-c-text-1);
  color: var(--vp-c-bg);
}

@media (max-width: 640px) {
  .ln-inner { padding: 0 20px; }
}
</style>
