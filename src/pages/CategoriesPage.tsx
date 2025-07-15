import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Search, Filter, X } from 'lucide-react';

const CategoriesPage = ({ data }: Record<string, any>) => {
  const { id } = useParams();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  // Obtener las categorías o subcategorías a mostrar
  const getItemsToDisplay = () => {
    if (!id) {
      // Mostrar todas las categorías principales
      return data.categories;
    } else {
      // Buscar la categoría por ID (comparando como string)
      const category = data.categories.find((cat: any) => cat.id.toString() === id);
      return category?.subCategory || [];
    }
  };

  const itemsToDisplay = getItemsToDisplay();
  
  // Filter items based on search and filters
  const filteredItems = itemsToDisplay.filter((item: Record<string, any>) => {
    // Search term filter
    const matchesSearch = searchTerm === '' || 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.description && item.description.toLowerCase().includes(searchTerm.toLowerCase()));
    
    // Tag filter
    const matchesTag = selectedTag === 'all' || 
      (item.tags && item.tags.includes(selectedTag));
    
    return matchesSearch && matchesTag;
  });
  
  // Get unique tags from all items
  const allTags = [...new Set(
    itemsToDisplay.flatMap((item: Record<string, any>) => 
      item.tags || []
    )
  )];

  // Obtener el título basado en si estamos viendo categorías o subcategorías
  const getPageTitle = () => {
    if (!id) return "Nuestras Categorías";
    
    const category = data.categories.find((cat: any) => cat.id.toString() === id);
    return category ? `Subcategorías de ${category.name}` : "Subcategorías";
  };

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-red-500 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">{getPageTitle()}</h1>
            <p className="text-xl text-blue-100">
              Descubra nuestra amplia gama de soluciones tecnológicas para retail.
            </p>
          </div>
        </div>
      </section>
      
      {/* Search and Filter Bar */}
      <section className="sticky top-16 z-30 bg-white shadow-md py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Input */}
            <div className="flex-grow relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder={!id ? "Buscar categorías..." : "Buscar subcategorías..."}
                value={searchTerm}
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
      
      {/* Items Grid */}
      <section className="py-[150px] bg-gray-50">
        <div className="container mx-auto px-4">
          {filteredItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredItems.map((item: any, i: number) => (
                <CategoryCard key={i} item={item} isSubcategory={!!id} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-2xl text-gray-600 mb-4">No se encontraron {!id ? 'categorías' : 'subcategorías'}</p>
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
          )}
        </div>
      </section>
    </div>
  );
};

// Helper component
const CategoryCard = ({ item, isSubcategory }: any) => {
  const { id, name, coverImage, description, tags = [] } = item;
  
  // Determinar la ruta basada en si es una categoría o subcategoría
  const getItemLink = () => {
    if (isSubcategory) {
      return `/products/${id}`;
    }
    // Si es una categoría principal y tiene subcategorías, ir a subcategorías
    if (item.subCategory && item.subCategory.length > 0) {
      return `/sub-categories/${id}`;
    }
    // Si no tiene subcategorías, ir directamente a productos
    return `/products/${id}`;
  };

  return (
    <Link 
      to={getItemLink()}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 group"
    >
      <div className="relative overflow-hidden flex justify-center items-center h-[230px]">
        <img 
          src={coverImage || 'https://via.placeholder.com/300'} 
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300';
          }}
        />
      </div>
      
      <div className="p-5">
        <div className="flex flex-wrap gap-1 mb-2">
          {tags.map((tag: any) => (
            <span key={tag} className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full">
              {tag}
            </span>
          ))}
        </div>
        
        <h3 className="text-lg font-semibold text-blue-900 mb-2">{name}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{description || 'Sin descripción disponible'}</p>
      </div>
    </Link>
  );
};

export default CategoriesPage;