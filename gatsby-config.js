module.exports = {
  siteMetadata: {
    title: `Codenvoy`,
    author: `Tal Hayut`,
    description: `The Codenvoy blog.`,
    siteUrl: `https://codenvoy.netlify.com`,
    social: {
      gitlab: "talhayut", github: "tool3", linkedIn: "talhayut",
    },
  }, plugins: [{
    resolve: `gatsby-source-filesystem`, options: {
      path: `${__dirname}/content/blog`, name: `blog`,
    },
  }, {
    resolve: `gatsby-source-filesystem`, options: {
      path: `${__dirname}/content/assets`, name: `assets`,
    },
  }, {
    resolve: `gatsby-transformer-remark`, options: {
      plugins: ["gatsby-remark-code-titles", {
        resolve: `gatsby-remark-prismjs`,
        options: { showLineNumbers: true, show_names: true , copy: true},
        plugins: 'prismjs/plugins/show-language/prism-show-language'
      }, { resolve: "gatsby-remark-autolink-headers" }, {
        resolve: `gatsby-remark-images`, options: {
          maxWidth: 590,
        },
      }, {
        resolve: `gatsby-remark-responsive-iframe`, options: {
          wrapperStyle: `margin-bottom: 1.0725rem`,
        },
      }, `gatsby-remark-copy-linked-files`, `gatsby-remark-smartypants`,
        `gatsby-remark-reading-time`,
      ],
    },
  }, `gatsby-transformer-sharp`, `gatsby-plugin-sharp`, {
    resolve: `gatsby-plugin-google-analytics`, options: {
      //trackingId: `ADD YOUR TRACKING ID HERE`,
    },
  }, `gatsby-plugin-feed`, {
    resolve: `gatsby-plugin-manifest`, options: {
      name: `Codenvoy`,
      short_name: `Codenvoy`,
      start_url: `/`,
      background_color: `#ffffff`,
      theme_color: `#CD5B5C`,
      icon: `content/assets/logo.png`,
      display: `standalone`,
    },
  }, `gatsby-plugin-offline`, `gatsby-plugin-react-helmet`, {
    resolve: `gatsby-plugin-typography`, options: {
      pathToConfigModule: `src/utils/typography`,
    },
  }, `gatsby-plugin-styled-components`, {
    resolve: "gatsby-plugin-tags", options: {
      templatePath: `${__dirname}/src/templates/tags.js`,
    },
  },
    {
      resolve: `gatsby-plugin-layout`,
      options: {
        component: require.resolve(`./src/components/layout.js`),
      },
    }],
}
