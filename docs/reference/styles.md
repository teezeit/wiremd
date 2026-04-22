# Visual Styles

wiremd includes 7 built-in styles, passed as `{ style: '...' }` to any render function.

| Style | Description | Best for |
|-------|-------------|----------|
| `sketch` | Hand-drawn, Balsamiq-style | Brainstorming, low-fidelity |
| `clean` | Modern minimal | Presentations, high-fidelity mockups |
| `wireframe` | Black & white, traditional | Developer handoff, specs |
| `material` | Material Design inspired | Android apps, Google-style |
| `brutal` | Neo-brutalism, bold colors | Artistic, statement designs |
| `tailwind` | Tailwind CSS utility classes | Tailwind projects |
| `none` | Semantic HTML, no CSS | Custom styling |

## Previews

### sketch
![sketch style](/screenshots/showcase-sketch-screenshot.png)

### clean
![clean style](/screenshots/showcase-clean-screenshot.png)

### wireframe
![wireframe style](/screenshots/showcase-wireframe-screenshot.png)

### material
![material style](/screenshots/showcase-material-screenshot.png)

### brutal
![brutal style](/screenshots/showcase-brutal-screenshot.png)

### tailwind
![tailwind style](/screenshots/showcase-tailwind-screenshot.png)

### none
![none style](/screenshots/showcase-none-screenshot.png)

## Usage

```typescript
import { parse, renderToHTML } from 'wiremd';

const ast = parse(markdown);
const html = renderToHTML(ast, { style: 'clean' });
```

CLI:
```bash
wiremd input.md --style clean
```
