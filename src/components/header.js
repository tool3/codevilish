import React from "react"
import { StyledLink } from "./components"
import { rhythm, scale } from "../utils/typography"
// const Adjust = styled(FaAdjust)`
//   cursor: pointer;
// `
import styled from "styled-components"

const H1 = styled.h1`    
      display: flex; 
      font-size: 3em;
      text-align: center;
      border-bottom: 2px dashed lightgray;
      height: 2.1em;
      justify-content: center;
      align-items: center;
      font-weight: normal;  
     
      &:hover {
        opacity: 0.4;
        animation: shimmer 1s infinite;
      }
      
      @keyframes shimmer {
      25% {
      opacity: 0.3;
      } 
}
`

class Header extends React.Component {
  render() {
    const { title } = this.props
    return (<H1><StyledLink
      to={`/`}>{title}</StyledLink>{/*<Adjust onClick={this.props.toggleLight}/>*/}</H1>)
  }
}

export default Header
