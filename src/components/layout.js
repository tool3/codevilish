import React, { useState } from "react"
import { Wrapper } from "./components"
import styled, { ThemeProvider } from "styled-components"
import Bio from "./bio"
import Header from "./header"
import { ContextProviderComponent } from "./context"

const Footer = styled.footer`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 5px 10em;   
  height: 5rem;
  
   @media only screen and (max-width: 1024px) {
     height: unset;
     padding: unset;
     
    }
`

const Layout = (props) => {
  const [state, setState] = useState({
    mode: "dark",
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
            <Bio/>
          </Footer>
        </Wrapper>
      </ThemeProvider>
    </ContextProviderComponent>
  )
}

export default Layout
