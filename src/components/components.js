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
  justify-content: space-between; 
  background-color: ${backgroundColor};
  color: ${color};
  min-height: 100vh;

  `

export const Tag = styled.div`
      background-color: hotpink;
      color: ghostwhite;
      border-radius: 13px;
      padding: 5px;
      text-align: center;
      font-size: 15px;
      line-height: 12px;
      margin: 5px;
    `

export const TagWrapper = styled.div`
      display: flex;
      justify-content: flex-start;
      flex-direction: row;
    `


export const TagLink = styled(Link)`
  color: white;
  padding: 2px;
  text-decoration: none;
  transition: all 0.3s ease-in-out;
  
  &:visited {
    color: white;
  }
  &:hover {
    text-decoration: none;
    color: inherit; 
    width: inherit;
   }
`

export const TagPage = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column; 
`
