import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';

import testimonials from '../../../data/testimonials';

export default function Testimonials() {
  const { t } = useTranslation('home');
  const slideshowRef = useRef(null);
  
  // Get featured testimonials
  const featuredTestimonials = testimonials.filter(item => item.featured);
  
  // State for active testimonial
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  
  // Auto-play testimonials
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setActiveIndex(current => (current + 1) % featuredTestimonials.length);
    }, 6000);
    
    return () => clearInterval(interval);
  }, [isAutoPlaying, featuredTestimonials.length]);
  
  // Pause auto-play on hover
  const handleMouseEnter = () => {
    setIsAutoPlaying(false);
  };
  
  // Resume auto-play on mouse leave
  const handleMouseLeave = () => {
    setIsAutoPlaying(true);
  };
  
  // Handle manual navigation
  const goToSlide = (index) => {
    setActiveIndex(index);
    setIsAutoPlaying(false);
  };
  
  // Handle previous slide
  const goToPrevSlide = () => {
    setActiveIndex(current => 
      current === 0 ? featuredTestimonials.length - 1 : current - 1
    );
    setIsAutoPlaying(false);
  };
  
  // Handle next slide
  const goToNextSlide = () => {
    setActiveIndex(current => 
      (current + 1) % featuredTestimonials.length
    );
    setIsAutoPlaying(false);
  };
  
  return (
    <section className="section text-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 section-title">
            {t('testimonials.title')}
          </h2>
          <p className="text-lg text-white max-w-2xl mx-auto section-subtitle">
            {t('testimonials.subtitle')}
          </p>
        </div>
        
        {/* Testimonial Slider */}
        <div 
          ref={slideshowRef}
          className="max-w-4xl mx-auto"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Testimonial Content */}
          <div className="relative pb-8">
            {featuredTestimonials.map((testimonial, index) => (
              <div 
                key={testimonial.id}
                className={`
                  transition-opacity duration-700
                  ${activeIndex === index ? 'opacity-100' : 'opacity-0 absolute inset-0'}
                `}
                aria-hidden={activeIndex !== index}
              >
                <div className="text-center mb-8">
                  <div className="image-container-avatar mx-auto mb-4 border-4 border-white">
                    <Image 
                      src={testimonial.image || '/assets/images/testimonials/placeholder.jpg'} 
                      alt={testimonial.author} 
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold">{testimonial.author}</h3>
                    <p className="text-white">{testimonial.position}</p>
                    <p className="text-white text-sm">{testimonial.organization}</p>
                  </div>
                </div>
                
                <blockquote className="text-lg md:text-xl text-center italic mb-4 text-white">
                  "{testimonial.quote}"
                </blockquote>
                
                <p className="text-center text-white text-sm">
                  {testimonial.project}
                </p>
              </div>
            ))}
          </div>
          
          {/* Navigation Buttons */}
          <div className="flex justify-center items-center space-x-2">
            <button
              className="p-2 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors"
              onClick={goToPrevSlide}
              aria-label={t('testimonials.previous')}
            >
              <svg 
                className="w-6 h-6" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  d="M15 19l-7-7 7-7" 
                />
              </svg>
            </button>
            
            {/* Dot Indicators */}
            <div className="flex space-x-2">
              {featuredTestimonials.map((_, index) => (
                <button
                  key={index}
                  className={`
                    w-3 h-3 rounded-full transition-colors
                    ${activeIndex === index ? 'bg-white' : 'bg-white/30 hover:bg-white/50'}
                  `}
                  onClick={() => goToSlide(index)}
                  aria-label={t('testimonials.goToSlide', { index: index + 1 })}
                  aria-current={activeIndex === index ? 'true' : 'false'}
                />
              ))}
            </div>
            
            <button
              className="p-2 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors"
              onClick={goToNextSlide}
              aria-label={t('testimonials.next')}
            >
              <svg 
                className="w-6 h-6" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  d="M9 5l7 7-7 7" 
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}