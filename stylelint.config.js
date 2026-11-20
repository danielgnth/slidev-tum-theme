/** @type {import('stylelint').Config} */
export default {
  extends: ['stylelint-config-standard'],
  rules: {
    // BEM-ish class names: tum-block__title, tum-block--alert
    'selector-class-pattern': [
      '^[a-z][a-z0-9]*(?:-[a-z0-9]+)*(?:__[a-z0-9]+(?:-[a-z0-9]+)*)?(?:--[a-z0-9]+(?:-[a-z0-9]+)*)?$',
      {
        message: 'Expected BEM-style class name (block__element--modifier)',
      },
    ],
    // the TUM tokens are written exactly as in the CD manual
    'color-hex-length': null,
    // `text-box` is newer than stylelint's property list
    'property-no-unknown': [
      true,
      {
        ignoreProperties: ['text-box'],
      },
    ],
    'declaration-property-value-no-unknown': null,
    // blank lines group the design tokens
    'custom-property-empty-line-before': null,
    'no-descending-specificity': null,
    'alpha-value-notation': null,
    'color-function-notation': null,
    'color-function-alias-notation': null,
    'value-keyword-case': [
      'lower',
      { camelCaseSvgKeywords: true },
    ],
  },
}
