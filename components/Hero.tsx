import React, { useEffect, useState } from 'react';
import { supabase } from '../services/supabase';

interface HeroProps {
  onNavigateToProducts?: () => void;
  onNavigateToStores?: () => void;
}

const Hero: React.FC<HeroProps> = ({ onNavigateToProducts, onNavigateToStores }) => {
  const [banner, setBanner] = useState<any>(null);

  useEffect(() => {
    const fetchHero = async () => {
      const { data, error } = await supabase
        .from('banners')
        .select('*')
        .eq('position', 'hero')
        .eq('is_active', true)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (data && !error) {
        setBanner(data);
      }
    };
    fetchHero();
  }, []);

  const handleCTA = () => {
    const link = banner?.link || '/produtos';

    if (link === '/produtos' && onNavigateToProducts) {
      onNavigateToProducts();
    } else if (link === '/onde-comprar' && onNavigateToStores) {
      onNavigateToStores();
    } else if (link.startsWith('http')) {
      window.open(link, '_blank');
    } else {
      // Fallback para navegação interna se houver mais rotas no futuro
      onNavigateToProducts?.();
    }
  };

  const bannerUrl = banner?.image_desktop || "https://gastronomiacarioca.zonasul.com.br/wp-content/uploads/2021/03/queijos_vinhos_rodrigo_azevedo_zona_sul.jpg";

  return (
    <section className="relative">
      <div className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <img
          src={bannerUrl}
          alt="Queijo premium"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30"></div>

        {banner?.button_text && (
          <div className="relative z-10">
            <button
              onClick={handleCTA}
              className="bg-white text-[#101010] px-12 py-5 rounded-full font-black text-sm uppercase tracking-[0.2em] hover:scale-105 transition-transform shadow-2xl"
            >
              {banner.button_text}
            </button>
          </div>
        )}
      </div>

      {/* Wave Divider */}
      <div className="absolute -bottom-1 left-0 w-full overflow-hidden leading-[0]">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-20 fill-[#FCFAE6]">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C58.47,87,121.78,92,179.45,84.41,232.06,77.5,273.1,65.39,321.39,56.44Z"></path>
        </svg>
      </div>
    </section>
  );
};

export default Hero;