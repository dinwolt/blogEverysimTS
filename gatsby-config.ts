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
    siteUrl: `https://blog.everysim.io/`,
    enUS: {
      title: `EverySim Tech Blog - Insights, News, and Innovation in Technology and Development`,
      description: `Explore the latest insights, stories, and updates from EverySim. Our blog covers cutting-edge technology, software development, industry trends, and more.`,
      author: `EverySim Team`,
      siteUrl: `https://blog.everysim.io/en-US`,
      lang: `en-US`,
      copyright: `© 2025 EverySim Blog. All rights reserved.`,
    },
    koKR: {
      title: `EverySim 개발 블로그 - 개발 및 혁신에 대한 통찰력, 뉴스 및 혁신`,
      description: `EverySim에서 제공하는 최신 통찰력, 이야기 및 업데이트를 확인하세요.`,
      author: `EverySim 팀`,
      siteUrl: `https://blog.everysim.io/ko-KR`,
      lang: `ko-KR`,
      copyright: `© 2025 EverySim 블로그. 모든 권리 보유.`,
    },
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
