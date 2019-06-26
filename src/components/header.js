import React from "react"
import { StyledLink } from "./components"
import styled from "styled-components"
import Image from "gatsby-image"
import { graphql, useStaticQuery } from "gatsby"

const H1 = styled.h1`    
      display: flex; 
      font-size: 3em;
      text-align: center;
      border-bottom: 2px dotted lightgray;
      height: 2em;
      justify-content: center;
      align-items: center;
      font-family: "Montserrat", sans-serif;
      background-color: indianred;
      width: 100%;
`
const HeaderTitle = styled(StyledLink)`
  && { color: white;}
`

// const Imager = styled.div`
//   @font-face {
//     src: url('../../content/assets/font/Failed3dFilled-Regular.woff') format('woff');
//     font-family: 'Failed 3d Filled';
//     font-weight: normal;
//     font-style: normal;
//    }
//     font-family: 'Failed 3d Filled', 'Open Sans', 'Marrieweather', serif;
//     color: lightgoldenrodyellow;
//     transition: 0.3s ease-in-out;
//     &:hover {
//      opacity: 0.5;
//     }
// `

const Header = () => {
  const data = useStaticQuery(graphql`
      query HeaderQuery {
          avatar: file(absolutePath: { regex: "/header.png/" }) {
              childImageSharp {
                  fixed(width: 510, height: 110) {
                      ...GatsbyImageSharpFixed
                  }
              }
          }
      }
  `)

  return (<H1><HeaderTitle
    to={`/`}><Image
    fixed={data.avatar.childImageSharp.fixed}>Codenvoy</Image></HeaderTitle>{/*<Adjust onClick={this.props.toggleLight}/>*/}
  </H1>)
}

export default Header