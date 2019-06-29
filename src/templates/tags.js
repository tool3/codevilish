import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"
import { StyledLink, TagLink, TagPage, TitleHeader } from "../components/components"
import styled from "styled-components"

const Div = styled.div`
  background: #1e1e1e;
  border: 1px dotted gray;
`

const TagView = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 4em;
`

const Tags = ({ pageContext, data }) => {
  const { tag } = pageContext
  const { edges, totalCount } = data.allMarkdownRemark
  const tagHeader = `${totalCount} post${totalCount === 1 ? "" : "s"} tagged with ${tag}`

  return (
    <TagPage>
      <TitleHeader>{tagHeader}</TitleHeader>
      <TagView>
      {edges.map(({ node }) => {
        const { slug } = node.fields
        const { title } = node.frontmatter
        return (<Div key={slug}><TagLink to={slug}>{title}</TagLink></Div>)
      })}
      </TagView>
      <StyledLink to="/tags">All tags</StyledLink>
    </TagPage>
  )
}

Tags.propTypes = {
  pageContext: PropTypes.shape({
    tag: PropTypes.string.isRequired,
  }), data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      totalCount: PropTypes.number.isRequired, edges: PropTypes.arrayOf(PropTypes.shape({
        node: PropTypes.shape({
          frontmatter: PropTypes.shape({
            title: PropTypes.string.isRequired,
          }), fields: PropTypes.shape({
            slug: PropTypes.string.isRequired,
          }),
        }),
      }).isRequired),
    }),
  }),
}

export default Tags

export const pageQuery = graphql`
    query($tag: String) {
        allMarkdownRemark(
            limit: 2000
            sort: { fields: [frontmatter___date], order: DESC }
            filter: { frontmatter: { tags: { in: [$tag] } } }
        ) {
            totalCount
            edges {
                node {
                    fields {
                        slug
                    }
                    frontmatter {
                        title
                    }
                }
            }
        }
    }
`