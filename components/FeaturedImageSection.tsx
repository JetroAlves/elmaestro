import React, { useEffect, useState } from 'react';
import { supabase } from '../services/supabase';

const FeaturedImageSection: React.FC = () => {
  const [banner, setBanner] = useState<any>(null);

  useEffect(() => {
    const fetchFeatured = async () => {
      const { data, error } = await supabase
        .from('banners')
        .select('*')
        .eq('position', 'featured')
        .eq('is_active', true)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (data && !error) {
        setBanner(data);
      }
    };
    fetchFeatured();
  }, []);

  return (
    <section className="bg-[#101010] py-24 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative rounded-[3rem] overflow-hidden group">
          {/* Imagem de Destaque - Escurecida para melhor contraste */}
          <div className="aspect-[3/4] sm:aspect-square md:aspect-[21/9] w-full relative">
            <img
              src={banner?.image_desktop || "https://sabordaserramg.com.br/wp-content/uploads/2019/05/fonduee.jpg"}
              alt="Queijo Derretido Premium"
              className="w-full h-full object-cover brightness-[0.4] group-hover:scale-105 transition-transform duration-[2s]"
            />

            {/* CTA Button Centered */}
            {banner?.button_text && (
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <button
                  onClick={() => {
                    const link = banner.link || '/produtos';
                    if (link.startsWith('http')) {
                      window.open(link, '_blank');
                    } else {
                      // Usando window.location como fallback ou se houver um router global
                      window.location.href = link;
                    }
                  }}
                  className="bg-white text-[#101010] px-10 py-4 rounded-full font-black text-sm uppercase tracking-widest hover:scale-110 transition-transform shadow-2xl"
                >
                  {banner.button_text}
                </button>
              </div>
            )}

            {/* Overlay de gradiente removido ou simplificado se preferir, mas vou manter para suavizar a imagem */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#101010]/20 via-transparent to-[#101010]/40"></div>
          </div>

        </div>
      </div>

      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 12s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default FeaturedImageSection;