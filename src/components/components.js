/* eslint-disable */

import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"
import { backgroundColor, color } from "./styles"
import { FaRegClock } from "react-icons/fa"

export const A = styled.a`
  &:visited {
   color: lightgray;
  }
`

export const StyledLink = styled(Link)`
  color: ${color};
  text-decoration: none;
  &:visited {
    color: ${color};
  }
  `

export const Wrapper = styled.div`
  transition: all .2s ease-in-out;
  display: flex;
  flex-direction: column;
  justify-content: space-between; 
  background-color: ${backgroundColor};
  color: ${color};
  min-height: 100vh;
  `

export const Tag = styled.div`
      background-color: indianred;
      color: ghostwhite;
      border-radius: 13px;
      padding: 5px;
      text-align: center;
      font-size: 15px;
      line-height: 12px;
      margin: 5px;
      &:hover:before {
        content: "#";
      }
    `

export const TagWrapper = styled.div`
      display: flex;
      justify-content: flex-start;
      flex-direction: row;
    `


export const TagLink = styled(Link)`
  color: white;
  padding: 2px;
  width: auto;
  text-decoration: none;
  transition: all 0.3s ease-in-out;
  
  &:visited {
    color: white;
  }
  
  &:hover {
    text-decoration: none;
    color: white;
   }
`

export const TagPage = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  height: 80vh;  
`
export const Clock = styled(FaRegClock)`
    width: 10px;
    height: 10px;
    margin-right: 5px;
`

export const H1 = styled.h1`
      transition: all .2s ease-in-out;
      background-color: ${backgroundColor};
      color: ${color};
      font-size: 2.3rem;
      text-align: center;
      margin: 0;
    `
export const Div = styled.div`
      background-color: ${backgroundColor};
      color: ${color};
      font-size: 20px;
      line-height: 12px;
      margin: 5px;
      padding: 15px;
      text-align: center;
    `

export const UL = styled.ul`
    display: flex;
    justify-content: space-around;
    list-style: none;
    padding: 0;
    margin: 0;
    `

export const Content = styled.div`
       transition: all .2s ease-in-out;
       padding: 20px 25em;
       display: flex;
       flex-direction: column;
       justify-content: center;
       background-color: ${backgroundColor};
       color: ${color};
       
       a {
          transition: all .2s ease-in-out; 
          color: ${color}; 
          fill: ${color} 
         }
       blockquote { color: ${color}; border-color: indianred }
      
          
       @media only screen and (max-width: 1200px) {
        padding: 5px 1em;
      }
    `
export const Footer = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    
    @media only screen and (max-width: 1200px) {
      padding: 5px 2em;
    }
    `
export const Date = styled.div`
       transition: all .2s ease-in-out;
       color: indianred;
       font-size: 15px;
       margin: 0; 
       width: auto;
    `

export const ReadTime = styled.div`
    display: flex;
    justify-content: center;
    font-size: 15px;
    color: ${color};
    opacity: 0.7;
    `

export const TitleHeader = styled.h1`
  font-size: 3em;
  text-align: center;
  height: 2em;
  font-family: "Montserrat", sans-serif;  
  color: indianred;
  `