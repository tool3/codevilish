import React from "react"
import PropTypes from "prop-types"
import kebabCase from "lodash/kebabCase"
import { Helmet } from "react-helmet"
import { graphql } from "gatsby"
import Header from "../components/header"
import { Tag, TagLink, TagPage } from "../components/components"


const TagsPage = ({ data: { allMarkdownRemark: { group }, site: { siteMetadata: { title } } } }) => {
  return (<TagPage>
    <Helmet title={title}/>
    <Header title={"Tags"}/>
    {group.map(tag => (<Tag key={tag.fieldValue}>
      <TagLink to={`/tags/${kebabCase(tag.fieldValue)}/`}>
        {tag.fieldValue} ({tag.totalCount})
      </TagLink>
    </Tag>))}
  </TagPage>)
}

TagsPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      group: PropTypes.arrayOf(PropTypes.shape({
        fieldValue: PropTypes.string.isRequired, totalCount: PropTypes.number.isRequired,
      }).isRequired),
    }), site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        title: PropTypes.string.isRequired,
      }),
    }),
  }),
}

export default TagsPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(limit: 2000) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`
