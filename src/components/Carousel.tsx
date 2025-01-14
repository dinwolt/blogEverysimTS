// src/components/CardsContainer.tsx

import React, { useEffect, useState } from 'react';
import { getImage } from "gatsby-plugin-image";
import { IGatsbyImageData } from "gatsby-plugin-image";
import CarouselCard from './CarouselCard';
import { Link } from 'gatsby';
interface CardData {
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
}
interface CardProps {
    posts: Array<CardData>;}

const Carousel: React.FC<CardProps> = ({posts}) => {

    return (
        <div className="overflow-hidden my-3">
            <div className="flex animate-scroll">

                {posts.concat(posts).map((post, index) =>{
                    const image = getImage(post.image); 
                    return(
                        <Link to={`/blog/${post.slug}`}>
                        <div
                        key={index} className="min-w-[300px] mx-3"
                    >
                        {image && <CarouselCard
                            title={post.title}
                            description={post.subtitle}
                            image={image }
                        />}
                    </div></Link>
                        
                    )

                }
                )}
            </div>

        </div>
    );
};

export default Carousel;
