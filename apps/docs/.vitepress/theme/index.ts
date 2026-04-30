import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import './custom.css'
import WmdPipeline from './docs/WmdPipeline.vue'
import AppearanceSwitcher from './docs/AppearanceSwitcher.vue'
import SidebarSearch from './docs/SidebarSearch.vue'
import type { Theme } from 'vitepress'

export default {
  extends: DefaultTheme,
  Layout: () => h(DefaultTheme.Layout, null, {
    'sidebar-nav-before': () => h(SidebarSearch),
    'sidebar-nav-after': () => h(AppearanceSwitcher),
  }),
  enhanceApp({ app }) {
    app.component('WmdPipeline', WmdPipeline)
  }
} satisfies Theme
