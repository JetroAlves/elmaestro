import React, { useEffect, useState } from 'react';
import { supabase } from '../services/supabase';

interface ProductShowcaseSectionProps {
  onNavigateToProducts?: () => void;
}

const ProductShowcaseSection: React.FC<ProductShowcaseSectionProps> = ({ onNavigateToProducts }) => {
  const [featuredProducts, setFeaturedProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShowcase = async () => {
      const { data, error } = await supabase
        .from('home_showcase')
        .select('*, products(*)')
        .eq('section_type', 'showcase')
        .order('position', { ascending: true });

      if (data && !error) {
        // Garantir que temos exatamente os produtos (extraídos do join)
        setFeaturedProducts(data.map((item: any) => item.products).filter(Boolean));
      }
      setLoading(false);
    };

    fetchShowcase();
  }, []);

  // Se estiver carregando ou não houver produtos, mostramos um estado sutil ou nada
  if (loading && featuredProducts.length === 0) return null;

  // Fallback para imagens caso não haja destaques configurados
  const defaultImages = [
    "https://mgqueijos.com.br/wp-content/uploads/2024/04/Provolone-ElMaestro-Cunha-300x300.png",
    "https://mgqueijos.com.br/wp-content/uploads/2024/11/Queijo_Azul_Cunha-300x296.png",
    "https://mgqueijos.com.br/wp-content/uploads/2024/04/Gouda-Maturado-Cunha-300x300.png"
  ];

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

              {/* Renderizar os 3 produtos ou fallbacks */}
              {[0, 1, 2].map((idx) => {
                const product = featuredProducts[idx];
                const imgSrc = product ? product.image : defaultImages[idx];
                const rotationClasses = idx === 0 ? "-rotate-6" : idx === 1 ? "rotate-3 z-10" : "-rotate-3";

                // Dimensões padronizadas para evitar que um fique muito maior que o outro
                const containerClasses = idx === 1
                  ? "w-48 md:w-64 lg:w-72 h-[250px] md:h-[350px]"
                  : "w-40 md:w-52 lg:w-60 h-[200px] md:h-[300px]";

                const shadowClasses = idx === 1 ? "drop-shadow-[0_35px_35px_rgba(0,0,0,0.15)]" : "drop-shadow-2xl";

                return (
                  <div key={idx} className={`${containerClasses} transform ${rotationClasses} hover:rotate-0 transition-all duration-500 flex-shrink-0 flex items-center justify-center`}>
                    <img
                      src={imgSrc}
                      alt={product?.name || "Queijo Premium"}
                      className={`max-w-full max-h-full object-contain ${shadowClasses}`}
                    />
                  </div>
                );
              })}

            </div>
          </div>

          {/* Lado Direito: Título Ajustado e CTA */}
          <div className="flex flex-col items-center lg:items-end text-center lg:text-right space-y-6 lg:w-[45%] lg:pr-6">
            <h2 className="text-[#101010] text-6xl md:text-7xl lg:text-8xl font-black leading-[0.85] tracking-tighter uppercase font-sans text-balance">
              NOSSOS <br />
              PRODUTOS<span className="text-[#90784E]">.</span>
            </h2>

            <button
              onClick={onNavigateToProducts}
              className="bg-[#101010] text-white px-14 py-5 rounded-full font-black text-sm uppercase tracking-widest hover:scale-105 transition-all shadow-2xl hover:bg-[#90784E] active:scale-95"
            >
              CONFERIR PRODUTOS
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ProductShowcaseSection;