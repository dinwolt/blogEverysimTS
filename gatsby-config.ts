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
    title: `Everysim Blog`,
    description: 'A blog sharing insights and stories about EverySim, tech, development, and more.',
    author: 'Everysim',
    siteUrl: `https://gatsbystarterblogsource.gatsbyjs.io/`,
    lang: 'en', 
    copyright: '© 2025 EverySim Blog. All rights reserved.',
  },
  plugins: [
    {
      resolve: `gatsby-source-contentful`,
      options:{
        spaceId:`jo6yvbbl7m0n`,
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
        host: `cdn.contentful.com`,
      }
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Your Blog App',
        short_name: 'Blog',
        start_url: '/',
        background_color: '#fff',
        theme_color: '#000',
        display: 'minimal-ui',
        icon: 'src/images/icon.png',
      },
    },
    
    {
      resolve: `gatsby-plugin-intl`,
      options: {
        path: `${__dirname}/src/intl`,
        languages: [`en-US`, `ko-KR`],
        defaultLanguage: `en-US`, 
        redirect: true
      }
    },
    
    
    `gatsby-plugin-image`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sitemap`,
     'gatsby-plugin-postcss'
  
  ],
}
