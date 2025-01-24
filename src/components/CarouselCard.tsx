import React from 'react';
import { IGatsbyImageData } from "gatsby-plugin-image";
import { GatsbyImage } from 'gatsby-plugin-image';
interface CarouselCardProps {
  title: string;
  description: string;
  image: IGatsbyImageData;
}

const CarouselCard: React.FC<CarouselCardProps> = ({ title, description, image }) => {
  return (
    <div className="flex-shrink-0 w-80 h-72 sm:h-96 m-4 overflow-hidden rounded-xl shadow-lg transition-transform duration-300 hover:scale-105">
      <div className="relative h-full">
        {image && (
          <GatsbyImage
            image={image}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <div className="absolute bottom-0 p-6">
          <h4 className="text-2xl font-semibold text-white">{title}</h4>
          <p className="mt-2 text-base text-white">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default CarouselCard;
