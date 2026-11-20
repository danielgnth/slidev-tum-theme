// TUM corporate design colors (RGB values from tumcolor.sty / TUM CD manual).
// Single source for the UnoCSS utilities (uno.config.ts) and Mermaid (setup/mermaid.ts).
// styles/tokens.css mirrors the subset used in CSS; a unit test keeps both in sync.

export const tumColors = {
  // primary
  'blue': '#0065BD',
  'white': '#FFFFFF',
  'black': '#000000',
  // secondary
  'darker-blue': '#005293',
  'dark-blue': '#003359',
  'dark-gray': '#333333',
  'gray': '#808080',
  'light-gray': '#CCCCCC',
  // highlight
  'ivory': '#DAD7CB',
  'orange': '#E37222',
  'green': '#A2AD00',
  'light-blue': '#98C6EA',
  'lighter-blue': '#64A0C8',
  // diagram colors
  'purple': '#69085A',
  'dark-purple': '#0F1B5F',
  'turquoise': '#00778A',
  'dark-green': '#007C30',
  'darker-green': '#679A1D',
  'yellow': '#FFDC00',
  'dark-yellow': '#F9BA00',
  'light-red': '#D64C13',
  'red': '#C4071B',
  'dark-red': '#9C0D16',
} as const

export type TumColor = keyof typeof tumColors

export const tumFontStack = 'TUM Neue Helvetica, Helvetica Neue, Helvetica, Arial, sans-serif'
