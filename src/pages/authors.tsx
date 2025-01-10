import React from "react";
import { graphql, PageProps } from "gatsby";
import Layout from "../components/Layout";
import Seo from "../components/Seo";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { IGatsbyImageData } from "gatsby-plugin-image";

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

const AuthorsIndex: React.FC<PageProps<AuthorsIndexQueryData>> = ({ data }) => {
    const authors = data.allContentfulAuthor.edges.map((edge) => edge.node);

    return (
        <Layout title="Authors">
            <Seo title="Authors" url="https://google.com" description="Meet the talented authors of our platform." />

            <section className="bg-gradient-to-r from-brandPrimary to-brandHighlight text-white py-16 text-center">
                <h1 className="text-4xl font-bold">Meet Our Authors</h1>
                <p className="mt-4 text-lg">Discover the brilliant minds behind our content.</p>
            </section>


            <section className="py-12 px-4 md:px-16 lg:px-24">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                    {authors.map((author, index) => {
                        const image = getImage(author.image);
                        return (
                            <div
                                key={index}
                                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl hover:scale-105 transition-transform duration-300"
                            >
                                {image && (
                                    <GatsbyImage
                                        image={image}
                                        alt={author.name}
                                        className="h-96 w-full object-contain"
                                    />
                                )}
                                <div className="p-6">
                                    <h2 className="text-xl font-anton text-gray-800">{author.name}</h2>
                                    <h3 className="text-sm font-semibold text-brandHighlight  mt-1">{author.role}</h3>
                                    <p className="mt-4 text-gray-700 text-sm">{author.description}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>


            <section className="bg-gray-100 py-16 text-center">
                <h2 className="text-3xl  font-anton text-gray-800">Want to Collaborate with Us?</h2>
                <p className="mt-4 text-gray-600">
                    Join our team of creative minds and make an impact with your work.
                </p>
                <a
                    href="#"
                    className="mt-6 inline-block bg-brandHighlight text-white px-6 py-3 rounded-lg shadow hover:bg-brandSecondary transition-colors duration-300"
                >
                    Contact Us
                </a>
            </section>
        </Layout>
    );
};

export default AuthorsIndex;

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
        allContentfulAuthor {
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
