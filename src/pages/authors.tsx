import React from "react";
import { graphql, PageProps } from "gatsby";
import Layout from "../components/Layout";
import Seo from "../components/Seo";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { IGatsbyImageData } from "gatsby-plugin-image";
import { FormattedMessage, injectIntl, WrappedComponentProps } from "gatsby-plugin-intl";
import SliderView from "@/components/SliderView";

interface AuthorsIndexQueryData {
    site: {
        siteMetadata?: {
            siteUrl: string,
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
    allContentfulAuthor: {
        edges: {
            node: {
                name: string;
                image: IGatsbyImageData;
                role: string;
                description: string;
            };
        }[];
    };
}

const AuthorsIndex: React.FC<PageProps<AuthorsIndexQueryData> & WrappedComponentProps> = ({ data, intl }) => {

    const seoprops = {
        enUS: {
            title: "About Us",
            description: "Meet the minds behind the Everysim Tech Blog. Our team of passionate authors consists of engineers, developers, and innovators dedicated to sharing insights, experiences, and cutting-edge knowledge in technology and development. Get to know the experts driving meaningful conversations about the future of engineering, software development, and innovation.",
            url: data.site.siteMetadata?.enUS.siteUrl || "https://blog.everysim.io",
            author: data.site.siteMetadata?.enUS.author || "Everysim",
            keywords: ["Everysim Tech Blog authors", "tech blog team", "engineering experts", "software developers", "innovation leaders", "technology insights", "development expertise", "future of engineering", "innovative engineers", "tech thought leaders", "engineering and innovation", "software development team", "Everysim blog contributors"]
        },
        koKR: {
            title: data.site.siteMetadata?.koKR.title || "title",
            description: "Everysim Tech Blog의 저자들을 만나보세요. 우리의 팀은 기술과 개발에 대한 통찰, 경험, 그리고 최첨단 지식을 공유하는 데 열정적인 엔지니어, 개발자, 혁신가들로 이루어져 있습니다. 엔지니어링, 소프트웨어 개발, 그리고 혁신의 미래에 대해 의미 있는 대화를 이끄는 전문가들을 알아가세요.",
            url: data.site.siteMetadata?.koKR.siteUrl || "https://blog.everysim.io",
            author: data.site.siteMetadata?.koKR.author || "Everysim",
            keywords: ["Everysim Tech Blog 저자", "기술 블로그 팀", "엔지니어링 전문가", "소프트웨어 개발자", "혁신 리더", "기술 통찰력", "개발 전문 지식", "엔지니어링의 미래", "혁신적인 엔지니어", "기술 사상 리더", "엔지니어링과 혁신", "소프트웨어 개발 팀", "Everysim 블로그 기고자"],
        }
    };
    const authors = data.allContentfulAuthor.edges.map((edge) => edge.node);

    return (
        <Layout title="Authors" style="">
            <Seo seoprops={seoprops} />
            <section className="bg-gradient-to-r from-brandPrimary to-brandHighlight text-white py-16 text-center">
                <h1 className="text-4xl font-bold">
                    <FormattedMessage id="about_authors_title" />
                </h1>
                <p className="mt-4 text-lg">
                    <FormattedMessage id="about_authors_subtitle" />
                </p>
            </section>
            <div className="container mx-auto ">
                <section className="py-12 px-4 md:px-16 lg:px-24 ">
                    <SliderView data={authors}>
                        {(item, index) => {
                            const image = getImage(item.image);
                            return (
                                <div
                                    key={index}
                                    className="bg-white rounded-lg flex flex-col justify-center items-center shadow-lg overflow-hidden hover:shadow-xl hover:scale-105 transition-transform duration-300"
                                >
                                    {image && (
                                        <GatsbyImage
                                            image={image}
                                            alt={item.name}
                                            className="h-96 w-96 object-contain rounded-full"
                                        />
                                    )}
                                    <div className="p-6">
                                        <h2 className="text-xl font-anton text-gray-800 text-center">{item.name}</h2>
                                        <h3 className="text-sm font-semibold text-brandHighlight  mt-1 text-center">{item.role}</h3>
                                        <p className="mt-4 text-gray-700 text-sm text-center">{item.description}</p>
                                    </div>
                                </div>
                            );
                        }}
                    </SliderView>


                </section>

                <section className="bg-gray-100 py-16 text-center">
                    <h2 className="text-3xl  font-anton text-gray-800">
                        <FormattedMessage id="about_collab_title" />
                    </h2>
                    <p className="mt-4 text-gray-600">
                        <FormattedMessage id="about_collab_subtitle" />
                    </p>
                    <a
                        href="#"
                        className="mt-6 inline-block bg-brandHighlight text-white px-6 py-3 rounded-lg shadow hover:bg-brandSecondary transition-colors duration-300"
                    >
                        <FormattedMessage id="about_contactus" />
                    </a>
                </section>
            </div>

        </Layout>
    );
};

export default injectIntl(AuthorsIndex);

export const pageQuery = graphql`
    query($locale: String!) {
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
        allContentfulAuthor(filter: { node_locale: { eq: $locale } }) {
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
