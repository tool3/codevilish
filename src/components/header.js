import React from "react"
import { StyledLink } from "./components"
import styled from "styled-components"

const H1 = styled.h1`    
      display: flex; 
      font-size: 3em;
      text-align: center;
      border-bottom: 2px dotted lightgray;
      height: 2em;
      justify-content: center;
      align-items: center;
      font-weight: normal;  
      color: aquamarine;
`

class Header extends React.Component {
  render() {
    const { title } = this.props
    return (<H1><StyledLink to={`/`}>{title}</StyledLink>{/*<Adjust onClick={this.props.toggleLight}/>*/}</H1>)
  }
}

export default Header
