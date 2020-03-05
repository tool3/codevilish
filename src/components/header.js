import React from "react"
import { StyledLink } from "./components"
import styled from "styled-components"
import { color } from "../components/styles"
import Switch from "react-switch"
import { FaFirstOrderAlt, FaJediOrder } from "react-icons/fa"

const H1 = styled.h1`
  font-size: 3em;
  font-family: "Montserrat", sans-serif;
  color: ${color};
  margin: 0;
`

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 6em;
`

const Imager = styled.div`
  font-family: "Montserrat", "Open Sans", sans-serif;
  font-weight: 900;
`

const ThemeSwitch = styled(Switch)`
  height: auto;
  width: auto;
`

const Mooon = styled(FaFirstOrderAlt)`
  fill: red;
  width: 100%;
  height: 100%;
  padding: 2px;
`
const Sun = styled(FaJediOrder)`
  fill: #fca326;
  width: 100%;
  height: 100%;
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
        offHandleColor="#1e1e1e"
        height={30}
        width={63}
        className={"mode_switch"}
        activeBoxShadow="0px 0px 2px 3px indianred"
        aria-label={"switch"}
        checkedIcon={
          <IconWrapper>
            <Mooon />
          </IconWrapper>
        }
        uncheckedIcon={
          <IconWrapper>
            <Sun />
          </IconWrapper>
        }
        onChange={() =>
          mode === "light"
            ? setState({
                mode: "dark",
                checked: !checked,
              })
            : setState({ mode: "light", checked: !checked })
        }
      />
    </HeaderWrapper>
  )
}

export default Header
