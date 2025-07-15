import React, { useState, useEffect } from 'react';
import { Instagram, Heart, MessageCircle } from 'lucide-react';
import ig1 from "../../images/ig1.png";
import ig2 from "../../images/ig2.png";
import ig3 from "../../images/ig3.png";
import ig4 from "../../images/ig4.png";

// Mock Instagram data
const instagramPosts = [
  {
    id: 1,
    image: ig1,
    caption: 'Nuevo sistema POS instalado en SuperMarket. #RetailTech #POS #Ecuador',
    likes: 245,
    comments: 18,
    date: '2 días'
  },
  {
    id: 2,
    image: ig2,
    caption: 'Capacitación para el personal de FarmaExpress sobre nuestro software de gestión de inventario. #Training #RetailSoftware',
    likes: 187,
    comments: 12,
    date: '5 días'
  },
  {
    id: 3,
    image: ig3,
    caption: 'Nuestro equipo en la feria de tecnología de Quito. Ven a visitarnos en el stand #42. #TechExpo #RetailPoint',
    likes: 302,
    comments: 27,
    date: '1 semana'
  },
  {
    id: 4,
    image: ig4,
    caption: 'Nuevo módulo de fidelización de clientes disponible ahora para todos nuestros usuarios. #Loyalty #RetailTech',
    likes: 213,
    comments: 15,
    date: '1 semana'
  }
];

const InstagramFeed = ({ data }: Record<string, any>) => {
  const [visiblePosts, setVisiblePosts] = useState(4);
  const [isExpanded, setIsExpanded] = useState(false);
  
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
    setVisiblePosts(isExpanded ? 4 : instagramPosts.length);
  };
  
  // Adjust visible posts on window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setVisiblePosts(isExpanded ? instagramPosts.length : 4);
      } else if (window.innerWidth >= 768) {
        setVisiblePosts(isExpanded ? instagramPosts.length : 3);
      } else {
        setVisiblePosts(isExpanded ? instagramPosts.length : 2);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isExpanded]);

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10">
          <div>
            <h2 className="text-3xl font-bold text-blue-900 mb-2">Síguenos en Instagram</h2>
            <p className="text-gray-600">
              Mantente al día con nuestras últimas novedades y proyectos.
            </p>
          </div>
          
          <a 
            href={data.businessInformation.socialMedia.instagram} 
            target="_blank" 
            rel="noopener noreferrer"
            className="mt-4 md:mt-0 inline-flex items-center bg-gradient-to-r from-amber-500 to-pink-500 text-white px-5 py-2 rounded-full hover:from-amber-600 hover:to-pink-600 transition-all shadow-md"
          >
            <Instagram size={20} className="mr-2" />
            @retailpointecuador
          </a>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {instagramPosts.slice(0, visiblePosts).map((post) => (
            <InstagramPost key={post.id} post={post} />
          ))}
        </div>
        
        {instagramPosts.length > 4 && (
          <div className="text-center mt-8">
            <button 
              onClick={toggleExpand}
              className="bg-white border border-gray-300 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-50 transition-colors"
            >
              {isExpanded ? 'Ver menos' : 'Ver más'}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

// Helper component
const InstagramPost: React.FC<{ post: any }> = ({ post }) => {
  const { image, caption, likes, comments, date } = post;
  
  return (
    <div className="overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 group relative">
      <div className="overflow-hidden">
        <img 
          src={image} 
          alt={caption}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      
      {/* Overlay on hover */}
      <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4 text-white">
        <div className="flex justify-end">
          <span className="text-xs bg-white/20 px-2 py-1 rounded">{date}</span>
        </div>
        
        <div>
          <p className="text-sm mb-3 line-clamp-3">{caption}</p>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Heart size={16} className="text-red-500 mr-1" />
              <span className="text-xs">{likes}</span>
            </div>
            <div className="flex items-center">
              <MessageCircle size={16} className="mr-1" />
              <span className="text-xs">{comments}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstagramFeed;