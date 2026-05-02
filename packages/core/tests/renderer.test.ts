import { describe, it, expect } from 'vitest';
import { parse } from '../src/parser/index.js';
import { renderToHTML, renderToJSON, countCommentThreads } from '../src/renderer/index.js';

describe('HTML Renderer', () => {
  describe('Basic Components', () => {
    it('should render a button', () => {
      const ast = parse('[Click Me]');
      const html = renderToHTML(ast, { style: 'sketch' });

      expect(html).toContain('<button');
      expect(html).toContain('Click Me');
      expect(html).toContain('wmd-button');
    });

    it('should render a primary button', () => {
      const ast = parse('[Submit]*');
      const html = renderToHTML(ast, { style: 'sketch' });

      expect(html).toContain('wmd-button-primary');
      expect(html).toContain('Submit');
    });

    it('should render a text input', () => {
      const ast = parse('[Email_______________________]');
      const html = renderToHTML(ast, { style: 'sketch' });

      expect(html).toContain('<input');
      expect(html).toContain('type="text"');
      expect(html).toContain('wmd-input');
    });

    it('should render an email input with attributes', () => {
      const ast = parse('[Email___]{type:email required}');
      const html = renderToHTML(ast, { style: 'sketch' });

      expect(html).toContain('type="email"');
      expect(html).toContain('required');
    });

    it('should render a checkbox', () => {
      const ast = parse('- [x] Checked item');
      const html = renderToHTML(ast, { style: 'sketch' });

      expect(html).toContain('type="checkbox"');
      expect(html).toContain('checked');
      expect(html).toContain('Checked item');
    });

    it('should render a radio button', () => {
      const ast = parse('- (•) Selected option');
      const html = renderToHTML(ast, { style: 'sketch' });

      expect(html).toContain('type="radio"');
      expect(html).toContain('checked');
      expect(html).toContain('Selected option');
    });

    it('should render an icon', () => {
      const ast = parse(':house:');
      const html = renderToHTML(ast, { style: 'sketch' });

      expect(html).toContain('wmd-icon');
      expect(html).toContain('data-icon="house"');
    });
  });

  describe('Containers', () => {
    it('should render a hero container', () => {
      const input = `
::: hero

# Welcome

[Get Started]*

:::
      `.trim();

      const ast = parse(input);
      const html = renderToHTML(ast, { style: 'sketch' });

      expect(html).toContain('wmd-container-hero');
      expect(html).toContain('<h1');
      expect(html).toContain('Welcome');
      expect(html).toContain('Get Started');
    });

    it('should render a card container with attributes', () => {
      const input = `
::: card {.featured}

## Card Title

Content

:::
      `.trim();

      const ast = parse(input);
      const html = renderToHTML(ast, { style: 'sketch' });

      expect(html).toContain('wmd-container-card');
      expect(html).toContain('wmd-featured');
      expect(html).toContain('Card Title');
    });
  });

  describe('Navigation', () => {
    it('should render a navigation bar', () => {
      const input = `[[ :logo: MyApp | Home | Products | [Sign In] ]]`;
      const ast = parse(input);
      const html = renderToHTML(ast, { style: 'sketch' });

      expect(html).toContain('<nav');
      expect(html).toContain('wmd-nav');
      expect(html).toContain('wmd-brand');
      expect(html).toContain('MyApp');
      expect(html).toContain('wmd-nav-item');
      expect(html).toContain('Home');
      expect(html).toContain('Sign In');
    });

    it('should render *active* nav items without literal asterisks', () => {
      const input = `[[ Home | *About* | Contact ]]`;
      const ast = parse(input);
      const html = renderToHTML(ast, { style: 'sketch' });

      expect(html).not.toContain('*About*');
      expect(html).toContain('About');
      expect(html).toContain('wmd-nav-item');
    });

    it('should render [Link](url)* nav item as primary button', () => {
      const input = `[[ Home | [Get Started](./start.md)* ]]`;
      const ast = parse(input);
      const html = renderToHTML(ast, { style: 'sketch' });

      expect(html).toContain('href="./start.md"');
      expect(html).toContain('wmd-button-primary');
    });

    it('should render nav items with links as <a> tags with href', () => {
      const input = `[[ :logo: MyApp | Home | [About](./about.md) | [Contact](./contact.md) ]]`;
      const ast = parse(input);
      const html = renderToHTML(ast, { style: 'sketch' });

      expect(html).toContain('href="./about.md"');
      expect(html).toContain('href="./contact.md"');
      expect(html).toContain('About');
      expect(html).toContain('Contact');
    });

    it('should render navigation items with button styling', () => {
      const input = `[[ Logo | Sign In | Help ]]`;
      const ast = parse(input);
      const html = renderToHTML(ast, { style: 'sketch' });

      // Check that nav items are rendered as links with proper classes
      expect(html).toContain('class="wmd-nav-item"');
      expect(html).toContain('Logo');
      expect(html).toContain('Sign In');
      expect(html).toContain('Help');

      // Check that the CSS includes button-like styling for nav items
      expect(html).toContain('.wmd-nav-item');
      expect(html).toMatch(/\.wmd-nav-item\s*\{[^}]*display:\s*inline-block/);
      expect(html).toMatch(/\.wmd-nav-item\s*\{[^}]*background:\s*#fff/);
      expect(html).toMatch(/\.wmd-nav-item\s*\{[^}]*border:\s*2px solid/);
      expect(html).toMatch(/\.wmd-nav-item\s*\{[^}]*box-shadow/);
    });
  });

  describe('Breadcrumbs', () => {
    it('should render [[ A > B > C ]] as a breadcrumb nav', () => {
      const ast = parse('[[ Home > Products > Item ]]');
      const html = renderToHTML(ast, { style: 'sketch' });

      expect(html).toContain('wmd-breadcrumbs');
      expect(html).toContain('aria-label="breadcrumb"');
      expect(html).toContain('Home');
      expect(html).toContain('Products');
      expect(html).toContain('Item');
    });

    it('should render intermediate items as links and the last as current', () => {
      const ast = parse('[[ Docs > API > Reference ]]');
      const html = renderToHTML(ast, { style: 'sketch' });

      expect(html).toContain('<a href="#">Docs</a>');
      expect(html).toContain('<a href="#">API</a>');
      expect(html).toContain('wmd-breadcrumb-current');
      expect(html).toContain('aria-current="page"');
      expect(html).toContain('Reference');
      // last item should not be a link
      expect(html).not.toMatch(/<a[^>]*>Reference<\/a>/);
    });

    it('should not render [[ A > B ]] as a nav', () => {
      const ast = parse('[[ Home > Settings ]]');
      const html = renderToHTML(ast, { style: 'sketch' });

      expect(html).not.toContain('wmd-nav"');
      expect(html).toContain('wmd-breadcrumbs');
    });
  });

  describe('Grid Layout', () => {
    it('should render a 3-column grid', () => {
      const input = `
::: grid-3

### Feature One
Fast

### Feature Two
Secure

### Feature Three
Powerful

:::
      `.trim();

      const ast = parse(input);
      const html = renderToHTML(ast, { style: 'sketch' });

      expect(html).toContain('wmd-grid');
      expect(html).toContain('wmd-grid-3');
      expect(html).toContain('--grid-columns: 3');
      expect(html).toContain('wmd-grid-item');
      expect(html).toContain('Feature One');
      expect(html).toContain('Feature Two');
      expect(html).toContain('Feature Three');
    });

    it('should render wmd-grid-item-card class when card modifier is set', () => {
      const input = `
::: grid-3 card

### Fast
Quick

### Secure
Safe

:::
      `.trim();

      const ast = parse(input);
      const html = renderToHTML(ast, { style: 'sketch' });
      expect(html).toMatch(/class="[^"]*wmd-grid-item-card/);
    });

    it('should NOT render wmd-grid-item-card class without card modifier', () => {
      const input = `
::: grid-3

### Fast
Quick

:::
      `.trim();

      const ast = parse(input);
      const html = renderToHTML(ast, { style: 'sketch' });
      expect(html).not.toMatch(/class="[^"]*wmd-grid-item-card/);
    });

    it('should NOT render grid label text in output', () => {
      const input = `
::: grid-3

### Item One
Content

:::
      `.trim();

      const ast = parse(input);
      const html = renderToHTML(ast, { style: 'sketch' });
      expect(html).toMatch(/<div class="[^"]*wmd-grid[^"]*"/);
    });

    it('should render col-span class on grid item', () => {
      const input = `
::: grid-3

### Wide {.col-span-2}
Spans two columns

:::
      `.trim();

      const ast = parse(input);
      const html = renderToHTML(ast, { style: 'sketch' });
      expect(html).toMatch(/class="[^"]*wmd-col-span-2/);
    });

    it('should include col-span mobile reset in CSS', () => {
      const ast = parse('::: grid-3\n\n### Item\nContent\n\n:::');
      const html = renderToHTML(ast, { style: 'sketch' });
      expect(html).toMatch(/max-width:\s*768px[\s\S]*?col-span-2[\s\S]*?grid-column:\s*span 1/);
    });

    it('should render col-span combined with card modifier', () => {
      const input = `
::: grid-3 card

### Wide {.col-span-2}
Spans two

:::
      `.trim();

      const ast = parse(input);
      const html = renderToHTML(ast, { style: 'sketch' });
      expect(html).toMatch(/class="[^"]*wmd-grid-item-card/);
      expect(html).toMatch(/class="[^"]*wmd-col-span-2/);
    });
  });

  describe('Row layout rendering', () => {
    it('should render ::: row as a flex container', () => {
      const input = `
::: row

###
[All]*

###
[+ New]*

:::
      `.trim();

      const html = renderToHTML(parse(input), { style: 'sketch' });
      expect(html).toContain('wmd-row');
      expect(html).toContain('wmd-grid-item');
      expect(html).toContain('display: flex');
    });

    it('should ignore per-item alignment headings inside rows', () => {
      const input = `
::: row

### {.left}
[All]*

### {.right}
[+ New]*

:::
      `.trim();

      const html = renderToHTML(parse(input), { style: 'sketch' });
      expect(html).not.toMatch(/class="[^"]*wmd-grid-item[^"]*wmd-align-left/);
      expect(html).not.toMatch(/class="[^"]*wmd-grid-item[^"]*wmd-align-right/);
    });

    it('dropdown inside implicit row renders <select> with <option> elements (not a stray <ul>)', () => {
      const input = `
::: row

[Select Team_________v]
- All Teams
- Team A
- Team B

:::
      `.trim();

      const html = renderToHTML(parse(input), { style: 'clean' });
      expect(html).toContain('<select');
      expect(html).toContain('<option');
      expect(html).toContain('All Teams');
      expect(html).not.toMatch(/<ul[^>]*>[\s\S]*?All Teams/);
    });

    it('search + dropdown inside implicit row renders no stray bullet list', () => {
      const input = `
::: row

[Search_______________]{type:search}

[Select Team_________v]
- All Teams
- Team A

:::
      `.trim();

      const html = renderToHTML(parse(input), { style: 'clean' });
      expect(html).toContain('wmd-select');
      expect(html).not.toMatch(/<ul[\s\S]*?All Teams/);
    });

    it('should ignore center alignment headings inside rows', () => {
      const input = `
::: row

### {.center}
Centered

:::
      `.trim();

      const html = renderToHTML(parse(input), { style: 'sketch' });
      expect(html).not.toMatch(/class="[^"]*wmd-grid-item[^"]*wmd-align-center/);
    });
  });

  describe('Multiple inline button-links', () => {
    it('should render two [[btn](url)] on one line as button elements (not a paragraph)', () => {
      const ast = parse('[[Get Started](./about.md)]* [[See Features](./about.md)]');
      const html = renderToHTML(ast, { style: 'sketch' });
      // Must render as <a class="wmd-button..."> — not as a <p> wrapping raw links
      expect(html).toMatch(/<a href="\.\/about\.md" class="[^"]*wmd-button-primary[^"]*"[^>]*>Get Started<\/a>/);
      expect(html).toMatch(/<a href="\.\/about\.md" class="[^"]*wmd-button[^"]*"[^>]*>See Features<\/a>/);
      // Must not wrap in a <p> paragraph element with literal brackets
      expect(html).not.toMatch(/<p[^>]*wmd-paragraph/);
    });

    it('should render two [[btn](url)] on one line without literal bracket text', () => {
      const ast = parse('[[Docs](./docs.md)] [[API](./api.md)]');
      const html = renderToHTML(ast, { style: 'sketch' });
      // No literal ][ in the output (would appear between two paragraph-rendered links)
      expect(html).not.toMatch(/\].*\[/);
      expect(html).toMatch(/<a href="\.\/docs\.md" class="[^"]*wmd-button[^"]*"[^>]*>Docs<\/a>/);
      expect(html).toMatch(/<a href="\.\/api\.md" class="[^"]*wmd-button[^"]*"[^>]*>API<\/a>/);
    });
  });

  describe('Button links', () => {
    it('should render button with href as <a> tag', () => {
      const ast = parse('[Go to Docs]{href:./docs.md}');
      const html = renderToHTML(ast, { style: 'sketch' });
      expect(html).toMatch(/<a href="\.\/docs\.md" class="[^"]*wmd-button[^"]*"[^>]*>/);
      expect(html).not.toContain('<button');
    });

    it('should render primary button with href as <a> tag', () => {
      const ast = parse('[Get Started]*{href:./start.md}');
      const html = renderToHTML(ast, { style: 'sketch' });
      expect(html).toMatch(/<a href="\.\/start\.md"/);
      expect(html).toContain('wmd-button-primary');
    });

    it('should render [[Button](url)] as a clickable <a> button', () => {
      const ast = parse('[[Go to Docs](./docs.md)]');
      const html = renderToHTML(ast, { style: 'sketch' });
      expect(html).toMatch(/<a href="\.\/docs\.md" class="[^"]*wmd-button[^"]*"[^>]*>/);
      expect(html).not.toContain('<button');
    });

    it('should reset link styling on button <a> tags', () => {
      const ast = parse('[[Docs](./docs.md)]');
      const html = renderToHTML(ast, { style: 'sketch' });
      expect(html).toContain('text-decoration: none');
      expect(html).toContain('color: inherit');
    });

    it('should render [[Button]*(url)] as primary <a> button', () => {
      const ast = parse('[[Get Started](./start.md)]*');
      const html = renderToHTML(ast, { style: 'sketch' });
      expect(html).toMatch(/<a href="\.\/start\.md"/);
      expect(html).toContain('wmd-button-primary');
    });
  });

  describe('Dropdowns', () => {
    it('should render a dropdown with options', () => {
      const input = `
[Select topic___v]
- Sales
- Support
- Other
      `.trim();

      const ast = parse(input);
      const html = renderToHTML(ast, { style: 'sketch' });

      expect(html).toContain('<select');
      expect(html).toContain('wmd-select');
      expect(html).toContain('<option');
      expect(html).toContain('Sales');
      expect(html).toContain('Support');
      expect(html).toContain('Other');
    });
  });

  describe('Complete Form', () => {
    it('should render a complete contact form', () => {
      const input = `
## Contact Form

Name

[_____________________________]{required}

Email

[_____________________________]{type:email required}

[Submit]*
      `.trim();

      const ast = parse(input);
      const html = renderToHTML(ast, { style: 'sketch' });

      expect(html).toContain('<h2');
      expect(html).toContain('Contact Form');
      expect(html).toContain('type="text"');
      expect(html).toContain('type="email"');
      expect(html).toContain('required');
      expect(html).toContain('wmd-button-primary');
      expect(html).toContain('Submit');
    });
  });

  describe('Styles', () => {
    it('should render with sketch style', () => {
      const ast = parse('[Button]');
      const html = renderToHTML(ast, { style: 'sketch' });

      expect(html).toContain('wmd-sketch');
      expect(html).toContain('Comic Sans');
    });

    it('should render with clean style', () => {
      const ast = parse('[Button]');
      const html = renderToHTML(ast, { style: 'clean' });

      expect(html).toContain('wmd-clean');
      expect(html).toContain('Segoe UI');
    });

    it('should render with wireframe style', () => {
      const ast = parse('[Button]');
      const html = renderToHTML(ast, { style: 'wireframe' });

      expect(html).toContain('wmd-wireframe');
      expect(html).toContain('repeating-linear-gradient');
    });

    it('should render with none style', () => {
      const ast = parse('[Button]');
      const html = renderToHTML(ast, { style: 'none' });

      expect(html).toContain('wmd-none');
      expect(html).toContain('<button');
    });
  });

  describe('Grid inside container', () => {
    it('should render a grid nested inside a card container', () => {
      const input = `
::: card

::: grid-3

### Fast
Quick

### Secure
Safe

### Powerful
Strong

:::

:::
      `.trim();
      const ast = parse(input);
      const html = renderToHTML(ast, { style: 'sketch' });
      // Must produce an actual grid div, not just CSS class strings
      expect(html).toMatch(/<div class="[^"]*wmd-grid[^"]*wmd-grid-3[^"]*"/);
      expect(html).toMatch(/<div class="[^"]*wmd-grid-item[^"]*">/);
      expect(html).toContain('Fast');
      expect(html).toContain('Secure');
      expect(html).toContain('Powerful');
    });

    it('should render a grid nested inside sidebar-main layout main section', () => {
      const input = `
::: layout {.sidebar-main}

::: sidebar
Nav
:::

::: main

::: grid-3

### Done
48

### Active
12

### Pending
5

:::

:::

:::
      `.trim();
      const ast = parse(input);
      const html = renderToHTML(ast, { style: 'sketch' });
      expect(html).toMatch(/<div class="[^"]*wmd-grid[^"]*wmd-grid-3[^"]*"/);
      expect(html).toMatch(/<div class="[^"]*wmd-grid-item[^"]*">/);
      expect(html).toContain('Done');
      expect(html).toContain('Active');
      expect(html).toContain('Pending');
    });
  });

  describe('Sidebar Layout', () => {
    const sidebarInput = `
::: layout {.sidebar-main}

::: sidebar
- [Home](#)
- [Settings](#)

:::

::: main

### Dashboard
Content here

:::

:::
    `.trim();

    it('should render sidebar-main layout with correct wrapper class', () => {
      const ast = parse(sidebarInput);
      const html = renderToHTML(ast, { style: 'sketch' });
      expect(html).toContain('wmd-container-layout');
      expect(html).toContain('wmd-sidebar-main');
    });

    it('should render sidebar and main sections as separate divs', () => {
      const ast = parse(sidebarInput);
      const html = renderToHTML(ast, { style: 'sketch' });
      expect(html).toContain('wmd-layout-sidebar');
      expect(html).toContain('wmd-layout-main');
    });

    it('should NOT render the section heading labels as visible text', () => {
      const ast = parse(sidebarInput);
      const html = renderToHTML(ast, { style: 'sketch' });
      // Heading text "Sidebar" and "Main" used as structural markers should not appear in output
      expect(html).not.toMatch(/<h\d[^>]*>[^<]*\bSidebar\b/);
      expect(html).not.toMatch(/<h\d[^>]*>[^<]*\bMain\b/);
    });

    it('should place sidebar content inside layout-sidebar div', () => {
      const ast = parse(sidebarInput);
      const html = renderToHTML(ast, { style: 'sketch' });
      // Extract just the body content (after </style>) to avoid CSS false positives
      const bodyStart = html.indexOf('</style>');
      const body = html.slice(bodyStart);
      const sidebarDivPos = body.indexOf('class="wmd-layout-sidebar"');
      const mainDivPos = body.indexOf('class="wmd-layout-main"');
      const homePos = body.indexOf('>Home<');
      expect(sidebarDivPos).toBeGreaterThan(-1);
      expect(homePos).toBeGreaterThan(sidebarDivPos);
      expect(homePos).toBeLessThan(mainDivPos);
    });

    it('should place main content inside layout-main div', () => {
      const ast = parse(sidebarInput);
      const html = renderToHTML(ast, { style: 'sketch' });
      const bodyStart = html.indexOf('</style>');
      const body = html.slice(bodyStart);
      const mainDivPos = body.indexOf('class="wmd-layout-main"');
      const dashPos = body.indexOf('Dashboard');
      expect(dashPos).toBeGreaterThan(mainDivPos);
    });

    it('should include sidebar-main grid CSS', () => {
      const ast = parse(sidebarInput);
      const html = renderToHTML(ast, { style: 'sketch' });
      expect(html).toMatch(/grid-template-columns:\s*\d+px\s+1fr/);
    });

    it('should include container-sidebar CSS', () => {
      const ast = parse('::: sidebar\n- [Home](#)\n:::\n');
      const html = renderToHTML(ast, { style: 'sketch' });
      expect(html).toContain('wmd-container-sidebar');
      expect(html).toMatch(/\.wmd-container-sidebar\s*\{/);
    });

    it('should infer sidebar-main layout from standalone sidebar followed by content', () => {
      const ast = parse(`
::: sidebar
[Dashboard]*
[Projects]
:::

## Dashboard
Content here
      `.trim());
      const html = renderToHTML(ast, { style: 'sketch' });
      const bodyStart = html.indexOf('</style>');
      const body = html.slice(bodyStart);
      const layoutPos = body.indexOf('class="wmd-container-layout wmd-sidebar-main"');
      const sidebarPos = body.indexOf('class="wmd-layout-sidebar"');
      const mainPos = body.indexOf('class="wmd-layout-main"');
      const dashboardButtonPos = body.indexOf('>Dashboard</button>');
      const headingPos = body.indexOf('<h2');

      expect(layoutPos).toBeGreaterThan(-1);
      expect(sidebarPos).toBeGreaterThan(layoutPos);
      expect(mainPos).toBeGreaterThan(sidebarPos);
      expect(dashboardButtonPos).toBeGreaterThan(sidebarPos);
      expect(dashboardButtonPos).toBeLessThan(mainPos);
      expect(headingPos).toBeGreaterThan(mainPos);
    });

    it('should keep leading content above an inferred sidebar-main layout', () => {
      const ast = parse(`
[[ App | [Dashboard] | [Settings] ]]

::: sidebar
[Dashboard]*
:::

## Dashboard
      `.trim());
      const html = renderToHTML(ast, { style: 'sketch' });
      const bodyStart = html.indexOf('</style>');
      const body = html.slice(bodyStart);
      const navPos = body.indexOf('class="wmd-nav"');
      const layoutPos = body.indexOf('class="wmd-container-layout wmd-sidebar-main"');

      expect(navPos).toBeGreaterThan(-1);
      expect(layoutPos).toBeGreaterThan(navPos);
    });
  });

  describe('Tabs', () => {
    const input = `
::: tabs

::: tab Overview
Overview panel

:::

::: tab Details
Details panel

:::

:::
    `.trim();

    it('should render a tabs container with headers and panels', () => {
      const ast = parse(input);
      const html = renderToHTML(ast, { style: 'sketch' });
      expect(html).toContain('wmd-tabs');
      expect(html).toContain('wmd-tab-header');
      expect(html).toContain('wmd-tab-panel');
    });

    it('should render tab labels as header buttons', () => {
      const ast = parse(input);
      const html = renderToHTML(ast, { style: 'sketch' });
      expect(html).toMatch(/<button[^>]*wmd-tab-header[^>]*>Overview<\/button>/);
      expect(html).toMatch(/<button[^>]*wmd-tab-header[^>]*>Details<\/button>/);
    });

    it('should mark the active header with wmd-active', () => {
      const ast = parse(input);
      const html = renderToHTML(ast, { style: 'sketch' });
      const headerMatches = [...html.matchAll(/<button[^>]*class="([^"]*)"[^>]*>(Overview|Details)<\/button>/g)];
      expect(headerMatches).toHaveLength(2);
      const overviewClasses = headerMatches.find((m) => m[2] === 'Overview')![1];
      const detailsClasses = headerMatches.find((m) => m[2] === 'Details')![1];
      expect(overviewClasses).toContain('wmd-active');
      expect(detailsClasses).not.toContain('wmd-active');
    });

    it('should hide inactive panels via the hidden attribute', () => {
      const ast = parse(input);
      const html = renderToHTML(ast, { style: 'sketch' });
      const panels = [...html.matchAll(/<div[^>]*data-wmd-tab-panel="\d+"[^>]*>/g)].map((m) => m[0]);
      expect(panels).toHaveLength(2);
      expect(panels[0]).not.toContain('hidden');
      expect(panels[1]).toContain('hidden');
    });

    it('should render panel children', () => {
      const ast = parse(input);
      const html = renderToHTML(ast, { style: 'sketch' });
      expect(html).toContain('Overview panel');
      expect(html).toContain('Details panel');
    });

    it('should inject a tabs interactivity script', () => {
      const ast = parse(input);
      const html = renderToHTML(ast, { style: 'sketch' });
      expect(html).toMatch(/<script>[\s\S]*wmd-tab-header[\s\S]*<\/script>/);
    });
  });

  describe('JSON Renderer', () => {
    it('should render to JSON', () => {
      const ast = parse('[Button]');
      const json = renderToJSON(ast);

      expect(json).toContain('"type": "document"');
      expect(json).toContain('"type": "button"');
      expect(json).toContain('"content": "Button"');
    });

    it('should render compact JSON', () => {
      const ast = parse('[Button]');
      const json = renderToJSON(ast, { pretty: false });

      expect(json).not.toContain('\n');
      expect(json).toContain('"type":"document"');
    });
  });

  describe('Row — labeled input (form-group) renders as block inside flex item', () => {
    it('should render form-group inside row as grid-item containing form-group, not button-group', () => {
      const md = `::: row\n\nSearch\n[Search__________________________]\n\n:::`;
      const html = renderToHTML(parse(md), { style: 'clean' });
      expect(html).toContain('wmd-container-form-group');
      expect(html).not.toMatch(/wmd-container-button-group[^"]*">\s*Search/);
    });

    it('CSS: row input override must use child combinator (>) not descendant ( ) to avoid breaking form-groups', () => {
      const md = `::: row\n\nSearch\n[Search__________________________]\n\n:::`;
      const html = renderToHTML(parse(md), { style: 'clean' });
      // Descendant selector ".wmd-row .wmd-input" would override block display inside form-groups.
      // Must use child combinator: ".wmd-row > .wmd-grid-item > .wmd-input" instead.
      expect(html).not.toMatch(/\.wmd-row\s+\.wmd-input/);
    });
  });

  describe('Badge/Pill Components', () => {
    it('should render a basic badge', () => {
      const ast = parse('((Active))');
      const html = renderToHTML(ast, { style: 'sketch' });
      expect(html).toContain('<span');
      expect(html).toContain('wmd-badge');
      expect(html).toContain('Active');
    });

    it('should render a badge with success variant', () => {
      const ast = parse('((Active)){.success}');
      const html = renderToHTML(ast, { style: 'sketch' });
      expect(html).toContain('wmd-badge-success');
      expect(html).toContain('Active');
    });

    it('should render a warning badge', () => {
      const ast = parse('((3)){.warning}');
      const html = renderToHTML(ast, { style: 'clean' });
      expect(html).toContain('wmd-badge-warning');
      expect(html).toContain('>3<');
    });

    it('should render a badge in all styles', () => {
      const ast = parse('((Beta)){.primary}');
      for (const style of ['sketch', 'clean', 'wireframe', 'none', 'tailwind', 'material', 'brutal'] as const) {
        const html = renderToHTML(ast, { style });
        expect(html).toContain('wmd-badge');
        expect(html).toContain('Beta');
      }
    });

    it('should render badges mixed with text', () => {
      const ast = parse('Status: ((Active)){.success}');
      const html = renderToHTML(ast, { style: 'clean' });
      expect(html).toContain('Status:');
      expect(html).toContain('wmd-badge-success');
      expect(html).toContain('Active');
    });
  });

  describe('::: container-based layout rendering', () => {
    it('should render ::: grid-3 as a 3-column grid', () => {
      const input = `
::: grid-3

### Feature One
Fast

### Feature Two
Secure

### Feature Three
Powerful

:::
      `.trim();
      const html = renderToHTML(parse(input), { style: 'sketch' });
      expect(html).toContain('wmd-grid');
      expect(html).toContain('wmd-grid-3');
      expect(html).toContain('--grid-columns: 3');
      expect(html).toContain('Feature One');
      expect(html).toContain('Feature Two');
    });

    it('should render ::: grid-3 card with card class on items', () => {
      const input = `
::: grid-3 card

### Fast
Quick

### Secure
Safe

:::
      `.trim();
      const html = renderToHTML(parse(input), { style: 'sketch' });
      expect(html).toMatch(/class="[^"]*wmd-grid-item-card/);
    });

    it('should render ::: row as a flex container', () => {
      const input = `
::: row

[All]* [Active]

[+ New]*

:::
      `.trim();
      const html = renderToHTML(parse(input), { style: 'sketch' });
      expect(html).toContain('wmd-row');
    });

    it('should render ::: tabs with tab headers and panels', () => {
      const input = `
::: tabs

::: tab Overview
Overview text

:::

::: tab Details
[Buy Now]*

:::

:::
      `.trim();
      const html = renderToHTML(parse(input), { style: 'sketch' });
      expect(html).toContain('wmd-tabs');
      expect(html).toContain('Overview');
      expect(html).toContain('Details');
    });

    it('should render ::: layout {.sidebar-main} with nested ::: sidebar and ::: main', () => {
      const input = `
::: layout {.sidebar-main}

::: sidebar
- [Home](#)
:::

::: main
### Page Title
Content
:::

:::
      `.trim();
      const html = renderToHTML(parse(input), { style: 'sketch' });
      expect(html).toContain('wmd-layout-sidebar');
      expect(html).toContain('wmd-layout-main');
      expect(html).toContain('Page Title');
    });
  });

  describe('Demo block (::: demo)', () => {
    it('renders a two-column layout with preview and code panes', () => {
      const html = renderToHTML(parse(`::: demo
[Click Me]*
:::`), { style: 'clean' });
      expect(html).toContain('wmd-demo-preview');
      expect(html).toContain('wmd-demo-code');
    });

    it('renders the wiremd components in the preview pane', () => {
      const html = renderToHTML(parse(`::: demo
[Submit]*
:::`), { style: 'sketch' });
      expect(html).toContain('wmd-button');
    });

    it('shows the raw wiremd source in the code pane', () => {
      const html = renderToHTML(parse(`::: demo
## Login Form

[_____________________________]{required}
:::`), { style: 'clean' });
      expect(html).toContain('## Login Form');
      expect(html).toContain('[_____________________________]{required}');
    });

    it('HTML-escapes angle brackets in the raw source', () => {
      const html = renderToHTML(parse(`::: demo
## Heading <with brackets>
:::`), { style: 'clean' });
      expect(html).toContain('&lt;with brackets&gt;');
      expect(html).not.toContain('<with brackets>');
    });

    it('renders a copy button in the code pane', () => {
      const html = renderToHTML(parse(`::: demo
[Click Me]*
:::`), { style: 'clean' });
      expect(html).toContain('wmd-demo-copy');
      expect(html).toContain('Copy');
    });

    it('shows table syntax in the code pane', () => {
      const html = renderToHTML(parse(`::: demo
| Name | Role |
|------|------|
| Alice | Admin |

:::`), { style: 'clean' });
      expect(html).toContain('| Name');
      expect(html).toContain('| Alice');
    });

    it('shows ::: grid-3 card on one line in the code pane', () => {
      const html = renderToHTML(parse(`
::: demo

::: grid-3 card

### A
content

### B
content

:::

:::`), { style: 'clean' });
      expect(html).toContain('::: grid-3 card');
    });
  });

  describe('Comment Nodes', () => {
    it('routes comment to side panel, not inline span', () => {
      const html = renderToHTML(parse('<!-- Is this right? @tobias -->'), { style: 'sketch' });
      expect(html).not.toContain('<span class="wmd-comment">');
      expect(html).toContain('wmd-comments-panel');
      expect(html).toContain('Is this right? @tobias');
    });

    it('renders side panel when showComments: true', () => {
      const html = renderToHTML(parse('<!-- hello -->'), { style: 'sketch', showComments: true });
      expect(html).toContain('wmd-comments-panel');
      expect(html).toContain('hello');
    });

    it('hides comment when showComments: false', () => {
      const html = renderToHTML(parse('<!-- hello -->'), { style: 'sketch', showComments: false });
      expect(html).not.toContain('<span class="wmd-comment">');
      expect(html).not.toContain('>hello<');
      expect(html).not.toContain('<aside class="wmd-comments-panel">');
    });

    it('retains sibling nodes when showComments: false', () => {
      const html = renderToHTML(parse('<!-- hidden -->\n[Sign Up]*'), { style: 'sketch', showComments: false });
      expect(html).not.toContain('<aside class="wmd-comments-panel">');
      expect(html).toContain('Sign Up');
    });

    it('annotates following element with wmd-annotated and badge', () => {
      const html = renderToHTML(parse('<!-- note -->\n[Sign Up]*'), { style: 'sketch', showComments: true });
      expect(html).toContain('wmd-annotated');
      expect(html).toContain('wmd-comment-badge');
      expect(html.indexOf('wmd-comment-badge')).toBeLessThan(html.indexOf('Sign Up'));
    });

    it('comment CSS is present in inline-styles output', () => {
      const html = renderToHTML(parse('<!-- x -->'), { style: 'sketch', inlineStyles: true });
      expect(html).toContain('.wmd-comment');
      expect(html).toContain('.wmd-comments-panel');
    });

    it('escapes HTML special chars in comment text', () => {
      const html = renderToHTML(parse('<!-- <script>alert(1)</script> -->'), { style: 'sketch', showComments: true });
      expect(html).not.toContain('<script>');
      expect(html).toContain('wmd-comments-panel');
    });

    it('works with all styles', () => {
      const styles = ['sketch', 'clean', 'wireframe', 'material', 'brutal'] as const;
      for (const style of styles) {
        const html = renderToHTML(parse('<!-- test -->\n[Btn]*'), { style, showComments: true });
        expect(html).toContain('wmd-comments-panel');
        expect(html).toContain('wmd-annotated');
      }
    });

    it('comment inside a grid cell routes to side panel, not inline', () => {
      const md = '::: grid-2\n\n### Left\n\n### {.right}\n\n<!-- check this -->\n[Action]*\n\n:::';
      const html = renderToHTML(parse(md), { style: 'sketch', showComments: true });
      expect(html).not.toContain('<span class="wmd-comment">');
      expect(html).toContain('wmd-comments-panel');
      expect(html).toContain('check this');
    });

    it('comment inside a card routes to side panel, not inline', () => {
      const md = '::: card\n\n<!-- card note -->\n[Action]*\n\n:::';
      const html = renderToHTML(parse(md), { style: 'sketch', showComments: true });
      expect(html).not.toContain('<span class="wmd-comment">');
      expect(html).toContain('wmd-comments-panel');
      expect(html).toContain('card note');
    });

    it('comment inside a tab panel routes to side panel, not inline', () => {
      const md = '::: tabs\n\n::: tab One\n\n<!-- tab note -->\n[Action]*\n\n:::\n\n:::';
      const html = renderToHTML(parse(md), { style: 'sketch', showComments: true });
      expect(html).not.toContain('<span class="wmd-comment">');
      expect(html).toContain('wmd-comments-panel');
      expect(html).toContain('tab note');
    });

    it('consecutive comments form a single thread', () => {
      const md = '<!-- msg 1 -->\n<!-- msg 2 -->\n[Submit]*';
      const html = renderToHTML(parse(md), { style: 'sketch', showComments: true });
      expect(html).toContain('msg 1');
      expect(html).toContain('msg 2');
      expect(html).toContain('wmd-comment-msg-divider');
      // Only one annotated element → one element badge
      expect(html.match(/class="wmd-comment-badge"/g)?.length).toBe(1);
    });

    it('panel count reflects thread count not individual comment count', () => {
      const md = '<!-- a -->\n<!-- b -->\n[Btn1]*\n\n<!-- c -->\n[Btn2]*';
      const html = renderToHTML(parse(md), { style: 'sketch', showComments: true });
      // 2 threads: {a,b} and {c}
      expect(html).toContain('wmd-comments-panel-count">2<');
    });

    it('comment above a card annotates the card, not its first child', () => {
      const md = '<!-- verify card -->\n::: card\n## Inner Heading\ncontent\n:::';
      const html = renderToHTML(parse(md), { style: 'sketch', showComments: true });
      // wmd-annotated wrapper must open before the card container div
      expect(html.indexOf('wmd-annotated')).toBeLessThan(html.indexOf('wmd-container-card'));
      // only one badge — not one on card and another on the heading inside
      expect(html.match(/class="wmd-comment-badge"/g)?.length).toBe(1);
    });

    it('comment above a card does not leak into children of the card', () => {
      const md = '<!-- outer -->\n::: card\n## Title\n[Action]*\n:::';
      const html = renderToHTML(parse(md), { style: 'sketch', showComments: true });
      // exactly one annotated wrapper — not one on the card and one inside it
      expect((html.match(/class="wmd-annotated"/g) || []).length).toBe(1);
    });

    it('comment above a grid annotates the whole grid, not the first cell', () => {
      const md = '<!-- grid note -->\n::: grid-2\n\n### Col A\n\n### Col B\n\n:::';
      const html = renderToHTML(parse(md), { style: 'sketch', showComments: true });
      expect(html.indexOf('class="wmd-annotated"')).toBeLessThan(html.indexOf('class="wmd-grid '));
      expect(html.match(/class="wmd-comment-badge"/g)?.length).toBe(1);
    });

    it('comment before a grid cell heading annotates that cell, not the previous one', () => {
      const md = '::: grid-2\n\n### Col A\ncontent A\n\n<!-- check Col B -->\n### Col B\ncontent B\n\n:::';
      const html = renderToHTML(parse(md), { style: 'sketch', showComments: true });
      expect(html).toContain('check Col B');
      expect(html).toContain('wmd-comments-panel');
      // Only one badge — Col A must not be annotated
      expect(html.match(/class="wmd-comment-badge"/g)?.length).toBe(1);
    });

    it('comment before a grid cell annotates the whole grid-item div, not a child inside', () => {
      const md = '::: grid-2\n\n### Col A\ncontent A\n\n<!-- whole card -->\n### Col B\ncontent B\n\n:::';
      const html = renderToHTML(parse(md), { style: 'sketch', showComments: true });
      // wmd-annotated wrapper must open before the annotated grid-item's class attribute
      // Use the HTML attribute form to avoid matching CSS selectors in <style>
      const annotatedPos = html.indexOf('class="wmd-annotated"');
      const secondGridItemPos = html.indexOf('class="wmd-grid-item"', html.indexOf('class="wmd-grid-item"') + 1);
      expect(annotatedPos).toBeGreaterThan(0);
      expect(annotatedPos).toBeLessThan(secondGridItemPos);
    });

    it('comment before a row item annotates that item, not the previous one', () => {
      const md = '::: row\n\n### Search\n[Search___]{type:search}\n\n<!-- fix label -->\n### Filter\n[Filter v]\n\n:::';
      const html = renderToHTML(parse(md), { style: 'sketch', showComments: true });
      expect(html).toContain('fix label');
      expect(html.match(/class="wmd-comment-badge"/g)?.length).toBe(1);
    });

    it('comment inside a sidebar section routes to side panel, not inline', () => {
      const md = '::: layout {.sidebar-main}\n\n::: sidebar\n\n<!-- sidebar note -->\n[[Nav Item](#)]\n\n:::\n\n::: main\n\n### Content\n\n:::\n\n:::';
      const html = renderToHTML(parse(md), { style: 'sketch', showComments: true });
      expect(html).not.toContain('<span class="wmd-comment">');
      expect(html).toContain('<aside class="wmd-comments-panel">');
      expect(html).toContain('sidebar note');
    });

    it('comment above a tabs block annotates the whole tabs container', () => {
      const md = '<!-- tabs note -->\n::: tabs\n\n::: tab A\n\n### Content A\n\n:::\n\n:::';
      const html = renderToHTML(parse(md), { style: 'sketch', showComments: true });
      expect(html.indexOf('class="wmd-annotated"')).toBeLessThan(html.indexOf('class="wmd-tabs"'));
      expect(html.match(/class="wmd-comment-badge"/g)?.length).toBe(1);
    });

    it('comment inside a tab panel adds annotation dot class to that tab header', () => {
      const md = '::: tabs\n\n::: tab One\n\n<!-- check this -->\n[Action]*\n\n:::\n\n::: tab Two\n\n### Clean\n\n:::\n\n:::';
      const html = renderToHTML(parse(md), { style: 'sketch', showComments: true });
      expect(html).toContain('wmd-tab-header-annotated');
      // only the first tab header gets the dot, not the second
      const firstHeaderPos = html.indexOf('data-wmd-tab="0"');
      const secondHeaderPos = html.indexOf('data-wmd-tab="1"');
      const dotPos = html.indexOf('wmd-tab-header-annotated');
      expect(dotPos).toBeLessThan(secondHeaderPos);
      expect(dotPos).toBeGreaterThan(0);
      expect(html.indexOf('data-wmd-tab="1"')).toBeGreaterThan(firstHeaderPos);
      // tab with no comment must not have the dot class
      const secondHeader = html.slice(secondHeaderPos, secondHeaderPos + 120);
      expect(secondHeader).not.toContain('wmd-tab-header-annotated');
    });

    it('tab without comment does not get annotation dot class on the button', () => {
      const md = '::: tabs\n\n::: tab One\n\n### No comment\n\n:::\n\n:::';
      const html = renderToHTML(parse(md), { style: 'sketch', showComments: true });
      // The class must not appear on any tab-header button element
      expect(html).not.toMatch(/<button[^>]*wmd-tab-header-annotated/);
    });

    it('annotation dot CSS uses ::after pseudo-element, not outline', () => {
      const html = renderToHTML(parse('<!-- x -->\n[Btn]*'), { style: 'sketch', inlineStyles: true });
      expect(html).toContain('tab-header-annotated::after');
      expect(html).not.toMatch(/tab-header-annotated[^{]*\{[^}]*outline/);
    });
  });

  describe('Cursor Sync', () => {
    it('cursorSync: false emits no cursor script or CSS', () => {
      const html = renderToHTML(parse('# Hello'), { style: 'sketch', cursorSync: false });
      expect(html).not.toContain('wiremd-cursor');
      expect(html).not.toContain('data-cursor-active');
    });

    it('cursorSync: true emits cursor script and CSS', () => {
      const html = renderToHTML(parse('# Hello'), { style: 'sketch', cursorSync: true });
      expect(html).toContain('wiremd-cursor');
      expect(html).toContain('data-cursor-active');
    });

    it('cursorSync script handles wiremd-cursor-blur message', () => {
      const html = renderToHTML(parse('# Hello'), { style: 'sketch', cursorSync: true });
      expect(html).toContain('wiremd-cursor-blur');
      expect(html).toContain('removeAttribute(\'data-cursor-active\')');
    });

    it('cursorSync script does not set data-cursor-active on tab button', () => {
      const html = renderToHTML(parse('# Hello'), { style: 'sketch', cursorSync: true });
      // activateTab must NOT call setAttribute('data-cursor-active') on tab buttons
      const scriptMatch = html.match(/<script>[\s\S]*?<\/script>/g)?.find(s => s.includes('wiremd-cursor'));
      expect(scriptMatch).toBeTruthy();
      const activateTabBody = scriptMatch!.match(/function activateTab[\s\S]*?\}/)?.[0] ?? '';
      expect(activateTabBody).not.toContain('data-cursor-active');
    });

    it('data-source-line is present on heading, paragraph, table, blockquote, list', () => {
      const md = '## Title\n\nSome text.\n\n| A | B |\n|---|---|\n| 1 | 2 |\n\n> note\n\n- item';
      const html = renderToHTML(parse(md), { style: 'sketch', cursorSync: true });
      expect(html).toContain('data-source-line');
    });

    it('data-source-line is present on container, grid, row, nav', () => {
      const md = '::: card\n[Btn]*\n\n:::\n\n::: grid-2\n### A\n### B\n:::\n\n[[ Home | About ]]\n';
      const html = renderToHTML(parse(md), { style: 'sketch', cursorSync: true });
      expect(html).toContain('data-source-line');
    });

    it('data-source-line is present on tabs container', () => {
      const md = '::: tabs\n\n::: tab A\n### Content\n:::\n\n:::';
      const html = renderToHTML(parse(md), { style: 'sketch', cursorSync: true });
      expect(html).toMatch(/data-wmd-tabs[^>]*data-source-line|data-source-line[^>]*data-wmd-tabs/);
    });
  });
});

describe('countCommentThreads', () => {
  it('returns 0 with no comments', () => {
    expect(countCommentThreads(parse('[Btn]*'))).toBe(0);
  });

  it('returns 1 for a single comment', () => {
    expect(countCommentThreads(parse('<!-- a -->\n[Btn]*'))).toBe(1);
  });

  it('consecutive comments count as one thread', () => {
    expect(countCommentThreads(parse('<!-- a -->\n<!-- b -->\n[Btn]*'))).toBe(1);
  });

  it('non-consecutive comments count as separate threads', () => {
    expect(countCommentThreads(parse('<!-- a -->\n[Btn1]*\n\n<!-- b -->\n[Btn2]*'))).toBe(2);
  });

  it('three threads', () => {
    expect(countCommentThreads(parse('<!-- a -->\n<!-- b -->\n[Btn1]*\n\n<!-- c -->\n[Btn2]*'))).toBe(2);
  });

  it('matches the panel count from renderToHTML', () => {
    const md = '<!-- a -->\n<!-- b -->\n[Btn1]*\n\n<!-- c -->\n[Btn2]*';
    const html = renderToHTML(parse(md), { style: 'sketch', showComments: true });
    const match = html.match(/wmd-comments-panel-count">(\d+)</);
    expect(countCommentThreads(parse(md))).toBe(Number(match?.[1]));
  });

  it('counts comments inside nested containers', () => {
    expect(countCommentThreads(parse('::: card\n<!-- inner -->\n[Btn]*\n\n:::\n'))).toBe(1);
  });

  it('counts threads across top-level and nested containers', () => {
    const md = '<!-- top -->\n[Btn1]*\n\n::: card\n<!-- inner -->\n[Btn2]*\n\n:::\n';
    expect(countCommentThreads(parse(md))).toBe(2);
  });
});
