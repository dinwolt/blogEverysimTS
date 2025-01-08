import React, { useState } from "react";
import { graphql, PageProps } from "gatsby";
import Layout from "../components/Layout";
import Seo from "../components/Seo";
import { Link } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import BlogGrid from "@/components/BlogGrid";
import { IGatsbyImageData } from "gatsby-plugin-image";

interface BlogIndexQueryData {
  site: {
    siteMetadata?: {
      title: string;
      description: string;
      author: string;
      siteUrl: string;
      lang: string;
      copyright: string;
    };
  };
  allContentfulPost: {
    edges: {
      node: {
        title?: string;
        subtitle?: string;
        author?: string;
        slug: string;
        image: IGatsbyImageData;
        tag: string;
      };
    }[];
  };
}

const BlogIndex: React.FC<PageProps<BlogIndexQueryData>> = ({ data }) => {
  const siteTitle = data.site.siteMetadata?.title || 'Title';
  const posts = data.allContentfulPost.edges.map(edge => edge.node);
  const [activeTab, setActiveTab] = useState<string>('');
  const [visibleCount, setVisibleCount] = useState<number>(6);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  console.log("INDEX PAGE")
  console.log(posts)

  const filteredPosts = activeTab
    ? posts.filter(post =>
      post.tag.split(', ').map(tag => tag.trim()).includes(activeTab)
    )
    : posts;

  const toggleView = () => {
    if (isExpanded) {
      setVisibleCount(6);
    } else {
      setVisibleCount(filteredPosts.length);
    }
    setIsExpanded(!isExpanded);
  };

  return (
    <Layout title={siteTitle}>
      <section className="flex flex-col min-h-screen place-items-center p-8 space-y-8">
        <div>
          <StaticImage src="../images/logo.png" alt="logo" placeholder="blurred" className="max-w-screen-md " />
        </div>
        <BlogGrid
          posts={posts}
          visibleCount={visibleCount}
          isExpanded={isExpanded}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          toggleView={toggleView}
          filteredPosts={filteredPosts}
        />

        <div className="text-center mt-6">
          <Link to="/blog/1" className="text-blue-500 hover:text-blue-700">
            Go to Blog
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default BlogIndex;

export const Head: React.FC = () => <Seo
  title={"Home Page"}
  description={"Home with "}
  url="https://google.com" 
  keywords={["blog", "gatsby", "contentful"]}
/>;

export const pageQuery = graphql`
  {
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
    allContentfulPost(sort: {createdAt: DESC}, limit: 6) {
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
          tag
        }
      }
    }
  }
`;