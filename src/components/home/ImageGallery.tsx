import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ImageGalleryProps {
  images: string[];
  productName: string;
}

const ImageGallery = ({ images, productName }: ImageGalleryProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="relative h-full w-full flex flex-col">
      {/* Contenedor principal de la imagen */}
      <div className="relative flex-grow w-full h-full flex items-center justify-center bg-gray-50">
        {images.map((image, index) => (
          <div 
            key={index}
            className={`absolute inset-0 w-full h-full flex items-center justify-center transition-opacity duration-300 ${
              index === currentImageIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            <img 
              src={image} 
              alt={`${productName} - Image ${index + 1}`}
              className="max-h-full max-w-full object-contain p-4"
              style={{ maxHeight: '100%', maxWidth: '100%' }}
            />
          </div>
        ))}
        
        {images.length > 1 && (
          <>
            <button 
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-md z-20 transition-all duration-300"
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              aria-label="Previous image"
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-md z-20 transition-all duration-300"
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              aria-label="Next image"
            >
              <ChevronRight size={24} />
            </button>
          </>
        )}
      </div>
      
      {/* Thumbnail navigation */}
      {images.length > 1 && (
        <div className="flex-shrink-0 py-3 px-4 hidden md:flex overflow-x-auto">
          <div className="flex justify-center space-x-2">
            {images.map((image, index) => (
              <button
                key={index}
                className={`flex-shrink-0 h-16 w-16 border-2 rounded overflow-hidden transition-all duration-200 ${
                  index === currentImageIndex 
                    ? 'border-indigo-600 opacity-100 scale-105' 
                    : 'border-gray-200 opacity-70 hover:opacity-100'
                }`}
                onClick={() => setCurrentImageIndex(index)}
                aria-label={`View image ${index + 1}`}
              >
                <img 
                  src={image} 
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageGallery;