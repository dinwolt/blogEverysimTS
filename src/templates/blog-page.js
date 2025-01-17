import React, { useState } from "react";
import { graphql } from "gatsby";
import { Link } from "gatsby-plugin-intl";
import BlogGrid from "../components/BlogGrid";
import Layout from "../components/Layout";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/solid"
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { FormattedMessage } from "gatsby-plugin-intl";
const BlogIndex = ({ data, pageContext }) => {
  const siteTitle = data.site.siteMetadata?.title || 'Title';
  const posts = data.allContentfulPost.edges.map(edge => edge.node)
  const authors = data.allContentfulAuthor.edges.map(edge => edge.node)
  const randomAuthor = authors[Math.floor(Math.random() * authors.length)]
  const randomPost = posts[Math.floor(Math.random() * posts.length)]
  const image = getImage(randomAuthor.image)
  const imagePost = getImage(randomPost.image)
  const { currentPage, totalPages } = pageContext
  const [activeTab, setActiveTab] = useState('');
  const filteredPosts = activeTab
    ? posts.filter(post =>
      post.tag.split(', ').map(tag => tag.trim()).includes(activeTab)
    )
    : posts;

  return (
    <Layout title={siteTitle}>
      <section>
        <div className="bg-banner-image-lg bg-cover bg-no-repeat w-full">
          <div className="container mx-auto">
            <div className="flex  gap-8 p-8">
              <div className="flex-1 flex flex-col sm:p-8  justify-center">
                <div className="mb-5">
                  <h1 className="section-title mb-3">
                    <FormattedMessage id="blog_banner_title"/>
                  </h1>
                  <h2 className="section-subtitle">
                    <FormattedMessage id="blog_banner_subtitle"/>
                  </h2>
                </div>
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  
                  <GatsbyImage image={image} alt={randomAuthor.name} objectFit="contain"/>
                  
                  
                  <div className="flex flex-col gap-4 justify-items-end justify-end">
                    <blockquote className="border-l-4 pl-4 italic  section-post-subtitle text-white ">{randomAuthor.description}</blockquote>
                    
                    <div>
                      <p className="section-post-title text-white font-semibold">{randomAuthor.name}</p>
                      <p className="section-post-subtitle text-white ">{randomAuthor.role}</p>
                      <Link to="../../authors" className="section-post-subtitle text-white hover:underline transition-transform duration-200">
                      <FormattedMessage id="blog_banner_authorslink"/>
                      </Link>
                    </div>

                  </div>
                </div>
              </div>
              <div className="flex-1 mt-10 hidden sm:block p-8"><Link to={`/blog/${randomPost.slug}`}
                className="rounded-lg shadow-lg sm:p-8 hover:scale-105 transition-transform duration-3000"
              >
                <p className="section-title text-right mb-5 text-center">
                  <FormattedMessage id="blog_banner_recommendation"/>
                </p>
                <GatsbyImage image={imagePost} alt={randomPost.postAuthor.name} className="p-10" />
                <p className="section-post-subtitle text-white font-semibold">{randomPost.tag}</p>
                <p className="section-title">{randomPost.title}</p>
                <p className="section-post-subtitle text-white">{randomPost.subtitle}</p>
              </Link></div>
              
              
            </div>
          </div>

        </div>

        <div className="container mx-auto p-6 min-h-screen flex flex-col">

        <h1 className="section-title text-center text-black mb-2">
          <FormattedMessage id="blog_section_title"/>
        </h1>
        <h3 className="section-subtitle text-center text-black mb-5">
          <FormattedMessage id="blog_section_subtitle"/>
        </h3>

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
      </section>
    </Layout>

  );
};

export const query = graphql`
  query($skip: Int!, $limit: Int!, $locale:String!) {
  
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
    allContentfulPost(skip: $skip, limit: $limit, filter:{node_locale:{eq:$locale}}) {
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
      allContentfulAuthor {
            edges {
                node {
                    name
                    image {
                        gatsbyImageData(
                            layout: CONSTRAINED
                            width: 300
                            placeholder: DOMINANT_COLOR
                            quality: 90
                        )
                    }
                    role
                    description
                }
            }
        }
  }
`;

export default BlogIndex;
