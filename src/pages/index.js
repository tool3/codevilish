import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"
import styled, { ThemeProvider } from "styled-components"
import { backgroundColor, color } from "../components/styles"
import { Clock, StyledLink } from "../components/components"

class BlogIndex extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      mode: "light",
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
      padding: 5px;
      font-size: 15px;
      margin: 10px;
      width: 55em;
      @media only screen and (max-width: 600px) {
        width: auto;
      }
    `
    const Small = styled.small`
      background-color: ${backgroundColor};
      color: indianred;
      font-size: 15px;
      line-height: 25px;
    `

    const PostsMain = styled.div`
      display: flex;
      flex-direction: column;
      align-items: center;
    `

    const MiniClock = styled(Clock)`
      width: 11px;
      height: 11px;
      margin: 0;
    `

    const H3 = styled.h3`
      display: flex;
      justify-content: space-between;
      align-items: center;
      text-decoration: none;
    `

    const HeaderLink = styled(StyledLink)`
      font-size: 1.5rem;
      //font-weight: 600;
    `
    const Preview = styled.div`
      margin-top: 10px;
      font-size: 20px;
      width: auto;
    `

    const ReadTime = styled.div`
      font-size: 15px;
      display: inline-block;
      margin-right: 15px;
      color: ${color};  
      
    `

    return (<ThemeProvider theme={{ mode: this.state.mode }}>
      <Layout location={this.props.location} toggleLight={this.toggleLight}
              title={siteTitle} mode={this.state.mode}>
        <SEO title="All posts"/>
        <PostsMain>
          {posts.map(({ node }) => {
            const title = node.frontmatter.title || node.fields.slug;
            const readTime = node.fields.readingTime.text;
            return (<Div key={node.fields.slug}>
              <H3 style={{ marginBottom: rhythm(1) }}>
                <HeaderLink to={node.fields.slug}>{title}</HeaderLink>
                <Small><ReadTime>{readTime}</ReadTime><MiniClock/> {node.frontmatter.date}</Small>
              </H3>
              <Preview
                dangerouslySetInnerHTML={{ __html: node.frontmatter.description || node.excerpt }}/>
            </Div>)
          })}
        </PostsMain>
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
            slug,
            readingTime {
              text
            }
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
