// Renders the showcase slides that have a `routeAlias` to docs/assets/screens/<alias>.png,
// so the screenshots in the docs always show the current theme. Runs before every docs build.
// Needs Chromium: pnpm exec playwright install chromium
import { execFileSync } from 'node:child_process'
import { copyFileSync, existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import process from 'node:process'
import { parse } from '@slidev/parser'

const deck = 'examples/showcase/slides.md'
const outDir = 'docs/assets/screens'
// 2× the 980 px canvas: sharp on high-density displays at the docs' content width
const scale = process.env.SCREENSHOT_SCALE ?? '2'

const { slides } = await parse(readFileSync(deck, 'utf8'), deck)
const shots = slides
  .filter(s => s.frontmatter?.routeAlias)
  .map(s => ({
    no: s.index + 1,
    name: String(s.frontmatter.routeAlias),
  }))

for (const { name } of shots) {
  if (!/^[\w-]+$/.test(name))
    throw new Error(`routeAlias "${name}" is not a valid file name`)
}

const tmp = mkdtempSync(join(tmpdir(), 'docs-screens-'))
try {
  execFileSync('pnpm', [
    'exec',
    'slidev',
    'export',
    deck,
    '--format',
    'png',
    '--range',
    shots.map(s => s.no).join(','),
    '--scale',
    scale,
    '--timeout',
    '60000',
    '--output',
    tmp,
  ], { stdio: 'inherit' })

  mkdirSync(outDir, { recursive: true })
  for (const { no, name } of shots) {
    const file = join(tmp, `${no}.png`)
    if (!existsSync(file))
      throw new Error(`slide ${no} (${name}) was not exported`)
    copyFileSync(file, join(outDir, `${name}.png`))
  }
  console.log(`✓ ${shots.length} screenshots in ${outDir}: ${shots.map(s => s.name).join(', ')}`)
}
finally {
  rmSync(tmp, { recursive: true, force: true })
}
