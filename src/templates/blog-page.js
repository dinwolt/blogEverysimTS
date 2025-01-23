import React, { useState, useMemo } from "react";
import { graphql } from "gatsby";
import { Link } from "gatsby-plugin-intl";
import BlogGrid from "../components/BlogGrid";
import Layout from "../components/Layout";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/solid";
import { GatsbyImage, getImage, StaticImage } from "gatsby-plugin-image";
import { FormattedMessage } from "gatsby-plugin-intl";
import BlogMenu from "../components/BlogMenu";
import BlogListItem from "../components/BlogListItem";
import SliderView from "@/components/SliderView";
import Seo from "../components/Seo";

const BlogIndex = ({ data, pageContext }) => {
  const siteTitle = data.site.siteMetadata?.title || "Title";
  const posts = data.allContentfulPost.edges.map(edge => edge.node);
  const authors = data.allContentfulAuthor.edges.map(edge => edge.node);
  const randomAuthor = useMemo(
    () => authors[Math.floor(Math.random() * authors.length)],
    [siteTitle]
  );

  const randomPosts = useMemo(() => {
    const shuffledPosts = [...posts].sort(() => Math.random() - 0.5);
    return shuffledPosts.slice(0, 3);
  }, [siteTitle]);
  const image = getImage(randomAuthor.image);
  const { currentPage, totalPages } = pageContext;
  const [activeTab, setActiveTab] = useState("");
  const [activeSort, setActiveSort] = useState("");
  const uniqueTags = Array.from(
    new Set(posts.flatMap(post => post.tag.split(", ").map(tag => tag.trim())))
  );

  const sorts = [
    "blog_menu_sortASC",
    "blog_menu_sortDESC",
    "blog_menu_dateDESC",
    "blog_menu_dateASC",
  ];
  const filteredPosts = activeTab
    ? posts.filter(post =>
      post.tag.split(", ").map(tag => tag.trim()).includes(activeTab)
    )
    : posts;

  const filteredAndSortedPosts = filteredPosts.sort((a, b) => {
    switch (activeSort) {
      case "blog_menu_sortASC":
        return a.title.localeCompare(b.title);
      case "blog_menu_sortDESC":
        return b.title.localeCompare(a.title);
      case "blog_menu_dateDESC":
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case "blog_menu_dateASC":
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      default:
        return 0; 
    }
  });
  const seoprops = {
    enUS:{
      title: data.site.siteMetadata?.enUS.title || "title",
  description: data.site.siteMetadata?.enUS.description || "desc",
  url: data.site.siteMetadata?.enUS.siteUrl || "https://blog.everysim.io",
  author: data.site.siteMetadata?.enUS.author || "Everysim",
  keywords: ["homepage", "tech blog", "everysim", "korea", "simulation engineering", "blog"]
    },
    koKR:{
      title: data.site.siteMetadata?.koKR.title || "title",
  description: data.site.siteMetadata?.koKR.description || "desc",
  url: data.site.siteMetadata?.koKR.siteUrl || "https://blog.everysim.io",
  author: data.site.siteMetadata?.koKR.author || "everysim",
  keywords: ["홈페이지", "테크 블로그", "에브리심", "코리아", "시뮬레이션 엔지니어링", "블로그"],
    }
  };

  return (
    <Layout title={siteTitle} style="bg-white mx-5">
      <Seo seoprops={seoprops}/>
      <section>
        <section className="h-[calc(100vh-4rem)] mx-auto container flex justify-center items-center">
          <StaticImage
            src="../../static/images/everysim-hero-lg.svg"
            className="object-contain"
            alt="logo"
          />
        </section>
        {/*<div className="bg-banner-image-lg bg-cover bg-no-repeat w-full">
          <div className="container mx-auto">
            <div className="flex gap-8 p-8">
              <div className="flex-1 flex flex-col sm:p-8 justify-center">
                <div className="mb-5">
                  <h1 className="section-title mb-3">
                    <FormattedMessage id="blog_banner_title" />
                  </h1>
                  <h2 className="section-subtitle">
                    <FormattedMessage id="blog_banner_subtitle" />
                  </h2>
                </div>
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <GatsbyImage image={image} alt={randomAuthor.name} objectFit="contain" />
                  <div className="flex flex-col gap-4 justify-items-end justify-end">
                    <blockquote className="border-l-4 pl-4 italic section-post-subtitle text-white">
                      {randomAuthor.description}
                    </blockquote>
                    <div>
                      <p className="section-post-title text-white font-semibold">
                        {randomAuthor.name}
                      </p>
                      <p className="section-post-subtitle text-white">{randomAuthor.role}</p>
                      <Link
                        to="../../authors"
                        className="section-post-subtitle text-white hover:underline transition-transform duration-200"
                      >
                        <FormattedMessage id="blog_banner_authorslink" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex-1 mt-10 hidden sm:block p-8">
                <Link
                  to={`/blog/${randomPost.slug}`}
                  className="rounded-lg shadow-lg sm:p-8 hover:scale-105 transition-transform duration-3000"
                >
                  <p className="section-title text-right mb-5 text-center">
                    <FormattedMessage id="blog_banner_recommendation" />
                  </p>
                  <GatsbyImage image={imagePost} alt={randomPost.postAuthor.name} className="p-10" />
                  <p className="section-post-subtitle text-white font-semibold">{randomPost.tag}</p>
                  <p className="section-title">{randomPost.title}</p>
                  <p className="section-post-subtitle text-white">{randomPost.subtitle}</p>
                </Link>
              </div>
            </div>
          </div>
        </div>*/}


        <div className="container mx-auto p-6 min-h-screen  ">
          {/**<div className="flex flex-col md:flex-row lg:flex-row gap-6 justify-center items-center w-full p-6">
            <div className="">
              <GatsbyImage image={imagePost} alt={randomPost.postAuthor.name} className="p-10 rounded-md" />
            </div>
            <div className="p-2 flex flex-col items-between">
              <div></div>
              <p className="section-post-subtitle  text-brandHighlight font-semibold">{randomPost.tag}</p>
              <p className="section-title font-robotoCondensed text-3xl text-black">{randomPost.title}</p>
              <p className="font-roboto text-gray-800 text-xl">{randomPost.subtitle}</p>
            </div>
          </div> */}

          <SliderView data={randomPosts}>
            {(item) => {
              const image = getImage(item.image)
              return (
                <div className="flex flex-col sm:flex-row border shadow-md rounded-lg p-5  items-center mb-5">
                  {image && (
                    <div className="md:w-1/4 ">
                      <GatsbyImage
                        image={image}
                        alt={item.title}
                        className="object-cover rounded-md w-full h-full"
                      />
                    </div>
                  )}
                  <div className="md:w-2/3 pl-4 flex  flex-col justify-between">
                    <div>
                      <h1 className="section-post-subtitle font-semibold text-sm md:text-base text-brandHighlight">
                        {item.tag}
                      </h1>
                      <h1 className="section-title text-black md:text-2xl text-xl">
                        {item.title}
                      </h1>
                    </div>
                    <h2 className="section-post-subtitle font-semibold mb-4 text-gray-600">
                      {item.subtitle}
                    </h2>
                    <div className="flex justify-between gap-8 items-center mt-4">
                      <Link
                        to={`/blog/${item.slug}`}
                        className="flex items-center text-brandHighlight font-semibold hover:underline transition duration-150 ease-in-out"
                      >
                        <span className="mr-2">
                          <FormattedMessage id="index_readmore" />
                        </span>
                        <ArrowRightIcon
                          className="h-5 w-5 text-brandHighlight"
                          aria-hidden="true"
                        />
                      </Link>
                    </div>

                  </div>


                </div>
              )
            }}
          </SliderView>



          <div className="flex-col gap-10 items-center justify-center w-full">
            <div className="flex-shrink-0">
              <BlogMenu
                tags={uniqueTags}
                activeTag={activeTab}
                setActiveTag={setActiveTab}
                sorts={sorts}
                activeSort={activeSort}
                setSort={setActiveSort}
              />
            </div>
            <div className="flex flex-col flex-grow w-full">
              {/*}
              <h1 className="section-title text-center text-black mb-2">
                <FormattedMessage id="blog_section_title" />
              </h1>
              <h3 className="section-subtitle text-center text-black mb-5">
                <FormattedMessage id="blog_section_subtitle" />
              </h3>*/}

              {/*<BlogGrid
                posts={posts}
                visibleCount={posts.length}
                isExpanded={true}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                toggleView={() => { }}
                filteredPosts={filteredAndSortedPosts}
              />*/}
              <BlogListItem posts={filteredAndSortedPosts} />

              <div className="max-w-screen flex justify-center mx-auto items-center mt-8 gap-x-2 overflow-x-auto">
                {currentPage > 1 && (
                  <Link
                    to={`/blog/${currentPage - 1}`}
                    className="inline-flex items-center  hover:bg-brandLight hover:outline-none text-black px-4 py-2 rounded text-center transition-colors duration-200"
                  >
                    <ArrowLeftIcon className="icon mr-3" />
                  </Link>
                )}


                {totalPages > 5 && currentPage > 3 && (
                  <span className="inline-flex items-center px-4 py-2 rounded text-center text-brandPrimary">...</span>
                )}

                {Array.from({ length: totalPages }).map((_, index) => {
                  const pageNumber = index + 1;
                  const showPageButton = Math.abs(currentPage - pageNumber) <= 2 || pageNumber === 1 || pageNumber === totalPages;

                  if (!showPageButton) return null;

                  return (
                    <Link
                      key={pageNumber}
                      to={`/blog/${pageNumber}`}
                      className={`inline-flex items-center px-4 py-2 rounded text-center hover:bg-brandSecondary hover:text-white transition-colors duration-200 ${currentPage === pageNumber ? "bg-brandLight" : "bg-transparent"}`}
                    >
                      {pageNumber}
                    </Link>
                  );
                })}

                {totalPages > 5 && currentPage < totalPages - 2 && (
                  <span className="inline-flex items-center px-4 py-2 rounded text-center text-brandPrimary">...</span>
                )}


                {currentPage < totalPages && (
                  <Link
                    to={`/blog/${currentPage + 1}`}
                    className="inline-flex items-center  hover:bg-brandLight hover:outline-none text-black px-4 py-2 rounded text-center transition-colors duration-200"
                  >
                    <ArrowRightIcon className="icon mr-3" />
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export const query = graphql`
  query($skip: Int!, $limit: Int!, $locale: String!) {
    site {
      siteMetadata {
      siteUrl
        enUS {
          title
          description
          author
          siteUrl
          lang
          copyright
        }
        koKR {
          title
          description
          author
          siteUrl
          lang
          copyright
        }
      }
    }
    allContentfulPost(skip: $skip, limit: $limit, filter: { node_locale: { eq: $locale } }) {
      edges {
        node {
          title
          subtitle
          postAuthor {
            name
            image {
            gatsbyImageData(layout: CONSTRAINED, width: 300, placeholder: DOMINANT_COLOR, quality: 90)
          }
          }
          slug
          image {
            gatsbyImageData(layout: CONSTRAINED, width: 800, placeholder: BLURRED, quality: 90)
          }
          content {
            raw
          }
          tag
          createdAt
        }
      }
    }
    allContentfulAuthor {
      edges {
        node {
          name
          image {
            gatsbyImageData(layout: CONSTRAINED, width: 300, placeholder: DOMINANT_COLOR, quality: 90)
          }
          role
          description
        }
      }
    }
  }
`;

export default BlogIndex;
