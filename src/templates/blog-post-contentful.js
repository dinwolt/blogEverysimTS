import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import Seo from "../components/seo";
import { BlogBody } from "../components/BlogBody";
import { Link } from "gatsby";

const BlogPostContentfulTemplate = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`;
  const post = data.contentfulPost;
  const contentJson = JSON.parse(post.content.raw);

  return (
    <Layout location={location} title={siteTitle}>
      <article className="mx-auto max-w-screen-lg pt-20" itemScope itemType="http://schema.org/Article">
        <div className="flex flex-col items-center">
          <div className="flex justify-center">
            <h3 className="font-semibold text-gray-500">{post.tag}</h3>
          </div>
          <header className="text-center mb-8">
            <h1 itemProp="headline" className="text-3xl font-semibold text-gray-900 dark:text-white">
              {post.title}
            </h1>
            <div className="mt-3 flex justify-center space-x-3 text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-3">
                {post.author && (
                  <div className="relative h-10 w-10 flex-shrink-0">
                    <img
                      src={post.image.url}
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
              <img
                src={post.image.url}
                alt={post.title}
                className="w-full max-w-[800px] h-auto object-cover rounded-lg mx-auto"
              />
            </div>
          )}

          <div className="max-w-screen-md mx-auto">
            <BlogBody content={post.content} />
          </div>

          <div className="mb-7 mt-7 flex justify-center">
            <Link to="../" className="bg-brand-secondary/20 text-blue-600 dark:text-blue-500 rounded-full px-5 py-2 text-sm">
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
    />
  );
};

export default BlogPostContentfulTemplate;

export const pageQuery = graphql`
  query ContentfulBlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
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
        url
      }
    }
  }
`;
