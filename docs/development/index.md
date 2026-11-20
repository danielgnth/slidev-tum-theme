# Development

## Setup

The toolchain (Node.js, pnpm, Python + uv for the docs, actionlint, zizmor, gitleaks) is pinned in [`mise.toml`](https://github.com/danielgnth/slidev-tum-theme/blob/main/mise.toml).

```bash
# once: https://mise.jdx.dev/getting-started.html
mise trust && mise run setup     # tools, dependencies, git hooks
pnpm dev                         # showcase deck on http://localhost:3030
```

`pnpm install` installs the git hooks (lefthook). Without mise, install Node.js ≥ 22.22 and pnpm 12 yourself; the hooks that need gitleaks, actionlint or zizmor will tell you they are missing.

## Commands

| Command | |
|---|---|
| `pnpm dev` / `pnpm dev:starter` | showcase / starter deck with hot reload |
| `pnpm lint` / `pnpm lint:fix` | ESLint (TS, Vue, JSON, YAML, Markdown) and Stylelint (CSS) |
| `pnpm lint:actions` | actionlint + zizmor for `.github/` |
| `pnpm lint:secrets` | gitleaks over the git history |
| `pnpm typecheck` | vue-tsc |
| `pnpm test` | Vitest: utils, components, docs/package consistency |
| `pnpm build` | npm tarball in `dist/` + both example decks as static sites |
| `pnpm export` | showcase deck to `dist/showcase.pdf` (needs `pnpm exec playwright install chromium`) |
| `pnpm docs:dev` / `pnpm docs:build` | this site (Zensical) |
| `mise run check` | everything CI runs on a pull request |

## Git hooks

| Hook | Runs |
|---|---|
| pre-commit | ESLint and Stylelint on staged files (with `--fix`), actionlint + zizmor on workflow changes, gitleaks on the staged diff |
| commit-msg | Conventional Commit header check |
| pre-push | typecheck and tests |

Skip them once with `LEFTHOOK=0 git commit …`.

## Conventions

- Commits and PR titles are [Conventional Commits](https://www.conventionalcommits.org): `feat(layouts): …`, `fix(cover): …`, `docs: …`. They drive the version bump and the changelog.
- Code style is [@antfu/eslint-config](https://github.com/antfu/eslint-config): no semicolons, single quotes, two spaces. `pnpm lint:fix` formats.
- CSS classes are BEM-style with a `tum-` prefix: `tum-block__title`, `tum-block--alert`.
- Every user-facing change updates the docs, the agent skill and the showcase deck. The consistency tests fail when a layout or component is missing from `docs/layouts.md`, `docs/components.md` or `SKILL.md`.

## CI

| Workflow | When | |
|---|---|---|
| `ci.yml` | PR, push to main | lint, typecheck, test, build, PDF export, docs build; `ci-ok` is the single required check |
| `security-pr.yml` | PR | dependency review, OSV-Scanner (new vulns), CodeQL, zizmor, gitleaks |
| `security-nightly.yml` | daily | OSV-Scanner, `pnpm audit`, CodeQL, zizmor (online), gitleaks (full history), OpenSSF Scorecard |
| `release.yml` | push to main | SLSA source provenance; publishes when the version changed: see [Releasing](releasing.md) |
| `docs.yml` | push to main (`docs/`) | this site on GitHub Pages |
