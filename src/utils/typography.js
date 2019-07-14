import Typography from "typography"
import Irving from "typography-theme-irving"

Irving.baseFontSize = "16px"
Irving.bodyFontFamily = ["Open Sans"]
Irving.headerFontFamily = ["Merriweather"]
Irving.headerWeight = "500"
Irving.bodyWeight = "400"

// Irving.overrideStyles = () => (
//   {
//     "body": {
//       '&& ::-webkit-scrollbar-track': {
//         backgroundColor: '#1e1e1e',
//         color: '#1e1e1e'
//       }
//     },
//   })

const typography = new Typography(Irving)
// Hot reload typography in development.
if (process.env.NODE_ENV !== `production`) {
  typography.injectStyles()
}

export default typography
export const rhythm = typography.rhythm
export const scale = typography.scale
