import type { TumLang, TumThemeConfig } from '../types'

export function escapeHtml(s: string) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

function ordinalSuffix(day: number) {
  if (day % 100 >= 11 && day % 100 <= 13)
    return 'th'
  return ({ 1: 'st', 2: 'nd', 3: 'rd' } as Record<number, string>)[day % 10] ?? 'th'
}

/**
 * Date as HTML: "July 2<sup>nd</sup>, 2026" (en) or "2. Juli 2026" (de).
 * Empty values mean today, ISO dates (`2026-07-02`) and `Date`s are formatted,
 * any other text is returned escaped.
 */
export function formatDate(d: unknown, lang: TumLang, now = () => new Date()) {
  let date: Date | undefined
  if (d == null || d === '')
    date = now()
  else if (d instanceof Date)
    date = d
  else if (/^\d{4}-\d{2}-\d{2}/.test(String(d)))
    date = new Date(String(d))
  if (!date || Number.isNaN(date.getTime()))
    return escapeHtml(String(d))
  if (lang === 'de')
    return date.toLocaleDateString('de-DE', { day: 'numeric', month: 'long', year: 'numeric' })
  const day = date.getDate()
  const month = date.toLocaleDateString('en-US', { month: 'long' })
  return `${month} ${day}<sup>${ordinalSuffix(day)}</sup>, ${date.getFullYear()}`
}

/** Footer as HTML: "author | title | date" (the date may contain <sup>) */
export function footerHtml(
  theme: TumThemeConfig,
  deck: { title?: string, author?: string, date?: unknown },
  lang: TumLang,
) {
  if (typeof theme.footer === 'string')
    return escapeHtml(theme.footer)
  const author = theme.shortAuthor ?? deck.author ?? ''
  const title = theme.shortTitle ?? deck.title ?? ''
  const date = theme.footerDate === false
    ? ''
    : formatDate(deck.date, lang)
  return [
    escapeHtml(author),
    escapeHtml(title),
    date,
  ].filter(Boolean).join(' | ')
}
