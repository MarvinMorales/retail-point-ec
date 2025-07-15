import React from 'react';
import { Link } from 'react-router-dom';
import logo from "../../images/logo.png";
import { Facebook, Instagram, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';

const Footer = ({ data }: Record<string, any>) => {
  const { categories, businessInformation } = data;
  const { address, contactEmail, whatsappNumber, socialMedia: { facebook, instagram } } = businessInformation;

  const handleRequestService = () => {
    const encodedMessage = encodeURIComponent("Hola, estoy interesado en sus servicios.");
    window.location.href = `https://wa.me/593${whatsappNumber}?text=${encodedMessage}`;
  };

  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <Link to="/" className="text-2xl font-bold text-brand-dark flex items-center">
              <img 
                src={logo} 
                className='w-[100px] h-auto' 
                alt='Logo de Retail Point Ecuador'
                loading="eager"
              />
            </Link>
            <p className="mb-4 mt-4 text-gray-300">
              Soluciones completas para retail y puntos de venta. Ofrecemos tecnología de punta para optimizar su negocio.
            </p>
            <div className="flex space-x-4">
              <SocialLink href={facebook} icon={<Facebook size={18} />} />
              <SocialLink href={instagram} icon={<Instagram size={18} />} />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <FooterLink to="/" label="Inicio" />
              <FooterLink to="/contact" label="Contacto" />
              <FooterLink to="/privacy" label="Política de Privacidad" />
              <FooterLink to="/terms" label="Términos y Condiciones" />
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-xl font-bold mb-4">Categorías</h3>
            <ul className="space-y-2">
              {categories.map((elem: Record<string, any>, i: number) => {
                const to = i === 0 
                  ? `/sub-categories/${elem.id}` 
                  : `/products/${elem.id}`;
                  
                return (
                  <FooterLink 
                    key={i} 
                    to={to} 
                    label={elem.name} 
                    index={i} 
                    onWhatsAppClick={handleRequestService} 
                  />
                );
              })}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contacto</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={18} className="mr-2 mt-1 flex-shrink-0 text-red-500" />
                <span>{address}</span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-2 flex-shrink-0 text-red-500" />
                <span>{whatsappNumber}</span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="mr-2 flex-shrink-0 text-red-500" />
                <span>{contactEmail}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-6 text-sm text-gray-400 flex flex-col md:flex-row justify-between items-center">
          <p>© {new Date().getFullYear()} RetailPoint Ecuador. Todos los derechos reservados.</p>
          <p className="mt-2 md:mt-0">
            Diseñado con <span className="text-red-500">♥</span> en Ecuador
          </p>
        </div>
      </div>
    </footer>
  );
};

// Helper components
const SocialLink = ({ href, icon }: { href: string; icon: React.ReactNode }) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer" 
    className="bg-red-800 hover:bg-red-600 p-2 rounded-full transition-colors"
  >
    {icon}
  </a>
);

const FooterLink = ({
  to,
  label,
  index,
  onWhatsAppClick,
}: {
  to: string;
  label: string;
  index?: number;
  onWhatsAppClick?: () => void;
}) => {
  const isWhatsApp = index === 7;

  return (
    <li>
      {isWhatsApp ? (
        <button
          onClick={onWhatsAppClick}
          className="hover:text-red-500 transition-colors flex items-center text-left"
        >
          <ArrowRight size={14} className="mr-1" />
          {label}
        </button>
      ) : (
        <Link to={to} className="hover:text-red-500 transition-colors flex items-center">
          <ArrowRight size={14} className="mr-1" />
          {label}
        </Link>
      )}
    </li>
  );
};

export default Footer;
