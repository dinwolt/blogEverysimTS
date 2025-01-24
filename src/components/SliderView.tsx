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
const SliderView: React.FC<SliderViewProps & { wrapContent?: boolean }> = ({ children, data, wrapContent = false }) => {
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
    }, 3000); // Auto-slide every 3 seconds

    return () => clearInterval(interval); // Clean up on unmount
  }, []);

  return (
    <div className="relative overflow-hidden">
      <div
        className="flex items-center transition-transform duration-500 ease-in-out"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
          width: wrapContent ? "auto" : "100%",
        }}
      >
        {data.map((item, index) => (
          <div
            key={index}
            className={`flex-shrink-0 ${wrapContent ? "max-w-fit px-4" : "w-full"}`}
          >
            {children(item, index)}
          </div>
        ))}
      </div>
    </div>
  );
};
export default SliderView;
