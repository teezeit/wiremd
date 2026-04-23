<script setup lang="ts">
import { ref, watch, onMounted, nextTick } from 'vue'
import { parse, renderToHTML } from 'wiremd'

const STYLES = ['sketch', 'clean', 'wireframe', 'material', 'brutal', 'tailwind'] as const
type WiremdStyle = typeof STYLES[number]

const EXAMPLES: { label: string; code: string }[] = [
  {
    label: 'This page',
    code: `[[ wiremd  | Docs | Playground | :search: Search | :github:  ]]


::: hero
## wiremd

**Design UI Mockups with Markdown**

[Get Started]* [Browse Components]




:::

::: grid-3 card

## Create in Claude

|AI-first|{.success}

Describe your UI in plain language — Claude writes the wiremd syntax and renders the mockup instantly.

## Develop in VS Code

|Extension|

Live preview as you type. Syntax highlighting and instant rendering, zero config. Stays out of your way.

## Ship with Copilot

|Export|

Export to HTML, React, or Tailwind. Clean markup ready to hand off to your AI pair programmer.

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

Search [_________________________]

[New Report]* [Export]  [Settings]`,
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

::: tab Security
Current Password
[_______________________]{type:password}

New Password
[_______________________]{type:password}

[Update Password]*
:::

:::`,
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

| Name | Role | Status |
|------|------|--------|
| Alice Martin | Admin | |Active| |
| Bob Chen | Editor | |Active| |
| Carol Wu | Viewer | |Pending|{.warning} |
| Dave Lee | Editor | |Inactive|{.error} |`,
  },
]

const style = ref<WiremdStyle>('sketch')
const selectedIndex = ref(0)
const source = ref(EXAMPLES[0].code)
const srcdoc = ref('')
let timer: ReturnType<typeof setTimeout> | null = null

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
      '</style></head>',
    ].join(''))
    srcdoc.value = html
  } catch {
    // keep previous output on error
  }
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
onMounted(render)
</script>

<template>
  <div class="mini-editor">
    <div class="mini-editor__bar">
      <div class="mini-editor__bar-left">
        <span class="mini-editor__label">Example ⌃⌄</span>
        <select v-model="selectedIndex" @change="onExampleChange" class="mini-editor__select mini-editor__select--examples">
          <option v-for="(ex, i) in EXAMPLES" :key="i" :value="i">{{ ex.label }}</option>
        </select>
        <span class="mini-editor__label">Style ⌃⌄</span>
        <select v-model="style" class="mini-editor__select">
          <option v-for="s in STYLES" :key="s" :value="s">{{ s }}</option>
        </select>
      </div>
      <div class="mini-editor__controls">
        <a href="/wiremd/playground/" target="_blank" rel="noopener" class="mini-editor__link">
          Open in playground →
        </a>
      </div>
    </div>
    <div class="mini-editor__body">
      <iframe
        :srcdoc="srcdoc"
        class="mini-editor__iframe"
        sandbox="allow-same-origin"
      />
      <div class="mini-editor__divider" />
      <div class="mini-editor__editor-pane">
        <div class="mini-editor__editor-header">
          <span class="mini-editor__dot" style="background:#ff5f57"></span>
          <span class="mini-editor__dot" style="background:#febc2e"></span>
          <span class="mini-editor__dot" style="background:#28c840"></span>
          <span class="mini-editor__editor-fname">wireframe.md</span>
        </div>
        <textarea
          v-model="source"
          @input="onInput"
          @keydown="onKeydown"
          class="mini-editor__textarea"
          spellcheck="false"
          autocomplete="off"
          autocorrect="off"
        />
      </div>
    </div>
  </div>
</template>
