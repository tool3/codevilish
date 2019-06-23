import React from "react"
import { graphql } from "gatsby"
import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"
import styled, { ThemeProvider } from "styled-components"
import { backgroundColor, color } from "../components/styles"
import { StyledLink } from "../components/components"

class BlogIndex extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      mode: "light"
    }

    this.toggleLight = this.toggleLight.bind(this)
  }

  toggleLight() {
    this.setState({ mode: this.state.mode === "light" ? "dark" : "light" })
  }


  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const posts = data.allMarkdownRemark.edges


    const Div = styled.div`
      background-color: ${backgroundColor};
      color: ${color};
      border: 1px solid ${color};
      border-radius: 13px;
      padding: 5px;
      text-align: center;
      vertical-align: center;
      font-size: 15px;
      line-height: 12px;
      margin: 10px;
    `

    const P = styled.p`
      background-color: ${backgroundColor};
      color: ${color};
      font-size: 15px;
      line-height: 18px;
    `
    const Small = styled.small`
      background-color: ${backgroundColor};
      color: ${color};
      font-size: 13px;
      line-height: 25px;
      font-family: 'Georgia', sans-serif;
    `


    return (<ThemeProvider theme={{ mode: "light" }}>
        <Layout location={this.props.location} title={siteTitle} toggleTheme={this.toggleLight} mode={this.state.mode}>

          <SEO title="All posts"/>
          <Bio/>
          {posts.map(({ node }) => {
            const title = node.frontmatter.title || node.fields.slug
            return (<Div key={node.fields.slug}>
              <h3 style={{ marginBottom: rhythm(1 / 4) }}>
                <StyledLink to={node.fields.slug}>
                  {title}
                </StyledLink>
              </h3>
              <Small>{node.frontmatter.date}</Small>
              <P
                dangerouslySetInnerHTML={{ __html: node.frontmatter.description || node.excerpt }}/>
            </Div>)
          })}
        </Layout>
    </ThemeProvider>)
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
            tags
          }
        }
      }
    }
  }
`
