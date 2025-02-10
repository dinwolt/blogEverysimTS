import React from 'react';
//import { Link } from 'gatsby';
import {  getImage } from "gatsby-plugin-image";
import { IGatsbyImageData } from "gatsby-plugin-image";
import { useState } from 'react';
import { useIntl } from 'gatsby-plugin-intl';
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
import { Link } from 'gatsby-plugin-intl';


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
        updatedAt:string;
};

interface BlogGridProps {
    posts: Array<PostData>;

    toggleView?: () => void;
    filteredPosts: Array<any>;
}
const formatDate = (dateString: string, locale: string = "en-US") => {
    return new Intl.DateTimeFormat(locale, {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date(dateString));
  };
  

const BlogGrid: React.FC<BlogGridProps> = ({
    filteredPosts
}) => {
    


    return (
        <div className=''>
            <div className=''>
                
            </div>
        
            <div className="flex justify-center items-center my-8">
                <div className="grid grid-cols-1 gap-x-8 gap-y-8 sm:gap-y-12 lg:grid-cols-2 xl:grid-cols-3  max-w-screen-lg-3xl">
                    {filteredPosts.map((post, index) => {
                        const image = getImage(post.image); 
                        return (
                            <Card key={index}>
                                <Link to={`/blog/${post.slug}`} itemProp="url">
                                    <CardContent>
                                        {image && <CardImage img={image} />}
                                    </CardContent>
                                    <CardHeader>
                                        <CardTag>
                                            <div className='flex justify-between '>
                                                <div>{post.tag}</div>
                                                </div>
                                            </CardTag>
                                        <CardTitle className='font-spoqa text-slate-600 dark:text-gray-200'>{post.title}</CardTitle>
                                        <CardDescription>
                                            <div className='flex-col font-roboto'>
                                                <p className='text-sm sm:text-base'>{post.subtitle}</p>
                                                <div className='mt-2 text-gray-400 dark:text-gray-500 text-xs text-right'>{formatDate(post.updatedAt, useIntl().locale)}</div>

                                            </div>
                                            </CardDescription>
                                    </CardHeader>
                                </Link>
                            </Card>
                        );
                    })}
                </div>
            </div>

            
        </div>
    );
};

export default BlogGrid;
