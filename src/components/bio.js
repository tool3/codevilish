import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { backgroundColor, color } from "../components/styles"
import { FaGitlab, FaGithub, FaLinkedin, FaDev } from "react-icons/fa"
import { A } from "./components"
import styled from "styled-components"

const Bio = () => {
  const data = useStaticQuery(graphql`
      query BioQuery {
          avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
              childImageSharp {
                  fixed(width: 80, height: 80) {
                      ...GatsbyImageSharpFixed
                  }
              }
          }
          site {
              siteMetadata {
                  author
                  social {
                      gitlab
                      github
                      linkedIn
                  }
              }
          }
      }
  `)

  const wrapIcon = (icon) => styled(icon)`
    width: 20px;
    height: 20px;
    transition: 0.2s ease;

    &:hover {
      fill: indianred;
      transform: scale(1.1);
    }
  `

  const Div = styled.div`
    display: flex;
    justify-content: center;
    width: auto;
    position: absolute;

    @media only screen and (max-width: 1024px) {
      margin: 10px;
    }
  `
  const P = styled.div`
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    font-weight: 500;
    font-size: 16px;
    color: ${backgroundColor};

    @media only screen and (max-width: 1024px) {
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      width: 55vw;
    }
  `

  const SocialTray = styled.span`
    display: flex;
    justify-content: space-around;
    padding-top: 6px;
    width: 30vw;
  `

  const Author = styled.div`
    font-family: Montserrat, sans-serif;
    font-size: 17px;
    text-align: center;
    color: ${color};
    margin-bottom: 10px;

    @media only screen and (max-width: 1024px) {
      font-size: 15px;
      margin: 0;
    }
  `

  const Gitlab = wrapIcon(FaGitlab)
  const LinkedIn = wrapIcon(FaLinkedin)
  const Github = wrapIcon(FaGithub)
  const Dev = wrapIcon(FaDev)

  const { author, social } = data.site.siteMetadata
  const LinkOut = ({ href, children }) => (
    <A href={href} target={"_blank"}>
      {children}
    </A>
  )

  return (
    <Div>
      <P>
        <Author>{author}</Author>
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
    </Div>
  )
}

export default Bio
