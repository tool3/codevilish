import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"
import { backgroundColor, color } from "./styles"

export const A = styled.a`
  color: lightgray;
  &:visited {
   color: lightgray;
  }
`

export const StyledLink = styled(props => <Link {...props} />)`
  color: mediumaquamarine;
  text-decoration: none;
  &:visited {
    color: mediumaquamarine;
  }
  `

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center; 
  align-items: center;
  background-color: ${backgroundColor};
  color: ${color};
  height: 100%;
  min-height: 100vh;
  `