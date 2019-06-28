import React from "react"
import { StyledLink } from "./components"
import styled from "styled-components"
import { color } from "../components/styles"
import Switch from "react-switch"
import { FaMoon, FaSun } from "react-icons/fa"

const H1 = styled.h1`    
      font-size: 3em;
      font-family: "Montserrat", sans-serif;
      color: ${color};
      margin: 0;
      
`

const HeaderWrapper = styled.div`
  display: flex;
  border-bottom: 2px dotted lightgray;
  justify-content: space-between;
  align-items: center;
  height: 4.5em;
  padding: 0 17em;
`


const Imager = styled.div`
  font-family: "Montserrat", "Open Sans", sans-serif;
  font-weight: 900;
`


const ThemeSwitch = styled(Switch)`
    height: 22px;
    width: auto;
    border: 1px solid #1e1e1e;
    .react-switch-bg {
      border: 1px solid #fff;
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

const Header = ({ title, checked, setState, mode }) => {
  return (
    <HeaderWrapper>
      <H1>
        <StyledLink to={`/`}>
          <Imager>{title}</Imager>
        </StyledLink>
      </H1>
      <ThemeSwitch
        onColor="#1e1e1e"
        offColor="#FDFDFD"
        checked={checked}
        handleDiameter={18}
        height={20}
        width={43}
        offHandleColor="#1e1e1e"
        activeBoxShadow="0px 0px 2px 3px indianred"
        checkedIcon={<IconWrapper><Mooon/></IconWrapper>}
        uncheckedIcon={<IconWrapper><Sun/></IconWrapper>}
        onChange={() => mode === "light" ? setState({
          mode: "dark",
          checked: !checked,
        }) : setState({ mode: "light", checked: !checked })}/>
    </HeaderWrapper>
  )
}

export default Header