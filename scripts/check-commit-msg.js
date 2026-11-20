// Commit messages follow Conventional Commits, so release-it can derive the next
// version and the changelog: `feat(layouts): add timeline layout`.
import { readFileSync } from 'node:fs'
import process from 'node:process'

const types = [
  'feat',
  'fix',
  'docs',
  'style',
  'refactor',
  'perf',
  'test',
  'build',
  'ci',
  'chore',
  'revert',
]
const pattern = new RegExp(`^(?:${types.join('|')})(?:\\([\\w./-]+\\))?!?: \\S`)

const header = readFileSync(process.argv[2], 'utf8').split('\n')[0]

if (!pattern.test(header) && !/^(?:Merge|Revert|fixup!|squash!) /.test(header)) {
  console.error(`✖ "${header}"`)
  console.error(`  Use a Conventional Commit header: <type>(<scope>)?: <summary>`)
  console.error(`  types: ${types.join(', ')}`)
  process.exit(1)
}
