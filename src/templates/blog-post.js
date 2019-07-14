import React, { useState } from "react"
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
import GatsbyImage from "gatsby-image"

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

const SocialLike = styled.span`
  //border: 1px solid gray;
  border-radius: 100%;
  width: 60px;
  height: 60px;
  text-align: center;
  &:hover {
    cursor: pointer;
  } 
  `

const SocialLikes = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin: 2em; 
  align-content: center;
`

const BlogPostTemplate = ({ pageContext, data }) => {
  const { previous, next } = pageContext
  const { frontmatter: { title, date, description, tags }, fields: { readingTime: { text } }, excerpt, html } = data.markdownRemark
  const [hornCount, setHornCount] = useState(0);
  const [unicornCount, setUniCount] = useState(0);
  const [clapsCount, setClapsCount] = useState(0);

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

      <SocialLikes>
        <SocialLike onClick={() => setHornCount(hornCount+ 1)}>
          <GatsbyImage fixed={data.horns.childImageSharp.fixed} alt="horns"/>
          <div>{hornCount}</div>
        </SocialLike>
        <SocialLike onClick={() => setUniCount(unicornCount+ 1)}>
          <GatsbyImage fixed={data.unicorn.childImageSharp.fixed} alt="horns"/>
          <div>{unicornCount}</div>
        </SocialLike>
        <SocialLike onClick={() => setClapsCount(clapsCount + 1)}>
          <GatsbyImage fixed={data.sunglasses.childImageSharp.fixed} alt="horns"/>
          <div>{clapsCount}</div>
        </SocialLike>
      </SocialLikes>

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
        horns: file(absolutePath: { regex: "/horns.png/" }) {
            childImageSharp {
                fixed(width: 40, height: 40) {
                    ...GatsbyImageSharpFixed
                }
            }
        }
        unicorn: file(absolutePath: { regex: "/unicorn.png/" }) {
            childImageSharp {
                fixed(width: 40, height: 40) {
                    ...GatsbyImageSharpFixed
                }
            }
        }
        sunglasses: file(absolutePath: { regex: "/sunglasses.png/" }) {
            childImageSharp {
                fixed(width: 40, height: 40) {
                    ...GatsbyImageSharpFixed
                }
            }
        }
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
