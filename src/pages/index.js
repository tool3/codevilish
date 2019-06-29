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
      margin: 1.25em 0; 
      width: 100%;  
    `
  const Small = styled.small`
      transition: all .2s ease-in-out;
      background-color: ${backgroundColor};
      color: indianred;
      font-size: 80%;
      line-height: 25px;
      display: flex;
     align-items: center;
    `

  const PostsMain = styled.div`
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 0 30em;
      height: 80vh;
       @media only screen and (max-width: 1300px) {
        padding: 5px 1em;
    }
    `

  const MiniClock = styled(Clock)`
      width: 11px;
      height: 11px;
      margin-right: 5px;
    `

  const H3 = styled.h3`
      text-decoration: none;
      margin-bottom: 0;
    `

  const HeaderLink = styled(StyledLink)`
      font-size: 1.5rem;
      font-weight: 800;
    `
  const Preview = styled.div`
      font-size: 15px;
      width: auto;
      font-family: Merriweather, sans-serif;
      
    `

  const ReadTime = styled.div`
      margin: 0 5px;
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
              </H3>
              <Small>
                <MiniClock/> {node.frontmatter.date}
                <ReadTime>{readTime}</ReadTime>
              </Small>
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
