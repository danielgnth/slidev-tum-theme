# Getting started

## Requirements

- Node.js 22.22 or newer
- A package manager: pnpm (recommended), npm or yarn

## A new talk

=== "pnpm"

    ```bash
    pnpm create slidev my-talk
    cd my-talk
    pnpm add -D slidev-theme-tum
    ```

=== "npm"

    ```bash
    npm init slidev@latest my-talk
    cd my-talk
    npm install -D slidev-theme-tum
    ```

Replace the headmatter (the first block of `slides.md`) with:

```yaml
---
theme: tum
title: Something with Networking
author: Max Mustermann
subtitle: Final talk # optional
thesisType: final # intermediate | final
thesis: master # bachelor | master | idp | gr | seminar
advisor: Erika Musterfrau, M.Sc.
date: 2026-07-02
themeConfig:
  lang: en # en | de
  shortTitle: Networking
  shortAuthor: M. Mustermann
  chair: Chair of Network Architectures and Services
transition: none
---
```

The first slide uses the `cover` layout automatically. Add content slides after it:

```md
---
layout: toc
---

---
layout: section
---

# Introduction

---

# Motivation

- First point
- *emphasis* is TUM blue
```

Run `pnpm dev` and open <http://localhost:3030>.

!!! tip "Starter deck"
    [`examples/starter/slides.md`](https://github.com/danielgnth/slidev-tum-theme/blob/main/examples/starter/slides.md) is a minimal deck to copy. [`examples/showcase/slides.md`](https://github.com/danielgnth/slidev-tum-theme/blob/main/examples/showcase/slides.md) shows every layout and component.

## Images

Put images in `public/` next to `slides.md` and reference them from the root: `public/images/setup.svg` becomes `/images/setup.svg`. The theme brings its own assets (logo, Uhrenturm), so `public/` only holds what your talk needs.

## Export to PDF

```bash
pnpm add -D playwright-chromium
pnpm exec playwright install chromium
pnpm slidev export            # slides-export.pdf
pnpm slidev export --with-clicks
```

## Fonts

The theme uses *TUM Neue Helvetica* when it is installed (TUM members can download it from the TUM corporate design portal), otherwise Helvetica Neue, Helvetica or Arial. It loads no web fonts, so decks work offline and export the same everywhere the font is installed.

## Using the theme from a checkout

Instead of the npm package you can point a deck at a local copy of the `theme/` folder:

```yaml
theme: ../path/to/slidev-tum-theme/theme
```
