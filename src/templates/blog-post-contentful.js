import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import Seo from "../components/seo";
import { BlogBody } from "../components/BlogBody";
import { Link } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";


const BlogPostContentfulTemplate = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`;
  const post = data.contentfulPost;

  return (
    <Layout title={siteTitle}>
      <article className="flex flex-col min-h-screen place-items-center p-20 space-y-8" itemScope itemType="http://schema.org/Article">
        <div className="flex flex-col items-center">
          <div className="flex justify-center">
            <h3 className="font-semibold text-blue-500 mb-3">{post.tag}</h3>
          </div>
          <header className="text-center mb-8">
            <h1 itemProp="headline" className="lg:text-5xl text-3xl font-semibold text-gray-900 dark:text-white">
              {post.title}
            </h1>
            <h3 itemProp="headline" className=" font-semibold text-gray-500 dark:text-white mt-3">
              {post.subtitle}
            </h3>
            <div className="mt-5 flex justify-center space-x-3 text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-3">
                {post.author && (
                  <div className="relative h-10 w-10 flex-shrink-0">
                    <GatsbyImage
                      image = {getImage(post.image)}
                      alt={post.author}
                      className="rounded-full object-cover"
                    />
                  </div>
                )}
                <div>
                  <p className="text-gray-800 dark:text-gray-400">{post.author}</p>
                  <div className="flex items-center space-x-2 text-sm">
                    <time className="text-gray-500 dark:text-gray-400" dateTime={post?.publishedAt || post._createdAt}>
                      {new Date(post?.publishedAt || post._createdAt).toLocaleDateString()}
                    </time>
                    <span>· {post.estReadingTime || "5"} min read</span>
                  </div>
                </div>
              </div>
            </div>
          </header>

          {post.image && (
            <div className="relative z-0 mb-12 w-full max-w-screen-md mx-auto">
              <GatsbyImage
                image = {getImage(post.image)}
                alt={post.title}
                className="w-full max-w-[1000px] h-auto object-cover rounded-lg mx-auto"
              />
            </div>
          )}

          <div className="max-w-screen-md mx-auto">
            <BlogBody content={post.content} />
          </div>

          <div className="mb-7 mt-7 flex justify-center">
            <Link to="../1" className="bg-brand-secondary/20 text-blue-600 dark:text-blue-500 rounded-full px-5 py-2 text-sm">
              ← View all posts
            </Link>
          </div>
        </div>
      </article>
    </Layout>
  );
};

export const Head = ({ data }) => {
  return (
    <Seo
      title={data.contentfulPost.title}
      description={data.contentfulPost.content.raw || ""}
      image={data.contentfulPost.image?.file?.url}
      url="https://google.com"
      author={data.contentfulPost.author}
      keywords={["blog", "gatsby", "contentful"]} 
    />
  );
};

export default BlogPostContentfulTemplate;

export const pageQuery = graphql`
  query ContentfulBlogPostBySlug($slug: String!) {
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
    contentfulPost(slug: { eq: $slug }) {
      title
      author
      tag
      content {
        raw
      }
      image {
          gatsbyImageData(
            layout: CONSTRAINED
            width: 800
            placeholder: BLURRED
            quality:90
          )
        }
    }
  }
`;
