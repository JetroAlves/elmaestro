import React, { useEffect, useState } from 'react';
import { supabase } from '../services/supabase';

interface StoreLocatorSectionProps {
  onNavigateToStores?: () => void;
}

const StoreLocatorSection: React.FC<StoreLocatorSectionProps> = ({ onNavigateToStores }) => {
  const [locatorProducts, setLocatorProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLocatorProducts = async () => {
      const { data, error } = await supabase
        .from('home_showcase')
        .select('*, products(*)')
        .eq('section_type', 'locator')
        .order('position', { ascending: true });

      if (data && !error) {
        setLocatorProducts(data.map((item: any) => item.products).filter(Boolean));
      }
      setLoading(false);
    };

    fetchLocatorProducts();
  }, []);

  // Fallback para imagens caso não haja destaques configurados
  const defaultImages = [
    "https://mgqueijos.com.br/wp-content/uploads/2024/11/Gorgonzola-El-Maestro-Pe%C3%A7a-286x300.png",
    "https://mgqueijos.com.br/wp-content/uploads/2025/08/Mussarela-Argentino-El-Maestro-Ralado-140g-768x870.png",
    "https://mgqueijos.com.br/wp-content/uploads/2024/11/Queijo_Azul_Cunha-300x296.png",
    "https://mgqueijos.com.br/wp-content/uploads/2024/04/COD-157-MUSS-FAT-140-258x300.png",
    "https://mgqueijos.com.br/wp-content/uploads/2024/11/Gorgonzola-El-Maestro-Pe%C3%A7a-286x300.png",
    "https://mgqueijos.com.br/wp-content/uploads/2024/04/Mussarela-Argentino-El-Maestro-Ralado-25kg-300x300.png"
  ];

  const displayList = locatorProducts.length > 0 ? locatorProducts : defaultImages.map((img, i) => ({ id: i, image: img }));

  return (
    <section className="bg-[#FCFAE6] py-24 px-4 md:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-24">

        {/* Lado Esquerdo: Carrossel Contínuo de Produtos (Imagens Maiores) */}
        <div className="relative w-full lg:w-[65%] overflow-hidden py-10">
          <div className="flex items-center animate-scroll hover:pause-scroll">
            {[...displayList, ...displayList].map((product, index) => (
              <div
                key={`${product.id}-${index}`}
                className="flex-shrink-0 px-10 w-56 md:w-80 lg:w-96 h-[200px] md:h-[300px] flex items-center justify-center"
              >
                <div className="transform transition-transform hover:scale-110 duration-500 w-full h-full flex items-center justify-center">
                  <img
                    src={product.image || product}
                    alt="Mg Queijos Product"
                    className="max-w-full max-h-full object-contain drop-shadow-[0_25px_30px_rgba(0,0,0,0.18)]"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#FCFAE6] to-transparent z-10 pointer-events-none"></div>
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#FCFAE6] to-transparent z-10 pointer-events-none"></div>
        </div>

        {/* Lado Direito: Texto e CTA */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-8 lg:w-[35%] z-20">
          {/* Círculo Preto com Logomarca (Substituindo o ícone branco) */}
          <div className="bg-[#101010] p-4 rounded-full shadow-2xl mb-2 inline-flex items-center justify-center w-20 h-20 border-2 border-white/10 overflow-hidden">
            <img
              src="https://kyflpnhnxnivnuysrszr.supabase.co/storage/v1/object/public/images/204a94a1-f534-43b9-b67e-9a3a2c9b2baf/LogoElMaestro.png"
              alt="Mg Queijos Logo"
              className="w-full h-auto object-contain brightness-0 invert"
              style={{ filter: 'brightness(0) invert(1)' }}
            />
          </div>

          <h2 className="text-[#101010] text-5xl md:text-6xl lg:text-7xl font-black leading-[0.9] uppercase tracking-tighter font-sans">
            ENCONTRE-NOS <br />
            PERTO DE VOCÊ
          </h2>

          <p className="text-[#101010] text-lg md:text-xl font-bold opacity-80 max-w-sm leading-snug">
            A tradição e qualidade do queijo Uruguaio.
          </p>

          <button
            onClick={onNavigateToStores}
            className="bg-[#101010] hover:bg-[#90784E] text-white px-12 py-5 rounded-full font-black text-sm uppercase tracking-widest flex items-center gap-3 transition-all shadow-2xl hover:scale-105 active:scale-95 group"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 group-hover:animate-bounce">
              <path fillRule="evenodd" d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 3.58-3.12c1.01-1.15 1.721-2.309 2.146-3.405C18.558 14.773 19 13.56 19 12.339V8.9a7.35 7.35 0 0 0-3.664-6.387 7.15 7.15 0 0 0-6.672 0A7.35 7.35 0 0 0 5 8.9v3.44c0 1.22.443 2.433 1.104 3.52 1.157 1.9 2.427 3.513 3.58 3.12ZM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clipRule="evenodd" />
            </svg>
            ONDE ENCONTRAR
          </button>
        </div>

      </div>

      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          animation: scroll 40s linear infinite;
        }
        .pause-scroll {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default StoreLocatorSection;