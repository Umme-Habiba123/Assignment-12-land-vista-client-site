// src/components/Banner.jsx
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import bannerPhoto1 from '../../../assets/b-1.jpg';
import bannerPhoto2 from '../../../assets/b-2.jpg';
import bannerPhoto3 from '../../../assets/b-3.jpg';
import bannerPhoto4 from '../../../assets/b-4.jpg';
import bannerPhoto5 from '../../../assets/b-5.png';
import { Link } from 'react-router';
import { useEffect, useState } from 'react';

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const bannerData = [
    { 
      image: bannerPhoto1, 
      caption: 'Find Your Dream Home',
      subtext: 'Premium properties with modern amenities',
      buttonText: 'Explore Properties',
    
    },
    { 
      image: bannerPhoto2, 
      caption: 'Modern Living, Simplified',
      subtext: 'Contemporary designs for urban lifestyles',
      buttonText: 'View Designs',
     
    },
    { 
      image: bannerPhoto3, 
      caption: 'Explore Prime Properties',
      subtext: 'Prime locations with excellent connectivity',
      buttonText: 'See Locations',
      
    },
    { 
      image: bannerPhoto4, 
      caption: 'Secure Investment with LandVista',
      subtext: 'Your trusted partner in real estate',
      buttonText: 'Learn More',
      
    },
    { 
      image: bannerPhoto5, 
      caption: 'Urban Comfort Meets Nature',
      subtext: 'Experience harmony in living spaces',
      buttonText: 'Discover Harmony',
     
    },
  ];

  // Progress indicator animation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerData.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [bannerData.length]);

  const customRenderIndicator = (onClickHandler, isSelected, index) => {
    return (
      <li
        className={`inline-block h-1.5 md:h-2 rounded-full transition-all duration-500 mx-1 cursor-pointer ${
          isSelected 
            ? 'w-8 md:w-12 bg-white' 
            : 'w-2 md:w-4 bg-white/50 hover:bg-white/80'
        }`}
        onClick={onClickHandler}
        onKeyDown={onClickHandler}
        value={index}
        key={index}
        role="button"
        tabIndex={0}
        aria-label={`Go to slide ${index + 1}`}
        title={`Go to slide ${index + 1}`}
      />
    );
  };

  const customArrowPrev = (onClickHandler, hasPrev, label) =>
    hasPrev && (
      <button
        type="button"
        onClick={onClickHandler}
        title={label}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-10 bg-black/30 hover:bg-black/50 text-white p-3 md:p-4 rounded-full backdrop-blur-sm transition-all duration-300 group"
      >
        <svg
          className="w-5 h-5 md:w-6 md:h-6 transform group-hover:-translate-x-1 transition-transform"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
    );

  const customArrowNext = (onClickHandler, hasNext, label) =>
    hasNext && (
      <button
        type="button"
        onClick={onClickHandler}
        title={label}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-10 bg-black/30 hover:bg-black/50 text-white p-3 md:p-4 rounded-full backdrop-blur-sm transition-all duration-300 group"
      >
        <svg
          className="w-5 h-5 md:w-6 md:h-6 transform group-hover:translate-x-1 transition-transform"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    );

  return (
    <div className="w-full mx-auto mb-10 md:mb-16 relative group">
      {/* Progress bar indicator */}
      <div className="absolute top-4 left-4 md:top-6 md:left-6 z-20 bg-black/40 backdrop-blur-sm rounded-full px-4 py-2 flex items-center gap-2">
        <span className="text-white text-xs md:text-sm font-medium">
          {String(currentSlide + 1).padStart(2, '0')} / {String(bannerData.length).padStart(2, '0')}
        </span>
      </div>

      <Carousel
        showArrows={true}
        autoPlay={true}
        infiniteLoop={true}
        interval={4000}
        showThumbs={false}
        showStatus={false}
        stopOnHover={true}
        showIndicators={true}
        selectedItem={currentSlide}
        onChange={setCurrentSlide}
        renderArrowPrev={customArrowPrev}
        renderArrowNext={customArrowNext}
        renderIndicator={customRenderIndicator}
        transitionTime={800}
        swipeable={true}
        emulateTouch={true}
        className="carousel-container"
      >
        {bannerData.map(({ image, caption, subtext, buttonText, gradient }, index) => (
          <div 
            key={index} 
            className="relative h-[420px] md:h-[580px] lg:h-[750px] xl:h-[85vh] overflow-hidden"
            data-aos="zoom-out"
            data-aos-duration="1000"
          >
            {/* Background Image with Parallax Effect */}
            <div className="absolute inset-0" >
              <img
                src={image}
                alt={caption}
                className="h-full w-full object-cover object-center scale-100 group-hover:scale-105 transition-transform duration-[15000ms]"
                loading={index === 0 ? "eager" : "lazy"}
              />
            </div>

            {/* Gradient Overlay */}
            <div className={`absolute inset-0 bg-gradient-to-br ${gradient} via-black/40`}></div>

            {/* Content Container */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="container mx-auto px-4 md:px-8 lg:px-12">
                <div className="max-w-3xl mx-auto text-center space-y-4 md:space-y-8">
                  {/* Animated Caption */}
                  <div className="overflow-hidden">
                    <h2 
                      className="text-white text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight drop-shadow-2xl transform translate-y-0 opacity-100 transition-all duration-1000"
                      style={{
                        textShadow: '0 4px 12px rgba(0,0,0,0.3)',
                        lineHeight: '1.2'
                      }}
                    >
                      {caption.split(' ').map((word, i) => (
                        <span 
                          key={i} 
                          className="inline-block mr-3 md:mr-4 transform hover:scale-110 transition-transform duration-300"
                        >
                          {word}
                        </span>
                      ))}
                    </h2>
                  </div>

                  {/* Animated Subtext */}
                  <div className="overflow-hidden">
                    <p className="text-white/90 text-lg md:text-xl lg:text-2xl font-light max-w-2xl mx-auto leading-relaxed transform translate-y-0 opacity-100 transition-all duration-1000 delay-300">
                      {subtext}
                    </p>
                  </div>

                  {/* CTA Button */}
                  <div className="overflow-hidden pt-2 md:pt-4">
                    <Link 
                      to="/properties" 
                      className="inline-flex items-center gap-2 bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-md border border-white/30 text-white px-6 md:px-8 lg:px-10 py-3 md:py-4 rounded-full text-sm md:text-base lg:text-lg font-semibold hover:bg-gradient-to-r hover:from-white/30 hover:to-white/20 hover:scale-105 hover:shadow-2xl hover:shadow-white/20 transform transition-all duration-500 group/btn"
                    >
                      <span className="relative">
                        {buttonText}
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white group-hover/btn:w-full transition-all duration-500"></span>
                      </span>
                      <svg 
                        className="w-4 h-4 md:w-5 md:h-5 transform group-hover/btn:translate-x-2 transition-transform duration-300" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </Link>
                  </div>

                  {/* Stats Bar */}
                  <div className="hidden lg:flex justify-center gap-6 md:gap-8 lg:gap-12 pt-8">
                    {[
                      { value: '500+', label: 'Properties' },
                      { value: '50+', label: 'Locations' },
                      { value: '98%', label: 'Satisfaction' },
                      { value: '24/7', label: 'Support' }
                    ].map((stat, i) => (
                      <div 
                        key={i} 
                        className="text-center transform hover:scale-110 transition-transform duration-300"
                      >
                        <div className="text-white text-2xl md:text-3xl font-bold">{stat.value}</div>
                        <div className="text-white/70 text-xs md:text-sm uppercase tracking-wider">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:block">
              <div className="flex flex-col items-center gap-2">
                <span className="text-white/60 text-xs uppercase tracking-widest">Scroll</span>
                <div className="w-0.5 h-8 bg-gradient-to-b from-white/60 to-transparent"></div>
              </div>
            </div>
          </div>
        ))}
      </Carousel>

      {/* Custom CSS for carousel dots */}
      <style jsx="true">{`
        .carousel-container .control-dots {
          bottom: 40px !important;
          display: flex !important;
          justify-content: center !important;
          align-items: center !important;
        }
        
        @media (max-width: 768px) {
          .carousel-container .control-dots {
            bottom: 20px !important;
          }
        }
        
        .carousel-container .carousel-slider {
          overflow: visible !important;
        }
        
        .carousel-container .slide {
          background: transparent !important;
        }
      `}</style>
    </div>
  );
};

export default Banner;