import Typography from "typography"
import Irving from "typography-theme-irving"

Irving.baseFontSize = "16px"
Irving.bodyFontFamily = ["Open Sans"]
Irving.headerFontFamily = ["Merriweather"]
Irving.headerWeight = "500"
Irving.bodyWeight = "400"

const typography = new Typography(Irving)
if (process.env.NODE_ENV !== `production`) {
  typography.injectStyles()
}

export default typography
export const rhythm = typography.rhythm
export const scale = typography.scale
