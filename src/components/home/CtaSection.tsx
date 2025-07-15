import { Link } from 'react-router-dom';
import { Mail } from 'lucide-react';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

const CtaSection = ({ data }: Record<string, any>) => {
  return (
    <section className="bg-gradient-to-r from-gray-800 to-gray-700 py-16 relative overflow-hidden">
      
      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Optimice su negocio con nuestros sistemas antihurtos y soluciones integrales.
          </h2>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
          Contáctenos hoy mismo para una consulta gratuita y descubra cómo podemos ayudarle a mejorar la eficiencia de su retail.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              to="/contact" 
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-md inline-flex items-center justify-center transition-colors shadow-lg"
            >
              <Mail size={18} className="mr-2" />
              Contactar Ahora
            </Link>
            <a 
              href={`https://wa.me/593${data.businessInformation.whatsappNumber}`}
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-md inline-flex items-center justify-center transition-colors shadow-lg"
            >
              <WhatsAppIcon className="w-10 h-10 text-white mr-[3px]" />
              WhatsApp
            </a>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default CtaSection;