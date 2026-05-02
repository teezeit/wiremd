import { describe, it, expect } from 'vitest';
import { parse } from '../src/parser/index.js';

describe('Parser', () => {
  describe('Basic Parsing', () => {
    it('should parse an empty document', () => {
      const result = parse('');
      expect(result.type).toBe('document');
      expect(result.version).toBe('0.1');
      expect(result.children).toEqual([]);
    });

    it('should parse a simple heading', () => {
      const result = parse('# Hello World');
      expect(result.type).toBe('document');
      expect(result.children).toHaveLength(1);
      expect(result.children[0].type).toBe('heading');
      expect(result.children[0]).toMatchObject({
        type: 'heading',
        level: 1,
        content: 'Hello World',
      });
    });

    it('should parse a paragraph', () => {
      const result = parse('This is a paragraph.');
      expect(result.children).toHaveLength(1);
      expect(result.children[0].type).toBe('paragraph');
      expect(result.children[0]).toMatchObject({
        type: 'paragraph',
        content: 'This is a paragraph.',
      });
    });
  });

  describe('Button Syntax', () => {
    it('should parse a basic button', () => {
      const result = parse('[Click Me]');
      expect(result.children).toHaveLength(1);
      expect(result.children[0]).toMatchObject({
        type: 'button',
        content: 'Click Me',
      });
    });

    it('should parse a primary button with * suffix', () => {
      const result = parse('[Submit]*');
      expect(result.children[0]).toMatchObject({
        type: 'button',
        content: 'Submit',
        props: {
          variant: 'primary',
        },
      });
    });

    it('should parse no-dot button variant tokens', () => {
      const result = parse('[Delete]{danger}');
      expect(result.children[0]).toMatchObject({
        type: 'button',
        content: 'Delete',
        props: {
          variant: 'danger',
        },
      });
    });

    it('should parse no-dot button state tokens', () => {
      const result = parse('[Submit]{disabled}');
      expect(result.children[0]).toMatchObject({
        type: 'button',
        content: 'Submit',
        props: {
          state: 'disabled',
        },
      });
    });

    it('should parse a button with class attribute', () => {
      const result = parse('[Click Me]{.primary}');
      expect(result.children[0]).toMatchObject({
        type: 'button',
        content: 'Click Me',
        props: {
          classes: ['primary'],
        },
      });
    });

    it('should parse button with text after', () => {
      const result = parse('[Sign In] Forgot password?');
      expect(result.children[0]).toMatchObject({
        type: 'paragraph',
      });
      expect(result.children[0].children).toHaveLength(2);
      expect(result.children[0].children[0]).toMatchObject({
        type: 'button',
        content: 'Sign In',
      });
      expect(result.children[0].children[1]).toMatchObject({
        type: 'text',
        content: ' Forgot password?',
      });
    });

    it('should parse text with button after', () => {
      const result = parse("Don't have an account? [Sign Up]");
      expect(result.children[0]).toMatchObject({
        type: 'paragraph',
      });
      expect(result.children[0].children).toHaveLength(2);
      expect(result.children[0].children[0]).toMatchObject({
        type: 'text',
        content: "Don't have an account? ",
      });
      expect(result.children[0].children[1]).toMatchObject({
        type: 'button',
        content: 'Sign Up',
      });
    });

    it('should parse multiple buttons with text', () => {
      const result = parse('[Save] or [Cancel] this operation');
      expect(result.children[0]).toMatchObject({
        type: 'paragraph',
      });
      expect(result.children[0].children).toHaveLength(4);
      expect(result.children[0].children[0].type).toBe('button');
      expect(result.children[0].children[1].type).toBe('text');
      expect(result.children[0].children[2].type).toBe('button');
      expect(result.children[0].children[3].type).toBe('text');
    });
  });

  describe('Badge Syntax', () => {
    it('should parse no-dot badge variant tokens', () => {
      const result = parse('((Active)){success}');
      expect(result.children[0]).toMatchObject({
        type: 'badge',
        content: 'Active',
        props: {
          variant: 'success',
        },
      });
    });
  });

  describe('Input Syntax', () => {
    it('should parse a basic text input', () => {
      const result = parse('[_____]');
      expect(result.children[0]).toMatchObject({
        type: 'input',
      });
    });

    it('should parse a password input', () => {
      const result = parse('[*****]');
      expect(result.children[0]).toMatchObject({
        type: 'input',
        props: {
          inputType: 'password',
        },
      });
    });

    it('should parse an input with type attribute', () => {
      const result = parse('[Email___]{type:email}');
      expect(result.children[0]).toMatchObject({
        type: 'input',
        props: {
          type: 'email',
        },
      });
    });

    it('should parse an input with required attribute', () => {
      const result = parse('[Name___]{required}');
      expect(result.children[0]).toMatchObject({
        type: 'input',
        props: {
          required: true,
        },
      });
    });

    it('should parse no-dot input state tokens', () => {
      const result = parse('[not-an-email___________]{error}');
      expect(result.children[0]).toMatchObject({
        type: 'input',
        props: {
          state: 'error',
        },
      });
    });
  });

  describe('Checkbox Syntax', () => {
    it('should parse an unchecked checkbox', () => {
      const result = parse('- [ ] Unchecked item');
      expect(result.children[0]).toMatchObject({
        type: 'list',
      });
      expect(result.children[0].children[0]).toMatchObject({
        type: 'checkbox',
        label: 'Unchecked item',
        checked: false,
      });
    });

    it('should parse a checked checkbox', () => {
      const result = parse('- [x] Checked item');
      expect(result.children[0].children[0]).toMatchObject({
        type: 'checkbox',
        label: 'Checked item',
        checked: true,
      });
    });

    it('should parse standalone unchecked checkbox', () => {
      const result = parse('[ ] Remember me');
      expect(result.children[0]).toMatchObject({
        type: 'checkbox',
        label: 'Remember me',
        checked: false,
      });
    });

    it('should parse standalone checked checkbox', () => {
      const result = parse('[x] Keep me logged in');
      expect(result.children[0]).toMatchObject({
        type: 'checkbox',
        label: 'Keep me logged in',
        checked: true,
      });
    });

    it('should parse standalone checkbox with uppercase X', () => {
      const result = parse('[X] Agree to terms');
      expect(result.children[0]).toMatchObject({
        type: 'checkbox',
        label: 'Agree to terms',
        checked: true,
      });
    });
  });

  describe('Switch Syntax', () => {
    it('should parse an unchecked switch', () => {
      const result = parse('[Notifications]{switch}');
      expect(result.children[0]).toMatchObject({
        type: 'switch',
        label: 'Notifications',
        checked: false,
        props: {},
      });
    });

    it('should parse a checked switch', () => {
      const result = parse('[Dark mode]{switch checked}');
      expect(result.children[0]).toMatchObject({
        type: 'switch',
        label: 'Dark mode',
        checked: true,
      });
    });

    it('should parse a disabled switch', () => {
      const result = parse('[Auto-save]{switch disabled}');
      expect(result.children[0]).toMatchObject({
        type: 'switch',
        label: 'Auto-save',
        checked: false,
        props: {
          disabled: true,
        },
      });
    });

    it('should parse switches in compact rows', () => {
      const result = parse('Dark mode [Dark mode]{switch checked}');
      expect(result.children[0]).toMatchObject({
        type: 'paragraph',
      });
      expect(result.children[0].children).toHaveLength(2);
      expect(result.children[0].children[1]).toMatchObject({
        type: 'switch',
        checked: true,
      });
    });
  });

  describe('Radio Button Syntax', () => {
    it('should parse unselected radio button', () => {
      const result = parse('- ( ) Option 1');
      expect(result.children[0].children[0]).toMatchObject({
        type: 'radio',
        label: 'Option 1',
        selected: false,
      });
    });

    it('should parse selected radio button with •', () => {
      const result = parse('- (•) Option 2');
      expect(result.children[0].children[0]).toMatchObject({
        type: 'radio',
        label: 'Option 2',
        selected: true,
      });
    });

    it('should parse selected radio button with x', () => {
      const result = parse('- (x) Option 3');
      expect(result.children[0].children[0]).toMatchObject({
        type: 'radio',
        label: 'Option 3',
        selected: true,
      });
    });
  });

  describe('Icon Syntax', () => {
    it('should parse an icon', () => {
      const result = parse(':house:');
      expect(result.children[0]).toMatchObject({
        type: 'icon',
        props: {
          name: 'house',
        },
      });
    });
  });

  describe('Icon in Table Cells', () => {
    it('should parse icon at start of body cell', () => {
      const input = `
| Status | Item |
|--------|------|
| :check: Done | Task A |
      `.trim();
      const result = parse(input);
      expect(result.children[0].type).toBe('table');
      const row = (result.children[0] as any).children[1]; // table-row
      expect(row.type).toBe('table-row');
      const cell = row.children[0];
      expect(cell.type).toBe('table-cell');
      expect(cell.children).toBeDefined();
      expect(cell.children[0]).toMatchObject({ type: 'icon', props: { name: 'check' } });
      expect(cell.children[1]).toMatchObject({ type: 'text', content: 'Done' });
    });

    it('should parse icon-only cell (no trailing text)', () => {
      const input = `
| Status |
|--------|
| :x: |
      `.trim();
      const result = parse(input);
      const row = (result.children[0] as any).children[1];
      const cell = row.children[0];
      expect(cell.children[0]).toMatchObject({ type: 'icon', props: { name: 'x' } });
      expect(cell.children).toHaveLength(1);
    });

    it('should parse icon with hyphenated name in cell', () => {
      const input = `
| Status |
|--------|
| :arrow-right: Go |
      `.trim();
      const result = parse(input);
      const row = (result.children[0] as any).children[1];
      const cell = row.children[0];
      expect(cell.children[0]).toMatchObject({ type: 'icon', props: { name: 'arrow-right' } });
      expect(cell.children[1]).toMatchObject({ type: 'text', content: 'Go' });
    });

    it('should parse icon at start of header cell', () => {
      const input = `
| :star: Rating | Value |
|---------------|-------|
| Good | 5 |
      `.trim();
      const result = parse(input);
      const header = (result.children[0] as any).children[0]; // table-header
      expect(header.type).toBe('table-header');
      const cell = header.children[0];
      expect(cell.children[0]).toMatchObject({ type: 'icon', props: { name: 'star' } });
      expect(cell.children[1]).toMatchObject({ type: 'text', content: 'Rating' });
    });

    it('should not modify cells without icon syntax', () => {
      const input = `
| Status | Item |
|--------|------|
| Done | Task A |
      `.trim();
      const result = parse(input);
      const row = (result.children[0] as any).children[1];
      const cell = row.children[0];
      expect(cell.children[0]).toMatchObject({ type: 'text', content: 'Done' });
    });
  });

  describe('Complex Forms', () => {
    it('should parse a simple contact form', () => {
      const input = `
## Contact Form

Name

[_____________________]{required}

Email

[_____________________]{type:email required}

[Submit]*
      `.trim();

      const result = parse(input);
      expect(result.children).toHaveLength(6);
      expect(result.children[0].type).toBe('heading');
      expect(result.children[1].type).toBe('paragraph');
      expect(result.children[2].type).toBe('input');
      expect(result.children[3].type).toBe('paragraph');
      expect(result.children[4].type).toBe('input');
      expect(result.children[5].type).toBe('button');
    });
  });

  describe('Container Syntax', () => {
    it('should parse a hero container', () => {
      const input = `
::: hero

# Welcome to Our Product

[Get Started]*

:::
      `.trim();

      const result = parse(input);
      expect(result.children).toHaveLength(1);
      expect(result.children[0]).toMatchObject({
        type: 'container',
        containerType: 'hero',
      });
      expect(result.children[0].children).toHaveLength(2);
      expect(result.children[0].children[0].type).toBe('heading');
      expect(result.children[0].children[1].type).toBe('button');
    });

    it('should parse a container with attributes', () => {
      const input = `
::: card {.featured}

## Card Title

Content here

:::
      `.trim();

      const result = parse(input);
      expect(result.children[0]).toMatchObject({
        type: 'container',
        containerType: 'card',
        props: {
          classes: ['featured'],
        },
      });
    });

    it('should parse no-dot container status tokens as classes', () => {
      const input = `
::: alert {success}
Saved
:::
      `.trim();

      const result = parse(input);
      expect(result.children[0]).toMatchObject({
        type: 'container',
        containerType: 'alert',
        props: {
          classes: ['success'],
        },
      });
    });

    it('should parse nested containers', () => {
      const input = `
::: modal

## Confirm Delete

Are you sure?

[Cancel] [Delete]{.danger}

:::
      `.trim();

      const result = parse(input);
      expect(result.children[0].type).toBe('container');
      expect(result.children[0].children).toHaveLength(3);
    });

    it('should nest a container inside another container', () => {
      const input = `
::: modal

::: card

Nested content

:::

:::
      `.trim();

      const result = parse(input);
      const modal = result.children[0];
      expect(modal.type).toBe('container');
      expect(modal.containerType).toBe('modal');
      const card = modal.children[0];
      expect(card.type).toBe('container');
      expect(card.containerType).toBe('card');
      expect(card.children[0].type).toBe('paragraph');
    });

    it('should extract inline content from the opener line', () => {
      const input = `
::: alert Warning: this action is irreversible

[Cancel] [Confirm]{.danger}

:::
      `.trim();

      const result = parse(input);
      const alert = result.children[0];
      expect(alert.type).toBe('container');
      expect(alert.containerType).toBe('alert');
      expect(alert.children[0].type).toBe('paragraph');
      expect(alert.children[0].content).toBe('Warning: this action is irreversible');
    });
  });

  describe('Inline Container Syntax (Navigation)', () => {
    it('should parse a simple navigation bar', () => {
      const input = `[[ Home | Products | About | Contact ]]`;

      const result = parse(input);
      expect(result.children).toHaveLength(1);
      expect(result.children[0]).toMatchObject({
        type: 'nav',
      });
      expect(result.children[0].children).toHaveLength(4);
      expect(result.children[0].children[0]).toMatchObject({
        type: 'brand',
      });
      expect(result.children[0].children[1]).toMatchObject({
        type: 'nav-item',
        content: 'Products',
      });
    });

    it('should parse navigation with brand (icon + text)', () => {
      const input = `[[ :logo: MyApp | Home | Products ]]`;

      const result = parse(input);
      expect(result.children[0].type).toBe('nav');
      expect(result.children[0].children[0]).toMatchObject({
        type: 'brand',
      });
      expect(result.children[0].children[0].children).toHaveLength(2);
      expect(result.children[0].children[0].children[0].type).toBe('icon');
      expect(result.children[0].children[0].children[1].type).toBe('text');
    });

    it('should parse navigation with buttons', () => {
      const input = `[[ Home | Products | [Sign In] | [Get Started] ]]{.nav}`;

      const result = parse(input);
      expect(result.children[0].type).toBe('nav');
      expect(result.children[0].props.classes).toContain('nav');

      // Should have 4 children: 2 nav-items and 2 buttons
      const children = result.children[0].children;
      expect(children).toHaveLength(4);
      expect(children[2].type).toBe('button');
      expect(children[2].content).toBe('Sign In');
      expect(children[3].type).toBe('button');
      expect(children[3].content).toBe('Get Started');
    });

    it('should parse [[...]] with links inside a container block', () => {
      const input = `::: demo\n[[ Logo | Home | [Login](./login.md) | [Sign Up]* ]]\n:::`;

      const result = parse(input);
      const nav = result.children[0].children[0];
      expect(nav.type).toBe('nav');
      expect(nav.children).toHaveLength(4);
      expect(nav.children[0].type).toBe('brand');
      expect(nav.children[1]).toMatchObject({ type: 'nav-item', content: 'Home' });
      expect(nav.children[2]).toMatchObject({ type: 'nav-item', content: 'Login', href: './login.md' });
      expect(nav.children[3]).toMatchObject({ type: 'button', content: 'Sign Up' });
    });
  });

  describe('Breadcrumbs', () => {
    it('should parse [[ A > B > C ]] as breadcrumbs, not nav', () => {
      const result = parse('[[ Home > Products > Item ]]');
      expect(result.children[0].type).toBe('breadcrumbs');
    });

    it('should produce correct breadcrumb-item children', () => {
      const result = parse('[[ Home > Settings > Profile ]]');
      const node = result.children[0];
      expect(node.type).toBe('breadcrumbs');
      expect(node.children).toHaveLength(3);
      expect(node.children[0].type).toBe('breadcrumb-item');
      expect(node.children[0].content).toBe('Home');
      expect(node.children[1].content).toBe('Settings');
      expect(node.children[2].content).toBe('Profile');
    });

    it('should mark only the last item as current', () => {
      const result = parse('[[ Docs > API ]]');
      const items = result.children[0].children;
      expect(items[0].current).toBe(false);
      expect(items[1].current).toBe(true);
    });

    it('should treat [[ A | B | C ]] as nav, not breadcrumbs', () => {
      const result = parse('[[ Home | Products | Contact ]]');
      expect(result.children[0].type).toBe('nav');
    });
  });

  describe('Dropdown/Select Syntax', () => {
    it('should parse a basic dropdown', () => {
      const input = `[Select option___________v]`;

      const result = parse(input);
      expect(result.children).toHaveLength(1);
      expect(result.children[0]).toMatchObject({
        type: 'select',
        props: {
          placeholder: 'Select option',
        },
      });
    });

    it('should parse dropdown with options', () => {
      const input = `
[Choose a topic___________v]
- General inquiry
- Sales
- Support
- Partnership
      `.trim();

      const result = parse(input);
      expect(result.children).toHaveLength(1);
      expect(result.children[0].type).toBe('select');
      expect(result.children[0].options).toHaveLength(4);
      expect(result.children[0].options[0]).toMatchObject({
        type: 'option',
        value: 'General inquiry',
        label: 'General inquiry',
      });
    });

    it('should parse dropdown options written as Markdown links', () => {
      const input = `
[Switch app___________v]
- [Jira](./jira.md)
- [Confluence](./confluence.md)
- [Bitbucket](./bitbucket.md)
      `.trim();

      const result = parse(input);
      expect(result.children).toHaveLength(1);
      expect(result.children[0].type).toBe('select');
      expect(result.children[0].options).toEqual([
        { type: 'option', value: './jira.md', label: 'Jira', selected: false, href: './jira.md' },
        { type: 'option', value: './confluence.md', label: 'Confluence', selected: false, href: './confluence.md' },
        { type: 'option', value: './bitbucket.md', label: 'Bitbucket', selected: false, href: './bitbucket.md' },
      ]);
    });

    it('should parse dropdown options written as actions', () => {
      const input = `
[Actions___________v]
- [Duplicate]
- [Archive]
      `.trim();

      const result = parse(input);
      expect(result.children).toHaveLength(1);
      expect(result.children[0].type).toBe('select');
      expect(result.children[0].options).toEqual([
        { type: 'option', value: 'Duplicate', label: 'Duplicate', selected: false, action: 'Duplicate' },
        { type: 'option', value: 'Archive', label: 'Archive', selected: false, action: 'Archive' },
      ]);
    });

    it('should parse dropdown with attributes', () => {
      const input = `[Select___v]{required}`;

      const result = parse(input);
      expect(result.children[0].props.required).toBe(true);
    });
  });

  describe('Columns Layout Detection', () => {
    it('should parse a 3-column columns layout', () => {
      const input = `
::: columns-3
::: column
### Feature One
Fast and reliable
:::

::: column
### Feature Two
Secure and safe
:::

::: column
### Feature Three
Powerful tools
:::

:::
      `.trim();

      const result = parse(input);
      expect(result.children).toHaveLength(1);
      expect(result.children[0]).toMatchObject({
        type: 'grid',
        columns: 3,
      });
      expect(result.children[0].children).toHaveLength(3);
      expect(result.children[0].children[0].type).toBe('grid-item');
    });

    it('should parse column items with icons', () => {
      const input = `
::: columns-3
::: column
### :rocket: Fast
Lightning quick rendering
:::

::: column
### :shield: Secure
Enterprise grade security
:::

::: column
### :zap: Powerful
Advanced features included
:::

:::
      `.trim();

      const result = parse(input);
      expect(result.children[0].type).toBe('grid');
      expect(result.children[0].children).toHaveLength(3);

      // First grid item should have heading and paragraph
      const firstItem = result.children[0].children[0];
      expect(firstItem.children).toHaveLength(2);
      expect(firstItem.children[0].type).toBe('heading');
      expect(firstItem.children[1].type).toBe('paragraph');
    });

    it('should parse columns with different column counts', () => {
      const input = `
::: columns-4
::: column
### Col 1
:::
::: column
### Col 2
:::
::: column
### Col 3
:::
::: column
### Col 4
:::

:::
      `.trim();

      const result = parse(input);
      expect(result.children[0]).toMatchObject({
        type: 'grid',
        columns: 4,
      });
      expect(result.children[0].children).toHaveLength(4);
    });

    it('should set card prop on grid node when card modifier is present', () => {
      const input = `
::: columns-3 card
::: column
### Fast
Quick
:::

::: column
### Secure
Safe
:::

::: column
### Scalable
Grows
:::

:::
      `.trim();

      const result = parse(input);
      expect(result.children[0]).toMatchObject({ type: 'grid', columns: 3 });
      expect((result.children[0] as any).props.card).toBe(true);
    });

    it('should not set card prop on grid node without card modifier', () => {
      const input = `
::: columns-3
::: column
### Fast
Quick
:::

:::
      `.trim();

      const result = parse(input);
      expect((result.children[0] as any).props.card).toBeFalsy();
    });

    it('should parse columns nested inside a container as a grid node', () => {
      const input = `
::: card

::: columns-3
::: column
### Fast
Quick
:::

::: column
### Secure
Safe
:::

::: column
### Powerful
Strong
:::

:::

:::
      `.trim();

      const result = parse(input);
      const card = result.children[0] as any;
      expect(card.type).toBe('container');
      expect(card.containerType).toBe('card');
      // The grid must be a grid node, not a plain heading
      const grid = card.children[0];
      expect(grid.type).toBe('grid');
      expect(grid.columns).toBe(3);
      expect(grid.children).toHaveLength(3);
      expect(grid.children[0].type).toBe('grid-item');
    });

    it('should detect nested columns inside a column item (issue #15)', () => {
      const input = `
::: columns-2
::: column
### Item A

::: columns-2
::: column
#### Nested 1
Content 1
:::

::: column
#### Nested 2
Content 2
:::

:::
:::

::: column
### Item B
Solo
:::

:::
      `.trim();

      const result = parse(input);
      const outer = result.children[0] as any;
      expect(outer.type).toBe('grid');
      expect(outer.columns).toBe(2);

      const itemA = outer.children[0];
      expect(itemA.type).toBe('grid-item');
      const inner = itemA.children.find((c: any) => c.type === 'grid');
      expect(inner).toBeDefined();
      expect(inner.columns).toBe(2);
      expect(inner.children).toHaveLength(2);
    });

    it('should detect nested columns inside a tab panel (issue #15)', () => {
      const input = `
::: tabs

::: tab Panel A

::: columns-2
::: column
#### Left
L
:::

::: column
#### Right
R
:::

:::

:::

::: tab Panel B
Solo

:::

:::
      `.trim();

      const result = parse(input);
      const tabs = result.children[0] as any;
      expect(tabs.type).toBe('tabs');

      const panelA = tabs.children[0];
      expect(panelA.type).toBe('tab');
      const inner = panelA.children.find((c: any) => c.type === 'grid');
      expect(inner).toBeDefined();
      expect(inner.columns).toBe(2);
    });
  });

  describe('Row layout', () => {
    it('should parse ::: row as a row node with grid-item children', () => {
      const input = `
::: row

[All]* [Active]

[+ New]*

:::
      `.trim();

      const result = parse(input);
      expect(result.children[0]).toMatchObject({ type: 'row' });
      const row = result.children[0] as any;
      expect(row.children).toHaveLength(3);
      expect(row.children[0].type).toBe('grid-item');
      expect(row.children[1].type).toBe('grid-item');
      expect(row.children[2].type).toBe('grid-item');
    });

    it('should auto-wrap direct children as implicit grid-items (no ### needed)', () => {
      const input = `
::: row

[All]* [Active] [Archived]

[Search___________________________]

[+ New Item]*

:::
      `.trim();

      const result = parse(input);
      const row = result.children[0] as any;
      expect(row.type).toBe('row');
      expect(row.children).toHaveLength(5);
      expect(row.children.every((c: any) => c.type === 'grid-item')).toBe(true);
    });

    it('should parse ::: row as a row node', () => {
      const input = `
::: row

###
Button

:::
      `.trim();

      const result = parse(input);
      const row = result.children[0] as any;
      // row node exists
      expect(row.type).toBe('row');
    });

    it('dropdown inside implicit row should have options populated (not empty)', () => {
      const input = `
::: row

[Select Team_________v]
- All Teams
- Team A
- Team B

:::
      `.trim();

      const result = parse(input);
      const row = result.children[0] as any;
      expect(row.type).toBe('row');

      const item = row.children.find((c: any) => {
        const inner = c.children?.[0];
        return inner?.type === 'select' || inner?.type === 'container';
      }) as any;
      expect(item).toBeDefined();

      const select = item.children[0].type === 'select'
        ? item.children[0]
        : item.children[0].children?.find((n: any) => n.type === 'select');
      expect(select).toBeDefined();
      expect(select.options).toHaveLength(3);
      expect(select.options[0].label).toBe('All Teams');
    });

    it('search + dropdown inside implicit row produces 2 grid-items (list not leaked as extra item)', () => {
      const input = `
::: row

[Search_______________]{type:search}

[Select Team_________v]
- All Teams
- Team A
- Team B

:::
      `.trim();

      const result = parse(input);
      const row = result.children[0] as any;
      expect(row.type).toBe('row');
      // Should be exactly 2 items: search input + select — not 3 (search + select + stray list)
      expect(row.children).toHaveLength(2);
    });

    it('should parse ::: row inside a :::card container', () => {
      const input = `
::: card

::: row

[Save]*

:::

:::
      `.trim();

      const result = parse(input);
      const card = result.children[0] as any;
      const row = card.children.find((c: any) => c.type === 'row');
      expect(row).toBeDefined();
      expect(row.children[0].type).toBe('grid-item');
    });
  });

  describe('Alignment on grid items', () => {
    it('should not treat ### headings inside ::: row as alignment markers', () => {
      const input = `
::: row

### {.left}
[All]*

### {.right}
[+ New]*

:::
      `.trim();

      const result = parse(input);
      const row = result.children[0] as any;
      expect(row.children).toHaveLength(4);
      expect(row.children[0].props.classes).not.toContain('align-left');
      expect(row.children[2].props.classes).not.toContain('align-right');
      expect(row.children[0].children[0]).toMatchObject({ type: 'heading', level: 3 });
      expect(row.children[2].children[0]).toMatchObject({ type: 'heading', level: 3 });
    });

    it('should not treat center heading inside ::: row as an alignment marker', () => {
      const input = `
::: row

### {.center}
Centered

:::
      `.trim();

      const result = parse(input);
      const row = result.children[0] as any;
      expect(row.children[0].props.classes).not.toContain('align-center');
      expect(row.children[0].children[0]).toMatchObject({ type: 'heading', level: 3 });
    });

    it('should support alignment inside ::: column as well', () => {
      const input = `
::: columns-3

::: column .right
Right item
:::

::: column .left
Left item
:::

::: column .center
Center item
:::

:::
      `.trim();

      const result = parse(input);
      const grid = result.children[0] as any;
      expect(grid.children[0].props.classes).toContain('align-right');
      expect(grid.children[1].props.classes).toContain('align-left');
      expect(grid.children[2].props.classes).toContain('align-center');
    });

    it('should support no-dot alignment inside ::: row attributes', () => {
      const result = parse(`
::: row {right}
[+ New]*
:::
      `.trim());

      const row = result.children[0] as any;
      expect(row.props.classes).toContain('right');
    });
  });

  describe('Sidebar layout', () => {
    it('should parse :::layout {.sidebar-main} as a layout container', () => {
      const input = `
::: layout {.sidebar-main}

::: sidebar
Nav here
:::

::: main
Content here
:::

:::
      `.trim();

      const result = parse(input);
      const layout = result.children[0] as any;
      expect(layout.type).toBe('container');
      expect(layout.containerType).toBe('layout');
      expect(layout.props.classes).toContain('sidebar-main');
    });

    it('should parse grid inside sidebar-main layout as a grid node', () => {
      const input = `
::: layout {.sidebar-main}

::: sidebar
Nav
:::

::: main

::: columns-3
::: column
### Done
48
:::

::: column
### Active
12
:::

::: column
### Pending
5
:::

:::

:::

:::
      `.trim();

      const result = parse(input);
      const layout = result.children[0] as any;
      // Find the grid inside the main section
      const main = layout.children.find((c: any) => c.containerType === 'main') as any;
      expect(main).toBeDefined();
      const grid = main.children.find((c: any) => c.type === 'grid');
      expect(grid).toBeDefined();
      expect(grid.columns).toBe(3);
      expect(grid.children).toHaveLength(3);
    });
  });

  describe('Button link syntax [[text](url)]', () => {
    it('should parse [[Button](url)] as button with href', () => {
      const result = parse('[[Go to Docs](./docs.md)]');
      expect(result.children[0]).toMatchObject({
        type: 'button',
        content: 'Go to Docs',
        href: './docs.md',
      });
    });

    it('should parse [[Button]*(url)] as primary button with href', () => {
      const result = parse('[[Get Started](./start.md)]*');
      expect(result.children[0]).toMatchObject({
        type: 'button',
        href: './start.md',
        props: { variant: 'primary' },
      });
    });

    it('should parse [[Button](url)] with attributes', () => {
      const result = parse('[[Sign Up](./signup.md)]{.secondary}');
      expect(result.children[0]).toMatchObject({
        type: 'button',
        href: './signup.md',
        props: { classes: ['secondary'] },
      });
    });

    it('should parse [[Button](url)] with external URL', () => {
      const result = parse('[[Google](https://www.google.com)]');
      expect(result.children[0]).toMatchObject({
        type: 'button',
        href: 'https://www.google.com',
      });
    });
  });

  describe('Column span', () => {
    it('should turn a column opener title into a heading', () => {
      const result = parse(`
::: columns-2
::: column Billing address
First name
[_________________]
:::
:::
      `.trim());

      const grid = result.children[0] as any;
      const item = grid.children[0];
      expect(item.type).toBe('grid-item');
      expect(item.children[0]).toMatchObject({
        type: 'heading',
        level: 3,
        content: 'Billing address',
      });
      expect(item.children[1].type).toBe('container');
      expect(item.children[1].containerType).toBe('form-group');
    });

    it('should support column opener title with attributes', () => {
      const result = parse(`
::: columns-3 card
::: column Pro Plan {.span-2 .right}
$29/mo
:::
:::
      `.trim());

      const grid = result.children[0] as any;
      const item = grid.children[0];
      expect(item.props.classes).toEqual(['card', 'col-span-2', 'align-right']);
      expect(item.children[0]).toMatchObject({
        type: 'heading',
        level: 3,
        content: 'Pro Plan',
      });
    });

    it('should support no-dot column span and alignment tokens', () => {
      const result = parse(`
::: columns-3 card
::: column Pro Plan {span-2 right}
$29/mo
:::
:::
      `.trim());

      const grid = result.children[0] as any;
      const item = grid.children[0];
      expect(item.props.classes).toEqual(['card', 'col-span-2', 'align-right']);
      expect(item.children[0]).toMatchObject({
        type: 'heading',
        level: 3,
        content: 'Pro Plan',
      });
    });

    it('should keep modifier-only column openers titleless', () => {
      const result = parse(`
::: columns-2
::: column .right .span-2
[Save]*
:::
:::
      `.trim());

      const item = (result.children[0] as any).children[0];
      expect(item.props.classes).toEqual(['align-right', 'col-span-2']);
      expect(item.children[0].type).toBe('button');
    });

    it('should map span class from column to grid-item', () => {
      const input = `
::: columns-3
::: column .span-1
### Starter
$9/mo
:::

::: column .span-2
### Pro
$29/mo
:::

:::
      `.trim();

      const result = parse(input);
      const grid = result.children[0] as any;
      expect(grid.type).toBe('grid');
      expect(grid.children[0].props.classes).toContain('col-span-1');
      expect(grid.children[1].props.classes).toContain('col-span-2');
    });

    it('should leave grid-item without col-span when not specified', () => {
      const input = `
::: columns-3
::: column
### Item One
Content
:::

:::
      `.trim();

      const result = parse(input);
      const item = (result.children[0] as any).children[0];
      expect(item.props.classes).not.toContain('col-span-1');
      expect(item.props.classes).not.toContain('col-span-2');
    });

    it('should not render columns label text as a child node', () => {
      const input = `
::: columns-3
::: column
### Fast
Quick
:::

:::
      `.trim();

      const result = parse(input);
      const grid = result.children[0] as any;
      const types = grid.children.map((c: any) => c.type);
      expect(types).not.toContain('heading');
      expect(types.every((t: string) => t === 'grid-item')).toBe(true);
    });

    it('should parse nested columns inside a column item as a grid node', () => {
      const input = `
::: columns-2
::: column
### Left

::: columns-2
::: column
#### A
One
:::

::: column
#### B
Two
:::

:::
:::

::: column
### Right
Just text
:::

:::
      `.trim();

      const result = parse(input);
      const outerGrid = result.children[0] as any;
      expect(outerGrid.type).toBe('grid');
      expect(outerGrid.columns).toBe(2);

      const leftItem = outerGrid.children[0] as any;
      expect(leftItem.type).toBe('grid-item');

      const innerGrid = leftItem.children.find((c: any) => c.type === 'grid');
      expect(innerGrid).toBeDefined();
      expect(innerGrid.type).toBe('grid');
      expect(innerGrid.columns).toBe(2);
      expect(innerGrid.children).toHaveLength(2);
    });

    it('should parse a :::card inside a column item (regression)', () => {
      const input = `
::: columns-2
::: column
### Left

::: card
Card content
:::
:::

::: column
### Right
Text
:::

:::
      `.trim();

      const result = parse(input);
      const grid = result.children[0] as any;
      const leftItem = grid.children[0] as any;
      const card = leftItem.children.find((c: any) => c.type === 'container' && c.containerType === 'card');
      expect(card).toBeDefined();
    });
  });

  describe('Tabs Syntax', () => {
    const input = `
::: tabs

::: tab Overview
Overview panel text.

:::

::: tab Details
[Buy Now]*

:::

::: tab Reviews
Review content

:::

:::
    `.trim();

    it('should parse ::: tabs into a tabs node', () => {
      const result = parse(input);
      expect(result.children).toHaveLength(1);
      expect(result.children[0].type).toBe('tabs');
    });

    it('should produce one tab child per ::: tab', () => {
      const result = parse(input);
      const tabs = result.children[0] as any;
      expect(tabs.children).toHaveLength(3);
      expect(tabs.children.every((c: any) => c.type === 'tab')).toBe(true);
    });

    it('should use ::: tab label as the tab label', () => {
      const result = parse(input);
      const tabs = result.children[0] as any;
      expect(tabs.children.map((t: any) => t.label)).toEqual(['Overview', 'Details', 'Reviews']);
    });

    it('should mark the first tab active by default', () => {
      const result = parse(input);
      const tabs = result.children[0] as any;
      expect(tabs.children[0].active).toBe(true);
      expect(tabs.children[1].active).toBe(false);
      expect(tabs.children[2].active).toBe(false);
    });

    it('should let {.active} on ::: tab line override the default active tab', () => {
      const result = parse(`
::: tabs

::: tab Overview
a

:::

::: tab Details {.active}
b

:::

:::
      `.trim());
      const tabs = result.children[0] as any;
      expect(tabs.children[0].active).toBe(false);
      expect(tabs.children[1].active).toBe(true);
    });

    it('should put panel content as tab children', () => {
      const result = parse(input);
      const tabs = result.children[0] as any;
      const detailsTab = tabs.children[1];
      const types = detailsTab.children.map((c: any) => c.type);
      expect(types).toContain('button');
    });

    it('should not emit a separate heading node for the tabs container', () => {
      const result = parse(input);
      const topTypes = result.children.map((c: any) => c.type);
      expect(topTypes).not.toContain('heading');
    });

    it('should parse nested columns inside a tab panel as a grid node', () => {
      const md = `
::: tabs

::: tab Overview

::: columns-2
::: column
#### Users
100
:::

::: column
#### Revenue
$500
:::

:::

:::

::: tab Details
Just text

:::

:::
      `.trim();

      const result = parse(md);
      const tabs = result.children[0] as any;
      expect(tabs.type).toBe('tabs');

      const overviewTab = tabs.children[0] as any;
      const innerGrid = overviewTab.children.find((c: any) => c.type === 'grid');
      expect(innerGrid).toBeDefined();
      expect(innerGrid.columns).toBe(2);
      expect(innerGrid.children).toHaveLength(2);
    });

    it('should parse a :::card inside a tab panel (regression)', () => {
      const md = `
::: tabs

::: tab Overview

::: card
Card content
:::

:::

::: tab Details
Text

:::

:::
      `.trim();

      const result = parse(md);
      const tabs = result.children[0] as any;
      const overviewTab = tabs.children[0] as any;
      const card = overviewTab.children.find((c: any) => c.type === 'container' && c.containerType === 'card');
      expect(card).toBeDefined();
    });
  });

  describe('Mixed inline elements (buttons + inputs + selects on adjacent lines)', () => {
    it('should parse linked buttons on separate markdown lines as separate rows', () => {
      const result = parse('[[Go](./go.md)]\n[[Stay](./stay.md)]*');
      expect(result.children).toHaveLength(2);

      const first = result.children[0] as any;
      const second = result.children[1] as any;
      expect(first.type).toBe('row');
      expect(first.children).toHaveLength(1);
      expect(first.children[0].children[0]).toMatchObject({
        type: 'button',
        content: 'Go',
        href: './go.md',
      });
      expect(second.type).toBe('row');
      expect(second.children).toHaveLength(1);
      expect(second.children[0].children[0]).toMatchObject({
        type: 'button',
        content: 'Stay',
        href: './stay.md',
        props: { variant: 'primary' },
      });
    });

    it('should parse buttons + input on one line as a row with input child', () => {
      const result = parse('[Both Buttons] [+ In the same line]* [Search___________________________]');
      const node = result.children[0] as any;
      expect(node.type).toBe('row');
      expect(node.children).toHaveLength(3);
      expect(node.children[0].children[0]).toMatchObject({ type: 'button', content: 'Both Buttons' });
      expect(node.children[1].children[0]).toMatchObject({ type: 'button', content: '+ In the same line' });
      expect(node.children[2].children[0].type).toBe('input');
    });

    it('should parse buttons+input line adjacent to select as separate rows', () => {
      const md = '[Both Buttons] [+ In the same line]* [Search___________________________]\n[Select_______v]';
      const result = parse(md);
      const node = result.children[0] as any;
      const second = result.children[1] as any;
      expect(result.children).toHaveLength(2);
      expect(node.type).toBe('row');
      expect(node.children).toHaveLength(3);
      expect(node.children[0].children[0]).toMatchObject({ type: 'button', content: 'Both Buttons' });
      expect(node.children[1].children[0]).toMatchObject({ type: 'button', content: '+ In the same line' });
      expect(node.children[2].children[0].type).toBe('input');
      expect(second.type).toBe('row');
      expect(second.children[0].children[0].type).toBe('select');
    });

    it('should parse pure button lines adjacent to select as separate rows', () => {
      const md = '[All]* [Active]\n[Select_______v]';
      const result = parse(md);
      const node = result.children[0] as any;
      const second = result.children[1] as any;
      expect(result.children).toHaveLength(2);
      expect(node.type).toBe('row');
      expect(node.children).toHaveLength(2);
      expect(node.children[0].children[0]).toMatchObject({ type: 'button', content: 'All' });
      expect(node.children[1].children[0]).toMatchObject({ type: 'button', content: 'Active' });
      expect(second.type).toBe('row');
      expect(second.children[0].children[0].type).toBe('select');
    });

    it('should parse select on same line as buttons as a row with select child', () => {
      const md = '[Both Buttons] [+ In the same line]* [Search___________________________] [Select_______v]';
      const result = parse(md);
      const node = result.children[0] as any;
      expect(node.type).toBe('row');
      expect(node.children).toHaveLength(4);
      expect(node.children[0].children[0]).toMatchObject({ type: 'button', content: 'Both Buttons' });
      expect(node.children[1].children[0]).toMatchObject({ type: 'button', content: '+ In the same line' });
      expect(node.children[2].children[0].type).toBe('input');
      expect(node.children[3].children[0].type).toBe('select');
    });

    it('should preserve all-adjacent buttons+input+button as one row per line', () => {
      const md = '[All]*\n[Active]\n[Archived]\n[Search__________________________]\n[+ New Item]*';
      const result = parse(md);
      const node = result.children[0] as any;
      expect(result.children).toHaveLength(5);
      expect(result.children.every((child: any) => child.type === 'row')).toBe(true);
      expect(node.children[0].children[0]).toMatchObject({ type: 'button', content: 'All' });
      expect((result.children[1] as any).children[0].children[0]).toMatchObject({ type: 'button', content: 'Active' });
      expect((result.children[2] as any).children[0].children[0]).toMatchObject({ type: 'button', content: 'Archived' });
      expect((result.children[3] as any).children[0].children[0].type).toBe('input');
      expect((result.children[4] as any).children[0].children[0]).toMatchObject({ type: 'button', content: '+ New Item' });
    });

    it('should still treat plain text + input as form-group (label pattern)', () => {
      const md = 'Search\n[Search___________________________]';
      const result = parse(md);
      const node = result.children[0] as any;
      expect(node.type).toBe('container');
      expect(node.containerType).toBe('form-group');
      expect(node.children[0]).toMatchObject({ type: 'text', content: 'Search' });
      expect(node.children[1].type).toBe('input');
    });

    it('should produce form-group when plain text label is above input inside a row', () => {
      const md = `::: row\n\ntext\n[Search__________________________]\n\n:::`;
      const result = parse(md);
      const row = result.children[0] as any;
      expect(row.type).toBe('row');
      const item = row.children[0] as any;
      expect(item.type).toBe('grid-item');
      const formGroup = item.children[0] as any;
      expect(formGroup.type).toBe('container');
      expect(formGroup.containerType).toBe('form-group');
      expect(formGroup.children[0]).toMatchObject({ type: 'text', content: 'text' });
      expect(formGroup.children[1].type).toBe('input');
    });
  });

  describe('Badge/Pill Syntax', () => {
    it('should parse a basic pill', () => {
      const result = parse('((Active))');
      expect(result.children).toHaveLength(1);
      expect(result.children[0]).toMatchObject({
        type: 'badge',
        content: 'Active',
      });
    });

    it('should keep legacy pipe pills as an alias', () => {
      const result = parse('|Active|{.success}');
      expect(result.children[0]).toMatchObject({
        type: 'badge',
        content: 'Active',
        props: { variant: 'success' },
      });
    });

    it('should parse a pill with success variant', () => {
      const result = parse('((Active)){.success}');
      expect(result.children[0]).toMatchObject({
        type: 'badge',
        content: 'Active',
        props: { variant: 'success' },
      });
    });

    it('should parse a pill with warning variant', () => {
      const result = parse('((3)){.warning}');
      expect(result.children[0]).toMatchObject({
        type: 'badge',
        content: '3',
        props: { variant: 'warning' },
      });
    });

    it('should parse a pill with error variant', () => {
      const result = parse('((Failed)){.error}');
      expect(result.children[0]).toMatchObject({
        type: 'badge',
        content: 'Failed',
        props: { variant: 'error' },
      });
    });

    it('should parse a pill with primary variant', () => {
      const result = parse('((New)){.primary}');
      expect(result.children[0]).toMatchObject({
        type: 'badge',
        content: 'New',
        props: { variant: 'primary' },
      });
    });

    it('should parse multiple pills as paragraph with badge children', () => {
      const result = parse('((Active)) ((Pending))');
      expect(result.children[0].type).toBe('paragraph');
      const paragraph = result.children[0] as any;
      const badges = paragraph.children.filter((c: any) => c.type === 'badge');
      expect(badges).toHaveLength(2);
      expect(badges[0].content).toBe('Active');
      expect(badges[1].content).toBe('Pending');
    });

    it('should parse a pill mixed with surrounding text', () => {
      const result = parse('Status: ((Active)){.success}');
      expect(result.children[0].type).toBe('paragraph');
      const paragraph = result.children[0] as any;
      const badge = paragraph.children.find((c: any) => c.type === 'badge');
      expect(badge).toBeDefined();
      expect(badge.content).toBe('Active');
      expect(badge.props.variant).toBe('success');
    });
  });

  describe('::: container-based layout syntax', () => {
    it('should parse ::: columns-3 as a grid node', () => {
      const result = parse(`
::: columns-3
::: column
### Feature One
Fast
:::

::: column
### Feature Two
Secure
:::

::: column
### Feature Three
Powerful
:::

:::
      `.trim());
      expect(result.children[0]).toMatchObject({ type: 'grid', columns: 3 });
      expect(result.children[0].children).toHaveLength(3);
      expect(result.children[0].children[0].type).toBe('grid-item');
    });

    it('should parse ::: columns-3 card as a card grid', () => {
      const result = parse(`
::: columns-3 card
::: column
### Fast
Quick
:::

::: column
### Secure
Safe
:::

:::
      `.trim());
      expect(result.children[0]).toMatchObject({ type: 'grid', columns: 3 });
      const grid = result.children[0] as any;
      expect((grid.props.classes || []).includes('card') || grid.props.card).toBeTruthy();
    });

    it('should parse ::: columns-4 with 4 columns', () => {
      const result = parse(`
::: columns-4
::: column
### A
:::
::: column
### B
:::
::: column
### C
:::
::: column
### D
:::

:::
      `.trim());
      expect(result.children[0]).toMatchObject({ type: 'grid', columns: 4 });
      expect(result.children[0].children).toHaveLength(4);
    });

    it('should parse ::: row as a row node', () => {
      const result = parse(`
::: row

[All]* [Active]

[+ New]*

:::
      `.trim());
      expect(result.children[0]).toMatchObject({ type: 'row' });
      const row = result.children[0] as any;
      expect(row.children.every((c: any) => c.type === 'grid-item')).toBe(true);
    });

    it('should parse ::: tabs with ::: tab children', () => {
      const result = parse(`
::: tabs

::: tab Overview
Overview content

:::

::: tab Details
[Buy Now]*

:::

:::
      `.trim());
      expect(result.children[0]).toMatchObject({ type: 'tabs' });
      const tabs = result.children[0] as any;
      expect(tabs.children).toHaveLength(2);
      expect(tabs.children.every((t: any) => t.type === 'tab')).toBe(true);
    });

    it('should use ::: tab label as the tab label', () => {
      const result = parse(`
::: tabs

::: tab Overview
a
:::

::: tab Details
b
:::

:::
      `.trim());
      const tabs = result.children[0] as any;
      expect(tabs.children.map((t: any) => t.label)).toEqual(['Overview', 'Details']);
    });

    it('should mark first tab active by default', () => {
      const result = parse(`
::: tabs

::: tab Overview
a
:::

::: tab Details
b
:::

:::
      `.trim());
      const tabs = result.children[0] as any;
      expect(tabs.children[0].active).toBe(true);
      expect(tabs.children[1].active).toBe(false);
    });

    it('should mark tab active via {.active} on ::: tab line', () => {
      const result = parse(`
::: tabs

::: tab Overview
a
:::

::: tab Details {.active}
b
:::

:::
      `.trim());
      const tabs = result.children[0] as any;
      expect(tabs.children[0].active).toBe(false);
      expect(tabs.children[1].active).toBe(true);
    });

    it('should parse ::: sidebar and ::: main inside ::: layout', () => {
      const result = parse(`
::: layout {.sidebar-main}

::: sidebar
Nav here
:::

::: main
Content here
:::

:::
      `.trim());
      const layout = result.children[0] as any;
      expect(layout.type).toBe('container');
      expect(layout.containerType).toBe('layout');
      expect(layout.props.classes).toContain('sidebar-main');
      const sidebar = layout.children.find((c: any) => c.containerType === 'sidebar');
      const main = layout.children.find((c: any) => c.containerType === 'main');
      expect(sidebar).toBeDefined();
      expect(main).toBeDefined();
    });

    it('should parse ::: columns-N inside ::: layout main section', () => {
      const result = parse(`
::: layout {.sidebar-main}

::: sidebar
Nav
:::

::: main

::: columns-3
::: column
### Done
48
:::

::: column
### Active
12
:::

::: column
### Pending
5
:::

:::

:::

:::
      `.trim());
      const layout = result.children[0] as any;
      const main = layout.children.find((c: any) => c.containerType === 'main') as any;
      expect(main).toBeDefined();
      const grid = main.children.find((c: any) => c.type === 'grid');
      expect(grid).toBeDefined();
      expect(grid.columns).toBe(3);
    });
  });

  describe('Demo block (::: demo)', () => {
    it('parses to a demo node', () => {
      const result = parse(`::: demo
## Login Form

[Sign In]*
:::`);
      expect(result.children[0].type).toBe('demo');
    });

    it('captures raw wiremd source in the raw field', () => {
      const result = parse(`::: demo
## Login Form

Username
[_____________________________]{required}

[Sign In]*
:::`);
      const demo = result.children[0] as any;
      expect(demo.raw).toContain('## Login Form');
      expect(demo.raw).toContain('[_____________________________]{required}');
      expect(demo.raw).toContain('[Sign In]*');
    });

    it('parses children as wiremd nodes', () => {
      const result = parse(`::: demo
## My Form

[Submit]*
:::`);
      const demo = result.children[0] as any;
      const types = demo.children.map((c: any) => c.type);
      expect(types).toContain('heading');
      expect(types).toContain('button');
    });

    it('captures raw when demo is nested inside a layout container', () => {
      const result = parse(`
::: layout {.sidebar-main}

::: main

::: demo

## Sign In

[Submit]*

:::

:::

:::`);
      const layout = result.children[0] as any;
      const main = layout.children.find((c: any) => c.containerType === 'main');
      const demo = main.children.find((c: any) => c.type === 'demo');
      expect(demo).toBeDefined();
      expect(demo.raw).toContain('## Sign In');
      expect(demo.raw).toContain('[Submit]*');
    });

    it('reconstructs checkbox syntax in raw field', () => {
      const result = parse(`::: demo
- [ ] Option A
- [x] Option B

:::`);
      const demo = result.children[0] as any;
      expect(demo.raw).toContain('- [ ] Option A');
      expect(demo.raw).toContain('- [x] Option B');
    });

    it('reconstructs table syntax in raw field', () => {
      const result = parse(`::: demo
| Name | Role |
|------|------|
| Alice | Admin |

:::`);
      const demo = result.children[0] as any;
      expect(demo.raw).toContain('| Name');
      expect(demo.raw).toContain('| Alice');
    });

    it('reconstructs inline modifier on opener line in raw field', () => {
      const result = parse(`::: demo

::: columns-3 card
::: column
### Fast
Quick.
:::

::: column
### Simple
Easy.
:::

::: column
### Flexible
Versatile.
:::

:::

:::`);
      const demo = result.children[0] as any;
      expect(demo.raw).toContain('::: columns-3 card');
      expect(demo.raw).not.toMatch(/::: columns-3\ncard/);
    });

    it('captures full raw content when nested container has no blank line before demo opener', () => {
      // Regression: '::: demo\n::: card' used to match CASE 2 via includes('\n:::')
      // because '\n::: card' starts with '\n:::'. After fixing to /\n:::\s*$/, CASE 3 runs
      // and rawContent captures the full card block, not just '::: card'.
      const input = `::: demo
::: card

### Sprint 12

:::

:::`;
      const result = parse(input);
      const demo = result.children[0] as any;
      expect(demo.type).toBe('demo');
      expect(demo.raw).toContain('::: card');
      expect(demo.raw).toContain('### Sprint 12');
      expect(demo.raw).toContain(':::');
    });

    it('still closes via implicit closer when content ends with newline-colon-colon-colon', () => {
      // CASE 2: paragraph with inline elements where the last text ends with \n:::
      // e.g. ":::card\nSome **bold** text\n:::" — verifies the regex fix didn't break this
      const result = parse(`::: card

Some **bold** content

:::`);
      const card = result.children[0] as any;
      expect(card.type).toBe('container');
      expect(card.containerType).toBe('card');
      const text = card.children.find((c: any) => c.type === 'paragraph');
      expect(text).toBeDefined();
    });

    it('renders nested containers when no blank line between demo and child opener', () => {
      // When ::: demo and ::: card share a paragraph (no blank line between them),
      // the afterOpener extraction should still produce a real nested container.
      const input = `::: demo
::: card

### Sprint 12
[View]*

:::

:::`;
      const result = parse(input);
      const demo = result.children[0] as any;
      expect(demo.type).toBe('demo');
      expect(demo.children).toHaveLength(1);
      expect(demo.children[0].type).toBe('container');
      expect(demo.children[0].containerType).toBe('card');
      expect(demo.raw).toContain('::: card');
    });

  });

  describe('Comment Syntax', () => {
    it('parses HTML comment into comment node', () => {
      const result = parse('<!-- Is this the right CTA? -->');
      expect(result.children).toHaveLength(1);
      expect(result.children[0]).toMatchObject({ type: 'comment', text: 'Is this the right CTA?' });
    });

    it('preserves @mention in comment text', () => {
      const result = parse('<!-- Should we validate inline? @tobias -->');
      expect(result.children[0]).toMatchObject({ type: 'comment', text: 'Should we validate inline? @tobias' });
    });

    it('parses comment adjacent to button', () => {
      const result = parse('<!-- Is this the right CTA? -->\n[Sign Up]*');
      expect(result.children).toHaveLength(2);
      expect(result.children[0].type).toBe('comment');
      expect(result.children[1].type).toBe('button');
    });

    it('trims whitespace from comment text', () => {
      const result = parse('<!--   lots of space   -->');
      expect(result.children[0]).toMatchObject({ type: 'comment', text: 'lots of space' });
    });

    it('handles multiline comment as single node', () => {
      const result = parse('<!--\nLine one\nLine two\n-->');
      expect(result.children).toHaveLength(1);
      expect(result.children[0].type).toBe('comment');
      expect((result.children[0] as any).text).toContain('Line one');
      expect((result.children[0] as any).text).toContain('Line two');
    });

    it('parses multiple consecutive comments as separate nodes', () => {
      const result = parse('<!-- First -->\n<!-- Second -->');
      const comments = result.children.filter((n) => n.type === 'comment');
      expect(comments).toHaveLength(2);
    });

    it('does not parse non-comment raw HTML as comment', () => {
      const result = parse('<!-- comment -->\n<div>raw</div>');
      const comments = result.children.filter((n) => n.type === 'comment');
      expect(comments).toHaveLength(1);
    });

    describe('Comment routing in columns', () => {
      it('comment before a column is a sibling before the grid-item, not inside its children', () => {
        const md = '::: columns-2\n::: column\n### Col A\ncontent\n:::\n<!-- check this -->\n::: column\n### Col B\ncontent\n:::\n:::';
        const ast = parse(md);
        const grid = ast.children[0] as any;
        // grid.children = [grid-item-A, comment, grid-item-B]
        expect(grid.children[0].type).toBe('grid-item');
        expect(grid.children[1]).toMatchObject({ type: 'comment', text: 'check this' });
        expect(grid.children[2].type).toBe('grid-item');
        // Col A has no comment inside it
        expect(grid.children[0].children.every((n: any) => n.type !== 'comment')).toBe(true);
        // Col B has no comment inside it (annotation wraps the whole item)
        expect(grid.children[2].children.every((n: any) => n.type !== 'comment')).toBe(true);
      });

      it('multiple comments before a column are siblings before that grid-item', () => {
        const md = '::: columns-3\n::: column\n### A\n:::\n<!-- first -->\n<!-- second -->\n::: column\n### B\n:::\n::: column\n### C\n:::\n:::';
        const ast = parse(md);
        const grid = ast.children[0] as any;
        // grid.children = [grid-item-A, comment('first'), comment('second'), grid-item-B, grid-item-C]
        expect(grid.children[0].type).toBe('grid-item');
        expect(grid.children[1]).toMatchObject({ type: 'comment', text: 'first' });
        expect(grid.children[2]).toMatchObject({ type: 'comment', text: 'second' });
        expect(grid.children[3].type).toBe('grid-item');
        expect(grid.children[4].type).toBe('grid-item');
      });

      it('comment after the last column stays in that column (no next column)', () => {
        const md = '::: columns-2\n::: column\n### Col A\ncontent\n:::\n::: column\n### Col B\ncontent\n<!-- trailing -->\n:::\n:::';
        const ast = parse(md);
        const grid = ast.children[0] as any;
        const colB = grid.children[1];
        expect(colB.children.some((n: any) => n.type === 'comment')).toBe(true);
      });

      it('comment before a row item is preserved as its own row item', () => {
        const md = '::: row\n\n[Search___]{type:search}\n\n<!-- fix label -->\n[Filter v]\n\n:::';
        const ast = parse(md);
        const row = ast.children[0] as any;
        // row.children = [grid-item-A, grid-item-comment, grid-item-B]
        expect(row.children[0].type).toBe('grid-item');
        expect(row.children[1].children[0]).toMatchObject({ type: 'comment', text: 'fix label' });
        expect(row.children[2].type).toBe('grid-item');
        expect(row.children[0].children.every((n: any) => n.type !== 'comment')).toBe(true);
        expect(row.children[2].children.every((n: any) => n.type !== 'comment')).toBe(true);
      });
    });
  });
});
