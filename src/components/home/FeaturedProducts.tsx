import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Star } from 'lucide-react';

const FeaturedProducts = ({ data }: Record<string, any>) => {
  const [activeFilter, setActiveFilter] = useState('all');

  const { allProducts, categories, businessInformation } = data;
  const { websiteDomain } = businessInformation;
  
  const filteredProducts = activeFilter === 'all' 
    ? allProducts 
    : allProducts.filter((product: Record<string, any>) => product.category === activeFilter);

  const ProductCard = ({ product }: { product: Record<string, any> }) => {
    const { name, images, description, rating } = product;
    
    return (
      <Link to={`${websiteDomain}products/${product.category}?id=${product.id}&open=1`} className="bg-white cursor-pointer rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 group">
        <div className="relative overflow-hidden h-[230px]">
          <img 
            src={images[0]} 
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        
        <div className="p-5">
          <div className="flex items-center mb-2">
            <Star size={16} className="text-brand-red fill-brand-red" />
            <span className="text-sm text-gray-600 ml-1">{rating}</span>
          </div>
          
          <h3 className="text-lg font-semibold text-brand-dark mb-2">{name}</h3>
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{description}</p>
        </div>
      </Link>
    );
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-brand-dark mb-4">
            Nuestros Productos Destacados
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Ofrecemos una amplia gama de productos y servicios para optimizar su negocio de retail.
          </p>
          
          <div className="flex flex-wrap justify-center gap-2 mt-8">
            {categories.map((category: Record<string, any>) => {
              if (category.id < categories.length - 2) return (
                <button
                  key={category.id}
                  onClick={() => setActiveFilter(category.id)}
                  className={`px-4 py-2 rounded-full transition-colors ${
                    activeFilter === category.id
                      ? 'bg-brand-dark text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.name}
                </button>
              )
            })}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.slice(0, 4).map((product: Record<string, any>) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link 
            to="/categories" 
            className="inline-flex items-center text-brand-red hover:text-brand-red-dark font-medium transition-colors"
          >
            Ver todos las categorías <ChevronRight size={20} className="ml-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;