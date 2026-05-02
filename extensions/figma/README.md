# wiremd Figma Plugin

Import wiremd markdown mockups as fully editable Figma designs with native components, auto-layout, and professional styling.

## Features

✨ **Native Figma Elements** - Creates real Figma frames, text nodes, and components (not just images)
🎨 **Multiple Themes** - Sketch (hand-drawn), Clean (modern), Wireframe (grayscale), or Minimal
📐 **Auto-Layout** - Responsive designs with proper constraints and spacing
🔧 **Fully Editable** - Every element can be customized after import
⚡ **Fast** - Imports complete mockups in seconds

## Supported Components

### Layout
- Containers (hero, card, modal, alert, section)
- Navigation bars
- Column layouts (2, 3, 4+ columns)
- Brand headers

### Forms
- Buttons (primary, secondary, danger variants)
- Text inputs
- Textareas
- Select dropdowns
- Checkboxes
- Radio buttons and groups

### Content
- Headings (H1-H6)
- Paragraphs
- Images (as placeholders)
- Icons (Unicode symbols)
- Links
- Lists (ordered/unordered)
- Tables
- Blockquotes
- Code blocks

## Installation

### Option 1: Install from Figma Community (Recommended)
1. Open Figma
2. Go to Plugins → Browse plugins in Community
3. Search for "wiremd Importer"
4. Click "Install"

### Option 2: Development Installation
1. Clone the wiremd monorepo: `git clone https://github.com/teezeit/wiremd.git`
2. Install + build: `pnpm install && pnpm --filter wiremd-figma-plugin run build`
3. In Figma: **Menu → Plugins → Development → Import plugin from manifest**
4. Select `extensions/figma/manifest.json`
5. The plugin appears in **Plugins → Development → wiremd Importer**

## Usage

### Step 1: Generate wiremd JSON

Use the wiremd CLI to convert your markdown mockup to JSON:

```bash
wiremd your-mockup.md --format json -o mockup.json
```

Example markdown:
```markdown
[[ Logo | Home | Products | About | [Sign In] ]]

::: hero
# Welcome to Our Product
Transform your workflow with powerful tools
[Get Started] [Learn More]{.outline}
:::

::: columns-3 card

::: column Fast Performance
Lightning-quick load times
:::

::: column Secure
Enterprise-grade security
:::

::: column Scalable
Grows with your needs
:::

:::
```

### Step 2: Open Plugin in Figma

1. Open Figma
2. Menu → Plugins → wiremd Importer
3. Select your preferred visual theme:
   - **Sketch** - Balsamiq-style hand-drawn look
   - **Clean** - Modern minimal design
   - **Wireframe** - Traditional grayscale
   - **Minimal** - Unstyled for custom CSS

### Step 3: Import JSON

1. Copy the contents of `mockup.json`
2. Paste into the text area
3. Click "Import to Figma"
4. Your design appears as a new page with editable components!

## Visual Themes

### Sketch Theme
- Hand-drawn, Balsamiq-inspired aesthetic
- Chalkboard font (or Comic Sans fallback)
- Rotated elements with shadows
- Perfect for brainstorming and early concepts

### Clean Theme
- Modern, polished design
- Inter font family
- Smooth rounded corners
- Professional drop shadows
- Great for client presentations

### Wireframe Theme
- Traditional grayscale
- Helvetica font
- Sharp corners, minimal styling
- Ideal for technical specifications

### Minimal Theme
- Bare-bones semantic HTML
- Basic borders and spacing
- Perfect starting point for custom styling

## Keyboard Shortcuts

- `Cmd/Ctrl + Enter` - Import (when textarea is focused)

## Tips & Tricks

### Auto-Layout Best Practices
The plugin uses Figma's auto-layout extensively. Imported designs will:
- Resize automatically when content changes
- Maintain proper spacing between elements
- Support responsive design patterns

### Editing After Import
All elements are fully editable:
- Text: Double-click any text to edit
- Colors: Select element and change fill/stroke
- Spacing: Adjust padding and gaps in auto-layout properties
- Layout: Drag elements to reorder

### Component Creation
Convert repeated elements to components:
1. Select an imported button or card
2. Create Component (Cmd/Ctrl + Alt + K)
3. Reuse across your design

### Working with Columns
Imported column layouts use horizontal frames with columns:
- Adjust `itemSpacing` to change gaps
- Resize columns independently
- Add/remove columns as needed

## Troubleshooting

### "Invalid wiremd JSON" error
- Ensure you're using `--format json` flag with wiremd CLI
- Validate JSON syntax (use jsonlint.com)
- Check that root object has `"type": "document"`

### Missing fonts
The plugin will attempt to load these fonts in order:
1. Theme-specific fonts (Chalkboard, Inter, Helvetica)
2. Roboto (fallback)

If fonts are missing, install them from Google Fonts or use a different theme.

### Large imports are slow
For very large mockups (100+ components):
- Consider breaking into multiple pages
- Import will show progress indicator
- Plugin won't freeze, but may take 10-30 seconds

### Elements look wrong
- Check that your wiremd markdown uses correct syntax
- Try different theme to see if it's theme-specific
- Verify JSON structure matches wiremd spec

## Development

The Figma plugin is a workspace inside the wiremd monorepo. All commands run from the repo root.

### Building from source

```bash
pnpm install
pnpm --filter wiremd-figma-plugin run build
# Output → extensions/figma/dist/
```

### Development mode

```bash
pnpm --filter wiremd-figma-plugin run dev   # tsc --watch + ui.html copy
```

Then in Figma:
1. **Plugins → Development → Import plugin from manifest**
2. Select `extensions/figma/manifest.json`
3. The plugin reloads automatically on file changes (run **Plugins → Development → wiremd Importer** again to pick up new builds)

### Project structure

```
extensions/figma/
├── src/
│   ├── code.ts                  # Main plugin logic
│   ├── ui.html                  # Plugin UI
│   └── lib/
│       ├── ast-to-figma.ts      # Core converter
│       ├── types.ts             # TypeScript types
│       ├── style-mapper.ts      # Theme styling
│       ├── form-components.ts   # Form converters
│       └── content-components.ts # Content converters
├── tests/                       # vitest test suite
├── dist/                        # Compiled output (gitignored)
├── manifest.json                # Figma plugin manifest
├── package.json                 # workspace name: wiremd-figma-plugin
├── tsconfig.json
└── vitest.config.ts
```

### Testing

Generate JSON from any wireframe and import it through the plugin:

```bash
# Build the core CLI first
pnpm --filter wiremd run build

# From any folder containing wireframe markdown:
pnpm --filter wiremd exec wiremd navigation.md --format json -o nav.json
pnpm --filter wiremd exec wiremd form.md       --format json -o form.json

# Run the plugin's vitest suite
pnpm --filter wiremd-figma-plugin run test
```

## Contributing

Contributions welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Add tests for new functionality
4. Submit a pull request

See [CONTRIBUTING.md](../../CONTRIBUTING.md) for guidelines.

## License

MIT License - see [LICENSE](../LICENSE) for details.

## Support

- 📖 [Documentation](https://teezeit.github.io/wiremd/)
- 💬 [GitHub Discussions](https://github.com/teezeit/wiremd/discussions)
- 🐛 [Issue Tracker](https://github.com/teezeit/wiremd/issues)
- 💡 [Feature Requests](https://github.com/teezeit/wiremd/issues/new?template=feature_request.md)

## Roadmap

### v0.2 (Planned)
- [ ] Bi-directional sync (Figma → wiremd)
- [ ] Component variants support
- [ ] Custom color themes
- [ ] Image loading from URLs
- [ ] Style export (Figma styles → wiremd)

### v0.3 (Future)
- [ ] Batch import (multiple files)
- [ ] Live preview mode
- [ ] Plugin settings/preferences
- [ ] Export to wiremd from Figma
- [ ] Template library

## Credits

Built with ❤️ by the wiremd team

- Uses Figma Plugin API
- Inspired by html.to.design and other design tools
- Special thanks to the Figma developer community

---

**Made with wiremd** - Text-first UI design for developers
