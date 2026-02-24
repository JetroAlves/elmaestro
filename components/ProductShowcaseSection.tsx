import React from 'react';

const ProductShowcaseSection: React.FC = () => {
  return (
    <section className="bg-[#FCFAE6] py-16 px-4 md:px-8">
      <div className="max-w-[1400px] mx-auto">
        <div className="bg-white rounded-[3rem] shadow-xl md:shadow-2xl p-8 md:p-14 flex flex-col lg:flex-row items-center justify-between gap-10 relative overflow-hidden min-h-[550px]">
          
          {/* Logo Circular com Imagem */}
          <div className="absolute top-10 left-10 z-20">
            <div className="w-24 h-24 bg-[#101010] rounded-full flex flex-col items-center justify-center p-4 shadow-xl border-2 border-white/10">
               <img 
                 src="https://mgqueijos.com.br/wp-content/uploads/2020/05/El-Maestro-copy-300x210.png" 
                 alt="Selo Mg Queijos" 
                 className="w-full h-auto brightness-0 invert opacity-90"
                 style={{ 
                   filter: 'brightness(0) saturate(100%) invert(98%) sepia(4%) saturate(737%) hue-rotate(320deg) brightness(105%) contrast(98%)' 
                 }}
               />
            </div>
          </div>

          {/* Área Central: Imagens de Produtos (Recortados/Transparentes) */}
          <div className="flex flex-col items-center lg:w-[55%] pt-24 lg:pt-0">
            <div className="flex flex-wrap md:flex-nowrap items-center justify-center gap-6 md:gap-8 lg:gap-4 w-full">
              
              {/* Imagem 1: Provolone */}
              <div className="w-40 md:w-52 lg:w-60 transform -rotate-6 hover:rotate-0 transition-transform duration-500 flex-shrink-0">
                <img 
                  src="https://mgqueijos.com.br/wp-content/uploads/2024/04/Provolone-ElMaestro-Cunha-300x300.png" 
                  alt="Queijo Provolone" 
                  className="w-full h-auto drop-shadow-2xl"
                />
              </div>

              {/* Imagem 2: Destaque Central - Queijo Azul */}
              <div className="w-48 md:w-64 lg:w-72 transform rotate-3 hover:rotate-0 transition-transform duration-500 flex-shrink-0 z-10">
                <img 
                  src="https://mgqueijos.com.br/wp-content/uploads/2024/11/Queijo_Azul_Cunha-300x296.png" 
                  alt="Queijo Azul Premium" 
                  className="w-full h-auto drop-shadow-[0_35px_35px_rgba(0,0,0,0.15)]"
                />
              </div>

              {/* Imagem 3: Gouda */}
              <div className="w-40 md:w-52 lg:w-60 transform -rotate-3 hover:rotate-0 transition-transform duration-500 flex-shrink-0">
                <img 
                  src="https://mgqueijos.com.br/wp-content/uploads/2024/04/Gouda-Maturado-Cunha-300x300.png" 
                  alt="Queijo Gouda" 
                  className="w-full h-auto drop-shadow-2xl"
                />
              </div>
            </div>
          </div>

          {/* Lado Direito: Título Ajustado e CTA */}
          <div className="flex flex-col items-center lg:items-end text-center lg:text-right space-y-6 lg:w-[45%] lg:pr-6">
            <h2 className="text-[#101010] text-6xl md:text-7xl lg:text-8xl font-black leading-[0.85] tracking-tighter uppercase font-sans">
              NOSSOS <br/> 
              PRODUTOS<span className="text-[#90784E]">.</span>
            </h2>
            
            <button className="bg-[#101010] text-white px-14 py-5 rounded-full font-black text-sm uppercase tracking-widest hover:scale-105 transition-all shadow-2xl hover:bg-[#90784E] active:scale-95">
              CONFERIR CATÁLOGO
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ProductShowcaseSection;