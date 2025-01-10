import React, { useState } from "react";
import { graphql, PageProps } from "gatsby";
import Layout from "../components/Layout";
import Seo from "../components/Seo";
import { Link } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import BlogGrid from "@/components/BlogGrid";
import { IGatsbyImageData } from "gatsby-plugin-image";
import Slider from "@/components/Slider";
import PostListItem from "@/components/PostListItem";
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
        slug: string;
        image: IGatsbyImageData; // Assuming this type is already imported
        tag: string;
        postAuthor?: {
          name: string;
          image?: IGatsbyImageData;
          description?: string;
          role?: string;
        };
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
      <section className="flex flex-col min-h-screen w-full items-center justify-start lg:p-0 space-y-8">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="bg-banner-image-lg bg-cover bg-no-repeat"><Slider posts={posts}  />
        <h1 className="font-anton text-center text-white mt-5">Dont miss our latest innovations </h1>
        <p className="font-roboto text-center text-white pb-10  ">Check out latest innovations in simulation field to learn about new wondroud ways how technologies change our every-day life</p>
        </div>
        <h1 className="font-anton text-center text-black mt-5">Trend Posts</h1>
        <p className="font-roboto text-center text-gray-400   ">Check out what's new in the simulation engineering and tech worls! Do not forget to subscribe to our blog and we will notify you with the latest news.</p>

        <BlogGrid
          posts={posts}
          visibleCount={visibleCount}
          isExpanded={isExpanded}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          toggleView={toggleView}
          filteredPosts={filteredPosts}
        />

        <div className="text-center mt-6 mb-3">
          <Link to="/blog/1" className="text-brandHighlight font-bold hover:text-brandLight ">
            Go to Blog 
          </Link>
        </div>
        <hr className="border-t border-brandHighlight w-full y-10" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <PostListItem posts={posts} />
          <div className="w-[500px] h-[500px] bg-authors bg-cover"></div>
        </div>
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
      }
    }
  }
`;