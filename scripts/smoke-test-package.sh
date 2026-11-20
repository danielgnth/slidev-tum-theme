#!/usr/bin/env bash
# Installs the packed theme into a fresh Slidev project, the way users get it
# (`theme: tum` from node_modules, pnpm's strict layout), and builds the starter deck.
# Usage: scripts/smoke-test-package.sh dist/slidev-theme-tum-<version>.tgz
set -euo pipefail

tarball="$(cd "$(dirname "$1")" && pwd)/$(basename "$1")"
root="$(cd "$(dirname "$0")/.." && pwd)"
slidev_version="$(node -p "require('$root/node_modules/@slidev/cli/package.json').version")"
work="$(mktemp -d)"
trap 'rm -rf "$work"' EXIT

cd "$work"
cat > package.json <<JSON
{
  "name": "smoke-test",
  "private": true,
  "type": "module",
  "devDependencies": {
    "@slidev/cli": "$slidev_version",
    "slidev-theme-tum": "file:$tarball"
  }
}
JSON
cp "$root/pnpm-workspace.yaml" pnpm-workspace.yaml
sed -i.bak '/^packages:/,/^$/d' pnpm-workspace.yaml && rm pnpm-workspace.yaml.bak
sed 's#^theme: .*#theme: tum#' "$root/examples/starter/slides.md" > slides.md

pnpm install --ignore-scripts
pnpm exec slidev build

grep -q 'tum-tower' dist/assets/*.css || { echo "theme styles missing from the build" >&2; exit 1; }
echo "✓ slidev-theme-tum works when installed from $(basename "$tarball")"
