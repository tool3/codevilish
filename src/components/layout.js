import React from "react"
import { rhythm, scale } from "../utils/typography"
import { A, StyledLink, Wrapper } from "./components"
import { ThemeProvider } from "styled-components"
import styled from "styled-components"
import { FaAdjust} from "react-icons/fa"

const Footer = styled.footer`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 200px;
`
const BuiltWith = styled(A)`
&& {
  font-size: 15px;
}
`

const Adjust = styled(FaAdjust)`
  cursor: pointer;
`

class Layout extends React.Component {
  render() {
    const { location, title, children } = this.props
    const rootPath = `${__PATH_PREFIX__}/`
    let header

    if (location.pathname === rootPath) {
      header = (<h1 style={{ ...scale(1.5), marginBottom: rhythm(1.5), marginTop: 0 }}>
        <StyledLink to={`/`}>{title}</StyledLink>
      </h1>)
    } else {
      header = (<h3>
        <StyledLink to={`/`}>{title}</StyledLink>
      </h3>

      )
    }
    return (<ThemeProvider theme={{ mode: this.props.mode }}>
      <Wrapper>
        <header>{header}</header>
        <main>{children}</main>

        <Adjust onClick={this.props.toggleTheme} />

        <Footer>
          Tal Hayut © {new Date().getFullYear()}
          <br/>
          <BuiltWith href="https://www.gatsbyjs.org">built with Gatsby</BuiltWith>
        </Footer>

      </Wrapper>
    </ThemeProvider>)
  }
}

export default Layout
