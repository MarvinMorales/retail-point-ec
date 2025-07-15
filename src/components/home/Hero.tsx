import { useState, useEffect, useCallback } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useMediaQuery } from '@mui/material';
import clsx from 'clsx';

interface Slide {
  id: string;
  image: string;
  mobileImage?: string;
  showInfo: boolean;
  title: string;
  subtitle: string;
  cta: string;
  link: string;
}

interface HeroProps {
  data: {
    website: {
      heroSection: {
        slides: Slide[];
      };
    };
  };
}

const Hero = ({ data }: HeroProps) => {
  const isMobile = useMediaQuery('(max-width: 600px)');
  const { slides } = data?.website?.heroSection || { slides: [] };
  const [currentSlide, setCurrentSlide] = useState(0);
  const [_isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  }, [slides.length]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  if (!slides || slides.length === 0) return null;

  return (
    <section className="relative w-full aspect-[16/9] sm:aspect-[21/9] overflow-hidden">

      {slides.map((slide, index) => (
        <div 
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
          aria-hidden={index !== currentSlide}
        >
          {/* Imagen responsiva con fuentes alternativas */}
          <img
            src={slide.image}
            alt="image-slider"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ objectPosition: 'center' }}
            loading={index === 0 ? 'eager' : 'lazy'}
          />


          {/* {slide.showInfo && (
            <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/80 to-black/40" />
          )} */}
          
          {!isMobile && (
          <div className={clsx(
            "absolute inset-0 flex items-center justify-start",
            slide.showInfo ? "flex" : "hidden"
          )}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-xl lg:ml-16 text-white" data-aos="fade-right">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                  {slide.title}
                </h1>
                <p className="text-lg sm:text-xl md:text-2xl mb-6 text-gray-200">
                  {slide.subtitle}
                </p>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                    <Link 
                      to={slide.link}
                      className="bg-brand-red hover:bg-brand-red-dark text-white px-5 py-2 sm:px-6 sm:py-3 rounded-md inline-flex items-center transition-colors shadow-lg hover:shadow-xl"
                    >
                      {slide.cta} <ArrowRight size={18} className="ml-2" />
                    </Link>
                    <Link 
                      to="/contact"
                      className="border-2 border-white hover:bg-white hover:text-brand-dark text-white px-5 py-2 sm:px-6 sm:py-3 rounded-md transition-colors duration-300"
                    >
                      Contactar
                    </Link>
                  </div>
              </div>
            </div>
          </div>
          )}
        </div>
      ))}
      
      {/* Indicadores de navegación */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-brand-red w-6' 
                : 'bg-white/70 hover:bg-white'
            }`}
            aria-label={`Ir a slide ${index + 1}`}
            aria-current={index === currentSlide}
          />
        ))}
      </div>

      {/* Controles de navegación para pantallas grandes */}
      <div className="hidden md:block">
        <button 
          onClick={() => goToSlide(currentSlide === 0 ? slides.length - 1 : currentSlide - 1)}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full z-20 transition-colors"
          aria-label="Slide anterior"
        >
          ←
        </button>
        <button 
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full z-20 transition-colors"
          aria-label="Siguiente slide"
        >
          →
        </button>
      </div>
    </section>
  );
};

export default Hero;