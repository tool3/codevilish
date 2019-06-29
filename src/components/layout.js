import React, { useState } from "react"
import { Wrapper } from "./components"
import styled, { ThemeProvider } from "styled-components"
import Bio from "./bio"
import Header from "./header"
import { ContextProviderComponent } from "./context"
import { FooterSVG } from "./svg/Footer"

const Footer = styled.footer`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 5px 10em;
  background-color: indianred; 
  width: 100%; 
  height: 5rem;
    
  
  &:before {
    content: "";
    height: 25px;
    border-radius: 80%;
  }
  
   @media only screen and (max-width: 1200px) {
     padding: 5px 2em;
    }
`

const Layout = (props) => {
  const [state, setState] = useState({
    mode: "light",
    checked: false,
  })
  const [title] = useState("Codenvoy")

  const { children } = props
  return (
    <ContextProviderComponent>
      <ThemeProvider theme={{ mode: state.mode }}>
        <Wrapper>
          <Header title={title} mode={state.mode} setState={setState}
                  checked={state.checked}/>
          <div>{children}</div>
          <Footer>
            {/*<FooterSVG />*/}
            <Bio/>
          </Footer>
        </Wrapper>
      </ThemeProvider>
    </ContextProviderComponent>
  )
}

export default Layout
