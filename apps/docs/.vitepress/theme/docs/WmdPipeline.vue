<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { parse, renderToHTML } from '@eclectic-ai/wiremd'

const CODE = `## Login

Email
[_____________________________]{type:email}

Password
[_____________________________]{type:password}

[Sign In]* [Forgot password?]`

const iframeEl = ref<HTMLIFrameElement | null>(null)
const srcdoc = ref('')

function resizeIframe() {
  const frame = iframeEl.value
  if (!frame?.contentDocument?.body) return
  frame.style.height = frame.contentDocument.body.scrollHeight + 24 + 'px'
}

onMounted(() => {
  let html = renderToHTML(parse(CODE), { style: 'sketch' })
  html = html.replace('</head>', '<style>html,body{margin:0}html{zoom:0.75}</style></head>')
  srcdoc.value = html
})
</script>

<template>
  <div class="wmd-io">
    <div class="wmd-io__side wmd-io__input">
      <div class="wmd-io__label">Input · .md</div>
      <pre class="wmd-io__code"><code>{{ CODE }}</code></pre>
    </div>
    <div class="wmd-io__divider"><div class="wmd-io__arrow">→</div></div>
    <div class="wmd-io__renderer">
      <div class="wmd-io__label">Renderer · wiremd</div>
      <div class="wmd-io__renderer-body">
        <span class="wmd-io__renderer-fn">parse(md)</span>
        <span class="wmd-io__renderer-sep">↓</span>
        <span class="wmd-io__renderer-fn">renderToHTML(ast)</span>
      </div>
    </div>
    <div class="wmd-io__divider"><div class="wmd-io__arrow">→</div></div>
    <div class="wmd-io__side wmd-io__output">
      <div class="wmd-io__label">Output · .html</div>
      <iframe
        ref="iframeEl"
        :srcdoc="srcdoc"
        @load="resizeIframe"
        class="wmd-io__iframe"
        sandbox="allow-same-origin allow-scripts"
      />
    </div>
  </div>
</template>
