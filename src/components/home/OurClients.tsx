import { useState } from "react";
import Tooltip from "@mui/material/Tooltip";
import "./main.css"

const ClientTicker = ({ data }: Record<string, any>) => {
  const clientImages = data.ourClients;
  const [paused, setPaused] = useState(false);

  // Duplicamos los clientes para efecto infinito
  const tickerClients = [...clientImages, ...clientImages];

  return (
    <section className="bg-red-600 py-10 px-4 md:px-[200px]">
      <h2 className="text-white text-2xl font-bold text-center mb-6">
        NUESTROS CLIENTES
      </h2>

      <div
        className="overflow-hidden relative"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Filtros de borde difuminado */}
        <div className="ticker-fade-left" />
        <div className="ticker-fade-right" />

        <div
          className={`flex w-max gap-6 animate-ticker ${paused ? "paused" : ""}`}
        >
          {tickerClients.map((elem: Record<string, any>, i: number) => (
            <Tooltip key={i} title={elem.name} arrow>
              <div className="w-20 h-20 bg-white rounded-full overflow-hidden border-2 border-white flex-shrink-0">
                <img
                  src={elem.clientImage}
                  alt={`cliente-${i}`}
                  className="w-full h-full object-cover"
                />
              </div>
            </Tooltip>
          ))}
        </div>
      </div>


      <p className="text-center text-white font-semibold mt-6 text-sm md:text-base">
        AGRADECEMOS POR LA CONFIANZA EN NUESTROS SISTEMAS ANTIHURTO
      </p>
    </section>
  );
};

export default ClientTicker;
