import * as React from "react";
import { useStaticQuery, graphql } from "gatsby";

interface SEOProps {
  title: string;
  description: string;
  image?: string;
  url: string;
  author?: string;
  keywords?: string[];
}

const Seo: React.FC<SEOProps> = ({
  title,
  description,
  image,
  url,
  author,
  keywords = [],
}) => {
  const { site, allContentfulBlogPost } = useStaticQuery<{
    site: {
      siteMetadata: {
        title: string;
        description: string;
        author: string;
        siteUrl: string;
        lang: string;
        copyright: string;
      };
    };
    allContentfulBlogPost: {
      nodes: Array<{
        title: string;
        slug: string;
        image: {
          file: {
            url: string;
          };
        };
        author: string;
      }>;
    };
  }>(
    graphql`
      query {
        site {
          siteMetadata {
            title
      description
      author
      siteUrl
      lang
      copyright
          }
        }
        allContentfulPost {
          nodes {
            title
            slug
            image {
              file {
                url
              }
            }
            author
          }
        }
      }
    `
  );

  const metaDescription = description || site.siteMetadata.description;
  const metaTitle = title || site.siteMetadata.title;
  const metaKeywords = keywords.join(", ");
  const metaImage = image || "/default-image.jpg"; 

  const isBlogPostPage = url.includes("blog/");


  const fullUrl = isBlogPostPage
    ? `https://yourdomain.com${url}`
    : "https://yourdomain.com"; 

  return (
    <>

      <title>{metaTitle ? `${title} | ${metaTitle}` : title}</title>


      <meta name="description" content={metaDescription} />
      <meta name="keywords" content={metaKeywords} />
      <meta name="robots" content="index, follow" />

      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:image" content={metaImage} />
      <meta property="og:image:alt" content={`Image for ${title}`} />


      {author && <meta name="author" content={author} />}

      <link rel="canonical" href={fullUrl} />
    </>
  );
};

export default Seo;
