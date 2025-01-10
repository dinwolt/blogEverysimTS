import React from 'react';
import { Link } from 'gatsby';
import {  getImage } from "gatsby-plugin-image";
import { IGatsbyImageData } from "gatsby-plugin-image";
import { useState } from 'react';
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


type PostData = {
    title?: string;
        subtitle?: string;
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

interface BlogGridProps {
    posts: Array<PostData>;
    visibleCount: number;
    isExpanded: boolean;
    activeTab: string;
    setActiveTab: (tab: string) => void;
    toggleView: () => void;
    filteredPosts: Array<any>;
}

const BlogGrid: React.FC<BlogGridProps> = ({
    posts,
    visibleCount,
    isExpanded,
    activeTab,
    setActiveTab,
    toggleView,
    filteredPosts
}) => {
    const uniqueTags = Array.from(
        new Set(posts.flatMap(post => post.tag.split(", ").map(tag => tag.trim())))
    );

    const visiblePosts = filteredPosts.slice(0, visibleCount);
    console.log(visiblePosts);

    return (
        <div className='p-3'>
            <div className=''>
                <Tabs
                    tabs={uniqueTags}
                    activeTab={activeTab}
                    onTabChange={(tab) => setActiveTab(tab === activeTab ? "" : tab)}
                />
            </div>
        
            <div className="flex justify-center items-center my-8">
                <div className="grid grid-cols-1 gap-x-8 gap-y-8 sm:gap-y-12 md:grid-cols-2 lg:grid-cols-3 max-w-screen-xl px-4">
                    {visiblePosts.map((post, index) => {
                        const image = getImage(post.image); 
                        return (
                            <Card key={index}>
                                <Link to={`/blog/${post.slug}`} itemProp="url">
                                    <CardContent>
                                        {image && <CardImage img={image} />}
                                    </CardContent>
                                    <CardHeader>
                                        <CardTag>{post.tag}</CardTag>
                                        <CardTitle>{post.title}</CardTitle>
                                        <CardDescription>{post.subtitle}</CardDescription>
                                    </CardHeader>
                                </Link>
                            </Card>
                        );
                    })}
                </div>
            </div>

            {filteredPosts.length > 6 && (
                <button
                    onClick={toggleView}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                >
                    {isExpanded ? "Show Less" : "Show More"}
                </button>
            )}
        </div>
    );
};

export default BlogGrid;
