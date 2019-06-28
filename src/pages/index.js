import React from "react"
import { graphql } from "gatsby"
import SEO from "../components/seo"
import styled from "styled-components"
import { backgroundColor, color } from "../components/styles"
import { Clock, StyledLink } from "../components/components"

function BlogIndex({ data }) {
  const posts = data.allMarkdownRemark.edges

  const Div = styled.div`
      transition: all .2s ease-in-out;
      background-color: ${backgroundColor};
      color: ${color};
      padding: 5px 0;
      font-size: 15px;
      margin: 10px 0; 
      width: 100%;
    `
  const Small = styled.small`
      transition: all .2s ease-in-out;
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
      padding: 0 25em;
       @media only screen and (max-width: 1300px) {
        padding: 5px 1em;
    }
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
      font-size: 18px;
      width: auto;
      font-family: Merriweather, sans-serif;
    `

  const ReadTime = styled.div`
      font-size: 15px;
      margin: 3px 0;
      color: gray;  
    `


  return (
    <PostsMain>
      <SEO title="All posts"/>
        {posts.map(({ node }) => {
          const title = node.frontmatter.title || node.fields.slug
          const readTime = node.fields.readingTime.text
          return (
            <Div key={node.fields.slug}>
              <H3>
                <HeaderLink to={node.fields.slug}>{title}</HeaderLink>
                <Small>
                  <MiniClock/> {node.frontmatter.date}
                </Small>
              </H3>
              <ReadTime>{readTime}</ReadTime>
              <Preview
                dangerouslySetInnerHTML={{ __html: node.frontmatter.description || node.excerpt }}/>
            </Div>
          )
        })}
    </PostsMain>
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
