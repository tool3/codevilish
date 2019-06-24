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
  border-top: 1px solid lightgray;
  box-shadow: 0 0 5px lightgray;
  
     @media only screen and (max-width: 600px) {
       padding: 5px 2em;
`

class Layout extends React.Component {
  render() {
    const { children } = this.props

    return (<ThemeProvider theme={{ mode: this.props.mode }}>
      <Wrapper>
        <Header toggleLight={this.props.toggleLight} title={this.props.title}/>
        <div>{children}</div>
        <Footer>
          <Bio/>
        </Footer>
      </Wrapper>
    </ThemeProvider>)
  }
}

export default Layout
