import { describe, expect, it } from 'vitest'
import { labels, resolveLang, thesisLine } from '../theme/utils/i18n'

describe('resolveLang', () => {
  it('falls back to English', () => {
    expect(resolveLang('de')).toBe('de')
    expect(resolveLang('en')).toBe('en')
    expect(resolveLang('fr')).toBe('en')
    expect(resolveLang(undefined)).toBe('en')
  })
})

describe('thesisLine', () => {
  it('is empty without thesis information', () => {
    expect(thesisLine('en')).toBe('')
  })

  it('builds the English line', () => {
    expect(thesisLine('en', 'intermediate', 'master')).toBe('Intermediate talk for the Master\'s Thesis by')
  })

  it('builds the German line', () => {
    expect(thesisLine('de', 'final', 'bachelor')).toBe('Endvortrag zur Bachelor\'s Thesis von')
  })

  it('passes unknown values through', () => {
    expect(thesisLine('en', 'Kick-off', 'Practical Course')).toBe('Kick-off for the Practical Course by')
  })
})

describe('labels', () => {
  it('has the same keys in every language', () => {
    const keys = (o: object) => Object.keys(o).sort()
    expect(keys(labels.de)).toEqual(keys(labels.en))
    expect(keys(labels.de.thesis)).toEqual(keys(labels.en.thesis))
    expect(keys(labels.de.thesisType)).toEqual(keys(labels.en.thesisType))
  })
})
