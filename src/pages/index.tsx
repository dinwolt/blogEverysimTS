import React, { useState } from "react";
import { graphql, PageProps } from "gatsby";
import Layout from "../components/Layout";
import Seo from "../components/Seo";
import { Link } from "gatsby";
import { GatsbyImage, StaticImage, getImage } from "gatsby-plugin-image";
import BlogGrid from "@/components/BlogGrid";
import { IGatsbyImageData } from "gatsby-plugin-image";
import Slider from "@/components/Slider";
import PostListItem from "@/components/PostListItem";
import Carousel from "@/components/Carousel";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
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
        title: string;
        subtitle: string;
        slug: string;
        image: IGatsbyImageData;
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
  allContentfulAuthor: {
    edges: {
      node: {
        name: string;
        image: IGatsbyImageData;
        role: string;
      }
    }[]
  }
}

const BlogIndex: React.FC<PageProps<BlogIndexQueryData>> = ({ data }) => {

  const siteTitle = data.site.siteMetadata?.title || 'Title';
  const posts = data.allContentfulPost.edges.map(edge => edge.node);
  const authors = data.allContentfulAuthor.edges.map(edge => edge.node);
  const [activeTab, setActiveTab] = useState<string>('');
  const [visibleCount, setVisibleCount] = useState<number>(6);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const postChoice = getImage(posts[0].image)
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
      <section className="flex flex-col min-h-screen w-full items-center justify-start space-y-8 overflow-x-hidden">
        {/*Banner + slider*/}
        <div className="w-full ">
          <div className="bg-banner-image-lg bg-cover bg-center bg-no-repeat">
            <Slider posts={posts} />
            <div className="px-8 pb-10">
              <h1 className="section-title text-center mt-5">
                Don't miss our latest innovations
              </h1>
              <p className="section-subtitle text-center mt-2">
                Check out the latest innovations in the simulation field to learn about new wondrous ways how technologies change our everyday life.
              </p>

            </div>

          </div>
        </div>

        {/*Main container*/}
        <div className="container mx-auto px-4  lg:px-8">

          {/*Grid Header*/}
          <div>
            <h1 className="section-title text-black text-center mt-5">Trend Posts</h1>
            <p className="section-subtitle mt-2 text-center text-gray-400">
              Check out what's new in simulation engineering and tech worlds! Don't forget to subscribe to our blog for the latest news.
            </p>
          </div>

          {/*Blog Posts Grid*/}
          <BlogGrid
            posts={posts}
            visibleCount={visibleCount}
            isExpanded={isExpanded}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            toggleView={toggleView}
            filteredPosts={filteredPosts}
          />
          {/*Go to Blog*/}
          <div className="text-center w-full  items-center flex mt-6 mb-6">
            <hr className="flex-1 border-t border-brandHighlight w-auto my-10" />
            <Link to="/blog/1" className="flex-1 section-subtitle text-brandHighlight font-bold text-3xl hover:text-brandPrimary">
              Go to Blog
            </Link>
            <hr className="flex-1 border-t border-brandHighlight w-auto my-10" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-8">
            {/*Latest posts*/}
            <div className="flex flex-col gap-4">
              <h1 className="section-title  text-black sm:text-left text-center">Latest Posts</h1>
              <PostListItem posts={posts} />
            </div>

            {/*Authors + Choice*/}
            <div className="flex flex-col gap-8 sm:p-5">
              {/*Authors*/}
              <Link to="/authors" className="hover:scale-105 transition duration-150 ease-in-out" >
                <h1 className="section-title text-black text-center">Meet our Authors</h1>
                <div className="grid grid-cols-2 m-5" >
                  {
                    authors.map((author, index) => {
                      const image = getImage(author.image)
                      return (
                        <div className="flex flex-col p-3 items-center w-auto mx-auto">
                          {image && <GatsbyImage image={image} alt={author.name} className="w-24 h-24 rounded-full" />}
                          <h1 className="section-post-subtitle text-gray-800 text-xs sm:text-base font-bold text-center mt-2">{author.name}</h1>
                          <h2 className="section-post-subtitle text-center text-xs sm:text-base">{author.role}</h2>
                        </div>
                      )
                    })
                  }
                </div>
              </Link>
              {/*Author's choice */}
              <div className="flex flex-col gap-4">
                <h1 className="section-post-subtitle font-bold text-center">Check our our author's </h1>
                <div className="flex flex-col gap-4 p-5 border shadow-md rounded-lg hover:scale-105 transition-transform duration-300">
                  <h1 className="section-title text-black text-center mt-5">Weekly Choice</h1>
                  {postChoice && <GatsbyImage image={postChoice} alt={posts[0].title} className="object-cover rounded-md mx-auto" />}
                  <div>
                    <h1 className="section-post-subtitle font-semibold text-sm sm:text-base text-brandHighlight">{posts[0].tag}</h1>
                    <h1 className="section-title text-black sm:text-2xl text-xl">{posts[0].title}</h1>
                    <h2 className="section-post-subtitle font-semibold mb-4 text-gray-600" >{posts[0].subtitle}</h2>
                    <div className="flex justify-between gap-8 items-center mt-4">
                      <p className="hidden sm:block">In aerospace engineering, simulation is a vital tool for testing the complex dynamics of aircraft systems. Engineers use virtual prototypes to simulate the performance of various systems under different flight conditions. This allows them to make necessary adjustments before physical testing, ensuring safety, efficiency, and reliability in air travel.</p>
                      <Link
                        to={`/blog/${posts[0].slug}`}
                        className="flex items-center text-brandHighlight font-semibold hover:underline transition duration-150 ease-in-out"
                      >
                        <span className="mr-2">Read More</span>
                        <ArrowRightIcon
                          className="h-5 w-5 text-brandHighlight"
                          aria-hidden="true"
                        />
                      </Link>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>

          {/*Other articles*/}
          <div className="my-8">
          <h1 className="section-title text-black mt-5">Other articles</h1>
          <p className="section-subtitle text-gray-500 sm:mt-2">
            There are still many interesting topics we would like to dive in. Learn more from our brand new posts
          </p>
          <Carousel posts={posts} />
          
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
        allContentfulAuthor {
     edges {
      node {
        name
        image {
          gatsbyImageData(
            layout: CONSTRAINED
            width: 150
            placeholder: DOMINANT_COLOR
            quality: 90
          )
        }
        role
      }
    }
  }
  }
`;