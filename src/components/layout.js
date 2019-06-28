import React, { useState } from "react"
import { Wrapper } from "./components"
import styled, { ThemeProvider } from "styled-components"
import Bio from "./bio"
import Header from "./header"
import { ContextProviderComponent } from "./context"
import Switch from "react-switch"
import { FaMoon, FaSun } from "react-icons/fa"

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

const ThemeSwitch = styled(Switch)`
    height: 25px;
    width: auto;
    && {
    .react-switch-handle {
      border: 1px solid red;
      }
    }
`

const Mooon = styled(FaMoon)`
    width: 15px;
    height: 15px;
`
const Sun = styled(FaSun)`
    width: 17px;
    height: 17px;
    fill: #FCA326;
  `
const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
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
          <Header title={title}/>
          <div>{children}</div>
          <Footer>
            <div>
              <ThemeSwitch
                onColor="#1e1e1e"
                offColor="#FDFDFD"
                checked={state.checked}
                handleDiameter={18}
                height={24}
                width={48}
                offHandleColor="#1e1e1e"
                activeBoxShadow="0px 0px 2px 2px indianred"
                checkedIcon={<IconWrapper><Mooon/></IconWrapper>}
                uncheckedIcon={<IconWrapper><Sun/></IconWrapper>}
                onChange={() => state.mode === "light" ? setState({
                  mode: "dark",
                  checked: !state.checked,
                }) : setState({ mode: "light", checked: !state.checked })}/>
            </div>
            <Bio/>
          </Footer>
        </Wrapper>
      </ThemeProvider>
    </ContextProviderComponent>
  )
}

export default Layout
