import techservice from "../../images/tech-service.jpg"

const TechnicalService = ({ data }: Record<string, any>) => {

  const { techServiceSection } = data?.website;
  const { whatsappNumber } = data.businessInformation;

  const encodedMessage = "Hola, quisiera solicitar servicio técnico...";

  const handleRequestService = () => {
    window.location.href = `https://wa.me/593${whatsappNumber}?text=${encodedMessage}`;
  }

  return (
    <section 
      className="relative w-full h-[400px] overflow-hidden group"
    >
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-in-out group-hover:scale-105"
        style={{ 
          backgroundImage: `url('${techservice}')` 
        }}
      ></div>
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/60"></div>
      
      {/* Content Container */}
      <div className="relative h-full flex items-center justify-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            {techServiceSection.title}
          </h2>
          <p className="text-white text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            {techServiceSection.subtitle}
          </p>
          <div className="flex justify-center mt-8">
            <div onClick={handleRequestService} className="px-10 py-3 cursor-pointer w-fit border-solid text-white flex justify-center items-center border-white border-[1px] rounded-[6px]">
                {techServiceSection.button}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechnicalService;