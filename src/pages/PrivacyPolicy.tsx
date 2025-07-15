import { Shield, Calendar } from 'lucide-react';
import SectionContainer from '../components/home/SectionContainer';

const PrivacyPolicy = () => {
  return (
    <div className="bg-gray-50">
      
      <div className="container mx-auto mt-[150px] px-4 max-w-5xl">
        <div className="mb-12 text-center">
          <div className="flex justify-center mb-4">
            <Shield className="h-16 w-16 text-red-800" />
          </div>
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            Política de Privacidad
        </h1>
          <div className="flex items-center justify-center text-gray-600">
            <Calendar className="h-4 w-4 mr-2" />
            <span>Última actualización: 1 de junio de 2025</span>
          </div>
        </div>
        
        <div className="mb-8 p-6 bg-white rounded-lg shadow-sm border border-gray-200">
          <p className="text-gray-700 leading-relaxed">
            Esta Política de Privacidad describe cómo se recopila, utiliza y comparte su información personal cuando visita 
            nuestro sitio web. Estamos comprometidos con la protección de su privacidad y la seguridad de su información personal.
          </p>
        </div>
        
        <div className="space-y-6 mb-12">
          <SectionContainer title="1. Información que Recopilamos">
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                Recopilamos varios tipos de información de y sobre los usuarios de nuestro sitio web, incluyendo:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Información Personal:</strong> Esto incluye su nombre, dirección de correo electrónico, 
                  dirección postal, número de teléfono y otra información que proporcione al registrarse para una cuenta, 
                  suscribirse a nuestro boletín o contactarnos.
                </li>
                <li>
                  <strong>Datos de Uso:</strong> Recopilamos automáticamente información sobre su interacción con nuestro 
                  sitio web, incluyendo su dirección IP, tipo de navegador, sistema operativo, URLs de referencia, 
                  tiempos de acceso y páginas visitadas.
                </li>
                <li>
                  <strong>Cookies y Tecnologías de Seguimiento:</strong> Utilizamos cookies y tecnologías de seguimiento 
                  similares para rastrear la actividad en nuestro sitio web y almacenar cierta información para mejorar 
                  su experiencia.
                </li>
              </ul>
            </div>
          </SectionContainer>
          
          <SectionContainer title="2. Cómo Utilizamos su Información">
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                Utilizamos la información que recopilamos sobre usted para varios propósitos, incluyendo:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Proporcionar, mantener y mejorar nuestro sitio web y servicios</li>
                <li>Procesar transacciones y enviar información relacionada, incluyendo confirmaciones y facturas</li>
                <li>Enviar información administrativa, como actualizaciones de nuestros términos y políticas</li>
                <li>Responder a sus comentarios, preguntas y solicitudes</li>
                <li>Comunicarnos con usted sobre productos, servicios, ofertas y promociones</li>
                <li>Monitorear y analizar tendencias, uso y actividades en relación con nuestro sitio web</li>
                <li>Detectar, prevenir y abordar problemas técnicos y actividades fraudulentas</li>
                <li>Personalizar su experiencia en nuestro sitio web</li>
              </ul>
            </div>
          </SectionContainer>
          
          <SectionContainer title="3. Compartir su Información">
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                Podemos compartir su información personal en las siguientes situaciones:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Proveedores de Servicios:</strong> Podemos compartir su información con proveedores, 
                  contratistas o agentes externos que realizan servicios para nosotros o en nuestro nombre.
                </li>
                <li>
                  <strong>Transferencias Comerciales:</strong> Si participamos en una fusión, adquisición o venta de 
                  todos o parte de nuestros activos, su información puede ser transferida como parte de esa transacción.
                </li>
                <li>
                  <strong>Requisitos Legales:</strong> Podemos divulgar su información si la ley lo requiere o en 
                  respuesta a solicitudes válidas de autoridades públicas.
                </li>
                <li>
                  <strong>Protección:</strong> Podemos divulgar su información para proteger los derechos, la propiedad 
                  o la seguridad de nuestra empresa, nuestros usuarios u otros.
                </li>
              </ul>
              <p>
                No vendemos, alquilamos ni comerciamos su información personal con terceros para fines de marketing.
              </p>
            </div>
          </SectionContainer>
          
          <SectionContainer title="4. Sus Derechos de Privacidad">
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                Dependiendo de su ubicación, puede tener ciertos derechos sobre su información personal:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>El derecho a acceder a la información personal que tenemos sobre usted</li>
                <li>El derecho a solicitar que corrijamos información inexacta o incompleta</li>
                <li>El derecho a solicitar que eliminemos su información personal</li>
                <li>El derecho a retirar el consentimiento en cualquier momento</li>
                <li>El derecho a oponerse al procesamiento de su información personal</li>
                <li>El derecho a la portabilidad de datos</li>
              </ul>
              <p>
                Para ejercer cualquiera de estos derechos, contáctenos utilizando la información proporcionada en la 
                sección "Contáctenos" a continuación.
              </p>
            </div>
          </SectionContainer>
          
          <SectionContainer title="5. Seguridad de Datos">
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                Implementamos medidas técnicas y organizativas apropiadas para proteger su información personal contra 
                el acceso no autorizado, pérdida accidental, destrucción o daño. Sin embargo, tenga en cuenta que 
                ningún método de transmisión por Internet o método de almacenamiento electrónico es 100% seguro.
              </p>
              <p>
                Limitamos el acceso a su información personal a aquellos empleados, agentes, contratistas y otros 
                terceros que tienen una necesidad comercial de conocerla. Solo procesarán su información personal 
                según nuestras instrucciones y están sujetos a un deber de confidencialidad.
              </p>
            </div>
          </SectionContainer>
          
          <SectionContainer title="6. Privacidad de los Niños">
            <div className="text-gray-700 leading-relaxed">
              <p>
                Nuestro sitio web no está destinado a niños menores de 13 años. No recopilamos conscientemente 
                información personal de niños menores de 13 años. Si es padre o tutor y sabe que su hijo nos ha 
                proporcionado información personal, contáctenos y tomaremos medidas para eliminar esa información 
                de nuestros servidores.
              </p>
            </div>
          </SectionContainer>
          
          <SectionContainer title="7. Cambios en esta Política de Privacidad">
            <div className="text-gray-700 leading-relaxed">
              <p>
                Podemos actualizar nuestra Política de Privacidad de vez en cuando. Le notificaremos cualquier cambio 
                publicando la nueva Política de Privacidad en esta página y actualizando la fecha de "Última actualización". 
                Se le aconseja revisar esta Política de Privacidad periódicamente para cualquier cambio.
              </p>
            </div>
          </SectionContainer>
          
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;