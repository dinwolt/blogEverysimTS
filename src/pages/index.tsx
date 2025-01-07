import React, { useState } from "react";
import { graphql, PageProps } from "gatsby";
import Layout from "../components/Layout";
import Bio from "../components/Bio";
import Seo from "../components/Seo";
import { Link } from "gatsby";
import logo from '../images/logo.png';

import {
  Card,
  CardContent,
  CardDescription,
  CardImage,
  CardHeader,
  CardTitle,
  CardTag
} from "@/components/ui/card";
import Tabs from "@/components/Tabs";

interface BlogIndexQueryData {
  site: {
    siteMetadata?: {
      title?: string;
    };
  };
  allContentfulPost: {
    edges: {
      node: {
        title?: string;
        subtitle?: string;
        author?: string;
        slug: string;
        image: {
          url: string;
        };
        tag: string;
      };
    }[];
  };
}

const BlogIndex: React.FC<PageProps<BlogIndexQueryData>> = ({ data }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`;
  const posts = data.allContentfulPost.edges.map(edge => edge.node);

  const [activeTab, setActiveTab] = useState<string>("");

  const uniqueTags = Array.from(new Set(posts.map(post => post.tag)));

  const filteredPosts = activeTab
    ? posts.filter(post => post.tag === activeTab)
    : posts;

  return (
    <Layout title={siteTitle}>
      <section className="flex flex-col min-h-screen place-items-center p-8 space-y-8">
        
        <div>
          <img className="max-w-screen-md w-full" src={logo}></img>
        </div>
        
        <div>
          
          <Tabs
          tabs={uniqueTags}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
        <div className="container my-auto grid grid-cols-1 gap-x-8 gap-y-16 items-start lg:grid-cols-3">
          {filteredPosts.map((post, index) => (

            <Card key={index}>
              <Link to={`/${post.slug}`} itemProp="url">
              <CardContent>
                <CardImage img={post.image.url} />
              </CardContent>
              <CardHeader>
                <CardTag>{post.tag}</CardTag>
                <CardTitle>{post.title}</CardTitle>
                <CardDescription>{post.subtitle}</CardDescription>
              </CardHeader>
            </Link>
            </Card>
            
          ))}
      </div>
        </div>
        
    </section>
    </Layout >
  );
};

export default BlogIndex;

export const Head: React.FC = () => <Seo title="All posts" />;

export const pageQuery = graphql`
  {
    site {
      siteMetadata {
        title
      }
    }
    allContentfulPost {
      edges {
        node {
          title
          subtitle
          author
          slug
          image {
            url
          }
          tag
        }
      }
    }
  }
`;
