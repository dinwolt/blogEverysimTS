import React, { useState } from "react";
import { graphql, Link } from "gatsby";
import BlogGrid from "../components/BlogGrid";
import Layout from "../components/layout";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/solid"
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
        <div className="bg-banner-image-lg bg-cover bg-no-repeat"><h1 className="text-anton text-white text-center text-4xl p-8">Blog</h1></div>
        

        <BlogGrid
          posts={posts}
          visibleCount={posts.length}
          isExpanded={true}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          toggleView={() => { }}
          filteredPosts={filteredPosts}
        />

        <div className=" max-w-screen flex justify-center mx-auto items-center mt-8 gap-x-8">
          {currentPage > 1 && (
            <Link to={`/blog/${currentPage - 1}`} className="inline-flex items-center bg-transparent hover:bg-gray-300 hover:outline-none text-black px-4 py-2 rounded text-center transition-colors duration-200" >
              <ArrowLeftIcon strokeWidth={2} className="h-5 w-5 text-gray-900 mr-3" />
            </Link>

          )}
          <span className="flex-1 text-xl text-center">
            {currentPage}/{totalPages}
          </span>
          {currentPage < totalPages && (
            <Link to={`/blog/${currentPage + 1}`} className="inline-flex items-center bg-transparent hover:bg-gray-300 hover:outline-none text-black px-4 py-2 rounded text-center transition-colors duration-200" >
              <ArrowRightIcon strokeWidth={2} className="h-5 w-5 text-gray-900 mr-3" />
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
          postAuthor{name}
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
