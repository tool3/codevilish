import React from "react"
import { graphql } from "gatsby"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"
import {
  Clock,
  Content,
  Date,
  Footer,
  ReadTime,
  StyledLink,
  Tag,
  TagWrapper,
  UL,
} from "../components/components"
import styled from "styled-components"

const Title = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 5%;
`

const HeadTitle = styled.div`
    font-size: 2.5em;
    font-weight: 800;
    font-family: Merriweather, sans-serif;
`

const BlogPostTemplate = ({ pageContext, data }) => {
  const { previous, next } = pageContext
  const { frontmatter: { title, date, description, tags }, fields: { readingTime: { text } }, excerpt, html } = data.markdownRemark

  return (
    <div style={{ paddingTop: 15 }}>
      <SEO title={title} description={description || excerpt}/>
        <Title>
        <HeadTitle>{title}</HeadTitle>
        <Date><Clock/>{date}</Date>
        <ReadTime>{text}</ReadTime>
      </Title>
      <Content dangerouslySetInnerHTML={{ __html: html }}/>
      <hr style={{ marginBottom: rhythm(1), backgroundColor: "lightgray" }}/>

      <Footer>
        {tags &&
        <TagWrapper>{tags.map((tag, index) => (
          <StyledLink key={index} to={`/tags/${tag}`}>
            <Tag>{tag}</Tag></StyledLink>))}</TagWrapper>}
      </Footer>

      <UL>
        <li>{previous && (<StyledLink to={previous.fields.slug} rel="prev">
          ← {previous.frontmatter.title}
        </StyledLink>)}
        </li>
        <li>
          {next && (<StyledLink to={next.fields.slug} rel="next">
            {next.frontmatter.title} →
          </StyledLink>)}
        </li>
      </UL>
    </div>
  )
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
            fields {
                readingTime {
                    text
                }
            }
            frontmatter {
                title
                date(formatString: "MMMM DD, YYYY")
                description
                tags
            }
        }
    }
`
