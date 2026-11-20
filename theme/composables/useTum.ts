import type { TumThemeConfig } from '../types'
import type { SlideLike } from '../utils/slides'
import { useSlideContext } from '@slidev/client'
import { computed } from 'vue'
import { footerHtml, formatDate as formatDateFor } from '../utils/format'
import { labels, resolveLang } from '../utils/i18n'
import { figureNumber as countFigures, sectionNumber as countSections } from '../utils/slides'

/** Everything the layouts and components need from Slidev, in one place */
export function useTum() {
  const { $slidev, $page, $frontmatter } = useSlideContext()

  const configs = computed(() => $slidev.configs as Record<string, any>)
  const theme = computed(() => (configs.value.themeConfig ?? {}) as TumThemeConfig)
  const lang = computed(() => resolveLang(theme.value.lang))
  const t = computed(() => labels[lang.value])

  const org = computed(() => ({
    chair: theme.value.chair ?? '',
    school: theme.value.school ?? t.value.school,
    department: theme.value.department ?? '',
    university: theme.value.university ?? t.value.university,
  }))

  const title = computed<string>(() => configs.value.title ?? '')
  const author = computed<string>(() => configs.value.author ?? '')

  const footerText = computed(() => footerHtml(
    theme.value,
    { title: title.value, author: author.value, date: configs.value.date },
    lang.value,
  ))

  const slides = computed(() => $slidev.nav.slides as SlideLike[])

  /** 1-based number of the section this slide belongs to (0 before the first section) */
  const sectionNumber = computed(() => countSections(slides.value, $page.value))

  /** Figure number for this slide's caption, `undefined` when numbering is off */
  const figureNumber = computed(() =>
    theme.value.figureNumbers === false
      ? undefined
      : countFigures(slides.value, $page.value),
  )

  function formatDate(d: unknown) {
    return formatDateFor(d, lang.value)
  }

  return {
    slidev: $slidev,
    page: $page,
    frontmatter: $frontmatter,
    configs,
    theme,
    lang,
    t,
    org,
    title,
    author,
    footerText,
    slides,
    sectionNumber,
    figureNumber,
    formatDate,
  }
}
