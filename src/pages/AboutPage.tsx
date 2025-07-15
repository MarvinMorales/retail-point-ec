import React from 'react';
import { Award, Users, Target, ShieldCheck } from 'lucide-react';
import YouTubeVideo from '../components/home/YoutubeVideo';

const AboutPage = () => {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-red-500 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">Sobre Nosotros</h1>
            <p className="text-xl text-blue-100">
              Somos una empresa líder en soluciones tecnológicas para el sector retail en Ecuador, 
              comprometidos con la innovación y la excelencia en el servicio.
            </p>
          </div>
        </div>
      </section>
      
     {/* Our Story */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-blue-900 mb-4">Nuestra Historia</h2>
              <p className="text-gray-600 mb-4">
              Somos un proveedor de Sistemas Anti hurto y soluciones integrales, dirigido a los diferentes tipos de Retailers, nos adaptamos a sus necesidades y modelo de negocio, ofreciéndoles una variedad de equipos de seguridad con tecnología de Radio Frecuencia, además de integrar RFID para trazabilidad e inventario, basados en la experiencia que manejamos en el área de seguridad electrónica de mercadería, con la finalidad de optimizar de manera eficaz sus recursos.
              </p>
            </div>
            <div className="w-full"> {/* Elimina el ancho fijo */}
              <YouTubeVideo />
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Values */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-blue-900 mb-4">Nuestros Valores</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Estos son los principios que guían nuestro trabajo diario y definen nuestra cultura empresarial.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <ValueCard 
              icon={<ShieldCheck size={32} className="text-amber-600" />}
              title="Integridad"
              description="Actuamos con honestidad y transparencia en todas nuestras relaciones comerciales."
            />
            <ValueCard 
              icon={<Target size={32} className="text-amber-600" />}
              title="Innovación"
              description="Buscamos constantemente nuevas formas de mejorar nuestros productos y servicios."
            />
            <ValueCard 
              icon={<Users size={32} className="text-amber-600" />}
              title="Trabajo en Equipo"
              description="Creemos en el poder de la colaboración para lograr resultados excepcionales."
            />
            <ValueCard 
              icon={<Award size={32} className="text-amber-600" />}
              title="Excelencia"
              description="Nos esforzamos por alcanzar los más altos estándares de calidad en todo lo que hacemos."
            />
          </div>
        </div>
      </section>
      
    </div>
  );
};

// Helper components
const ValueCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
}> = ({ icon, title, description }) => (
  <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 text-center">
    <div className="inline-block p-3 bg-blue-50 rounded-full mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-semibold text-blue-900 mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);


export default AboutPage;