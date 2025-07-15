import mapEC from "../../images/map-ec.jpg";

const AllStateCoverage = ({ data }: Record<string, any>) => {
  return (
    <section className="relative w-full h-[350px] overflow-hidden group">
      <div className="h-full flex">
        {/* Left Content */}
        <div className="w-full md:w-1/2 bg-gradient-to-r from-red-600 to-red-700 flex items-center justify-center p-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Envíos a todo el país
            </h2>
            <p className="text-white/90 text-base sm:text-lg leading-relaxed">
              Garantizamos entregas seguras y puntuales en todas las provincias del Ecuador
            </p>
          </div>
        </div>
        
        {/* Right Content - Map */}
        <div className="hidden md:block w-1/2 relative overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-in-out group-hover:scale-105"
            style={{ 
              backgroundImage: `url(${mapEC})`
            }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-l from-blue-900/40 to-transparent"></div>
        </div>
      </div>
    </section>
  );
};

export default AllStateCoverage;