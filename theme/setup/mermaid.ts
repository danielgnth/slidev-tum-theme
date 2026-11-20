// Mermaid diagrams in TUM colors.
// Plain function instead of defineMermaidSetup: `@slidev/types` is not resolvable
// from the theme folder under pnpm.
import { tumColors as c, tumFontStack } from '../colors'

// light tints of the primary/highlight colors for node fills
const tint = {
  blue: '#E1EDF8',
  orange: '#FCE8DA',
  green: '#F1F3D9',
  cluster: '#F5F8FC',
}

export default () => ({
  theme: 'base',
  fontFamily: tumFontStack,
  themeVariables: {
    fontFamily: tumFontStack,
    fontSize: '16px',
    primaryColor: tint.blue,
    primaryBorderColor: c.blue,
    primaryTextColor: c.black,
    secondaryColor: tint.orange,
    secondaryBorderColor: c.orange,
    tertiaryColor: tint.green,
    tertiaryBorderColor: c.green,
    lineColor: c['dark-gray'],
    textColor: c.black,
    mainBkg: tint.blue,
    nodeBorder: c.blue,
    clusterBkg: tint.cluster,
    clusterBorder: c['light-blue'],
    edgeLabelBackground: c.white,
    noteBkgColor: c.ivory,
    noteBorderColor: c.gray,
    actorBkg: tint.blue,
    actorBorder: c.blue,
    signalColor: c['dark-gray'],
    activationBkgColor: c['light-blue'],
    // pie / xychart / gantt
    pie1: c.blue,
    pie2: c.orange,
    pie3: c.green,
    pie4: c['light-blue'],
    pie5: c['lighter-blue'],
    pie6: c.ivory,
    pie7: c['darker-blue'],
    pie8: c.purple,
    pieStrokeColor: c.white,
    pieOuterStrokeColor: c.white,
    git0: c.blue,
    git1: c.orange,
    git2: c.green,
    git3: c['lighter-blue'],
    taskBkgColor: c.blue,
    taskBorderColor: c['darker-blue'],
    activeTaskBkgColor: c.orange,
    activeTaskBorderColor: c.orange,
    doneTaskBkgColor: c['light-blue'],
    doneTaskBorderColor: c['lighter-blue'],
    critBkgColor: c.red,
    critBorderColor: c['dark-red'],
    sectionBkgColor: tint.cluster,
    altSectionBkgColor: c.white,
    gridColor: c['light-gray'],
    todayLineColor: c.orange,
    xyChart: {
      plotColorPalette: [
        c.blue,
        c.orange,
        c.green,
        c['light-blue'],
        c['lighter-blue'],
        c.purple,
      ].join(', '),
    },
  },
})
