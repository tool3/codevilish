import React from "react"
import { graphql } from "gatsby"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"
import {
  Clock,
  Content,
  Date,
  Footer,
  H1,
  ReadTime,
  StyledLink,
  Tag,
  TagWrapper,
  UL,
} from "../components/components"

const BlogPostTemplate = ({ pageContext, data }) => {
  const { previous, next } = pageContext
  const { frontmatter: { title, date, description, tags }, fields: { readingTime: { text } }, excerpt, html } = data.markdownRemark

  return (
    <>
      <SEO title={title} description={description || excerpt}/>
      <H1>{title}</H1>
      <Date><Clock/>{date}</Date>
      <ReadTime>{text}</ReadTime>
      <Content dangerouslySetInnerHTML={{ __html: html }}/>
      <hr style={{ marginBottom: rhythm(1), backgroundColor: 'lightgray' }}/>

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
    </>)
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
