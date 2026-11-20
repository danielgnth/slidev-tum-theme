import type { TumLang } from '../types'

export interface TumLabels {
  university: string
  school: string
  figure: string
  table: string
  advisedBy: string
  by: string
  for: string
  contents: string
  references: string
  questions: string
  section: string
  thesisType: Record<string, string>
  thesis: Record<string, string>
}

export const labels: Record<TumLang, TumLabels> = {
  en: {
    university: 'Technical University of Munich',
    school: 'School of Computation, Information and Technology',
    figure: 'Figure',
    table: 'Table',
    advisedBy: 'advised by',
    by: 'by',
    for: 'for the',
    contents: 'Outline',
    references: 'References',
    questions: 'Questions?',
    section: 'Section',
    thesisType: { intermediate: 'Intermediate talk', final: 'Final talk' },
    thesis: {
      bachelor: 'Bachelor\'s Thesis',
      master: 'Master\'s Thesis',
      idp: 'IDP',
      gr: 'Guided Research',
      seminar: 'Seminar',
    },
  },
  de: {
    university: 'Technische Universität München',
    school: 'School of Computation, Information and Technology',
    figure: 'Abbildung',
    table: 'Tabelle',
    advisedBy: 'Betreuer:',
    by: 'von',
    for: '',
    contents: 'Gliederung',
    references: 'Literatur',
    questions: 'Fragen?',
    section: 'Abschnitt',
    thesisType: { intermediate: 'Zwischenvortrag', final: 'Endvortrag' },
    thesis: {
      bachelor: 'zur Bachelor\'s Thesis',
      master: 'zur Master\'s Thesis',
      idp: 'zum IDP',
      gr: 'zum Guided Research',
      seminar: 'zum Seminar',
    },
  },
}

/** Anything other than `de` falls back to English */
export function resolveLang(lang: unknown): TumLang {
  return lang === 'de'
    ? 'de'
    : 'en'
}

/** "Intermediate talk for the Master's Thesis by" / "Zwischenvortrag zur Master's Thesis von" */
export function thesisLine(lang: TumLang, thesisType?: string, thesis?: string) {
  if (!thesisType && !thesis)
    return ''
  const t = labels[lang]
  const type = t.thesisType[thesisType ?? ''] ?? thesisType ?? ''
  const what = t.thesis[thesis ?? ''] ?? thesis ?? ''
  const parts = lang === 'de'
    ? [type, what, t.by]
    : [type, t.for, what, t.by]
  return parts.filter(Boolean).join(' ')
}
