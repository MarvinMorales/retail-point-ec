import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Facebook, 
  Instagram, 
  Twitter, 
  Send 
} from 'lucide-react';

const ContactPage = ({ data }: Record<string, any>) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [formSubmitted, setFormSubmitted] = useState(false);

  const { address, contactEmail, whatsappNumber, businessHours, websiteDomain } = data.businessInformation
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when field is being edited
    if (formErrors[name]) {
      setFormErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  const validate = () => {
    const errors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      errors.name = 'El nombre es requerido';
    }
    
    if (!formData.email.trim()) {
      errors.email = 'El correo electrónico es requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Correo electrónico inválido';
    }
    
    if (!formData.subject) {
      errors.subject = 'Por favor seleccione un asunto';
    }
    
    if (!formData.message.trim()) {
      errors.message = 'El mensaje es requerido';
    } else if (formData.message.length < 10) {
      errors.message = 'El mensaje debe tener al menos 10 caracteres';
    }
    
    return errors;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
  
    try {
      const response = await fetch(`${websiteDomain}send_mail.php`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      const result = await response.json();
  
      if (!response.ok || !result.success) {
        throw new Error(result.message || "Error al enviar el mensaje");
      }
  
      setFormSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    } catch (error: any) {
      console.log("❌ " + error.message);
    }
  };

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-red-500 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">Contáctenos</h1>
            <p className="text-xl text-blue-100">
              Estamos aquí para ayudarle. Contáctenos y le responderemos a la brevedad.
            </p>
          </div>
        </div>
      </section>
      
      {/* Contact Info & Form */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-2xl font-bold text-blue-900 mb-6">Información de Contacto</h2>
              
              <div className="space-y-6">
                <ContactItem 
                  icon={<MapPin size={24} className="text-amber-600" />}
                  title="Dirección"
                  content={<p className='max-w-[350px]'>{address}</p>}
                />
                
                <ContactItem 
                  icon={<Phone size={24} className="text-amber-600" />}
                  title="Teléfono"
                  content={<a href={`tel:+593${whatsappNumber}/`} className="hover:text-amber-600 transition-colors">{whatsappNumber}</a>}
                />
                
                <ContactItem 
                  icon={<Mail size={24} className="text-amber-600" />}
                  title="Correo Electrónico"
                  content={<a href={`mailto:${contactEmail}`} className="hover:text-amber-600 transition-colors">{contactEmail}</a>}
                />
                
                <ContactItem 
                  icon={<Clock size={24} className="text-amber-600" />}
                  title="Horario de Atención"
                  content={<p className='max-w-[340px]'>{businessHours}</p>}
                />
              </div>
              
              {/* Social Media */}
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-blue-900 mb-4">Síguenos en Redes Sociales</h3>
                <div className="flex space-x-4">
                  <SocialLink href="https://facebook.com" icon={<Facebook size={20} />} />
                  <SocialLink href="https://instagram.com" icon={<Instagram size={20} />} />
                  <SocialLink href="https://twitter.com" icon={<Twitter size={20} />} />
                </div>
              </div>
              
              {/* Map */}
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-blue-900 mb-4">Ubicación</h3>
                <div className="h-72 bg-gray-200 rounded-lg overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d997.556064405319!2d-79.8955569!3d-2.1715508!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x902d6dcb8ab39a9d%3A0x73f6597f0e777ae6!2sRetailPoint%20Del%20Ecuador!5e0!3m2!1ses!2sec!4v1719243234567"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-bold text-blue-900 mb-6">Envíenos un Mensaje</h2>
              
              {formSubmitted ? (
                <div className="bg-green-50 border border-green-200 text-green-800 rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-2">¡Mensaje Enviado!</h3>
                  <p>Gracias por contactarnos. Uno de nuestros representantes se comunicará con usted a la brevedad.</p>
                  <button 
                    onClick={() => setFormSubmitted(false)}
                    className="mt-4 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
                  >
                    Enviar Otro Mensaje
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Nombre Completo <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          formErrors.name ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {formErrors.name && <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>}
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Correo Electrónico <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          formErrors.email ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {formErrors.email && <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Teléfono
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                        Asunto <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          formErrors.subject ? 'border-red-500' : 'border-gray-300'
                        }`}
                      >
                        <option value="">Seleccione un asunto</option>
                        <option value="info">Información de Productos</option>
                        <option value="support">Soporte Técnico</option>
                        <option value="sales">Ventas</option>
                        <option value="other">Otro</option>
                      </select>
                      {formErrors.subject && <p className="text-red-500 text-xs mt-1">{formErrors.subject}</p>}
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Mensaje <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        formErrors.message ? 'border-red-500' : 'border-gray-300'
                      }`}
                    ></textarea>
                    {formErrors.message && <p className="text-red-500 text-xs mt-1">{formErrors.message}</p>}
                  </div>
                  
                  <button
                    type="submit"
                    className="bg-red-500 hover:bg-blue-800 text-white px-6 py-3 rounded-md transition-colors shadow-md flex items-center justify-center"
                  >
                    <Send size={18} className="mr-2" />
                    Enviar Mensaje
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
      
    </div>
  );
};

// Helper components
const ContactItem: React.FC<{
  icon: React.ReactNode;
  title: string;
  content: React.ReactNode;
}> = ({ icon, title, content }) => (
  <div className="flex">
    <div className="mr-4 mt-1">
      {icon}
    </div>
    <div>
      <h3 className="font-semibold text-blue-900">{title}</h3>
      <div className="text-gray-600 mt-1">
        {content}
      </div>
    </div>
  </div>
);

const SocialLink: React.FC<{
  href: string;
  icon: React.ReactNode;
}> = ({ href, icon }) => (
  <a 
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="bg-red-500 hover:bg-red-600 text-white p-3 rounded-full transition-colors flex items-center justify-center"
  >
    {icon}
  </a>
);


export default ContactPage;