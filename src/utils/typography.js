import Typography from "typography"
import Irving from "typography-theme-irving"

Irving.baseFontSize = '18px'
Irving.bodyFontFamily = ['Open Sans']
Irving.bodyWeight = '300'
Irving.headerWeight= '100'



const typography = new Typography(Irving);
// Hot reload typography in development.
if (process.env.NODE_ENV !== `production`) {
  typography.injectStyles()
}

export default typography
export const rhythm = typography.rhythm
export const scale = typography.scale
