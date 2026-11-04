"use client";

import React, { useState, useEffect } from 'react';

interface SlideItem {
  image?: string;
  src?: string;
  alt?: string;
}

interface ImageSliderProps {
  images?: SlideItem[];
  aspectClassName?: string;
}

const defaultSlides = [
  { image: "/images/slider-1.jpg", alt: "Krossford luxury leather showcase" },
  { image: "/images/slider-2.jpg", alt: "Krossford timeless craftsmanship" }
];

export default function ImageSlider({ images, aspectClassName }: ImageSliderProps) {
  const slides = images && images.length > 0 
    ? images.map(img => ({
        image: img.src || img.image || "/images/slider-1.jpg",
        alt: img.alt || "Krossford luxury leather showcase"
      }))
    : defaultSlides;

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const currentSlide = slides[current];

  return (
    <div className={`relative w-full overflow-hidden bg-black ${aspectClassName || 'h-[80vh] sm:h-[85vh]'}`}>
      <img 
        src={currentSlide.image} 
        alt={currentSlide.alt} 
        className="w-full h-full object-cover object-center transition-all duration-700 ease-in-out brightness-90"
      />
      {/* Subtle overlay for luxury contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
    </div>
  );
}