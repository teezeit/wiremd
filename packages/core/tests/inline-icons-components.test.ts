import { describe, expect, it } from 'vitest';
import { parse } from '../src/parser/index.js';
import { renderToHTML } from '../src/renderer/index.js';

function htmlFor(markdown: string): string {
  return renderToHTML(parse(markdown), { style: 'sketch' });
}

function expectRenderedIcon(markdown: string, literal: string): void {
  const html = htmlFor(markdown);
  expect(html).toContain('data-icon="check"');
  expect(html).not.toContain(literal);
}

describe('inline icon syntax inside component labels', () => {
  it('renders icons in text content surfaces', () => {
    expectRenderedIcon('# :check: Heading', ':check: Heading');
    expectRenderedIcon(':check: Paragraph', ':check: Paragraph');
    expectRenderedIcon('- :check: List item', ':check: List item');
    expectRenderedIcon('| Status |\n|---|\n| :check: Ready |', ':check: Ready');
    expectRenderedIcon('[:check: Docs](./docs.md)', ':check: Docs');
  });

  it('renders icons in navigation labels', () => {
    const html = htmlFor('[[ :logo: WireMD | :check: Status | [:check: Docs](./docs.md) | [ :check: Start]* ]]');

    expect(html).toContain('data-icon="logo"');
    expect(html.match(/data-icon="check"/g)).toHaveLength(3);
    expect(html).not.toContain(':check: Status');
    expect(html).not.toContain(':check: Docs');
    expect(html).not.toContain(':check: Start');
  });

  it('renders icons in form-control labels', () => {
    const html = htmlFor(`
[ ] :check: Terms
[ :check: Alerts]{switch checked}
- (x) :check: Enabled
    `.trim());

    expect(html.match(/data-icon="check"/g)).toHaveLength(3);
    expect(html).not.toContain(':check: Terms');
    expect(html).not.toContain(':check: Alerts');
    expect(html).not.toContain(':check: Enabled');
  });

  it('renders icons in tabs, accordion summaries, and breadcrumbs', () => {
    const html = htmlFor(`
::: tabs
::: tab :check: Overview
Panel
:::
:::

::: accordion
::: item :check: Details
Body
:::
:::

[[ Home > :check: Current ]]
    `.trim());

    expect(html.match(/data-icon="check"/g)).toHaveLength(3);
    expect(html).not.toContain(':check: Overview');
    expect(html).not.toContain(':check: Details');
    expect(html).not.toContain(':check: Current');
  });

  it('keeps icon syntax literal where the text is an explicit attribute value', () => {
    const html = htmlFor('[_____]{placeholder:":check: Search"}');

    expect(html).toContain('placeholder=":check: Search"');
  });
});
