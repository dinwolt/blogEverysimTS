import React, { useState } from 'react';
import { graphql, PageProps } from 'gatsby';
import Layout from '../components/Layout';
import BlogGrid from '@/components/BlogGrid';
import { getImage, IGatsbyImageData } from 'gatsby-plugin-image';
import BlogListItem from '@/components/BlogListItem';
import Slider from '@/components/Slider';
import {
  injectIntl,
  Link as ILink,
  FormattedMessage,
  WrappedComponentProps,
} from 'gatsby-plugin-intl';
import Tabs from '@/components/Tabs';
import { ArrowRight } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardImage,
  CardHeader,
  CardTitle,
  CardTag,
} from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import HomeListItem from '@/components/HomeListItem';
import { Separator } from '@radix-ui/react-separator';
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
  updatedAt: string;
};
interface BlogIndexQueryData {
  site: {
    siteMetadata?: {
      siteUrl: string;
      enUS: {
        title: string;
        description: string;
        author: string;
        siteUrl: string;
        lang: string;
        copyright: string;
      };
      koKR: {
        title: string;
        description: string;
        author: string;
        siteUrl: string;
        lang: string;
        copyright: string;
      };
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
        updatedAt: string;
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
      };
    }[];
  };
}
type BlogIndexProps = PageProps<BlogIndexQueryData> & WrappedComponentProps;

const BlogIndex: React.FC<BlogIndexProps> = ({ data, intl }) => {
  const siteMetadata = data.site.siteMetadata;
  const siteTitle =
    (intl.locale === 'ko-KR'
      ? data.site.siteMetadata?.koKR.title
      : data.site.siteMetadata?.enUS.title) || 'Title';
  const seoprops = {
    enUS: {
      title: data.site.siteMetadata?.enUS.title || 'title',
      description: data.site.siteMetadata?.enUS.description || 'desc',
      url: 'https://blog.everysim.io/en-US',
      author: data.site.siteMetadata?.enUS.author || 'Everysim',
      keywords: [
        'Everysim',
        'Tech Blog',
        'Technology',
        'Engineering',
        'Development',
        'Innovation',
        'Future of Engineering',
        'Tech Insights',
        'Software Development',
        'Engineering Trends',
        'Tech Innovations',
      ],
    },
    koKR: {
      title: data.site.siteMetadata?.koKR.title || 'title',
      description: data.site.siteMetadata?.koKR.description || 'desc',
      url: 'https://blog.everysim.io/ko-KR',
      author: data.site.siteMetadata?.koKR.author || 'everysim',
      keywords: [
        '에브리심',
        '기술 블로그',
        '기술',
        '엔지니어링',
        '개발',
        '혁신',
        '미래 엔지니어링',
        '기술 인사이트',
        '소프트웨어 개발',
        '엔지니어링 트렌드',
        '기술 혁신',
      ],
    },
  };

  const posts = data.allContentfulPost.edges.map((edge) => edge.node);
  const [activeTab, setActiveTab] = useState<string>('');
  const uniqueTags = Array.from(
    new Set(
      posts.flatMap((post) => post.tag.split(', ').map((tag) => tag.trim())),
    ),
  );

  const isPost = (item: Authors | Posts): item is Posts => {
    return (item as Posts).title !== undefined;
  };
  const filteredPosts = activeTab
    ? posts.filter((post) =>
        post.tag
          .split(', ')
          .map((tag) => tag.trim())
          .includes(activeTab),
      )
    : posts;

  return (
    <Layout title={siteTitle} seoprops={seoprops}>
      <section className="flex flex-col min-h-screen w-full items-center justify-start space-y-8 overflow-x-hidden ">
        {/*Banner + slider*/}

        <div className="container 3xl:mx-aut bg-gradient-to-b from-white via-[#d6f8ff] to-white rounded-2xl mx-5 dark:bg-gradient-to-b dark:from-brandPrimary dark:via-[#065774] dark:to-brandPrimary ">
          {/*phone*/}

          <div className="flex-col md:hidden  items-center justify-center">
            <Slider posts={posts} />
            <div className="flex flex-col flex-1 px-8 pb-10 justify-center items-center">
              <h1 className="section-title text-center text-brandSecondary dark:text-brandLight">
                <FormattedMessage id="index_banner_title" />
              </h1>
              <p className="section-subtitle text-center font-roboto text-brandSecondary dark:text-brandLight mt-5 mb-5">
                <FormattedMessage id="index_banner_subtitle" />
              </p>
              <ILink to="/blog/1" className="w-auto">
                <p className="bg-brandHighlight w-52 text-center hover:bg-brandLight hover:text-black transition-transform duration-200 p-2 text-2xl text-white text-center font-roboto rounded-3xl dark:bg-brandHighlight dark:text-brandLight dark:hover:bg-brandLight dark:hover:text-brandHighlight">
                  <FormattedMessage id="index_gotoblog" />
                </p>
              </ILink>
            </div>
          </div>
          {/**
          {/*tablet + etc
          <div className=" hidden md:flex items-center">

            <div className="flex-1 p-5 ">
              <h1 className="section-title text-left text-brandSecondary dark:text-brandLight">
                <FormattedMessage id="index_banner_title" />
              </h1>
              <p className="section-subtitle text-left text-brandSecondary mt-5 mb-5 dark:text-brandLight">
                <FormattedMessage id="index_banner_subtitle" />
              </p>
              <ILink to="/blog/1" className="bg-brandSecondary hover:bg-brandLight hover:text-black transition-transform duration-200 p-3 text-2xl text-white font-robotoCondensed rounded-3xl dark:bg-brandHighlight dark:text-brandLight dark:hover:bg-brandLight dark:hover:text-brandHighlight"><FormattedMessage id="index_gotoblog" /></ILink>
            </div>
            
            <div className="flex-1 flex">
              <Slider posts={posts} />
            </div>
          </div>
           */}
        </div>

        {/*phone+tablet Main container*/}

        <div className="container md:hidden mx-auto px-4  lg:px-8">
          <div className="pb-10">
            <Tabs
              tabs={uniqueTags}
              activeTab={activeTab}
              setActiveTab={(tab) => setActiveTab(tab === activeTab ? '' : tab)}
            />
            <BlogGrid posts={posts} filteredPosts={filteredPosts} />
          </div>
          <div className="text-center w-full  items-center flex mt-6 mb-6">
            <hr className="flex-1 border-t border-brandHighlight w-auto my-10" />
            <ILink
              to={`/blog/1`}
              className="flex-1 section-subtitle text-brandHighlight font-bold text-3xl hover:text-brandPrimary"
            >
              <FormattedMessage id="index_gotoblog" />
            </ILink>
            <hr className="flex-1 border-t border-brandHighlight w-auto my-10" />
          </div>
        </div>

        {/*desktop Main container*/}
        <div className="hidden md:block container  mx-auto px-4  lg:px-8">
          <div className="flex-1 ">
            <h1 className="section-title text-left text-brandHighlight dark:text-white">
              <FormattedMessage id="index_banner_title" />
            </h1>
            <p className="section-subtitle text-left text-gray-500 mt-5 mb-5 dark:text-gray-300">
              <FormattedMessage id="index_banner_subtitle" />
            </p>
          </div>
          <div className="flex">
            <div className="w-3/4 ">
              <div className="justify-between w-full dark:text-gray-300 font-bold text-xl text-gray-500 items-center flex mt-4 mb-6 ">
                <FormattedMessage id="index_recent_posts" />

                <ILink
                  to={`/blog/1`}
                  className=" section-subtitle text-gray-400 font-light text-lg flex items-center hover:text-brandPrimary"
                >
                  <FormattedMessage id="index_gotoblog" />
                  <ArrowRight className="text-gray-400 w-4 h-4" />
                </ILink>
              </div>
              <BlogGrid posts={posts} filteredPosts={filteredPosts} />
            </div>
            <Separator orientation="vertical" />
            <div className="w-[1px] bg-gray-200  h-screen m-4"></div>
            <div className="w-1/4  ">
              <div className="">
                <Tabs
                  tabs={uniqueTags}
                  activeTab={activeTab}
                  setActiveTab={(tab) =>
                    setActiveTab(tab === activeTab ? '' : tab)
                  }
                />
              </div>
              <HomeListItem posts={posts} />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default injectIntl(BlogIndex);

export const pageQuery = graphql`
  query ContentfulPosts($locale: String) {
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
    allContentfulPost(
      sort: { createdAt: DESC }
      limit: 6
      filter: { node_locale: { eq: $locale } }
    ) {
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
          updatedAt(formatString: "YYYY-MM-DD")
        }
      }
    }
    allContentfulAuthor(filter: { node_locale: { eq: $locale } }) {
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
