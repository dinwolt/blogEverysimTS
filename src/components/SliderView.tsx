import React, { useState, useEffect, ReactNode } from "react";
import { IGatsbyImageData } from "gatsby-plugin-image";

// Define the type for the slider data
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
};

interface SliderViewProps {
  children: (item: Authors | Posts, index: number) => ReactNode; 
  data: (Authors | Posts)[]; 
}

const SliderView: React.FC<SliderViewProps> = ({ children, data }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
  };


  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + data.length) % data.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000); 

    return () => clearInterval(interval); 
  }, []);

  return (
    <div className="relative w-full overflow-hidden">
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {data.map((item, index) => (
          <div
            key={index}
            className="w-full flex-shrink-0"
          >
            {children(item, index)}
          </div>
        ))}
      </div>

    
    </div>
  );
};

export default SliderView;
