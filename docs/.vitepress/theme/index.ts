import DefaultTheme from 'vitepress/theme'
import './custom.css'
import MiniEditor from './components/MiniEditor.vue'
import type { Theme } from 'vitepress'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('MiniEditor', MiniEditor)
  }
} satisfies Theme
