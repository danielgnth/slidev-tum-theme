# Security

## Reporting

Report vulnerabilities privately through [GitHub security advisories](https://github.com/danielgnth/slidev-tum-theme/security/advisories/new), not as issues.

## Supply chain

**Dependencies**

- `pnpm-lock.yaml` is installed with `--frozen-lockfile` everywhere.
- `minimumReleaseAge` (7 days) in `pnpm-workspace.yaml` keeps freshly published, possibly compromised versions out; Dependabot uses the same cooldown.
- `trustPolicy: no-downgrade` refuses versions published with weaker trust than earlier ones (e.g. without the provenance their predecessors had), a typical sign of a hijacked maintainer account. Exceptions are listed with a reason under `trustPolicyExclude`.
- Install scripts are off unless allow-listed in `pnpm-workspace.yaml` (`allowBuilds`).
- Transitive vulnerabilities in packages bundled into the built example decks are patched via `overrides` in `pnpm-workspace.yaml`, while reviewed advisories in dev-only CLI, lint, and test tools are recorded in `pnpm-workspace.yaml` (`audit.ignore`) and `osv-scanner.toml`.
- Tools outside npm are pinned to exact versions in `mise.toml`. `mise.lock` records the download URL and checksum of every tool per platform (`mise lock` after changing a version), and mise verifies release attestations on install.

**Workflows**

- Every action is pinned to a full commit SHA, workflows default to `permissions: {}` and each job asks for the least it needs.
- Checkouts don't persist credentials.
- zizmor and actionlint check the workflows locally (pre-commit), on every PR and nightly.

**Scanning**

| Check | Pull request | Nightly |
|---|---|---|
| Dependency review (vulnerabilities, licences, Scorecard of new dependencies) | ✓ | |
| OSV-Scanner | new vulnerabilities only | whole lockfile |
| `pnpm audit` | | ✓ (job summary) |
| CodeQL (TypeScript, Actions), `security-and-quality` | ✓ (and on every push to main) | weekly |
| zizmor | ✓ | ✓ with online audits |
| gitleaks | commits of the PR | full history (SARIF) |
| OpenSSF Scorecard | | ✓ |

Findings with SARIF output appear under *Security* → *Code scanning*. Nightly jobs only fail when a scan itself errors rather than when findings are reported.

**Releases**

Packages are built and published only by `release.yml`, with SLSA source and build provenance and npm trusted publishing. See [Releasing](releasing.md).
