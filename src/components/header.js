import React from "react"
import { StyledLink } from "./components"
import styled from "styled-components"
import { color } from "../components/styles"

const H1 = styled.h1`    
      display: flex; 
      font-size: 3em;
      text-align: center;
      border-bottom: 2px dotted lightgray;
      height: 2em;
      justify-content: center;
      align-items: center;
      font-family: "Montserrat", sans-serif;
      width: 100%;
      color: ${color}
`

const Imager = styled.div`
  font-family: "Montserrat", "Open Sans", sans-serif;
  font-weight: bold;
`

const Header = ({ title }) => {
  return (
    <H1>
      <StyledLink to={`/`}>
        <Imager>{title}</Imager>
      </StyledLink>
    </H1>
  )
}

export default Header