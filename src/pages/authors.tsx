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
            title: string;
            description: string;
            author: string;
            siteUrl: string;
            lang: string;
            copyright: string;
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
    const { locale } = intl;  // Get the current locale from the injected intl object

    const authors = data.allContentfulAuthor.edges.map((edge) => edge.node);

    return (
        <Layout title="Authors" style="">
            <Seo title="Authors" url="https://google.com" description="Meet the talented authors of our platform." />

            <section className="bg-gradient-to-r from-brandPrimary to-brandHighlight text-white py-16 text-center">
                <h1 className="text-4xl font-bold">
                    <FormattedMessage id="about_authors_title" />
                </h1>
                <p className="mt-4 text-lg">
                    <FormattedMessage id="about_authors_subtitle" />
                </p>
            </section>

            <section className="py-12 px-4 md:px-16 lg:px-24">
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
        </Layout>
    );
};

// Wrap the component with injectIntl to inject the intl prop
export default injectIntl(AuthorsIndex);

export const pageQuery = graphql`
    query($locale: String!) {
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
