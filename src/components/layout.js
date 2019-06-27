import React from "react"
import { Wrapper } from "./components"
import styled, { ThemeProvider } from "styled-components"
import Bio from "./bio"
import Header from "./header"

const Footer = styled.footer`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 5px 10em;
  background-color: #ECF0F1; 
  width: 100%; 
  height: 8rem;
  
   @media only screen and (max-width: 600px) {
     padding: 5px 2em;
    }
`

class Layout extends React.Component {
  render() {
    const { children, toggleLight, mode, title } = this.props
    return (<ThemeProvider theme={{ mode }}>
      <Wrapper>
        <Header toggleLight={toggleLight} title={title}/>
        <div>{children}</div>
        <Footer>
          <Bio/>
        </Footer>
      </Wrapper>
    </ThemeProvider>)
  }
}

export default Layout
