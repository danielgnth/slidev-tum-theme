// Guards that keep code, styles, docs and the package manifest in sync.
import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { tumColors } from '../theme/colors'

const root = join(import.meta.dirname, '..')
const read = (p: string) => readFileSync(join(root, p), 'utf8')
function list(dir: string) {
  return readdirSync(join(root, dir), { withFileTypes: true })
    .filter(d => !d.name.startsWith('.'))
}

describe('colors', () => {
  it('css tokens match colors.ts', () => {
    const css = read('theme/styles/tokens.css')
    const vars = [
      ...css.matchAll(/--tum-([\w-]+):\s*(#[0-9a-f]{6})/gi),
    ]
      .filter(([, name]) => name in tumColors)
    expect(vars.length).toBeGreaterThan(10)
    for (const [, name, value] of vars)
      expect(value.toUpperCase(), `--tum-${name}`).toBe(tumColors[name as keyof typeof tumColors])
  })
})

describe('docs', () => {
  const vueFiles = (dir: string) => list(dir)
    .filter(d => d.isFile() && d.name.endsWith('.vue'))
    .map(d => d.name.replace(/\.vue$/, ''))
  const layouts = vueFiles('theme/layouts')
  const components = vueFiles('theme/components')
    .filter(n => !n.startsWith('Tum') || n === 'TumLogo')

  it.each(layouts)('documents the %s layout', (name) => {
    expect(read('docs/layouts.md')).toContain(`\`${name}\``)
  })

  it.each(components)('documents the <%s> component', (name) => {
    expect(read('docs/components.md')).toContain(`<${name}`)
  })

  it('lists every layout in the agent skill', () => {
    const skill = read('theme/skills/slidev-tum/SKILL.md')
    for (const name of layouts.filter(n => n !== 'two-cols-header'))
      expect(skill, name).toContain(name)
  })
})

describe('package', () => {
  const pkg = JSON.parse(read('theme/package.json'))

  it('ships every theme directory', () => {
    const dirs = list('theme')
      .filter(d => d.isDirectory() && d.name !== 'node_modules')
      .map(d => d.name)
    for (const dir of dirs)
      expect(pkg.files, dir).toContain(dir)
  })

  it('has a repository that matches the provenance source', () => {
    expect(pkg.repository.directory).toBe('theme')
    expect(existsSync(join(root, pkg.repository.directory, 'package.json'))).toBe(true)
  })
})
