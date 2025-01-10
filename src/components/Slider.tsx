import React, { useState, useEffect, useRef } from "react";
import { IGatsbyImageData, getImage } from "gatsby-plugin-image";
import { Link } from "gatsby";
import {
  Card,
  CardContent,
  CardDescription,
  CardImage,
  CardHeader,
  CardTitle,
  CardTag
} from "@/components/ui/card";

type PostData = {
  title?: string;
  subtitle?: string;
  author?: string;
  slug: string;
  image: IGatsbyImageData;
  tag: string;
};

interface SliderProps {
  posts: Array<PostData>;
}

const Slider: React.FC<SliderProps> = ({ posts }) => {
  const items: PostData[] = posts;
  const [active, setActive] = useState<number>(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadShow();
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);

    return () => clearInterval(interval);
  }, [active]);

  const loadShow = () => {
    if (!sliderRef.current) return;
    const sliderItems = sliderRef.current.querySelectorAll<HTMLDivElement>(".slider-item");
    sliderItems.forEach((item, index) => {
      const distance = Math.abs(index - active);

      if (index === active) {
        item.style.transform = "translateX(0) scale(1)";
        item.style.zIndex = "10";
        item.style.opacity = "1";
        item.style.filter = "none";
      } else if (index < active) {
        item.style.transform = `translateX(${-150 * distance}px) scale(${1 - 0.3 * distance})`;
        item.style.zIndex = `${10 - distance}`;
        item.style.opacity = distance > 2 ? "0" : "0.5";
        item.style.filter = "blur(1px)";
      } else {
        item.style.transform = `translateX(${150 * distance}px) scale(${1 - 0.3 * distance})`;
        item.style.zIndex = `${10 - distance}`;
        item.style.opacity = distance > 2 ? "0" : "0.5";
        item.style.filter = "blur(1px)";
      }
    });
  };

  const nextSlide = () => {
    setActive((prev) => (prev + 1) % items.length);
  };

  const prevSlide = () => {
    setActive((prev) => (prev - 1 + items.length) % items.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  return (
    <div className="flex justify-center  w-full items-center p-8">
    <div 
      className="relative w-full lg:w-[100vh] overflow-hidden"
      style={{ height: "auto", minHeight: "500px", maxHeight: "80vh" }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      ref={sliderRef}
    >
      {items.map((item, index) => {
        const image = getImage(item.image);
        return (
          <div 
            key={index} 
            className="slider-item absolute w-full h-full flex items-center justify-center transition-all duration-500 ease-in-out"
          >
            <Card className="max-w-md w-full mx-auto overflow-hidden" style={{ maxHeight: "100%" }}>
              <Link to={`/blog/${item.slug}`} itemProp="url" className="flex flex-col h-full">
                <CardContent className="flex-shrink-0">
                  {image && <CardImage img={image} />}
                </CardContent>
                <CardHeader className="flex-grow overflow-y-auto">
                  <CardTag>{item.tag}</CardTag>
                  <CardTitle>{item.title}</CardTitle>
                  <CardDescription>{item.subtitle}</CardDescription>
                </CardHeader>
              </Link>
            </Card>
          </div>
        );
      })}

      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-lg hover:bg-gray-700 z-20"
      >
        {"<"}
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-lg hover:bg-gray-700 z-20"
      >
        {">"}
      </button>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {items.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full ${
              index === active ? "bg-white" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
    </div>
  );
};

export default Slider;
