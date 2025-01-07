/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-config/
 */

/**
 * @type {import('gatsby').GatsbyConfig}
 */
import path from "path"
const dotenv = require('dotenv')
if (process.env.NODEENV !== 'production'){
  dotenv.config()
}
module.exports = {
  
  siteMetadata: {
    title: `Gatsby Starter Blog`,
    author: {
      name: `Kyle Mathews`,
      summary: `who lives and works in San Francisco building useful things.`,
    },
    description: `A starter blog demonstrating what Gatsby can do.`,
    siteUrl: `https://gatsbystarterblogsource.gatsbyjs.io/`,
    social: {
      twitter: `kylemathews`,
    },
  },
  plugins: [
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-contentful`,
      options:{
        spaceId:`jo6yvbbl7m0n`,
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
      }
    },
    
    
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
  
  ],
}
