#!/usr/bin/env bash
# Publishes a packed tarball to npm. Used by release.yml (with --provenance) and by
# CI on every pull request (with --dry-run), so this exact command is always tested.
# Usage: scripts/publish-package.sh dist/slidev-theme-tum-<version>.tgz [npm publish flags]
set -euo pipefail

tarball="$1"
shift
test -f "$tarball"
# npm reads "dist/x.tgz" as the GitHub shorthand owner/repo; a ./ prefix makes it a path
case "$tarball" in
  /* | ./*) ;;
  *) tarball="./$tarball" ;;
esac

npm --version
npm publish "$tarball" --access public "$@"
