import theme from "styled-theming"

export const backgroundColor = theme("mode", {
  light: "#FDFDFD",
  dark: "#1e1e1e",
  transition: "all 0.2s ease-in-out",
})

export const color = theme("mode", {
  light: "#000",
  dark: "#FDFDFD",
})
