// src/components/Banner.jsx
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import bannerPhoto1 from '../../../assets/b-1.jpg';
import bannerPhoto2 from '../../../assets/b-2.jpg';
import bannerPhoto3 from '../../../assets/b-3.jpg';
import bannerPhoto4 from '../../../assets/b-4.jpg';
import bannerPhoto5 from '../../../assets/b-5.png';
import { Link } from 'react-router'; 

const Banner = () => {
  const bannerData = [
    { image: bannerPhoto1, caption: 'Find Your Dream Home' },
    { image: bannerPhoto2, caption: 'Modern Living, Simplified' },
    { image: bannerPhoto3, caption: 'Explore Prime Properties' },
    { image: bannerPhoto4, caption: 'Secure Investment with LandVista' },
    { image: bannerPhoto5, caption: 'Urban Comfort Meets Nature' },
  ];

  return (
    <div className="w-full  mx-auto mb-10">
      <Carousel
        showArrows
        autoPlay
        infiniteLoop
        interval={4000}
        showThumbs={false}
        showStatus={false}
        stopOnHover
      >
        {bannerData.map(({ image, caption }, i) => (
          <div data-aos="zoom-out" key={i} className="relative h-[420px] md:h-[580px] lg:h-[750px]">
            <img
              src={image}
              alt={caption}
              className="h-full w-full object-cover object-center"
            />

            {/* overlay + caption + button */}
            <div data-aos="zoom-out" className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center space-y-6">
              <h2 className="text-white text-2xl md:text-5xl font-bold leading-snug drop-shadow-lg">
                {caption}
              </h2>

              <Link to="/properties" className=" border-1 border-none bg-red-500 p-2 text-white rounded-lg px-8 md:px-10 hover:bg-red-400 hover:text-black  hover:border-1 ">
                Explore Now
              </Link>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Banner;
