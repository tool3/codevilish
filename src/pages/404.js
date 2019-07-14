import React from "react"
import { graphql } from "gatsby"
import SEO from "../components/seo"

class NotFoundPage extends React.Component {
  render() {
    return (
      <>
        <SEO title="404: Not Found" />
        <h1>Page Not Found</h1>
      </>
    )
  }
}

export default NotFoundPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
