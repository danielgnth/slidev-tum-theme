/** Language of all generated labels ("Figure", "Outline", "advised by", …) */
export type TumLang = 'en' | 'de'

/**
 * `compact`: frame title next to the logo (TUM corporate design)
 *  `full`: chair / school / university above the title (tumbeamer)
 */
export type TumHeaderMode = 'full' | 'compact'

/** `themeConfig` in the headmatter of a deck */
export interface TumThemeConfig {
  /** `en` or `de`, switches all generated labels */
  lang?: TumLang
  header?: TumHeaderMode
  /** `false` hides the footer, a string replaces "author | short title | date" */
  footer?: boolean | string
  /** Show the date in the footer (default: true) */
  footerDate?: boolean
  /** Number figures automatically ("Figure 3: …") */
  figureNumbers?: boolean
  shortTitle?: string
  shortAuthor?: string
  chair?: string
  school?: string
  department?: string
  university?: string
}

export type BlockType = 'info' | 'alert' | 'example' | 'warning' | 'note'

export type ImageFit = 'contain' | 'cover'

/** An entry of `images:` in the gallery layout */
export type GalleryImage = string | { src: string, caption?: string, alt?: string }
