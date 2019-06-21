import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm, scale } from "../utils/typography"
import styled, { ThemeProvider } from "styled-components"
import theme from "styled-theming"

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const siteTitle = this.props.data.site.siteMetadata.title
    const { previous, next } = this.props.pageContext
    const { tags } = post.frontmatter


    const backgroundColor = theme("mode", {
      light: "#fff", dark: "#000",
    })

    const color = theme("mode", {
      light: "#000", dark: "#fff",
    })


    const Tag = styled.div`
      background-color: ${backgroundColor};
      color: ${color};
      border: 1px solid ${color};
      border-radius: 13px;
      padding: 5px;
      text-align: center;
      vertical-align: center;
      font-size: 15px;
      line-height: 12px;
      margin: 5px;
    `

    const TagWrapper = styled.div`
      display: flex;
      justify-content: flex-start;
    `
    console.log(backgroundColor)

    return (<ThemeProvider theme={{ mode: "dark" }}>
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title={post.frontmatter.title}
          description={post.frontmatter.description || post.excerpt}
        />
        <h1>{post.frontmatter.title}</h1>
        <p style={{
          ...scale(-1 / 5),
          display: `block`,
          marginBottom: rhythm(1),
          marginTop: rhythm(-1),
        }}>
          {post.frontmatter.date}
        </p>
        <div dangerouslySetInnerHTML={{ __html: post.html }}/>
        <hr style={{ marginBottom: rhythm(1) }}/>

        {tags && <TagWrapper>{tags.map(tag => <Tag>{tag}</Tag>)}</TagWrapper>}

        <Bio/>
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (<Link to={previous.fields.slug} rel="prev">
              ← {previous.frontmatter.title}
            </Link>)}
          </li>
          <li>
            {next && (<Link to={next.fields.slug} rel="next">
              {next.frontmatter.title} →
            </Link>)}
          </li>
        </ul>
      </Layout>
    </ThemeProvider>)
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        tags
      }
    }
  }
`
