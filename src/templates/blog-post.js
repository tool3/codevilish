import React from "react"
import { graphql } from "gatsby"
import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"
import styled from "styled-components"
import { backgroundColor, color } from "../components/styles"
import { StyledLink, Wrapper } from "../components/components"

class BlogPostTemplate extends React.Component {
  render() {
    const Tag = styled.div`
      background-color: ${backgroundColor};
      color: ${color};
      border: 1px solid ${color};
      border-radius: 13px;
      padding: 5px;
      text-align: center;
      font-size: 15px;
      line-height: 12px;
      margin: 5px;
    `

    const TagWrapper = styled.div`
      display: flex;
      justify-content: flex-start;
      flex-direction: row;
    `

    const H1 = styled.h1`
      background-color: ${backgroundColor};
      color: ${color};
      font-family: 'Georgia', sans-serif;      
      font-size: 2.5rem;
      text-align: center;
    `
    const Div = styled.div`
      background-color: ${backgroundColor};
      color: ${color};
      text-align: center;
      font-size: 20px;
      line-height: 12px;
      margin: 5px;
      padding: 5px;
    `

    const UL = styled.ul`
    display: flex;
    justify-content: space-between;
    list-style: none;
    padding: 0;
    `

    const Content = styled.div`
       padding: 5px 480px;
    `

    const Footer = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    `

    const { previous, next } = this.props.pageContext
    const siteTitle = this.props.data.site.siteMetadata.title
    const { frontmatter: { title, date, description, tags }, excerpt, html } = this.props.data.markdownRemark
    return (<Wrapper>
      <Layout location={this.props.location} title={siteTitle} mode={"light"}>
        <SEO title={title} description={description || excerpt}/>
        <H1>{title}</H1>
        <Div>{date}</Div>

        <Content dangerouslySetInnerHTML={{ __html: html }}/>

        <hr style={{ marginBottom: rhythm(1) }}/>

        <Footer>
          {tags &&
          <TagWrapper>{tags.map((tag, index) => <StyledLink to={`/tags/${tag}`}><Tag key={index}>{tag}</Tag></StyledLink>)}</TagWrapper>}
          <Bio/>
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
      </Layout>
    </Wrapper>)
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
