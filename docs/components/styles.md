# Visual Styles

wiremd includes 7 built-in visual styles. Pass one with `--style` on the CLI or `{ style: '...' }` in the API.

| Style | Description | Best for |
|-------|-------------|----------|
| `sketch` | Hand-drawn, Balsamiq-style | Brainstorming, low-fidelity |
| `clean` | Modern minimal | Presentations, high-fidelity mockups |
| `wireframe` | Black & white, traditional | Developer handoff, specs |
| `material` | Material Design inspired | Android apps, Google-style |
| `brutal` | Neo-brutalism, bold colors | Artistic, statement designs |
| `tailwind` | Tailwind CSS utility classes | Tailwind projects |
| `none` | Semantic HTML, no CSS | Custom styling |

`sketch` is the default when no style is specified.

## Previews

### sketch
![sketch style](/assets/showcases/showcase-sketch-screenshot.png)

### clean
![clean style](/assets/showcases/showcase-clean-screenshot.png)

### wireframe
![wireframe style](/assets/showcases/showcase-wireframe-screenshot.png)

### material
![material style](/assets/showcases/showcase-material-screenshot.png)

### brutal
![brutal style](/assets/showcases/showcase-brutal-screenshot.png)

### tailwind
![tailwind style](/assets/showcases/showcase-tailwind-screenshot.png)

### none
![none style](/assets/showcases/showcase-none-screenshot.png)

## CLI

```bash
wiremd file.md --style clean --serve 3001 --watch
wiremd file.md --style sketch
wiremd file.md --style wireframe -o output.html
```

## API

```typescript
import { parse, renderToHTML } from 'wiremd';

const html = renderToHTML(parse(markdown), { style: 'clean' });
```

## VS Code

Use the style picker in the wiremd preview panel to switch styles live — no terminal needed.
