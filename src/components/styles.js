import theme from "styled-theming"

export const backgroundColor = theme("mode", {
  light: "#fff", dark: "#1e1e1e",
})

export const color = theme("mode", {
  light: "#000", dark: "#fff",
})