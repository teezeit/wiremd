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
      { text: 'Explanation', link: '/explanation/how-it-works' },
      { text: 'Contributing', link: '/contributing/testing' },
      { text: 'GitHub', link: 'https://github.com/teezeit/wiremd' }
    ],

    sidebar: {
      '/guide/': [
        {
          text: 'Guide',
          items: [
            { text: 'Getting Started', link: '/guide/getting-started' },
            { text: 'Installation', link: '/guide/installation' },
            { text: 'Syntax Reference', link: '/reference/syntax' },
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
            { text: 'JSON Schema', link: '/api/json-schema' },
            { text: 'Type Definitions', link: '/api/types' },
            { text: 'Plugin API', link: '/api/plugins' },
            { text: 'Error Handling', link: '/api/errors' },
            { text: 'Migration Guides', link: '/api/migration' }
          ]
        }
      ],
      '/examples/': [
        {
          text: 'Quick Start',
          items: [
            { text: 'Overview', link: '/examples/' },
            { text: 'Hello World', link: '/examples/hello' },
            { text: 'Showcase', link: '/examples/showcase' },
            { text: 'Demo Blocks', link: '/examples/demo-blocks' },
            { text: 'Form Syntax', link: '/examples/form-syntax-demo' },
            { text: 'Tabs', link: '/examples/tabs-demo' },
            { text: 'Row Layout', link: '/examples/row-demo' },
            { text: 'Sidebar Layout', link: '/examples/sidebar-layout' },
          ]
        },
        {
          text: 'Gallery — Forms',
          items: [
            { text: 'Login Form', link: '/examples/gallery/forms/login-form' },
            { text: 'Registration Form', link: '/examples/gallery/forms/registration-form' },
            { text: 'Contact Form', link: '/examples/gallery/forms/contact-form' },
            { text: 'Search Form', link: '/examples/gallery/forms/search-form' },
            { text: 'Multi-Step Form', link: '/examples/gallery/forms/multi-step-form' },
          ]
        },
        {
          text: 'Gallery — Components',
          items: [
            { text: 'Card Layouts', link: '/examples/gallery/components/card-layouts' },
            { text: 'Form Controls', link: '/examples/gallery/components/form-controls' },
            { text: 'Modals & Dialogs', link: '/examples/gallery/components/modals-dialogs' },
            { text: 'Navigation Patterns', link: '/examples/gallery/components/navigation-patterns' },
            { text: 'Tables & Data Grids', link: '/examples/gallery/components/tables-data-grids' },
          ]
        },
        {
          text: 'Gallery — Dashboards',
          items: [
            { text: 'Admin Panel', link: '/examples/gallery/dashboards/admin-panel' },
            { text: 'Analytics Dashboard', link: '/examples/gallery/dashboards/analytics-dashboard' },
            { text: 'E-commerce Dashboard', link: '/examples/gallery/dashboards/ecommerce-dashboard' },
            { text: 'Project Management', link: '/examples/gallery/dashboards/project-management' },
            { text: 'Social Media', link: '/examples/gallery/dashboards/social-media-dashboard' },
          ]
        },
        {
          text: 'Gallery — Landing Pages',
          items: [
            { text: 'SaaS Product', link: '/examples/gallery/landing-pages/saas-product' },
            { text: 'App Landing', link: '/examples/gallery/landing-pages/app-landing' },
            { text: 'E-commerce Home', link: '/examples/gallery/landing-pages/ecommerce-home' },
            { text: 'Agency Site', link: '/examples/gallery/landing-pages/agency-site' },
            { text: 'Portfolio', link: '/examples/gallery/landing-pages/portfolio' },
          ]
        },
        {
          text: 'Gallery — Multi-Page',
          items: [
            { text: 'Home', link: '/examples/gallery/multi-page/home' },
            { text: 'About', link: '/examples/gallery/multi-page/about' },
            { text: 'Contact', link: '/examples/gallery/multi-page/contact' },
          ]
        },
      ],
      '/reference/': [
        {
          text: 'Reference',
          items: [
            { text: 'Quick Reference', link: '/reference/quick-reference' },
            { text: 'Visual Styles', link: '/reference/styles' },
            { text: 'CLI Reference', link: '/reference/cli' },
            { text: 'Syntax Guide', link: '/reference/syntax' },
            { text: 'FAQ', link: '/reference/faq' },
          ]
        }
      ],
      '/explanation/': [
        {
          text: 'Explanation',
          items: [
            { text: 'How wiremd Works', link: '/explanation/how-it-works' },
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
      { icon: 'github', link: 'https://github.com/teezeit/wiremd' }
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
