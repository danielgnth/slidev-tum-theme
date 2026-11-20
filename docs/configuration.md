# Configuration

Everything is set in the headmatter, the frontmatter of the first slide.

## Title slide

These top-level keys fill the `cover` layout:

| Key | Example | Notes |
|---|---|---|
| `title` | `Something with Networking` | also used in the footer |
| `author` | `Max Mustermann` | also used in the footer and on the `end` slide |
| `subtitle` | `A Slidev template` | optional |
| `thesisType` | `intermediate` \| `final` | any other text is shown as is |
| `thesis` | `bachelor` \| `master` \| `idp` \| `gr` \| `seminar` | any other text is shown as is |
| `advisor` | `Erika Musterfrau, M.Sc.` | prefixed with "advised by" / "Betreuer:" |
| `supervisor` | `Prof. Dr. …` | shown below the advisor |
| `date` | `2026-07-02` | becomes "July 2nd, 2026" / "2. Juli 2026"; free text is kept; default: today |
| `venue` | `Garching b. München` | optional |
| `tower` | `true` | `false` hides the Uhrenturm |

`thesisType: intermediate` with `thesis: master` reads "Intermediate talk for the Master's Thesis by" in English and "Zwischenvortrag zur Master's Thesis von" in German.

## Theme options

Under `themeConfig`:

| Key | Default | Description |
|---|---|---|
| `lang` | `en` | `en` or `de`: labels such as "Figure"/"Abbildung", "Outline"/"Gliederung", "Questions?"/"Fragen?" |
| `header` | `compact` | `compact`: frame title next to the logo (TUM corporate design). `full`: chair / school / university above the title (tumbeamer) |
| `chair` | | first line of the organisation block |
| `department` | | used when there is no `chair` |
| `school` | School of Computation, Information and Technology | |
| `university` | Technical University of Munich | German: Technische Universität München |
| `shortTitle` | `title` | footer |
| `shortAuthor` | `author` | footer |
| `footer` | `true` | `false` hides the footer, a string replaces "author \| title \| date" |
| `footerDate` | `true` | `false` leaves the date out of the footer |
| `figureNumbers` | `true` | `false` turns off "Figure N:" numbering |

## Per slide

Any slide can override the header and footer:

```yaml
---
header: full # compact | full | false
footer: false
---
```

Section slides accept `hideInToc: true` to stay out of the outline, and `title:` to show a different name there.

## Types

The options are typed in [`theme/types.ts`](https://github.com/danielgnth/slidev-tum-theme/blob/main/theme/types.ts) (`TumThemeConfig`), for editors and agents that read the package.
