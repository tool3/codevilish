import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"
import { FaGitlab, FaGithub, FaLinkedin } from "react-icons/fa"
import { A } from "./components"
import styled from "styled-components"

const Bio = ({center}) => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
        childImageSharp {
          fixed(width: 50, height: 50) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      site {
        siteMetadata {
          author,
          social {
            gitlab,
            github,
            linkedIn
          }
        }
      }
    }
  `)

  const Div = styled.div`
    display: flex;
    justify-content: flex-start;
    margin-top: 5px;
    width: auto;
  `
  const P = styled.p`
    margin-left: 5px;
    font-family: Merriweather, sans-serif;
  `

  const SocialTray = styled.span`
    display: flex;
    justify-content: space-around;
  `

  const Gitlab = styled(FaGitlab)`
    fill: #FCA326;
  `

  const Github = styled(FaGithub)`
    fill: gray;
  `
 const LinkedIn = styled(FaLinkedin)`
    fill: #0077B5;
  `

   // A.hovering()

  const { author, social } = data.site.siteMetadata

  return (<Div>
    <Image
      fixed={data.avatar.childImageSharp.fixed}
      alt={author}
      imgStyle={{ borderRadius: `50%` }}/>
    <P>
      <strong>{author}</strong>

      <br/>
      <SocialTray>
        <A href={`https://gitlab.com/${social.gitlab}`}>
          <Gitlab/>
        </A>

        <A href={`https://github.com/${social.github}`}>
          <Github/>
        </A>

        <A href={`https://linkedin.com/in/${social.linkedIn}`}>
          <LinkedIn/>
        </A>
      </SocialTray>
    </P>
  </Div>)
}

export default Bio
