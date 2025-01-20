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
import { injectIntl, Link as ILink, FormattedMessage, WrappedComponentProps } from "gatsby-plugin-intl"
import Tabs from "@/components/Tabs";
import SliderView from "@/components/SliderView";
type Authors = {
  name: string;
  image: IGatsbyImageData;
  role: string;
  description: string;
};

type Posts = {
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
        description: string;
        role: string;
      }
    }[]
  }
}
type BlogIndexProps = PageProps<BlogIndexQueryData> & WrappedComponentProps;

const BlogIndex: React.FC<BlogIndexProps> = ({ data, intl }) => {

  const siteTitle = data.site.siteMetadata?.title || 'Title';
  const posts = data.allContentfulPost.edges.map(edge => edge.node);
  const authors = data.allContentfulAuthor.edges.map(edge => edge.node);
  const [activeTab, setActiveTab] = useState<string>('');
  const [visibleCount, setVisibleCount] = useState<number>(6);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const postChoice = getImage(posts[0].image)
  const locale = intl.locale
  const uniqueTags = Array.from(
    new Set(posts.flatMap(post => post.tag.split(", ").map(tag => tag.trim())))
  );

  const isPost = (item: Authors | Posts): item is Posts => {
    return (item as Posts).title !== undefined;
  };
  const filteredPosts = activeTab
    ? posts.filter(post =>
      post.tag.split(', ').map(tag => tag.trim()).includes(activeTab)
    )
    : posts;

  {//for expanding view

    /*const toggleView = () => {
    if (isExpanded) {
      setVisibleCount(6);
    } else {
      setVisibleCount(filteredPosts.length);
    }
    setIsExpanded(!isExpanded);
  };*/}

  return (
    <Layout title={siteTitle} style="bg-gradient-to-b from-[#065774] via-[#d6f8ff] to-white rounded-2xl mx-5">
      <section className="flex flex-col min-h-screen w-full items-center justify-start space-y-8 overflow-x-hidden">
        {/*Banner + slider*/}

        <div className="w-full 3xl:container 3xl:mx-auto ">
          {/*phone*/}
          <div className="flex-col md:hidden items-center justify-center">

            <Slider posts={posts} />
            <div className="flex-1 px-8 pb-10 ">
              <h1 className="section-title text-center">
                <FormattedMessage id="index_banner_title" />
              </h1>
              <p className="section-subtitle text-center mt-5 mb-5">
                <FormattedMessage id="index_banner_subtitle" />
              </p>
              <ILink to="/blog/1" className="w-auto">
                <p className="bg-brandSecondary w-auto hover:bg-brandLight hover:text-black transition-transform duration-200 p-3 text-2xl text-white text-center font-robotoCondensed rounded-3xl">
                  <FormattedMessage id="index_gotoblog" />
                </p>
              </ILink>
            </div>

          </div>
          {/*tablet + etc*/}
          <div className=" hidden md:flex items-center">

            <div className="flex-1 p-5 ">
              <h1 className="section-title text-left ">
                <FormattedMessage id="index_banner_title" />
              </h1>
              <p className="section-subtitle text-left  mt-5 mb-5">
                <FormattedMessage id="index_banner_subtitle" />
              </p>
              <ILink to="/blog/1" className="bg-brandSecondary hover:bg-brandLight hover:text-black transition-transform duration-200 p-3 text-2xl text-white font-robotoCondensed rounded-3xl"><FormattedMessage id="index_gotoblog" /></ILink>
            </div>
            {/* Slider */}
            <div className="flex-1 flex">
              <Slider posts={posts} />
            </div>
          </div>
        </div>

        {/*Main container*/}
        <div className="container mx-auto px-4  lg:px-8">

          {/*Grid Header*/}
          <div className="mb-10">
            <h1 className="section-title  text-center md:text-right mt-5">
              <FormattedMessage id="index_trends_title" />
            </h1>
            <p className="section-subtitle mt-2 text-center md:text-right ">
              <FormattedMessage id="index_trends_subtitle" />
            </p>
          </div>

          {/*Blog Posts Grid*/}
          <div className="pb-10">
            <Tabs tabs={uniqueTags} activeTab={activeTab} setActiveTab={(tab) => setActiveTab(tab === activeTab ? "" : tab)} />
            <BlogGrid
              posts={posts}
              visibleCount={visibleCount}
              isExpanded={isExpanded}
              filteredPosts={filteredPosts}
            />
          </div>
          {/*Go to Blog
          <div className="text-center w-full  items-center flex mt-6 mb-6">
            <hr className="flex-1 border-t border-brandHighlight w-auto my-10" />
            <ILink to={`/blog/1`} className="flex-1 section-subtitle text-brandHighlight font-bold text-3xl hover:text-brandPrimary">
              <FormattedMessage id="index_gotoblog" />
            </ILink>
            <hr className="flex-1 border-t border-brandHighlight w-auto my-10" />
          </div>*/}
          <h1 className="section-title  text-brandSecondary  text-left mt-10">
            <FormattedMessage id="index_latest_title" />
          </h1>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-8">

            {/*Latest posts*/}


            <div className="flex flex-col gap-4 mt-5">

              <PostListItem posts={posts} />
            </div>

            {/*Authors + Choice*/}
            <div className="flex flex-col gap-8 sm:p-5 items-center justify-center">
              <SliderView data={authors}>
                {(item) => {
                  const image = getImage(item.image)
                  return (
                    <div className="flex flex-col items-center justify-center">
                      {isPost(item) ? (
                        <>

                          <h2 className="text-xl font-robotoCondensed font-semibold">{item.title}</h2>
                          <p>{item.subtitle}</p>
                        </>
                      ) : (
                        <>
                          {image && <GatsbyImage image={image} alt={item.name} className="w-32 h-32 rounded-full " />}
                          <h2 className="text-center text-xl  font-robotoCondensed text-black font-semibold">{item.name}</h2>
                          <p className=" text-center text-xl  font-robotoCondensed text-gray-600  font-extralight">{item.role}</p>
                          <p className=" text-center text-xl  font-roboto text-black mt-5 ">{item.description}</p>
                        </>
                      )}
                    </div>
                  )
                }}
              </SliderView>
              {/*Authors
              <ILink to="/authors" className="hover:scale-105 transition-transform duration-150 ease-in-out" >

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
              </ILink>*/}
              {/*Author's choice */}

            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h1 className="section-title text-black text-right text-brandSecondary mt-10">
              <FormattedMessage id="index_weekly" />
            </h1>
            <h1 className="section-subtitle text-black text-right text-gray-500">
              <FormattedMessage id="index_weekly_subtitle" />
            </h1>
            <div className="flex flex-col gap-4 p-5 border shadow-md rounded-lg hover:scale-105 transition-transform duration-300">
              <div className="flex-col md:flex items-center">
                
                <div className="md:w-2/3 pl-4 flex flex-1 flex-col justify-between">
                <div><h1 className="section-post-subtitle font-semibold text-sm md:text-base text-brandHighlight">
                    {posts[0].tag}
                  </h1>
                  <h1 className="section-title text-black md:text-2xl text-xl">
                    {posts[0].title}
                  </h1></div>
                  
                  <h2 className="section-post-subtitle font-semibold mb-4 text-gray-600">
                    {posts[0].subtitle}
                  </h2>
                  <div className="flex justify-between gap-8 items-center mt-4">
                    <ILink
                      to={`/blog/${posts[0].slug}`}
                      className="flex items-center text-brandHighlight font-semibold hover:underline transition duration-150 ease-in-out"
                    >
                      <span className="mr-2">
                        <FormattedMessage id="index_readmore" />
                      </span>
                      <ArrowRightIcon
                        className="h-5 w-5 text-brandHighlight"
                        aria-hidden="true"
                      />
                    </ILink>
                  </div>
                </div>
                {postChoice && (
                  <div className="md:w-1/3 flex-1 ">
                    <GatsbyImage
                      image={postChoice}
                      alt={posts[0].title}
                      className="object-cover rounded-md w-full h-full"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>


          {/*Other articles*/}
          <div className="my-8">
            <h1 className="section-title text-brandSecondary mt-5">
              <FormattedMessage id="index_other_title" />
            </h1>
            <p className="section-subtitle text-gray-500 sm:mt-2">
              <FormattedMessage id="index_other_subtitle" />
            </p>
            <Carousel posts={posts} />

          </div>
        </div>

      </section>
    </Layout>

  );
};

export default injectIntl(BlogIndex);

export const Head: React.FC = () => <Seo
  title={"Home Page"}
  description={"Home with "}
  url="https://google.com"
  keywords={["blog", "gatsby", "contentful"]}
/>;

export const pageQuery = graphql`
  query ContentfulPosts($locale:String){
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
    allContentfulPost(sort: {createdAt: DESC}, limit: 6, filter:{node_locale:{eq:$locale}}) {
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
        allContentfulAuthor( filter:{node_locale:{eq:$locale}}) {
     edges {
      node {
        name
        description
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