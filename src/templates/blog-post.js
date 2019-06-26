import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"
import styled from "styled-components"
import { backgroundColor, color } from "../components/styles"
import { Clock, StyledLink, Tag, TagWrapper } from "../components/components"

class BlogPostTemplate extends React.Component {
  render() {

    const H1 = styled.h1`
      background-color: ${backgroundColor};
      color: ${color};
      font-size: 2.3rem;
      text-align: center;
      margin: 0;
    `
    const Div = styled.div`
      background-color: ${backgroundColor};
      color: ${color};
      font-size: 20px;
      line-height: 12px;
      margin: 5px;
      padding: 15px;
      text-align: center;
    `

    const UL = styled.ul`
    display: flex;
    justify-content: space-around;
    list-style: none;
    padding: 0;
    margin: 0;
    `

    const Content = styled.div`
       padding: 5px 20em;
       display: flex;
       flex-direction: column;
       justify-content: center;
      
       @media only screen and (max-width: 600px) {
       padding: 5px 1em;
      }
    `
    const Footer = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    @media only screen and (max-width: 600px) {
      padding: 5px 2em;
    }
    `
    const Date = styled(Div)`
       color: indianred;
       padding: 5px;
       font-size: 15px;
       margin: 0; 
    `

    const ReadTime = styled.div`
    display: flex;
    justify-content: center;
    font-size: 15px;
    `

    const { previous, next } = this.props.pageContext
    const siteTitle = this.props.data.site.siteMetadata.title
    const { frontmatter: { title, date, description, tags }, fields: {readingTime: { text }}, excerpt, html } = this.props.data.markdownRemark
    return (<Layout location={this.props.location} title={siteTitle} mode={"light"}>
      <SEO title={title} description={description || excerpt}/>
      <H1>{title}</H1>
      <Date><Clock/>{date}</Date>
      <ReadTime>{text}</ReadTime>
      <Content dangerouslySetInnerHTML={{ __html: html }}/>

      <hr style={{ marginBottom: rhythm(1) }}/>

      <Footer>
        {tags && <TagWrapper>{tags.map((tag, index) => (
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
    </Layout>)
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
