# Styling

## Colours

The whole TUM palette is available as [UnoCSS](https://unocss.dev) utilities with the `tum-` prefix: `text-tum-blue`, `bg-tum-orange`, `border-tum-green`, … Shortcuts: `text-tum`, `bg-tum`, `border-tum` (TUM blue).

```md
<span class="text-tum-green font-bold">10×</span> fewer messages
```

| Group | Names |
|---|---|
| Primary | `blue` `white` `black` |
| Secondary | `darker-blue` `dark-blue` `dark-gray` `gray` `light-gray` |
| Highlight | `ivory` `orange` `green` `light-blue` `lighter-blue` |
| Diagrams | `purple` `dark-purple` `turquoise` `dark-green` `darker-green` `yellow` `dark-yellow` `light-red` `red` `dark-red` |

The values live in [`theme/colors.ts`](https://github.com/danielgnth/slidev-tum-theme/blob/main/theme/colors.ts).

## Text helpers

| Markdown | Result |
|---|---|
| `*emphasis*` | TUM blue, upright (like `\emph` in tumbeamer) |
| `**bold**` | bold |
| `<span class="small">` | 14.5 px |
| `<span class="tiny">` | 12 px |
| `<span class="muted">` | grey |

## CSS variables

Override them in a `style.css` next to your slides, or in a `<style>` block on a slide:

```css
:root {
  --tum-fs-body: 20px;   /* body text */
  --tum-fs-title: 26px;  /* frame titles */
}
```

| Variable | Default | |
|---|---|---|
| `--tum-blue`, `--tum-orange`, … | palette | |
| `--tum-text` | `#000` | body text |
| `--tum-muted` | `#5e5e5e` | secondary text |
| `--tum-fs-body` | `18px` | |
| `--tum-fs-title` | `24px` | |
| `--tum-fs-small` | `14.5px` | tables, blockquotes |
| `--tum-mx` / `--tum-mt` | `34px` / `30px` | side and top margins |
| `--tum-logo-h` | `34px` | logo height |

## Mermaid

Mermaid diagrams use the TUM palette: blue nodes, orange and green for secondary and tertiary elements, and the highlight colours for pie, gantt and xy charts. Per-diagram overrides work as usual with `%%{init: …}%%`.

## Code

Code blocks use Shiki with a light background and a TUM-blue rule on the left. Line highlighting (`{2-3|5}`) and all other Slidev code features work as usual.
