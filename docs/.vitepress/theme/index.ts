import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import './custom.css'
import MiniEditor from './components/MiniEditor.vue'
import AppearanceSwitcher from './components/AppearanceSwitcher.vue'
import type { Theme } from 'vitepress'

export default {
  extends: DefaultTheme,
  Layout: () => h(DefaultTheme.Layout, null, {
    'sidebar-nav-after': () => h(AppearanceSwitcher),
  }),
  enhanceApp({ app }) {
    app.component('MiniEditor', MiniEditor)
  }
} satisfies Theme
