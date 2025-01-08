import React, { useState } from "react";
import { graphql, Link } from "gatsby";
import BlogGrid from "../components/BlogGrid";
import Layout from "../components/layout";

const BlogIndex = ({ data, pageContext }) => {
  const siteTitle = data.site.siteMetadata?.title || 'Title';
  const posts = data.allContentfulPost.edges.map(edge => edge.node)
  const { currentPage, totalPages } = pageContext
  const [activeTab, setActiveTab] = useState('');
  const filteredPosts = activeTab
    ? posts.filter(post =>
      post.tag.split(', ').map(tag => tag.trim()).includes(activeTab)
    )
    : posts;

  return (
    <Layout title={siteTitle}>
      <div className="container mx-auto p-6 min-h-screen flex flex-col">
        <h1 className="text-4xl mb-8">Blog</h1>

        <BlogGrid
          posts={posts}
          visibleCount={posts.length}
          isExpanded={true}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          toggleView={() => { }}
          filteredPosts={filteredPosts}
        />

        <div className="flex justify-between mx-auto items-center mt-8 gap-x-8">
          {currentPage > 1 && (
            <Link to={`/blog/${currentPage - 1}`} className="bg-black text-white px-4 py-2 rounded w-full text-center">
              Previous
            </Link>
          )}
          <span className="text-xl text-center">
            Page {currentPage} of {totalPages}
          </span>
          {currentPage < totalPages && (
            <Link to={`/blog/${currentPage + 1}`} className="bg-black text-white px-4 py-2 rounded w-full text-center">
              Next
            </Link>
          )}
        </div>
      </div>

    </Layout>

  );
};

export const query = graphql`
  query($skip: Int!, $limit: Int!) {
  
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
    allContentfulPost(skip: $skip, limit: $limit) {
      edges {
        node {
          title
          subtitle
          author
          slug
          image {
          gatsbyImageData(
            layout: CONSTRAINED
            width: 800
            placeholder: BLURRED
            quality:90
          )
        }
            content{
            raw}
          tag
        }
      }
    }
  }
`;

export default BlogIndex;
