// The subset of `@slidev/client` the theme uses, for type-checking only.
// `@slidev/client` ships raw TypeScript that needs Slidev's build-time globals and
// its full dependency tree, so tsconfig.json maps the import to this file instead.
// Keep in sync with https://github.com/slidevjs/slidev/blob/main/packages/client/context.ts
import type { SlideRoute, SlidevConfig } from '@slidev/types'
import type { Ref } from 'vue'

export interface SlidevNavSubset {
  slides: SlideRoute[]
  go: (no: number) => void
}

export interface SlideContextSubset {
  $slidev: {
    configs: SlidevConfig
    nav: SlidevNavSubset
  }
  $page: Ref<number>
  $frontmatter: Record<string, any>
}

export function useSlideContext(): SlideContextSubset
export function resolveAssetUrl(url: string): string
