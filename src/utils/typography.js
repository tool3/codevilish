import Typography from "typography";
import USWebDesign from "typography-theme-us-web-design-standards";

USWebDesign.overrideThemeStyles = () => {
  return {
    "h1": {
      fontSize: '25px',
      fontWeight: 'bold'
    },
  }
}

const typography = new Typography(USWebDesign);
// Hot reload typography in development.
if (process.env.NODE_ENV !== `production`) {
  typography.injectStyles()
}

export default typography
export const rhythm = typography.rhythm
export const scale = typography.scale
