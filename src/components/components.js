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
  min-height: 100%;
  padding: 0 33em;
  
  @media only screen and (max-width: 1400px) {
        padding: 5px 11vw;
  }
  
  @media only screen and (max-width: 450px) {
        padding: 5px 4vw;
    }
    
    @media only screen and (max-width: 320px) {
        padding: 5px 1vw;
    }    
    
    .gatsby-highlight {
      text-align: right;
      height: 100%;
      pre {
        border-radius: 3px;
      }
    }
    
    div[data-language]:before {
      content: attr(data-language);
      background: indianred;
      color: ${color};
      border-radius: 0 4px 0 4px;
      font-size: 0.75rem;
      padding: 0.25rem 0.5rem;
      text-transform: uppercase;
      text-align: right;
      position: relative;
      top: 2.5em;
      
    }
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
      width: fit-content;
      
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
  color: ${color};
  padding: 2px;
  width: auto;
  text-decoration: none;
  transition: all 0.3s ease-in-out;
  
  &:visited {
    color: ${color};
  }
  
  &:hover {
    text-decoration: none;
    color: ${color};
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
    width: 1em;
    height: .8em;
    margin-right: 5px;
`

export const UL = styled.ul`
    display: flex;
    justify-content: space-between;
    list-style: none;
    margin: 0;
    padding: 20px 0;
    `

export const Content = styled.div`
       transition: all .2s ease-in-out;
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
         
       blockquote { 
       color: ${color};
       border-color: indianred 
      }
          
       .gatsby-highlight-code-line {
          background-color: #1e1e1e;
          display: block;
          margin-right: -1em;
          margin-left: -1em;
          padding-right: 1em;
          padding-left: 0.75em;
          border-left: 0.25em solid indianred;
        }
    `
export const Footer = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    
    @media only screen and (max-width: 1024px) {
      padding: 5px 2em;
    }
    `
export const Date = styled.div`
       transition: all .2s ease-in-out;
       color: indianred;
       font-size: 1.5em;
       margin: 0; 
       width: auto;
    `

export const ReadTime = styled.div`
    display: flex;
    justify-content: center;
    font-size: 1.2em;
    color: ${color};
    opacity: 0.7;
    `

export const TitleHeader = styled.h1`
  font-size: 3em;
  text-align: center;
  font-family: Montserrat, sans-serif;  
  color: indianred;
  font-weight: 800;
  `