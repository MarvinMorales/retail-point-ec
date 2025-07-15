import { useState, useEffect, useRef, useCallback } from 'react';
import logo from "../../images/logo.png";
import { Link, useNavigate } from 'react-router-dom';
import { ChevronDown, ChevronRight, Menu, X } from 'lucide-react';
import { NavbarProps } from '../../types';

const Navbar = ({ data }: NavbarProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef<HTMLFormElement>(null);
  const [searchResults, setSearchResults] = useState<{ products: any[], categories: any[] }>({ products: [], categories: [] });
  
  const menuItems = data.website.header.menu;
  const categories = data.categories;
  const allProducts = data?.allProducts;
  const catalog = data.businessInformation.pdfCatalogs;
  
  const navigate = useNavigate();
  const headerRef = useRef<HTMLDivElement>(null);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };
  
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearchSubmit = useCallback((e: React.FormEvent) => {
      e.preventDefault();
      if (searchQuery.trim()) {
        navigate(`/search?q=${searchQuery}`);
        setSearchQuery('');
        setShowResults(false);
      }
  }, [searchQuery]);

  const handleNavItemClick = (item: any) => {
    if (item.name === 'Soluciones Integrales') {
      setActiveDropdown(activeDropdown === 'soluciones' ? null : 'soluciones');
    } else if (item.name === 'Catalogo (PDFs)') {
      setActiveDropdown(activeDropdown === 'catalogos' ? null : 'catalogos');
    } else {
      setActiveDropdown(null);
    }
  };

  const toggleCategoryExpansion = (categoryId: string) => {
    setExpandedCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleCategoryClick = (category: any, isSubCategory = false) => {
    if ((category.subCategory || category.subcategory) && !isSubCategory) {
      toggleCategoryExpansion(category.id);
    } else {
      setActiveDropdown(null);
    }
  };

  const handleSubCategoryClick = useCallback(() => {
    setActiveDropdown(null);
    setSearchQuery("");
    setShowResults(false);
  }, [searchQuery]);

  const handleCatalogClick = () => {
    setActiveDropdown(null);
  };

  useEffect(() => {
      if (!searchQuery.trim()) {
        setSearchResults({ products: [], categories: [] });
        setShowResults(false);
        return;
      }
  
      const query = searchQuery.toLowerCase();
  
      const matchedProducts = allProducts.filter((product: any) =>
        product.name.toLowerCase().includes(query)
      );
  
      const matchedCategories = categories.flatMap((cat: any) => {
        const subMatches = cat.subCategory?.filter((sub: any) =>
          sub.name.toLowerCase().includes(query)
        ) || [];
  
        const mainMatch = cat.name.toLowerCase().includes(query) ? [cat] : [];
  
        return [...mainMatch, ...subMatches];
      });
  
      setSearchResults({
        products: matchedProducts,
        categories: matchedCategories
      });
  
      setShowResults(true);
  }, [searchQuery]);

  const showSearchForm = useCallback(() => (
    <form 
      ref={searchRef} 
      onSubmit={handleSearchSubmit} 
      className="flex flex-1 max-w-md relative"
    >
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Buscar productos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
          />
          {showResults && (searchResults.products.length > 0 || searchResults.categories.length > 0) && (
            <div className="absolute top-full mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg z-50 max-h-60 overflow-y-auto text-sm">
              {searchResults.products.length > 0 && (
                <div className="p-2">
                  <p className="font-semibold text-gray-600 mb-1">Productos</p>
                  {searchResults.products.map(product => (
                    <Link
                      key={product.id}
                      to={`products/${product.category}?id=${product.id}&open=1`}
                      className="block px-2 py-1 hover:bg-red-50 text-gray-700"
                      onClick={handleSubCategoryClick}
                    >
                      {product.name}
                    </Link>
                  ))}
                </div>
              )}
              {searchResults.categories.length > 0 && (
                <div className="p-2 border-t border-gray-100">
                  <p className="font-semibold text-gray-600 mb-1">Categorías</p>
                  {searchResults.categories.map((cat: any) => (
                    <Link
                      key={cat.id}
                      to={`/categories`}
                      className="block px-2 py-1 hover:bg-red-50 text-gray-700"
                      onClick={handleSubCategoryClick}
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
    </form>
  ), [searchResults, searchRef, searchQuery])

  return (
    <header ref={headerRef} className="bg-white shadow-md border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold text-red-600">
              <img src={logo} alt="logo" className='w-[90px] h-auto'/>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {menuItems.map((item) => (
              <div key={item.id} className="relative">
                {item.name === 'Soluciones Integrales' || item.name === 'Catalogo (PDFs)' ? (
                  <button
                    onClick={() => handleNavItemClick(item)}
                    className={`flex items-center px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-md ${
                      item.name === 'Soluciones Integrales' 
                        ? 'text-red-600 hover:text-red-700 hover:bg-red-50' 
                        : 'text-gray-700 hover:text-red-600 hover:bg-red-50'
                    }`}
                  >
                    {item.name}
                    <ChevronDown className={`ml-1 h-4 w-4 transition-transform duration-200 ${
                      (activeDropdown === 'soluciones' && item.name === 'Soluciones Integrales') ||
                      (activeDropdown === 'catalogos' && item.name === 'Catalogo (PDFs)')
                        ? 'rotate-180' : ''
                    }`} />
                  </button>
                ) : (
                  <Link
                    to={item.redirects}
                    className="flex items-center px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-md text-gray-700 hover:text-red-600 hover:bg-red-50"
                  >
                    {item.name}
                  </Link>
                )}

                {/* Dropdown for Soluciones Integrales */}
                {item.name === 'Soluciones Integrales' && activeDropdown === 'soluciones' && (
                  <div className="absolute top-full left-0 mt-1 w-80 bg-white rounded-lg shadow-xl border border-gray-100 py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                    {categories.map((category) => (
                      <div key={category.id} className="border-b border-gray-50 last:border-b-0">
                        {category.subCategory && category.subCategory.length > 0 ? (
                          <button
                            onClick={() => handleCategoryClick(category)}
                            className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors duration-150 flex items-center justify-between"
                          >
                            <span className="font-medium">{category.name}</span>
                            <ChevronRight 
                              className={`h-4 w-4 transition-transform duration-200 ${
                                expandedCategories.includes(category.id) ? 'rotate-90' : ''
                              }`} 
                            />
                          </button>
                        ) : (
                          <Link
                            to={`/products/${category.id}`}
                            onClick={() => handleCategoryClick(category, true)}
                            className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors duration-150 items-center justify-between block"
                          >
                            <span className="font-medium">{category.name}</span>
                          </Link>
                        )}
                        
                        {category.subCategory && expandedCategories.includes(category.id) && (
                          <div className="bg-gray-50 border-t border-gray-100">
                            {category.subCategory.map((subCat: any) => (
                              <div key={subCat.id}>
                                {subCat.subCategory && subCat.subCategory.length > 0 ? (
                                  <>
                                    <button
                                      onClick={() => handleCategoryClick(subCat)}
                                      className="w-full text-left px-8 py-2 text-sm text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors duration-150 flex items-center justify-between"
                                    >
                                      {subCat.name}
                                      <ChevronRight 
                                        className={`h-4 w-4 transition-transform duration-200 ${
                                          expandedCategories.includes(subCat.id) ? 'rotate-90' : ''
                                        }`} 
                                      />
                                    </button>
                                    
                                    {subCat.subCategory && expandedCategories.includes(subCat.id) && (
                                      <div className="bg-gray-100">
                                        {subCat.subCategory.map((subSubCat: any) => (
                                          <Link
                                            key={subSubCat.id}
                                            to={`/products/${subSubCat.id}`}
                                            onClick={handleSubCategoryClick}
                                            className="w-full text-left px-12 py-2 text-sm text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors duration-150 block"
                                          >
                                            {subSubCat.name}
                                          </Link>
                                        ))}
                                      </div>
                                    )}
                                  </>
                                ) : (
                                  <Link
                                    key={subCat.id}
                                    to={`/products/${subCat.id}`}
                                    onClick={handleSubCategoryClick}
                                    className="w-full text-left px-8 py-2 text-sm text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors duration-150 block"
                                  >
                                    {subCat.name}
                                  </Link>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Dropdown for Catálogos */}
                {item.name === 'Catalogo (PDFs)' && activeDropdown === 'catalogos' && (
                  <div className="absolute top-full left-0 mt-1 w-64 bg-white rounded-lg shadow-xl border border-gray-100 py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                    {catalog.map((catalogItem, index) => (
                      <a
                        key={index}
                        href={catalogItem.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={handleCatalogClick}
                        className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors duration-150 block"
                      >
                        {catalogItem.name}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {showSearchForm()}
          </nav>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 hover:text-red-600 p-2 rounded-md transition-colors duration-200"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100 py-4 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="space-y-2">
              {menuItems.map((item) => (
                <div key={item.id}>
                  {item.name === 'Soluciones Integrales' || item.name === 'Catalogo (PDFs)' ? (
                    <button
                      onClick={() => handleNavItemClick(item)}
                      className={`w-full text-left px-4 py-2 transition-colors duration-150 flex items-center justify-between ${
                        item.name === 'Soluciones Integrales' 
                          ? 'text-red-600 hover:bg-red-50' 
                          : 'text-gray-700 hover:bg-red-50 hover:text-red-600'
                      }`}
                    >
                      <span>{item.name}</span>
                      <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${
                        (activeDropdown === 'soluciones' && item.name === 'Soluciones Integrales') ||
                        (activeDropdown === 'catalogos' && item.name === 'Catalogo (PDFs)')
                          ? 'rotate-180' : ''
                      }`} />
                    </button>
                  ) : (
                    <Link
                      to={item.redirects}
                      className="w-full text-left px-4 py-2 transition-colors duration-150 text-gray-700 hover:bg-red-50 hover:text-red-600 block"
                    >
                      {item.name}
                    </Link>
                  )}

                  {/* Mobile Soluciones Dropdown */}
                  {item.name === 'Soluciones Integrales' && activeDropdown === 'soluciones' && (
                    <div className="bg-gray-50 ml-4 mr-4 rounded-md mt-2">
                      {categories.map((category) => (
                        <div key={category.id}>
                          {category.subCategory && category.subCategory.length > 0 ? (
                            <button
                              onClick={() => handleCategoryClick(category)}
                              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors duration-150 flex items-center justify-between"
                            >
                              <span>{category.name}</span>
                              <ChevronRight 
                                className={`h-4 w-4 transition-transform duration-200 ${
                                  expandedCategories.includes(category.id) ? 'rotate-90' : ''
                                }`} 
                              />
                            </button>
                          ) : (
                            <Link
                              to={`/products/${category.id}`}
                              onClick={() => handleCategoryClick(category, true)}
                              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors duration-150 block"
                            >
                              {category.name}
                            </Link>
                          )}
                          
                          {category.subCategory && expandedCategories.includes(category.id) && (
                            <div className="bg-gray-100 ml-4 mr-4 rounded-md">
                          
                              {category.subCategory.map((subCat: any) => (
                                <div key={subCat.id}>
                                  {subCat.subCategory && subCat.subCategory.length > 0 ? (
                                    <>
                                      <button
                                        onClick={() => handleCategoryClick(subCat)}
                                        className="w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors duration-150 flex items-center justify-between"
                                      >
                                        {subCat.name}
                                        <ChevronRight 
                                          className={`h-4 w-4 transition-transform duration-200 ${
                                            expandedCategories.includes(subCat.id) ? 'rotate-90' : ''
                                          }`} 
                                        />
                                      </button>
                                      
                                      {subCat.subCategory && expandedCategories.includes(subCat.id) && (
                                        <div className="bg-gray-200 ml-4 mr-4 rounded-md">
                                          {subCat.subCategory.map((subSubCat: any) => (
                                            <Link
                                              key={subSubCat.id}
                                              to={`/products/${subSubCat.id}`}
                                              onClick={handleSubCategoryClick}
                                              className="w-full text-left px-6 py-2 text-sm text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors duration-150 block"
                                            >
                                              {subSubCat.name}
                                            </Link>
                                          ))}
                                        </div>
                                      )}
                                    </>
                                  ) : (
                                    <Link
                                      key={subCat.id}
                                      to={`/products/${subCat.id}`}
                                      onClick={handleSubCategoryClick}
                                      className="w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors duration-150 block"
                                    >
                                      {subCat.name}
                                    </Link>
                                  )}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Mobile Catálogos Dropdown */}
                  {item.name === 'Catalogo (PDFs)' && activeDropdown === 'catalogos' && (
                    <div className="bg-gray-50 ml-4 mr-4 rounded-md mt-2">
                      {catalog.map((catalogItem, index) => (
                        <a
                          key={index}
                          href={catalogItem.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={handleCatalogClick}
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors duration-150 block"
                        >
                          {catalogItem.name}
                        </a>
                      ))}
                    </div>
                  )}
                  
                </div>
              ))}
              {showSearchForm()}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;