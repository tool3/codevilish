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
import { color } from "../components/styles"
import {
  WhatsappShareButton,
  EmailShareButton,
  TelegramShareButton,
  FacebookShareButton,
  TwitterShareButton,
} from "react-share"
import {
  FaWhatsapp,
  FaEnvelope,
  FaTelegram,
  FaFacebook,
  FaTwitter,
} from "react-icons/fa"


const Title = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 5%;
`

const HeadTitle = styled.div`
    font-size: 3em;
    font-weight: 800;
    font-family: Merriweather, sans-serif;
    text-align: center;
`

const SocialShare = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin: 2em; 
  align-content: center;
`

const Li = styled.li`
  border: 1px solid ${color};
  border-radius: 20px;
  padding: 0 5px;
  @media only screen and (max-width: 1700px) {
        font-size: 0.75em;
  }
`

const ShareIcon = (icon, color) => styled(icon)`
    width: 2em;
    height: 2em;
    fill: ${color};
    cursor: pointer;
    transition: .2s ease;
    &:hover {
      fill: indianred;
      transform: scale(1.1);
    }
`

const WhatsApp = ShareIcon(FaWhatsapp, color)
const Email = ShareIcon(FaEnvelope, color)
const Facebook = ShareIcon(FaFacebook, color)
const Telegram = ShareIcon(FaTelegram, color)
const Twitter = ShareIcon(FaTwitter, color)


const BlogPostTemplate = ({ pageContext, data, location }) => {
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

      <SocialShare>
        <WhatsappShareButton url={location.href}>
          <WhatsApp/>
        </WhatsappShareButton>
        <EmailShareButton url={location.href}>
          <Email/>
        </EmailShareButton>
        <TelegramShareButton url={location.href}>
          <Telegram/>
        </TelegramShareButton>
        <FacebookShareButton url={location.href}>
          <Facebook/>
        </FacebookShareButton>
        <TwitterShareButton url={location.href}>
          <Twitter/>
        </TwitterShareButton>
      </SocialShare>

      <UL>
        {previous && <Li>
          <StyledLink to={previous.fields.slug} rel="prev">
            ← {previous.frontmatter.title}
          </StyledLink>
        </Li>}

        {next && <Li>
          <StyledLink to={next.fields.slug} rel="next">
            {next.frontmatter.title} →
          </StyledLink>
        </Li>}
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
