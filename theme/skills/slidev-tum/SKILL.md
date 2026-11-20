---
name: slidev-tum
description: Write or edit Slidev presentations in the TUM corporate design with slidev-theme-tum. Use when a deck has `theme: tum` (or a path to this theme), or when someone asks for TUM slides, a thesis or seminar talk at TUM, or a Slidev deck for the Technical University of Munich.
---

# Slidev decks with slidev-theme-tum

The theme follows the TUM corporate design (16:9, 960 px canvas) and the `tumbeamer` LaTeX class. Write plain Slidev Markdown; pick a layout per slide in its frontmatter. Full docs: https://danielgnth.github.io/slidev-tum-theme/

## Headmatter

The first frontmatter block configures the deck and the title slide (`cover`):

```yaml
---
theme: tum
title: Something with Networking
author: Max Mustermann
subtitle: Final talk # optional
thesisType: final # intermediate | final (any other text is shown as is)
thesis: master # bachelor | master | idp | gr | seminar
advisor: Erika Musterfrau, M.Sc.
supervisor: Prof. Dr. … # optional
date: 2026-07-02 # ISO date, free text, or omit for today
venue: Garching b. München
tower: true # Uhrenturm drawing on the title slide
themeConfig:
  lang: en # en | de: all generated labels
  header: compact # compact (title next to logo) | full (chair/school/university above)
  chair: Chair of Imaginary Systems
  shortTitle: Networking # footer
  shortAuthor: M. Mustermann # footer
  # school, university, department: override the organisation lines
  # footer: false | "custom text";  footerDate: false;  figureNumbers: false
transition: none
---
```

Per slide: `header: compact | full | false`, `footer: false`.

## Layouts

| Layout | Use | Frontmatter |
|---|---|---|
| `cover` | title slide, automatic for slide 1 | headmatter |
| `default` | `# Title`, optional `## Subtitle` directly below, content | |
| `section` | numbered section divider | `variant: blue`, `number: false`, `hideInToc: true` |
| `toc` | outline of all `section` slides | `highlight: current \| next`, `columns`, `numbered`, `heading` |
| `two-cols` | `# Title` then `::left::` `::right::` (`::bottom::`) | `cols: 1fr 1.3fr`, `gap`, `align` |
| `three-cols` | `# Title` then `::left::` `::middle::` `::right::` | `cols`, `gap`, `align` |
| `image` | title + one figure filling the slide | `image`, `caption`, `fit: contain \| cover`, `alt` |
| `image-left`, `image-right` | figure beside text | `image`, `caption`, `width: 45%`, `fit`, `alt` |
| `image-full` | full-bleed photo, white logo, overlay title | `image`, `caption`, `dim: true`, `position` |
| `gallery` | grid of sub-figures | `images: [{src, caption}]`, `cols`, `fit` |
| `diagram` | title + Mermaid/PlantUML/SVG scaled to fit | `caption` |
| `fact` | one big number + one line | |
| `statement` | one big sentence | |
| `quote` | quotation | `source` |
| `center` | anything centred | |
| `references` | bibliography, `- [1] …` gives hanging indent | |
| `end` | "Questions?" + contact; body replaces the heading | `email`, `web`, `tower` |

Captions of `image`, `image-left`, `image-right` and `diagram` are numbered across the deck automatically ("Figure 3: …"); do not write numbers into captions. `gallery` sub-captions are not numbered: write "(a) …".

## Components

```md
<Block title="Definition">…</Block>          <!-- type: info | alert | example | warning | note; outline -->
<Figure src="/images/x.svg" caption="…" height="200px" />
<Caption label="Table" n="1">Results</Caption>
<Yes/> <No/> <Maybe/>                        <!-- ✓ ✗ ○ for comparison tables -->
<TumLogo color="white" :height="40" />
```

Leave an empty line after `<Block …>` when its body is Markdown.

## Style rules

- `*emphasis*` renders upright in TUM blue (like `\emph`); use `**bold**` for strong emphasis.
- Colours: UnoCSS utilities `text-tum-blue`, `bg-tum-orange`, `text-tum-green`, … (full TUM palette). Never hard-code other colours.
- Text helpers: `<span class="small">`, `tiny`, `muted`.
- Images go in `public/` next to `slides.md` and are referenced from the root: `/images/setup.svg`.
- Mermaid diagrams are themed in TUM colours automatically; prefer `layout: diagram` for a diagram that should fill the slide.
- Tables render booktabs-style; keep them under ~8 rows.
- Do not set `mdc: true`: it turns `[1]` into a span, so `references` labels lose their brackets and footnotes (`[^1]`) break. If a deck needs MDC, write labels as `\[1\]`.

## Writing good TUM slides

- One message per slide; frame titles are short (they share the row with the logo in `compact` mode).
- At most ~6 bullets, ~2 levels.
- Start with `toc` after the title, use `section` slides for structure, and a `toc` with `highlight: current` before each section in longer talks.
- End with `references` (if anything is cited) and `end`.
- `lang: de` for German talks: labels switch to "Abbildung", "Gliederung", "Fragen?" — write the content in German too.

## Check your work

`pnpm slidev build` must succeed, and `pnpm slidev export --format png` renders every slide to inspect the result.
