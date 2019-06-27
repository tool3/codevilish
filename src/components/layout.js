import React, { useState } from "react"
import { Wrapper } from "./components"
import styled, { ThemeProvider } from "styled-components"
import Bio from "./bio"
import Header from "./header"
import { FaAdjust } from "react-icons/fa"
import { ContextProviderComponent } from "./context"

const Footer = styled.footer`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 5px 10em;
  background-color: indianred; 
  width: 100%; 
  height: 8rem;
  
   @media only screen and (max-width: 600px) {
     padding: 5px 2em;
    }
`

const Adjust = styled(FaAdjust)`
  cursor: pointer;
`

const Layout = (props) => {
  const [mode, toggleLight] = useState("light")
  const [title] = useState("Codenvoy")
  const { children } = props
  return (
    <ContextProviderComponent>
      <ThemeProvider theme={{ mode }}>
        <Wrapper>
          <Header title={title}/>
          <div>{children}</div>
          <Footer>
            <div><Adjust onClick={() => mode === "light" ? toggleLight("dark") : toggleLight("light")}/></div>
            <Bio/>
          </Footer>
        </Wrapper>
      </ThemeProvider>
    </ContextProviderComponent>
  )
}

export default Layout
