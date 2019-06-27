import React, { useState } from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import styled, { ThemeProvider } from "styled-components"
import { backgroundColor, color } from "../components/styles"
import { Clock, StyledLink } from "../components/components"

function BlogIndex({ data, location }) {
  const [mode, toggleLight] = useState("light");
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
      display: inline-block;
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
      margin-bottom: 0;
    `

  const HeaderLink = styled(StyledLink)`
      font-size: 1.5rem;
    `
  const Preview = styled.div`
      font-size: 20px;
      width: auto;
    `

  const ReadTime = styled.div`
      font-size: 15px;
      margin: 3px 5px;
      color: gray;  
    `

  return (
    <ThemeProvider theme={{ mode }}>
      <Layout location={location} toggleLight={() => mode === "light" ? toggleLight("dark") : toggleLight("light")}
              title={siteTitle} mode={mode}>
        <SEO title="All posts"/>
        <PostsMain>
          {posts.map(({ node }) => {
            const title = node.frontmatter.title || node.fields.slug
            const readTime = node.fields.readingTime.text
            return (<Div key={node.fields.slug}>
              <H3>
                <HeaderLink to={node.fields.slug}>{title}</HeaderLink>
                <Small>
                  <MiniClock/> {node.frontmatter.date}
                </Small>
              </H3>
              <ReadTime>{readTime}</ReadTime>
              <Preview
                dangerouslySetInnerHTML={{ __html: node.frontmatter.description || node.excerpt }}/>
            </Div>)
          })}
        </PostsMain>
      </Layout>
    </ThemeProvider>
  )
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
