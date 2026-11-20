// No `unocss` import here: under pnpm it is not resolvable from the theme folder.
// Slidev merges this object into its own UnoCSS config.
import { tumColors } from './colors'

export { tumColors }

export default {
  theme: {
    colors: {
      tum: tumColors,
    },
  },
  shortcuts: {
    'text-tum': 'text-tum-blue',
    'bg-tum': 'bg-tum-blue',
    'border-tum': 'border-tum-blue',
  },
}
