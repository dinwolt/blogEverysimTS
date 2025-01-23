import * as React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { useIntl } from "gatsby-plugin-intl"; 
type seodata = {
  title: string;
  description: string;
  image?: string;
  url: string;
  author?: string;
  keywords?: string[];
} 

interface SEOProps {
  seoprops: {
    enUS: seodata;
    koKR: seodata;
  };
  
}

const Seo: React.FC<SEOProps> = ({
  seoprops
}) => {
  const  {locale}  = useIntl();  
  
  const { site } = useStaticQuery<{
    site: {
      siteMetadata: {
        siteUrl:string,
        enUS: {
          title: string;
          description: string;
          author: string;
          siteUrl: string;
          lang: string;
          copyright: string;
        };
        koKR: {
          title: string;
          description: string;
          author: string;
          siteUrl: string;
          lang: string;
          copyright: string;
        };
      };
    };
  }>(graphql`
    query {
      site {
        siteMetadata {
          enUS {
            title
            description
            author
            siteUrl
            lang
            copyright
          }
          koKR {
            title
            description
            author
            siteUrl
            lang
            copyright
          }
        }
      }
    }
  `);
  const seodata = locale === "ko-KR" ? seoprops.koKR : seoprops.enUS;

  const metaData = locale === "ko-KR" ? site.siteMetadata.koKR : site.siteMetadata.enUS;

  const metaDescription = seodata.description || metaData.description;
  const metaTitle = seodata.title || metaData.title;
  const metaKeywords = seodata.keywords?.join(", ");
  const metaImage = seodata.image || "../../static/images/metaImage.png";

  const isBlogPostPage = seodata.url.includes("blog/");
  const fullUrl = isBlogPostPage ? `${seodata.url}` : "https://blog.everysim.io";

  return (
    <>
      <title>{metaTitle ? `${metaTitle} | ${metaData.title}` : metaTitle}</title>

      <meta name="description" content={metaDescription} />
      <meta name="keywords" content={metaKeywords} />
      <meta name="robots" content="index, follow" />

      <meta property="og:type" content="website" />
      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:image" content={metaImage} />
      <meta property="og:image:alt" content={`Image for ${metaTitle}`} />

      {seodata.author && <meta name="author" content={seodata.author} />}
      <link rel="canonical" href={fullUrl} />
    </>
  );
};

export default Seo;
