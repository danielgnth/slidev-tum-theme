import type { SlideLike } from '../theme/utils/slides'
import { describe, expect, it } from 'vitest'
import { figureNumber, highlightedSection, listSections, sectionNumber, slideLayout } from '../theme/utils/slides'

function slide(no: number, frontmatter: Record<string, any> = {}, title?: string): SlideLike {
  return {
    no,
    meta: {
      slide: { frontmatter, title },
    },
  }
}

const deck: SlideLike[] = [
  slide(1, { layout: 'cover' }),
  slide(2, { layout: 'toc' }),
  slide(3, { layout: 'section' }, 'Basics'),
  slide(4, { layout: 'image', caption: 'Topology' }),
  slide(5, { layout: 'image' }),
  slide(6, { layout: 'section', hideInToc: true }, 'Hidden'),
  slide(7, { layout: 'diagram', caption: 'Flow' }),
  slide(8, { layout: 'section', title: 'Custom' }, 'Results'),
  slide(9, { layout: 'gallery', caption: 'not numbered' }),
  slide(10, { layout: 'section' }),
]

describe('slideLayout', () => {
  it('prefers the route layout over the frontmatter', () => {
    expect(slideLayout({
      no: 1,
      meta: {
        layout: 'end',
        slide: {
          frontmatter: { layout: 'cover' },
        },
      },
    })).toBe('end')
    expect(slideLayout(slide(1, { layout: 'cover' }))).toBe('cover')
    expect(slideLayout({ no: 1 })).toBeUndefined()
  })
})

describe('sectionNumber', () => {
  it('counts section slides up to the page', () => {
    expect(sectionNumber(deck, 2)).toBe(0)
    expect(sectionNumber(deck, 3)).toBe(1)
    expect(sectionNumber(deck, 7)).toBe(2)
    expect(sectionNumber(deck, 10)).toBe(4)
  })
})

describe('figureNumber', () => {
  it('counts captioned figure slides only', () => {
    expect(figureNumber(deck, 4)).toBe(1)
    expect(figureNumber(deck, 5)).toBe(1)
    expect(figureNumber(deck, 7)).toBe(2)
    expect(figureNumber(deck, 10)).toBe(2)
  })
})

describe('listSections', () => {
  const sections = listSections(deck, i => `Section ${i}`)

  it('skips hidden sections and resolves titles', () => {
    expect(sections).toEqual([
      { no: 3, index: 1, title: 'Basics' },
      { no: 8, index: 2, title: 'Custom' },
      { no: 10, index: 3, title: 'Section 3' },
    ])
  })

  it('highlights the current or next section', () => {
    expect(highlightedSection(sections, 2, 'current')).toBeUndefined()
    expect(highlightedSection(sections, 9, 'current')).toBe(8)
    expect(highlightedSection(sections, 9, 'next')).toBe(10)
    expect(highlightedSection(sections, 10, 'next')).toBeUndefined()
    expect(highlightedSection(sections, 9, 'none')).toBeUndefined()
  })
})
