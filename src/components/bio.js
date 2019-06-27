import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"
import { FaGitlab, FaGithub, FaLinkedin, FaDev } from "react-icons/fa"
import { A } from "./components"
import styled from "styled-components"

const Bio = () => {
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

  const wrapIcon = (icon, color) => styled(icon)`
      &:hover { 
      fill: ${color};
      filter: none;
      }
      
    @media only screen and (max-width: 600px) {
      fill: ${color};
    }
    `

  const Div = styled.div`
    display: flex;
    justify-content: flex-start;
    margin-top: 5px;
    width: auto;
  `
  const P = styled.p`
    margin-left: 5px;
    font-family: Merriweather, sans-serif;
    color: #1e1e1e;
  `

  const SocialTray = styled.span`
    display: flex;
    justify-content: space-around;
    padding-top: 6px;
  `

  const Gitlab = wrapIcon(FaGitlab, "#FCA326")
  const LinkedIn = wrapIcon(FaLinkedin, "#0077B5")
  const Github = wrapIcon(FaGithub, "black")
  const Dev = wrapIcon(FaDev, "black");

  const { author, social } = data.site.siteMetadata
  const LinkOut = ({href, children}) => <A href={href} target={'_blank'}>{children}</A>

  return (<Div>
    <Image
      fixed={data.avatar.childImageSharp.fixed}
      alt={author}
      imgStyle={{ borderRadius: `50%` }}/>
    <P>
      {author}
      <br/>
      <SocialTray>
        <LinkOut href={`https://gitlab.com/${social.gitlab}`}>
          <Gitlab/>
        </LinkOut>

        <LinkOut href={`https://github.com/${social.github}`}>
          <Github/>
        </LinkOut>

        <LinkOut href={`https://linkedin.com/in/${social.linkedIn}`}>
          <LinkedIn/>
        </LinkOut>

        <LinkOut href={`https://dev.to/${social.github}`}>
          <Dev/>
        </LinkOut>
      </SocialTray>
    </P>
  </Div>)
}

export default Bio
