<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted, nextTick } from 'vue'
import { parse, renderToHTML } from '@eclectic-ai/wiremd'

const STYLES = ['sketch', 'clean', 'wireframe', 'material', 'brutal', 'tailwind'] as const
type WiremdStyle = typeof STYLES[number]

const EXAMPLES: { label: string; code: string }[] = [
  {
    label: 'This page',
    code: `[[ wiremd  | :logo: | Docs | Editor ]]

::: row {.center}
*Idea* → **wiremd** → *Claude Design* → *Claude Code*
:::

::: hero
## The missing layer.

The universal grammar that humans, designers, and AI all speak.

| |

[Install in Claude Design] [OpenEditor]*
:::

::: grid-3 card

## For Product
|The Spec Layer|{.success}

Write wireframes in your PRD. Your PM writes it, your LLM reads it, Claude Design consumes it.

## For Design
|The Bridge|

Lo-fi spec → Claude Design → hi-fi output. No translation layer. No lost intent.

<!-- Should this say "For Developers" instead? @sara -->
<!-- "Engineering" is more precise — it's the team that owns the pipeline. @tobias -->
<!-- +1, keeping it. @mike -->
## For Engineering
|The Pipeline|{.warning}

Use wiremd directly in your tickets, render in your IDE.

:::`,
  },
  {
    label: 'Dashboard',
    code: `## Dashboard

::: grid-3 card

### 12,480
Users · ↑ 8%

### $48,200
Revenue · ↑ 12%

### 94.2%
Uptime · ↓ 1%

:::

::: grid-2 card

### Revenue

\`\`\`
Jan  ***********           $22k
Feb  *****************     $34k
Mar  **************        $28k
Apr  ********************  $40k
May  **************        $29k
Jun  *****************     $36k
\`\`\`

### Visitors

\`\`\`
     |              *
     |          *       *
     |      *               *
     |  *
     +----+----+----+----+----
      Jan  Feb  Mar  Apr  May
\`\`\`

:::

Search [_________________________]

[New Report]* [Export]  [Settings]`,
  },
  {
    label: 'Settings',
    code: `## Account Settings

::: tabs

::: tab Profile
Full Name
[_______________________]

Email
[_______________________]{type:email}

Bio
[_______________________]{rows:3}

[Save Changes]*

:::

::: tab Notifications

- [x] Email notifications
- [x] Push notifications
- [ ] SMS alerts
- [ ] Weekly digest

[Save Preferences]*

:::

::: tab Security
Current Password
[_______________________]{type:password}

New Password
[_______________________]{type:password}

- [ ] Enable 2FA

[Update Password]*

:::

::: tab Billing

|Pro Plan| |Active|{.success}

$49 / month · Next billing: Jun 1

[Upgrade Plan]* [Cancel]

:::

:::`,
  },
  {
    label: 'Sign In',
    code: `## Sign In

Email
[_____________________________]{type:email}

Password
[_____________________________]{type:password}

- [ ] Remember me

[Sign In]* [Forgot password?]`,
  },
  {
    label: 'Sign In + Comments',
    code: `## Sign In

<!-- Should this be "Log In" to match the marketing page? @sara -->
<!-- +1, updating — keeping "Sign In" for the app itself. @tobias -->

Email
[_____________________________]{type:email}

Password
[_____________________________]{type:password}

<!-- Hide "Remember me" on mobile? @lee -->
<!-- Yes — only show on screens > 375px. @tobias -->
- [ ] Remember me

[Sign In]* [Forgot password?]`,
  },
  {
    label: 'Product',
    code: `::: card
## Wireless Headphones

|New| |Sale|

Premium noise-cancelling · 30h battery

**$149.00** ~~$249.00~~

[Add to Cart]* [Save]
:::`,
  },
  {
    label: 'Data Table',
    code: `## Users

[+ Invite]* [Export]

| Name | Role | Status | Joined |
|------|------|--------|--------|
| Alice Martin | Admin | Active | Jan 2024 |
| Bob Chen | Editor | Active | Mar 2024 |
| Carol Wu | Viewer | Pending | Apr 2024 |
| Dave Lee | Editor | Inactive | Feb 2024 |`,
  },
]

const props = defineProps<{ initialIndex?: number; variant?: 'docs' }>()

const style = ref<WiremdStyle>('sketch')
const selectedIndex = ref(props.initialIndex ?? 0)
const source = ref(EXAMPLES[props.initialIndex ?? 0].code)
const activePanel = ref<'preview' | 'editor'>('preview')
const srcdoc = ref('')
const iframeEl = ref<HTMLIFrameElement | null>(null)
const textareaEl = ref<HTMLTextAreaElement | null>(null)
const rootEl = ref<HTMLDivElement | null>(null)
let timer: ReturnType<typeof setTimeout> | null = null
let intersectionObs: IntersectionObserver | null = null

function resizeIframe() {
  const frame = iframeEl.value
  if (!frame?.contentDocument?.body) return
  frame.style.height = frame.contentDocument.body.scrollHeight + 32 + 'px'
}

function render() {
  try {
    let html = renderToHTML(parse(source.value), { style: style.value })
    // Scale down for the narrow preview pane and prevent the 768px media query
    // from collapsing grid columns (the iframe is narrower than the breakpoint).
    html = html.replace('</head>', [
      '<style>',
      'html{zoom:0.65}html,body{margin:0}',
      // Override responsive collapses — later !important wins in the cascade
      '.wmd-grid{grid-template-columns:repeat(var(--grid-columns,3),1fr)!important}',
      '.wmd-grid-2{grid-template-columns:repeat(2,1fr)!important}',
      '.wmd-grid-3{grid-template-columns:repeat(3,1fr)!important}',
      '.wmd-grid-4{grid-template-columns:repeat(4,1fr)!important}',
      '.wmd-nav-content{flex-direction:row!important;align-items:center!important;flex-wrap:nowrap!important}',
      '.wmd-brand{margin-right:auto!important}',
      // Scale the comments panel to fit the narrow zoomed iframe viewport.
      // The zoom:0.65 on html scales content but fixed positioning stays in
      // viewport space, so we need a proportionally smaller panel + matching padding.
      '.wmd-comments-panel{width:160px!important;padding:10px 8px!important;font-size:0.75em!important}',
      '.wmd-has-comments{padding-right:175px!important}',
      '</style></head>',
    ].join(''))
    html = html.replace('</body>',
      `<script>document.addEventListener('click',function(e){` +
      `var el=e.target.closest('a,button');if(!el)return;` +
      `var t=el.textContent.trim().toLowerCase().replace(/\\s+/g,'');` +
      `if(t==='docs'){e.preventDefault();window.parent.postMessage({wiremdNav:'docs'},'*');}` +
      `else if(t==='editor'||t==='openeditor'){e.preventDefault();window.parent.postMessage({wiremdNav:'editor'},'*');}` +
      `});<` + `/script></body>`)
    srcdoc.value = html
  } catch {
    // keep previous output on error
  }
}

function onMessage(e: MessageEvent) {
  if (!e.data?.wiremdNav) return
  if (e.data.wiremdNav === 'docs') window.location.href = '/wiremd/guide/overview.html'
  else if (e.data.wiremdNav === 'editor') window.open('/wiremd/editor/', '_blank')
}

function onInput() {
  if (timer) clearTimeout(timer)
  timer = setTimeout(render, 150)
}

function onKeydown(e: KeyboardEvent) {
  if (e.key !== 'Tab') return
  e.preventDefault()
  const ta = e.target as HTMLTextAreaElement
  const start = ta.selectionStart
  const end = ta.selectionEnd
  source.value = source.value.slice(0, start) + '  ' + source.value.slice(end)
  nextTick(() => { ta.selectionStart = ta.selectionEnd = start + 2 })
}

function onExampleChange() {
  source.value = EXAMPLES[selectedIndex.value].code
  render()
}

watch(style, render)
onMounted(() => {
  render()
  window.addEventListener('message', onMessage)
  if (props.variant === 'docs' && rootEl.value) {
    intersectionObs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        textareaEl.value?.focus({ preventScroll: true })
        intersectionObs?.disconnect()
        intersectionObs = null
      }
    }, { threshold: 0.3 })
    intersectionObs.observe(rootEl.value)
  }
})
onUnmounted(() => {
  window.removeEventListener('message', onMessage)
  intersectionObs?.disconnect()
})

let touchStartX = 0
let touchStartY = 0

function onTouchStart(e: TouchEvent) {
  touchStartX = e.touches[0].clientX
  touchStartY = e.touches[0].clientY
}

function onTouchEnd(e: TouchEvent) {
  const dx = e.changedTouches[0].clientX - touchStartX
  const dy = e.changedTouches[0].clientY - touchStartY
  if (Math.abs(dx) < 50 || Math.abs(dx) < Math.abs(dy)) return
  activePanel.value = dx < 0 ? 'editor' : 'preview'
}
</script>

<template>
  <div ref="rootEl" :class="['mini-editor', { 'mini-editor--docs': props.variant === 'docs' }]">
    <div class="mini-editor__toggle">
      <button :class="['mini-editor__toggle-btn', { 'is-active': activePanel === 'preview' }]" @click="activePanel = 'preview'" title="Preview">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
      </button>
      <button :class="['mini-editor__toggle-btn', { 'is-active': activePanel === 'editor' }]" @click="activePanel = 'editor'" title="Editor">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
      </button>
    </div>
    <div :class="['mini-editor__body', `mini-editor__body--${activePanel}`]" @touchstart.passive="onTouchStart" @touchend.passive="onTouchEnd">

      <!-- Editor pane -->
      <div class="mini-editor__editor-pane">
        <!-- Docs variant: light header with template selector -->
        <div v-if="props.variant === 'docs'" class="mini-editor__panel-header">
          <span class="mini-editor__panel-label">Markdown</span>
          <div class="mini-editor__header-controls">
            <span class="mini-editor__ctrl">
              <span class="mini-editor__ctrl-label">Template:</span>
              <select v-model="selectedIndex" @change="onExampleChange" class="mini-editor__select mini-editor__select--light">
                <option v-for="(ex, i) in EXAMPLES" :key="i" :value="i">{{ ex.label }}</option>
              </select>
            </span>
          </div>
        </div>
        <!-- Default: dark header with traffic lights -->
        <div v-else class="mini-editor__editor-header">
          <span class="mini-editor__dot" style="background:#ff5f57"></span>
          <span class="mini-editor__dot" style="background:#febc2e"></span>
          <span class="mini-editor__dot" style="background:#28c840"></span>
          <span class="mini-editor__editor-fname">wireframe.md</span>
          <div class="mini-editor__header-controls">
            <select v-model="selectedIndex" @change="onExampleChange" class="mini-editor__select mini-editor__select--dark">
              <option v-for="(ex, i) in EXAMPLES" :key="i" :value="i">{{ ex.label }}</option>
            </select>
            <select v-model="style" class="mini-editor__select mini-editor__select--dark">
              <option v-for="s in STYLES" :key="s" :value="s">{{ s }}</option>
            </select>
          </div>
        </div>
        <div class="mini-editor__ta-wrap">
          <button v-if="props.variant === 'docs'" class="mini-editor__edit-btn" @click="textareaEl?.focus()" title="Edit">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
          </button>
          <textarea
            ref="textareaEl"
            v-model="source"
            @input="onInput"
            @keydown="onKeydown"
            :class="['mini-editor__textarea', { 'mini-editor__textarea--light': props.variant === 'docs' }]"
            spellcheck="false"
            autocomplete="off"
            autocorrect="off"
          />
        </div>
      </div>

      <!-- Divider -->
      <div class="mini-editor__divider">
        <span v-if="props.variant === 'docs'" class="mini-editor__divider-arrow">→</span>
      </div>

      <!-- Preview pane -->
      <div class="mini-editor__preview-side">
        <div v-if="props.variant === 'docs'" class="mini-editor__panel-header">
          <span class="mini-editor__panel-label">Wireframe</span>
          <div class="mini-editor__header-controls">
            <span class="mini-editor__ctrl">
              <span class="mini-editor__ctrl-label">Style:</span>
              <select v-model="style" class="mini-editor__select mini-editor__select--light">
                <option v-for="s in STYLES" :key="s" :value="s">{{ s }}</option>
              </select>
            </span>
          </div>
        </div>
        <iframe
          ref="iframeEl"
          :srcdoc="srcdoc"
          @load="resizeIframe"
          class="mini-editor__iframe"
          sandbox="allow-same-origin allow-scripts"
        />
      </div>

    </div>
  </div>
</template>

<style>
.mini-editor {
  margin: 1.5rem calc(-1 * clamp(0px, (100vw - 1280px) / 2, 112px)) 2rem;
  border: 1.5px solid var(--vp-c-divider);
  border-radius: 8px;
  overflow: hidden;
}

.mini-editor__editor-header {
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 7px 12px;
  background: #13141f;
  border-bottom: 1px solid #2a2b3d;
}

.mini-editor__header-controls {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-left: auto;
}

.mini-editor__select {
  font-size: 0.65rem;
  font-family: var(--vp-font-family-mono);
  cursor: pointer;
  appearance: none;
  background-repeat: no-repeat;
  background-position: right 5px center;
  border-radius: 3px;
  padding: 1px 18px 1px 6px;
}

.mini-editor__select--dark {
  color: #7a85a2;
  background-color: transparent;
  border: 1px solid #454d6a;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 24 24' fill='none' stroke='%237a85a2' stroke-width='2.5'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E");
}

.mini-editor__select--dark:hover {
  color: #a9b1d6;
  border-color: #4a5168;
}

.mini-editor__toggle {
  display: none;
}

.mini-editor__toggle-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  padding: 0.4rem 0;
  border: none;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-3);
  cursor: pointer;
  transition: color 0.15s, background 0.15s;
}

.mini-editor__toggle-btn.is-active {
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
}

.mini-editor__body {
  display: flex;
  min-height: 300px;
}

.mini-editor__divider {
  flex: 0 0 1.5px;
  background: var(--vp-c-divider);
  position: relative;
}

.mini-editor__editor-pane {
  flex: 0 0 38%;
  min-width: 0;
  display: flex;
  flex-direction: column;
  background: #1a1b26;
  overflow: hidden;
}

.mini-editor__dot {
  width: 11px;
  height: 11px;
  border-radius: 50%;
  display: inline-block;
  flex-shrink: 0;
}

.mini-editor__editor-fname {
  font-family: var(--vp-font-family-mono);
  font-size: 0.65rem;
  color: #4a5168;
  margin-left: 6px;
  letter-spacing: 0.02em;
}

.mini-editor__textarea {
  flex: 1;
  min-width: 0;
  padding: 0.8rem 0.75rem;
  font-family: var(--vp-font-family-mono);
  font-size: 0.62rem;
  line-height: 1.7;
  color: #a9b1d6;
  background: transparent;
  border: none;
  resize: none;
  outline: none;
  overflow-y: auto;
  caret-color: #7aa2f7;
  min-height: 600px;
}

.mini-editor__textarea::-webkit-scrollbar { width: 5px; }
.mini-editor__textarea::-webkit-scrollbar-track { background: transparent; }
.mini-editor__textarea::-webkit-scrollbar-thumb { background: #2a2b3d; border-radius: 3px; }

.mini-editor__preview-side {
  flex: 1 1 62%;
  min-width: 0;
  display: flex;
  flex-direction: column;
}

.mini-editor__iframe {
  flex: 1;
  width: 100%;
  min-width: 0;
  height: auto;
  border: none;
  background: var(--vp-c-bg);
  align-self: flex-start;
}

.mini-editor__panel-header {
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  padding: 0.45rem 1rem;
  border-bottom: 1.5px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
}

.mini-editor__ta-wrap {
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
}

.mini-editor__edit-btn {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  cursor: pointer;
  color: #111;
  transition: color 0.15s, border-color 0.15s, background 0.15s;
  z-index: 1;
  animation: wmd-edit-pulse 2.5s ease-in-out infinite;
}

.mini-editor__edit-btn:hover {
  color: #111;
  border-color: #888;
  background: var(--vp-c-bg);
  animation: none;
}

@keyframes wmd-edit-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}

.mini-editor__panel-label {
  font-size: 0.7rem;
  font-family: var(--vp-font-family-mono);
  color: var(--vp-c-text-3);
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.mini-editor__divider-arrow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: var(--vp-c-bg);
  border: 1.5px solid var(--vp-c-divider);
  border-radius: 50%;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.85rem;
  color: var(--vp-c-text-3);
}

.mini-editor__ctrl {
  display: flex;
  align-items: center;
  gap: 4px;
}

.mini-editor__ctrl-label {
  font-size: 0.65rem;
  font-family: var(--vp-font-family-mono);
  color: var(--vp-c-text-3);
  text-transform: uppercase;
  letter-spacing: 0.04em;
  white-space: nowrap;
}

.mini-editor__select--light {
  color: var(--vp-c-text-3);
  background-color: transparent;
  border: 1px solid var(--vp-c-divider);
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 24 24' fill='none' stroke='%23999' stroke-width='2.5'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E");
}

.mini-editor__select--light:hover {
  color: var(--vp-c-text-2);
  border-color: var(--vp-c-text-3);
}

.mini-editor__textarea--light {
  color: var(--vp-c-text-2);
  caret-color: var(--vp-c-brand-1);
}

.mini-editor__textarea--light::-webkit-scrollbar-thumb {
  background: var(--vp-c-divider);
}

.mini-editor--docs {
  margin-left: 0;
  margin-right: 0;
}

.mini-editor--docs .mini-editor__editor-pane {
  flex: 0 0 40%;
  background: var(--vp-code-block-bg);
}

.mini-editor--docs .mini-editor__preview-side {
  flex: 1 1 60%;
  background-color: var(--vp-c-bg-soft);
  background-image: radial-gradient(circle, var(--vp-c-divider) 1px, transparent 1px);
  background-size: 18px 18px;
}

@media (max-width: 640px) {
  .mini-editor__toggle {
    display: flex;
    border-bottom: 1.5px solid var(--vp-c-divider);
  }

  .mini-editor__body--preview .mini-editor__editor-pane,
  .mini-editor__body--preview .mini-editor__divider { display: none; }

  .mini-editor__body--editor .mini-editor__preview-side,
  .mini-editor__body--editor .mini-editor__divider { display: none; }

  .mini-editor__preview-side,
  .mini-editor__editor-pane { flex: 1 1 100%; }
}
</style>
