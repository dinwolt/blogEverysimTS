import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import Seo from "../components/Seo";
import { BlogBody } from "../components/BlogBody";
import { Link } from "gatsby-plugin-intl";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import PostListItem from "@/components/PostListItem";
import Carousel from "@/components/Carousel";
import { FormattedMessage, injectIntl } from "gatsby-plugin-intl";
import { useIntl } from "gatsby-plugin-intl";

const formatDate = (dateString, locale = "en-US") => {
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(dateString));
};


const BlogPostContentfulTemplate = ({ data, intl }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`;
  const post = data.contentfulPost;
  const otherPosts = data.allContentfulPost.nodes;
  const authorPosts = data.authorPosts.nodes;
  console.log(authorPosts)

  const randomPosts = otherPosts
    .sort(() => 0.5 - Math.random()) 
    .slice(0, 3);
    const seoprops = {
      enUS:{
        title: post.title || "title",
    description: post.subtitle || "desc",
    url: data.site.siteMetadata?.enUS.siteUrl || "https://blog.everysim.io",
    author: post.author || "Everysim",
    keywords: [
      post.title,
      post.subtitle,
      post.author,
      post.tag,
      "Everysim Tech Blog", 
      "technology insights", 
      "software development", 
      "engineering innovations", 
      "future of technology", 
      "tech blog", 
      "development news", 
      "tech industry trends", 
      "engineering expertise", 
      "Everysim updates", 
      "technology leaders", 
      "software development blog", 
      "cutting-edge technology"
    ]
      },
      koKR:{
        title: data.site.siteMetadata?.koKR.title || "title",
    description: data.site.siteMetadata?.koKR.description || "desc",
    url: data.site.siteMetadata?.koKR.siteUrl || "https://blog.everysim.io",
    author: data.site.siteMetadata?.koKR.author || "everysim",
    keywords: [
      post.title,
      post.subtitle,
      post.author,
      post.tag,
      "Everysim 기술 블로그", 
        "기술 통찰력", 
        "소프트웨어 개발", 
        "엔지니어링 혁신", 
        "기술의 미래", 
        "기술 블로그", 
        "개발 뉴스", 
        "기술 산업 트렌드", 
        "엔지니어링 전문 지식", 
        "Everysim 업데이트", 
        "기술 리더", 
        "소프트웨어 개발 블로그", 
        "최첨단 기술"
    ],
      }
    };
  return (
<Layout title={siteTitle}>
  <Seo seoprops={seoprops}/>
  <div className="flex flex-col min-h-screen w-full items-center justify-start space-y-8 gap-8 overflow-x-hidden">
    <div className="container">

      <div className="grid gap-8 grid-cols-1 min-w-screen-sm sm:grid-cols-1 p-8">
      <article
        className="flex flex-col min-h-screen place-items-center p-20 space-y-8"
        itemScope
        itemType="http://schema.org/Article"
      >
        <div className="flex flex-col items-center">
          <h3 className="font-semibold text-left sm:text-base text-xs text-blue-500 mb-3">{post.tag}</h3>
          <header className="text-left mb-8 ">
            <h1
              itemProp="headline"
              className="sm:text-3xl text-xl font-semibold text-gray-900 dark:text-white"
            >
              {post.title}
            </h1>
            <h3
              itemProp="headline"
              className="font-semibold text-gray-500 sm:text-base text-xs dark:text-white mt-3"
            >
              {post.subtitle}
            </h3>
            <h3 className="mt-2 text-xs text-gray-500">{formatDate(post.updatedAt, useIntl().locale)}</h3>
            <h3>
              
            </h3>
          </header>

          {post.image && (
            <div className="relative z-0 p-2  max-w-screen-md mx-auto">
              <GatsbyImage
                image={getImage(post.image)}
                alt={post.title}
                className="w-full h-auto object-cover rounded-lg mx-auto"
              />
            </div>
          )}

          <div className="max-w-screen-md mt-6 mx-auto">
            <BlogBody content={post.content} references={post.content.references} />
          </div>

          <div className="mb-7 mt-7 flex justify-center">
            <Link
              to={`/blog/1`}
              className="bg-brand-secondary/20 text-blue-600 dark:text-blue-500 rounded-full px-5 py-2 text-sm"
            >
              <FormattedMessage id="post_bloglink"/>
            </Link>
          </div>
        </div>
      </article>
      <div className="flex flex-col items-center justify-center sm:p-6  mx-auto">
        <div className="flex flex-col mt-5 items-center mx-auto p-10 lg:w-[50rem]">
          <h1 className="font-semibold">
            <FormattedMessage id="post_writtenby"/>
          </h1>
          <GatsbyImage image={getImage(post.postAuthor.image)} className="rounded-full" />
          <h1 className="font-anton text-2xl mt-5">{post.postAuthor.name}</h1>
          <h1 className="text-brandHighlight font-semibold">{post.postAuthor.role}</h1>
          <h1 className="m-10 text-center">{post.postAuthor.description}</h1>
          <Link to={`/authors`} className="font-semibold hover:text-brandHighLight hover:scale-105 duration-200 transition-transform">
            <FormattedMessage id="post_authorlink"/>          
          </Link>
        </div>
        <div className="flex flex-col gap-4 mt-5">
          <h1 className="font-anton text-left text-black text-4xl mt-5">{post.postAuthor.name}
            <FormattedMessage id="post_author_other"/>
          </h1>
          <PostListItem posts={authorPosts} />
        </div>
      </div>
    </div>

    <div className="flex flex-col">
      <h1 className="lg:text-5xl text-3xl font-semibold text-center text-gray-900 dark:text-white">
        <FormattedMessage id="post_recommendation"/>
      </h1>
      <Carousel posts={randomPosts} />
    </div>
    </div>
    
    
  </div>
</Layout>

  );
};


export default injectIntl(BlogPostContentfulTemplate);
export const pageQuery = graphql`
  query ContentfulBlogPostBySlug($slug: String!, $authorName: String!, $locale: String!) {
    site {
      siteMetadata {
      siteUrl
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
    contentfulPost(slug: { eq: $slug }, node_locale:{eq:$locale}) {
      content {
        raw
        references {
        contentful_id
        language
        childrenContentfulCodeSnippetCodeTextNode {
          code
        }
      }
      }
      title
      updatedAt(formatString: "YYYY-MM-DD")
      subtitle
      slug
      image {
        gatsbyImageData(
          layout: CONSTRAINED
          width: 800
          placeholder: BLURRED
          quality: 90
        )
      }
      tag
      postAuthor {
        name
        image {
          gatsbyImageData(
            layout: CONSTRAINED
            width: 150
            placeholder: BLURRED
            quality: 90
          )
        }
        description
        role
      }
    }
    allContentfulPost(filter: { slug: { ne: $slug }, node_locale:{eq: $locale}}) {
      nodes {
        title
        subtitle
        slug
        image {
          gatsbyImageData(
            layout: CONSTRAINED
            width: 300
            placeholder: BLURRED
            quality: 90
          )
        }
        tag
      }
    }
    authorPosts: allContentfulPost(
      filter: {
        slug: { ne: $slug }
        postAuthor: { contentful_id: { eq: $authorName } }
        node_locale: {eq:$locale}
      }
      limit:5
    ) {
      nodes {
        title
        slug
        image {
          gatsbyImageData(
            layout: CONSTRAINED
            width: 300
            placeholder: BLURRED
            quality: 90
          )
        }
        tag
      }
    }
  }
`;