# AGENTS.md

Guide for coding agents working on this repository. Humans: the same content, longer, is in `docs/development/`.

## What this is

`slidev-theme-tum`: a [Slidev](https://sli.dev) theme in the TUM corporate design, published to npm from `theme/`. The theme is shipped as source (Vue SFCs, TS, CSS); Slidev compiles it in the user's deck. There is no build step for the theme itself.

## Map

```text
theme/layouts/*.vue        one file per layout; the file name is the `layout:` value
theme/components/*.vue     public components; Tum* prefix = internal (except TumLogo)
theme/composables/useTum.ts  the only place that reads Slidev state
theme/utils/*.ts           pure logic (dates, footer, i18n labels, section/figure counters)
theme/styles/*.css         global CSS, imported in order by styles/index.ts
theme/colors.ts            TUM palette, single source (UnoCSS + Mermaid); tokens.css mirrors it
theme/types.ts             TumThemeConfig and shared prop types
theme/skills/slidev-tum/   agent skill shipped in the npm package: the deck-author reference
examples/showcase/         deck with every layout and component (sample images in its public/)
examples/starter/          minimal deck
test/                      Vitest unit + consistency tests
types/                     ambient types; @slidev/client is stubbed for vue-tsc (see tsconfig paths)
docs/                      Zensical docs site (zensical.toml)
```

## Commands

Toolchain is pinned in `mise.toml` (`mise install`). Use pnpm, never npm/yarn for dependencies.

```bash
pnpm install --frozen-lockfile
pnpm lint            # eslint + stylelint;  pnpm lint:fix to format
pnpm typecheck       # vue-tsc
pnpm test            # vitest
pnpm build           # tarball in dist/ + example decks as static sites
pnpm lint:actions    # actionlint + zizmor (after touching .github/)
pnpm docs:build      # zensical
mise run check       # everything CI runs
```

To look at slides: `pnpm exec slidev export examples/showcase/slides.md --format png --output <dir>` renders one PNG per slide (needs `pnpm exec playwright install chromium`). Check visual changes this way; a passing build does not mean a slide looks right.

## Rules

- **Keep the four surfaces in sync.** A user-facing change (new layout, prop, option, component) updates: the code, `docs/` (layouts.md / components.md / configuration.md), `theme/skills/slidev-tum/SKILL.md`, and `examples/showcase/slides.md`. `test/consistency.test.ts` enforces part of this.
- **Logic goes in `theme/utils/`** as pure functions with tests; components and layouts stay thin. Only `useTum` touches `useSlideContext`.
- **Colours** come from `colors.ts` / CSS variables (`var(--tum-blue)`), never new hex values in components.
- **CSS**: BEM-style classes with the `tum-` prefix (`tum-block__title`, `tum-block--alert`), enforced by stylelint. Put styles in the matching file under `theme/styles/`.
- **Layouts with chrome** wrap their content in `TumFrame`; figure layouts use `TumFitFigure` and `useTum().figureNumber`.
- **No new runtime dependencies** in `theme/package.json` without a strong reason: everything ships to every user deck.
- **Style**: @antfu/eslint-config (no semicolons, single quotes). Match the comment density of the surrounding code.
- **Commits / PR titles**: Conventional Commits (`feat(layouts): …`). They generate the changelog and the version.
- **Workflows**: pin actions by full SHA with a `# vX.Y.Z` comment, `permissions: {}` at the top, least privilege per job, `persist-credentials: false`. Run `pnpm lint:actions`.
- **Releases** happen only through `pnpm release` → PR → `release.yml`. Never publish to npm by hand, never edit versions or CHANGELOG.md manually.
- `theme/assets/uhrenturm.png` and the logo path in `TumLogo.vue` are TUM corporate design assets, excluded from the MIT licence (`NOTICE.md`): do not modify them, and do not add other TUM assets without updating `NOTICE.md`.
- **Docs screenshots** are generated, never committed: showcase slides with a `routeAlias` are rendered to `docs/assets/screens/<alias>.png` by `pnpm docs:screens` (part of `docs:build`). To add one, give the slide a `routeAlias` and reference `assets/screens/<alias>.png`.
- Example content uses fictional names ("Chair of Imaginary Systems", Max Mustermann, `@example.org`), never real chairs or people.
