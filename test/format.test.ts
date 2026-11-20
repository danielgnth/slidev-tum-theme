import { describe, expect, it } from 'vitest'
import { escapeHtml, footerHtml, formatDate } from '../theme/utils/format'

describe('formatDate', () => {
  it.each([
    ['2026-07-01', 'July 1<sup>st</sup>, 2026'],
    ['2026-07-02', 'July 2<sup>nd</sup>, 2026'],
    ['2026-07-03', 'July 3<sup>rd</sup>, 2026'],
    ['2026-07-04', 'July 4<sup>th</sup>, 2026'],
    ['2026-07-11', 'July 11<sup>th</sup>, 2026'],
    ['2026-07-12', 'July 12<sup>th</sup>, 2026'],
    ['2026-07-13', 'July 13<sup>th</sup>, 2026'],
    ['2026-07-21', 'July 21<sup>st</sup>, 2026'],
    ['2026-07-22', 'July 22<sup>nd</sup>, 2026'],
    ['2026-07-23', 'July 23<sup>rd</sup>, 2026'],
  ])('formats %s in English with an ordinal suffix', (input, expected) => {
    expect(formatDate(input, 'en')).toBe(expected)
  })

  it('formats German dates', () => {
    expect(formatDate('2026-07-02', 'de')).toBe('2. Juli 2026')
  })

  it('accepts Date objects', () => {
    expect(formatDate(new Date(2026, 0, 31), 'en')).toBe('January 31<sup>st</sup>, 2026')
  })

  it('uses today for empty values', () => {
    const now = () => new Date(2026, 10, 20)
    expect(formatDate(undefined, 'en', now)).toBe('November 20<sup>th</sup>, 2026')
    expect(formatDate('', 'en', now)).toBe('November 20<sup>th</sup>, 2026')
  })

  it('keeps free text but escapes HTML', () => {
    expect(formatDate('Summer term 2026', 'en')).toBe('Summer term 2026')
    expect(formatDate('<b>soon</b>', 'en')).toBe('&lt;b&gt;soon&lt;/b&gt;')
  })
})

describe('footerHtml', () => {
  const deck = { title: 'Something with Networking', author: 'Max Mustermann', date: '2026-07-02' }

  it('joins author, title and date', () => {
    expect(footerHtml({}, deck, 'en')).toBe('Max Mustermann | Something with Networking | July 2<sup>nd</sup>, 2026')
  })

  it('prefers the short forms', () => {
    expect(footerHtml({ shortAuthor: 'M. M.', shortTitle: 'Networking', footerDate: false }, deck, 'en'))
      .toBe('M. M. | Networking')
  })

  it('replaces everything with a custom string, escaped', () => {
    expect(footerHtml({ footer: 'Lab <3' }, deck, 'en')).toBe('Lab &lt;3')
  })

  it('skips empty parts', () => {
    expect(footerHtml({ footerDate: false }, { title: 'Talk' }, 'en')).toBe('Talk')
  })
})

describe('escapeHtml', () => {
  it('escapes the characters that matter in text content', () => {
    expect(escapeHtml('a & <b>')).toBe('a &amp; &lt;b&gt;')
  })
})
