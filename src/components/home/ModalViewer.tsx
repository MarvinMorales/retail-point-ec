import { useCallback, useEffect, useRef } from 'react';
import { X, Star, Package, Clock } from 'lucide-react';
import ImageGallery from './ImageGallery';

interface ProductModalProps {
  product: any | null;
  onClose: () => void;
  isOpen: boolean;
  data: Record<string, any>;
}

const ProductModal = ({ product, onClose, isOpen, data }: ProductModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const { whatsappNumber, websiteDomain } = data.businessInformation

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  const sendPostRequest = useCallback(async () => {
    try {
      const response = await fetch('https://test.api.com/v1/est', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          category: product.category,
          id: product.id,
          date: new Date(),
        }),
      });
  
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
  
      const result = await response.json();
      console.log('✅ Respuesta recibida:', result);
      return result;
    } catch (error) {
      console.error('❌ Error al enviar el POST:', error);
      throw error;
    }
  }, [product]);

  const handleCotization = useCallback(() => {
      const message = `Hola, quiero cotizar este producto: ${websiteDomain}products/${product.category}?id=${product.id}&open=1`;
      const encodedMessage = encodeURIComponent(message); // ¡Codifica todo el mensaje!
      window.location.href = `https://wa.me/593${whatsappNumber}?text=${encodedMessage}`;
      //sendPostRequest();
  }, [product, whatsappNumber, websiteDomain]);

  if (!product || !isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-75 flex items-center justify-center p-0 md:p-4 transition-opacity duration-300">
      <div 
        ref={modalRef}
        className="bg-white w-full h-full md:max-w-6xl md:h-[520px] md:rounded-lg shadow-2xl overflow-hidden flex flex-col md:flex-row animate-fadeIn"
      >
        {/* Close button */}
        <button 
          className="absolute top-4 right-4 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-md z-50 transition-all duration-300"
          onClick={onClose}
          aria-label="Close modal"
        >
          <X size={24} />
        </button>
        
        {/* Image Gallery - Full height on mobile */}
        <div className="w-full md:w-1/2 h-[55vh] md:h-full min-h-[300px] flex items-center justify-center bg-gray-50 p-2 border-b md:border-b-0 md:border-r border-gray-200">
          <ImageGallery images={product.images} productName={product.name} />
        </div>
        
        {/* Product Details - Scrollable area */}
        <div className="w-full md:w-1/2 flex flex-col h-[calc(45vh)] md:h-full">
          {/* Header content (fixed height) */}
          <div className="p-4 md:p-6 flex-shrink-0">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800">{product.name}</h2>
            
            <div className="flex items-center mt-2 mb-3 md:mb-4 flex-wrap gap-y-1">
              <div className="flex items-center mr-3">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={16} 
                    className={`${
                      i < Math.floor(product.rating) 
                        ? 'text-yellow-400 fill-current' 
                        : 'text-gray-300'
                    } ${
                      i === Math.floor(product.rating) && product.rating % 1 > 0 
                        ? 'text-yellow-400 fill-current opacity-50' 
                        : ''
                    }`} 
                  />
                ))}
                <span className="ml-1 text-sm text-gray-600">{product.rating}</span>
              </div>
              <span className="mx-2 text-gray-300 hidden md:inline">|</span>
              <span className="text-sm text-gray-600">Categoría: {product.category}</span>
            </div>
            
            <div className="flex flex-wrap gap-2 md:gap-3 mb-3 md:mb-4">
              <div className="flex items-center text-xs md:text-sm bg-gray-100 px-2 md:px-3 py-1 rounded-full">
                <Clock size={14} className="mr-1 text-gray-500" />
                <span className={product.stock > 0 ? "text-green-600" : "text-red-600"}>
                  {product.stock > 0 ? 'Disponible' : 'Agotado'}
                </span>
              </div>
              <div className="flex items-center text-xs md:text-sm bg-gray-100 px-2 md:px-3 py-1 rounded-full">
                <Package size={14} className="mr-1 text-gray-500" />
                <span className="text-gray-700">
                  {product.stock > 10 
                    ? 'Listo para enviar' 
                    : product.stock > 0 
                      ? 'Últimas unidades' 
                      : 'Pedido especial'}
                </span>
              </div>
            </div>
          </div>
          
          {/* Scrollable description */}
          <div className="px-4 md:px-6 pb-2 flex-grow overflow-y-auto">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Descripción</h3>
            <div className="text-gray-700 leading-relaxed text-sm md:text-base space-y-2">
              <p>{product.subtitle}</p>
              <p className='whitespace-pre-line'>{product.description}</p>
            </div>
          </div>
          
          {/* Fixed buttons at bottom */}
          <div className="p-3 md:p-6 border-t border-gray-200 bg-white flex-shrink-0">
            <div className="flex gap-2 md:gap-3">
              <button onClick={handleCotization} className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 md:py-3 px-3 md:px-4 rounded-md transition-colors duration-300 text-sm md:text-base font-medium">
                Cotizar
              </button>
              <button 
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 md:py-3 px-3 md:px-4 rounded-md transition-colors duration-300 text-sm md:text-base font-medium"
                onClick={onClose}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;