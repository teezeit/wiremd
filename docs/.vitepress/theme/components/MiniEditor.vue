<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { parse, renderToHTML } from 'wiremd'

const STYLES = ['sketch', 'clean', 'wireframe', 'material', 'brutal', 'tailwind'] as const
type WiremdStyle = typeof STYLES[number]

const DEFAULT = `## Dashboard

::: grid-3

::: card
### 12,480
Users · ↑ 8%
:::

::: card
### $48,200
Revenue · ↑ 12%
:::

::: card
### 94.2%
Uptime
:::

:::

Search [_______________________]

[New Report]* [Export]  [Settings]`

const source = ref(DEFAULT)
const style = ref<WiremdStyle>('sketch')
const srcdoc = ref('')
let timer: ReturnType<typeof setTimeout> | null = null

function render() {
  try {
    srcdoc.value = renderToHTML(parse(source.value), { style: style.value })
  } catch {
    // keep previous output on error
  }
}

function onInput() {
  if (timer) clearTimeout(timer)
  timer = setTimeout(render, 150)
}

watch(style, render)
onMounted(render)
</script>

<template>
  <div class="mini-editor">
    <div class="mini-editor__bar">
      <span class="mini-editor__label">Try it live</span>
      <div class="mini-editor__controls">
        <select v-model="style" class="mini-editor__select">
          <option v-for="s in STYLES" :key="s" :value="s">{{ s }}</option>
        </select>
        <a href="/wiremd/playground/" target="_blank" rel="noopener" class="mini-editor__link">
          Open in playground →
        </a>
      </div>
    </div>
    <div class="mini-editor__body">
      <textarea
        v-model="source"
        @input="onInput"
        class="mini-editor__textarea"
        spellcheck="false"
        autocomplete="off"
        autocorrect="off"
      />
      <div class="mini-editor__divider" />
      <iframe
        :srcdoc="srcdoc"
        class="mini-editor__iframe"
        sandbox="allow-same-origin"
      />
    </div>
  </div>
</template>
