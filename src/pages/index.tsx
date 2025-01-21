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
    <Layout title={siteTitle} style="">
      <section className="flex flex-col min-h-screen w-full items-center justify-start space-y-8 overflow-x-hidden">
        {/*Banner + slider*/}

        <div className="container 3xl:mx-aut bg-gradient-to-b from-[#065774] via-[#d6f8ff] to-white rounded-2xl mx-5 ">
          {/*phone*/}
          <div className="flex-col md:hidden items-center justify-center">

            <Slider posts={posts} />
            <div className="flex-1 px-8 pb-10 ">
              <h1 className="section-title text-center text-brandSecondary">
                <FormattedMessage id="index_banner_title" />
              </h1>
              <p className="section-subtitle text-center text-brandSecondary mt-5 mb-5">
                <FormattedMessage id="index_banner_subtitle" />
              </p>
              <ILink to="/blog/1" className="w-auto">
                <p className="bg-brandSecondary w-auto hover:bg-brandLight hover:text-black transition-transform duration-200 p-2 text-2xl text-white text-center font-robotoCondensed rounded-3xl">
                  <FormattedMessage id="index_gotoblog" />
                </p>
              </ILink>
            </div>

          </div>
          {/*tablet + etc*/}
          <div className=" hidden md:flex items-center">

            <div className="flex-1 p-5 ">
              <h1 className="section-title text-left text-brandSecondary ">
                <FormattedMessage id="index_banner_title" />
              </h1>
              <p className="section-subtitle text-left text-brandSecondary mt-5 mb-5">
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
        <div className="pb-10">
            <Tabs tabs={uniqueTags} activeTab={activeTab} setActiveTab={(tab) => setActiveTab(tab === activeTab ? "" : tab)} />
            <BlogGrid
              posts={posts}
              visibleCount={visibleCount}
              isExpanded={isExpanded}
              filteredPosts={filteredPosts}
            />
          </div>
          <div className="text-center w-full  items-center flex mt-6 mb-6">
            <hr className="flex-1 border-t border-brandHighlight w-auto my-10" />
            <ILink to={`/blog/1`} className="flex-1 section-subtitle text-brandHighlight font-bold text-3xl hover:text-brandPrimary">
              <FormattedMessage id="index_gotoblog" />
            </ILink>
            <hr className="flex-1 border-t border-brandHighlight w-auto my-10" />
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