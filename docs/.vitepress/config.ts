import { defineConfig } from 'vitepress';

export default defineConfig({
  title: 'wiremd',
  description: 'Text-first UI design tool - Create wireframes and mockups using Markdown syntax',
  base: '/wiremd/',

  themeConfig: {
    logo: '/logo.svg',

    nav: [
      { text: 'Guide', link: '/guide/getting-started' },
      { text: 'Components', link: '/components/' },
      { text: 'API', link: '/api/' },
      { text: 'Examples', link: '/examples/' },
      { text: 'Reference', link: '/reference/quick-reference' },
      { text: 'Contributing', link: '/contributing/testing' },
      { text: 'GitHub', link: 'https://github.com/akonan/wiremd' }
    ],

    sidebar: {
      '/guide/': [
        {
          text: 'Guide',
          items: [
            { text: 'Getting Started', link: '/guide/getting-started' },
            { text: 'Installation', link: '/guide/installation' },
            { text: 'Syntax Reference', link: '/guide/syntax' },
            { text: 'Framework Integrations', link: '/guide/integrations' },
            { text: 'Homebrew', link: '/guide/homebrew' },
            { text: 'Troubleshooting', link: '/guide/troubleshooting' }
          ]
        }
      ],
      '/components/': [
        {
          text: 'Components',
          items: [
            { text: 'Overview', link: '/components/' },
            { text: 'Buttons', link: '/components/buttons' },
            { text: 'Inputs', link: '/components/inputs' },
            { text: 'Textarea & Select', link: '/components/textarea-select' },
            { text: 'Checkboxes & Radio', link: '/components/checkboxes-radio' },
            { text: 'Badges', link: '/components/badges' },
            { text: 'Navigation', link: '/components/navigation' },
            { text: 'Cards', link: '/components/cards' },
            { text: 'Tabs', link: '/components/tabs' },
            { text: 'Alerts', link: '/components/alerts' },
            { text: 'Tables', link: '/components/tables' },
          ]
        },
        {
          text: 'Layout',
          items: [
            { text: 'Grid', link: '/components/grid' },
            { text: 'Row', link: '/components/row' },
            { text: 'Sidebar Layout', link: '/components/sidebar-layout' },
          ]
        },
        {
          text: 'Advanced',
          items: [
            { text: 'Button Links', link: '/components/button-links' },
            { text: 'Reuse Components', link: '/components/includes' },
            { text: 'Attributes & Classes', link: '/components/attributes' },
          ]
        },
        {
          text: 'Roadmap',
          items: [
            { text: 'Not Yet Implemented', link: '/components/not-implemented-components' },
          ]
        }
      ],
      '/api/': [
        {
          text: 'API Reference',
          items: [
            { text: 'Overview', link: '/api/' },
            { text: 'Parser API', link: '/api/parser' },
            { text: 'Renderer APIs', link: '/api/renderer' },
            { text: 'Type Definitions', link: '/api/types' },
            { text: 'Plugin API', link: '/api/plugins' },
            { text: 'Error Handling', link: '/api/errors' },
            { text: 'Migration Guides', link: '/api/migration' }
          ]
        }
      ],
      '/examples/': [
        {
          text: 'Examples',
          items: [
            { text: 'Overview', link: '/examples/' }
          ]
        }
      ],
      '/reference/': [
        {
          text: 'Reference',
          items: [
            { text: 'Quick Reference', link: '/reference/quick-reference' },
            { text: 'Syntax Spec v0.1', link: '/reference/syntax-spec' },
            { text: 'FAQ', link: '/reference/faq' },
          ]
        }
      ],
      '/contributing/': [
        {
          text: 'Contributing',
          items: [
            { text: 'Testing', link: '/contributing/testing' },
            { text: 'Publishing', link: '/contributing/publishing' },
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/akonan/wiremd' }
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2024-present'
    },

    search: {
      provider: 'local'
    }
  },

  markdown: {
    theme: {
      light: 'github-light',
      dark: 'github-dark'
    },
    lineNumbers: true
  },

  ignoreDeadLinks: [
    /CONTRIBUTING/,
    /LICENSE/,
    /localhost/,
    /examples\/index/,
    /playground/,
    /showcase/,
    /\.md$/,
  ]
});
