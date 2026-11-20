// @ts-check
import antfu from '@antfu/eslint-config'

export default antfu({
  vue: true,
  typescript: true,
  markdown: true,
  ignores: [
    'dist/**',
    'site/**',
    '**/.slidev/**',
    'mise.lock',
    '.mise/**',
  ],
}, {
  // Slidev decks (and deck snippets in the docs): every slide starts with its own H1
  files: ['examples/**/slides.md', '**/*.md/**/*.md'],
  rules: {
    'markdown/no-multiple-h1': 'off',
    'markdown/heading-increment': 'off',
  },
}, {
  // slides are presentation content: allow v-html for the footer/date markup
  files: ['theme/**/*.vue'],
  rules: {
    'vue/no-v-html': 'off',
  },
})
