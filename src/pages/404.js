import React from "react"
import { graphql } from "gatsby"
import SEO from "../components/seo"
import styled from "styled-components"
import GatsbyImage from "gatsby-image"
import { StyledLink } from "../components/components"

const NotFoundWrapper = styled.div`
  text-align: center;
`
const NotFound = styled.div`
  font-size: 10em;
`
const NotFoundMessage = styled.div`
  font-size: 3em;
`

class NotFoundPage extends React.Component {
  render() {
    return (
      <NotFoundWrapper>
        <SEO title="404: Not Found"/>
        <NotFound>
          4<GatsbyImage fixed={this.props.data.astonished.childImageSharp.fixed} alt="horns"/>4
        </NotFound>
        <NotFoundMessage>I know right ?!</NotFoundMessage>
        <StyledLink to={"/"}>go back home</StyledLink>
      </NotFoundWrapper>
    )
  }
}

export default NotFoundPage

export const pageQuery = graphql`
    query {
        astonished : file(absolutePath: { regex: "/astonished.png/" }) {
            childImageSharp {
                fixed(width: 120, height: 120) {
                    ...GatsbyImageSharpFixed
                }
            }
        }
        site {
            siteMetadata {
                title
            }
        }
    }
`
