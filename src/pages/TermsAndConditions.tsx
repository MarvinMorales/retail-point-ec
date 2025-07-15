import { FileText, Calendar } from 'lucide-react';
import SectionContainer from '../components/home/SectionContainer';

const TermsAndConditions = () => {
  return (
    <div className="bg-gray-50">
      
      <div className="container mx-auto mt-[150px] px-4 max-w-5xl">
        <div className="mb-12 text-center">
          <div className="flex justify-center mb-4">
            <FileText className="h-16 w-16 text-red-800" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Términos y Condiciones</h1>
          <div className="flex items-center justify-center text-gray-600">
            <Calendar className="h-4 w-4 mr-2" />
            <span>Última actualización: 1 de junio de 2025</span>
          </div>
        </div>
        
        <div className="mb-8 p-6 bg-white rounded-lg shadow-sm border border-gray-200">
          <p className="text-gray-700 leading-relaxed">
            Por favor, lea estos Términos y Condiciones cuidadosamente antes de usar nuestro sitio web. Al acceder 
            o utilizar nuestro sitio web, usted acepta estar sujeto a estos Términos y Condiciones. Si no está de 
            acuerdo con alguna parte de estos términos, no podrá acceder al sitio web.
          </p>
        </div>
        
        <div className="space-y-6 mb-12">
          <SectionContainer title="1. Aceptación de los Términos">
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                Al acceder a nuestro sitio web, usted acepta estar sujeto a estos Términos y Condiciones y a todas 
                las leyes y regulaciones aplicables. También acepta que es responsable del cumplimiento de cualquier 
                ley local aplicable.
              </p>
              <p>
                Si no está de acuerdo con alguno de estos términos, tiene prohibido usar o acceder a este sitio web. 
                Los materiales contenidos en este sitio web están protegidos por las leyes de derechos de autor y 
                marcas registradas aplicables.
              </p>
            </div>
          </SectionContainer>

          <SectionContainer title="2. Licencia de Uso">
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                Se concede permiso para descargar temporalmente una copia de los materiales (información o software) 
                en nuestro sitio web únicamente para visualización personal y no comercial transitoria. Esta es la 
                concesión de una licencia, no una transferencia de título, y bajo esta licencia usted no puede:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Modificar o copiar los materiales</li>
                <li>Usar los materiales para cualquier propósito comercial</li>
                <li>Intentar descompilar o realizar ingeniería inversa de cualquier software contenido en el sitio web</li>
                <li>Eliminar cualquier derecho de autor u otras notaciones de propiedad de los materiales</li>
                <li>Transferir los materiales a otra persona o "duplicar" los materiales en cualquier otro servidor</li>
              </ul>
              <p>
                Esta licencia terminará automáticamente si viola cualquiera de estas restricciones y puede ser 
                terminada por nosotros en cualquier momento.
              </p>
            </div>
          </SectionContainer>

          <SectionContainer title="3. Descargo de Responsabilidad">
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                Los materiales en nuestro sitio web se proporcionan "tal cual". No ofrecemos garantías, expresas o 
                implícitas, y por la presente rechazamos y negamos todas las otras garantías, incluyendo, sin limitación, 
                garantías implícitas o condiciones de comerciabilidad, idoneidad para un propósito particular, o no 
                infracción de propiedad intelectual u otra violación de derechos.
              </p>
              <p>
                Además, no garantizamos ni hacemos ninguna representación sobre la precisión, los resultados probables 
                o la confiabilidad del uso de los materiales en nuestro sitio web o de otra manera relacionados con 
                dichos materiales o en cualquier sitio vinculado a este sitio.
              </p>
            </div>
          </SectionContainer>

          <SectionContainer title="4. Limitaciones">
            <div className="text-gray-700 leading-relaxed">
              <p>
                En ningún caso nosotros o nuestros proveedores seremos responsables por cualquier daño (incluyendo, 
                sin limitación, daños por pérdida de datos o beneficios, o debido a interrupción del negocio) que 
                surja del uso o la imposibilidad de usar los materiales en nuestro sitio web, incluso si nosotros o 
                un representante autorizado ha sido notificado oralmente o por escrito de la posibilidad de tales daños.
              </p>
            </div>
          </SectionContainer>

          <SectionContainer title="5. Precisión de los Materiales">
            <div className="text-gray-700 leading-relaxed">
              <p>
                Los materiales que aparecen en nuestro sitio web podrían incluir errores técnicos, tipográficos o 
                fotográficos. No garantizamos que ninguno de los materiales en nuestro sitio web sea preciso, completo 
                o actual. Podemos realizar cambios en los materiales contenidos en nuestro sitio web en cualquier 
                momento sin previo aviso.
              </p>
            </div>
          </SectionContainer>

          <SectionContainer title="6. Enlaces">
            <div className="text-gray-700 leading-relaxed">
              <p>
                No hemos revisado todos los sitios vinculados a nuestro sitio web y no somos responsables del contenido 
                de ningún sitio vinculado. La inclusión de cualquier enlace no implica respaldo por nuestra parte del 
                sitio. El uso de cualquier sitio web vinculado es bajo el propio riesgo del usuario.
              </p>
            </div>
          </SectionContainer>

          <SectionContainer title="7. Modificaciones">
            <div className="text-gray-700 leading-relaxed">
              <p>
                Podemos revisar estos Términos y Condiciones para nuestro sitio web en cualquier momento sin previo 
                aviso. Al usar este sitio web, usted acepta estar sujeto a la versión actual de estos Términos y 
                Condiciones.
              </p>
            </div>
          </SectionContainer>

          <SectionContainer title="8. Ley Aplicable">
            <div className="text-gray-700 leading-relaxed">
              <p>
                Estos Términos y Condiciones se rigen e interpretan de acuerdo con las leyes de España, y usted se 
                somete irrevocablemente a la jurisdicción exclusiva de los tribunales en esa ubicación.
              </p>
            </div>
          </SectionContainer>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;