import React, { useState, useMemo } from "react";
import { graphql } from "gatsby";
import { Link } from "gatsby-plugin-intl";
import Layout from "../components/Layout";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/solid";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { FormattedMessage } from "gatsby-plugin-intl";
import BlogMenu from "../components/BlogMenu";
import BlogListItem from "../components/BlogListItem";
import SliderView from "@/components/SliderView";
import Seo from "../components/Seo";

const BlogIndex = ({ data, pageContext }) => {
  const siteTitle = data.site.siteMetadata?.title || "Title";
  const posts = data.allContentfulPost.edges.map(edge => edge.node);


  const randomPosts = useMemo(() => {
    const shuffledPosts = [...posts].sort(() => Math.random() - 0.5);
    return shuffledPosts.slice(0, 3);
  }, [siteTitle]);
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
    enUS: {
      title: "Everysim Tech Blog – Insights, Innovations, and the Future of Engineering",
      description: "Explore cutting-edge insights, the latest innovations, and expert opinions on technology, software development, and the future of engineering. Stay updated with the Everysim Tech Blog, where industry leaders share their expertise and vision for tomorrow's tech landscape.",
      url: data.site.siteMetadata?.enUS.siteUrl || "https://blog.everysim.io",
      author: data.site.siteMetadata?.enUS.author || "Everysim",
      keywords: [
        "Everysim Tech Blog",
        "technology insights",
        "software development",
        "engineering innovations",
        "future of technology",
        "tech blog",
        "development news",
        "tech industry trends",
        "engineering expertise",
        "Everysim updates",
        "technology leaders",
        "software development blog",
        "cutting-edge technology"
      ]
    },
    koKR: {
      title: "Everysim 기술 블로그 – 통찰력, 혁신, 엔지니어링의 미래",
      description: "최신 혁신, 기술, 소프트웨어 개발 및 엔지니어링의 미래에 대한 전문가의 의견과 통찰력을 제공합니다. Everysim 기술 블로그에서 산업 리더들이 내일의 기술 환경에 대한 비전과 전문 지식을 공유합니다.",
      url: data.site.siteMetadata?.koKR.siteUrl || "https://blog.everysim.io",
      author: data.site.siteMetadata?.koKR.author || "everysim",
      keywords: [
        "Everysim 기술 블로그",
        "기술 통찰력",
        "소프트웨어 개발",
        "엔지니어링 혁신",
        "기술의 미래",
        "기술 블로그",
        "개발 뉴스",
        "기술 산업 트렌드",
        "엔지니어링 전문 지식",
        "Everysim 업데이트",
        "기술 리더",
        "소프트웨어 개발 블로그",
        "최첨단 기술"
      ],
    }
  };

  return (
    <Layout title={siteTitle} style="bg-white mx-5">
      <Seo seoprops={seoprops} />
      <section>



        <div className="container mx-auto p-6 min-h-screen  ">

          <div className="flex max-w-lg">
            <SliderView data={randomPosts} wrapContent={true}>
              {(item) => {
                const image = getImage(item.image);
                return (
                  <div className="flex flex-col sm:flex-row border shadow-md rounded-lg p-5 items-center mb-5">
                    {image && (
                      <div className="flex-1">
                        <GatsbyImage
                          image={image}
                          alt={item.title}
                          className="object-cover rounded-md"
                        />
                      </div>
                    )}
                    <div className="flex-1 pl-4 flex flex-col  justify-between">
                      <div>
                        <h1 className="section-post-subtitle font-semibold text-sm md:text-base text-brandHighlight">
                          {item.tag}
                        </h1>
                        <h1 className="section-title text-black md:text-2xl text-xl">
                          {item.title}
                        </h1>
                      </div>
                      <h2 className="section-post-subtitle sm:text-base">
                        {item.subtitle}
                      </h2>
                      <div>

                        <Link to={`/blog/${item.slug}`} className="flex items-center   text-brandHighlight font-semibold hover:underline transition duration-150 ease-in-out  justify-between gap-8 items-center mt-4">

                        <span className="mr-2 ">
                          <FormattedMessage id="index_readmore" />
                        </span>
                        <div className="w-5 h-5">
                          <ArrowRightIcon
                            className="w-5 h-5 text-brandHighlight"
                            aria-hidden="true"
                          />
                        </div>

                      </Link>
                      </div>
                      

                    </div>
                  </div>
                );
              }}
            </SliderView>
          </div>




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
          updatedAt
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
