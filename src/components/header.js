import React from "react"
import { StyledLink, } from "./components"
import styled from "styled-components"
import { FaAdjust } from "react-icons/fa"
import { rhythm, scale } from "../utils/typography"

// const Adjust = styled(FaAdjust)`
//   cursor: pointer;
// `

class Header extends React.Component {
  render() {
    const { title } = this.props;
    return (<h1 style={{ ...scale(1.5), marginBottom: rhythm(1.5), marginTop: 0 }}>
      <StyledLink to={`/`}>{title}</StyledLink>
      {/*<Adjust onClick={this.props.toggleLight}/>*/}
    </h1>)
  }
}

export default Header
