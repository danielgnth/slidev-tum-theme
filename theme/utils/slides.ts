// Deck-wide counters (section numbers, figure numbers, outline) computed from the
// slide routes. Only the fields used here are typed, so tests can pass plain objects.

export interface SlideLike {
  no: number
  meta?: {
    layout?: string
    slide?: {
      title?: string
      frontmatter?: Record<string, any>
    }
  }
}

/** Layouts whose `caption` frontmatter counts as a numbered figure */
export const FIGURE_LAYOUTS = [
  'image',
  'image-left',
  'image-right',
  'diagram',
]

export const SECTION_LAYOUTS = ['section']

export function slideLayout(route: SlideLike): string | undefined {
  return route.meta?.layout ?? route.meta?.slide?.frontmatter?.layout
}

function frontmatter(route: SlideLike) {
  return route.meta?.slide?.frontmatter ?? {}
}

/** 1-based number of the section slide `page` belongs to (0 before the first section) */
export function sectionNumber(slides: SlideLike[], page: number) {
  return slides.filter(r => r.no <= page && SECTION_LAYOUTS.includes(slideLayout(r) ?? '')).length
}

/** Number of captioned figure slides up to and including `page` */
export function figureNumber(slides: SlideLike[], page: number) {
  return slides.filter(r =>
    r.no <= page
    && FIGURE_LAYOUTS.includes(slideLayout(r) ?? '')
    && frontmatter(r).caption,
  ).length
}

export interface SectionEntry {
  /** slide number of the section slide */
  no: number
  /** 1-based index among the listed sections */
  index: number
  title: string
}

/** Sections for the outline, skipping slides with `hideInToc: true` */
export function listSections(slides: SlideLike[], fallbackTitle: (index: number) => string): SectionEntry[] {
  return slides
    .filter(r => slideLayout(r) === 'section' && !frontmatter(r).hideInToc)
    .map((r, i) => ({
      no: r.no,
      index: i + 1,
      title: frontmatter(r).title ?? r.meta?.slide?.title ?? fallbackTitle(i + 1),
    }))
}

/** Slide number of the section to emphasise on an outline slide */
export function highlightedSection(sections: SectionEntry[], page: number, mode: 'current' | 'next' | 'none') {
  if (mode === 'current')
    return sections.findLast(s => s.no <= page)?.no
  if (mode === 'next')
    return sections.find(s => s.no > page)?.no
  return undefined
}
