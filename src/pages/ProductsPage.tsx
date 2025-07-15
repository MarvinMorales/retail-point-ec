import { useState, useEffect, useCallback } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Search, Filter, X, Star } from 'lucide-react';
import ProductModal from '../components/home/ModalViewer';
import { LazyLoadImage } from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';

const ProductsPage = ({ data }: Record<string, any>) => {
  const { id: categoryID } = useParams();
  const [searchParams] = useSearchParams();
  
  // Estados
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  // Obtener parámetros de búsqueda
  const productID = searchParams.get('id');
  const openModal = searchParams.get('open');

  const allProducts = data.allProducts;

  const searchForCategoryBanner = useCallback(() => {
    // Función recursiva para buscar en cualquier nivel
    const findBannerInCategories = (categoriesList: any[], targetId: string): any => {
      for (const category of categoriesList) {
        // Si encontramos la categoría con el ID buscado
        if (category.id === targetId && category.categoryPageBanner) {
          return category.categoryPageBanner;
        }
  
        // Si tiene subcategorías, buscamos recursivamente
        if (category.subCategory && Array.isArray(category.subCategory)) {
          const foundInSub = findBannerInCategories(category.subCategory, targetId);
          if (foundInSub) return foundInSub;
        }
      }
      return null;
    };
  
    // Iniciamos la búsqueda
    const foundBanner = findBannerInCategories(data.categories, categoryID as string);
  
    // Si encontramos el banner, lo retornamos
    if (foundBanner) {
      return foundBanner;
    }
  
    // Fallback si no se encontró nada
    return {
      coverImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlUQtKqYWl5Ggf08gOhCrX9Mnq5PacvmGZJg&s",
      title: "Nuestros productos",
      subtitle: "El mejor retail del Ecuador"
    };
  }, [categoryID, data.categories]);

  // Efecto para manejar la apertura del modal
  useEffect(() => {
    if (productID && openModal) {
      const product = allProducts.find((elem: Record<string, any>) => elem.id === productID);
      if (product) {
        setSelectedProduct(product);
        setIsModalOpen(true);
      }
    }
  }, [productID, openModal, allProducts]);

  // Manejar clic en producto
  const handleProductClick = (product: any) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  // Cerrar modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Filtrar productos por categoría, término de búsqueda y etiqueta
  const filteredProducts = allProducts.filter((product: Record<string, any>) => {
    const matchesCategory = categoryID ? product.category.toString() === categoryID : true;
    const matchesSearch = searchTerm === '' || 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = selectedTag === 'all' || product.tags.includes(selectedTag);
    
    return matchesCategory && matchesSearch && matchesTag;
  });

  // Obtener etiquetas únicas solo de los productos de la categoría actual
  const productsInCategory = categoryID 
    ? allProducts.filter((product: any) => product.category.toString() === categoryID)
    : allProducts;

  const allTags = [...new Set(productsInCategory.flatMap((product: Record<string, any>) => product.tags))];

  return (
    <div className="pt-0">
      {/* Hero Section */}
      <section 
        className="bg-gray-500 text-white py-16" 
        style={{ backgroundImage: `url('${searchForCategoryBanner().coverImage}')`, backgroundSize: "cover" }}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">
              { searchForCategoryBanner().title }
            </h1>
            <p className="text-xl text-blue-100">
              { searchForCategoryBanner().subtitle }
            </p>
          </div>
        </div>
      </section>
      
      {/* Search and Filter Bar */}
      <section className="sticky top-5 z-30 bg-white shadow-md py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Input */}
            <div className="flex-grow relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                value={searchTerm}
                placeholder="Buscar productos..."
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            {/* Filter Toggle Button (Mobile) */}
            <button 
              className="md:hidden flex items-center justify-center gap-2 bg-gray-100 px-4 py-2 rounded-md"
              onClick={() => setShowFilters(!showFilters)}
            >
              {showFilters ? <X size={18} /> : <Filter size={18} />}
              {showFilters ? 'Cerrar Filtros' : 'Filtros'}
            </button>
            
            {/* Desktop Filters */}
            <div className="hidden md:flex gap-2">              
              <select
                value={selectedTag}
                onChange={(e) => setSelectedTag(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">Todas las Etiquetas</option>
                {allTags.map((tag: any) => (
                  <option key={tag} value={tag}>{tag}</option>
                ))}
              </select>
            </div>
          </div>
          
          {/* Mobile Filters */}
          {showFilters && (
            <div className="md:hidden mt-4 p-4 bg-gray-50 rounded-md">
              <div className="space-y-4">                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Etiqueta</label>
                  <select
                    value={selectedTag}
                    onChange={(e) => setSelectedTag(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">Todas las Etiquetas</option>
                    {allTags.map((tag: any) => (
                      <option key={tag} value={tag}>{tag}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-[80px] bg-gray-50">
        <div className="container mx-auto px-4">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-2xl text-gray-600 mb-4">
                {categoryID ? "No se encontraron productos en esta categoría" : "No se encontraron resultados"}
              </p>
              <p className="text-gray-500">Intente con otros filtros o términos de búsqueda</p>
              <button 
                onClick={() => {
                  setSearchTerm('');
                  setSelectedTag('all');
                }}
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-blue-800 transition-colors"
              >
                Limpiar Filtros
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product: Record<string, any>, i: number) => (
                <div 
                  key={`${product.id}-${i}`} 
                  onClick={() => handleProductClick(product)}
                  className="cursor-pointer"
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <ProductModal 
        product={selectedProduct} 
        onClose={handleCloseModal} 
        isOpen={isModalOpen}
        data={data}
      />
    </div>
  );
};

// Componente ProductCard
const ProductCard = ({ product }: any) => {
  const { name, images, description, tags, rating } = product;
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 group">
      <div className="relative overflow-hidden flex justify-center items-center h-[230px]">
        <LazyLoadImage 
          src={images[0]} 
          alt={name}
          effect='blur'
          placeholder={<p>Cargando...</p>}
          threshold={100}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      
      <div className="p-5">
        <div className="flex flex-wrap gap-1 items-center mb-2">
          <Star className="w-4 h-4 text-yellow-400 fill-current" />
          <span className="ml-1 text-sm text-gray-600">{rating}</span>
          {tags.map((tag: any) => (
            <span key={tag} className="bg-gray-100 text-gray-600 text-[13px] px-2 py-0.5 rounded-full">
              {tag}
            </span>
          ))}
        </div>
        
        <h3 className="text-lg font-semibold text-blue-900 mb-2">{name}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2 whitespace-pre min-h-[40px]">{description}</p>
      </div>
    </div>
  );
};

export default ProductsPage;