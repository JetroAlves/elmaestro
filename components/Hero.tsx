import React, { useEffect, useState, useRef, useCallback } from 'react';
import { supabase } from '../services/supabase';

interface HeroProps {
  onNavigateToProducts?: () => void;
  onNavigateToStores?: () => void;
}

const SLIDE_INTERVAL = 5000; // 5 seconds

const Hero: React.FC<HeroProps> = ({ onNavigateToProducts, onNavigateToStores }) => {
  const [banners, setBanners] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Fetch ALL active hero banners
  useEffect(() => {
    const fetchHeroBanners = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('banners')
          .select('*')
          .eq('position', 'hero')
          .eq('is_active', true)
          .order('created_at', { ascending: false });

        if (data && !error && data.length > 0) {
          setBanners(data);
        }
      } catch (err) {
        console.error("Error fetching banners:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchHeroBanners();
  }, []);

  // Auto-rotation timer
  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (banners.length <= 1) return;

    timerRef.current = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % banners.length);
    }, SLIDE_INTERVAL);
  }, [banners.length]);

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [startTimer]);

  // Manual navigation — reset timer on click
  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    startTimer();
  };

  const currentBanner = banners[currentIndex] || null;

  const handleCTA = () => {
    if (!currentBanner) return;
    const link = currentBanner.link || '/produtos';

    if (link === '/produtos' && onNavigateToProducts) {
      onNavigateToProducts();
    } else if (link === '/onde-comprar' && onNavigateToStores) {
      onNavigateToStores();
    } else if (link.startsWith('http')) {
      window.open(link, '_blank');
    } else {
      onNavigateToProducts?.();
    }
  };

  const fallbackUrl = "https://gastronomiacarioca.zonasul.com.br/wp-content/uploads/2021/03/queijos_vinhos_rodrigo_azevedo_zona_sul.jpg";

  return (
    <section className="relative">
      <div className="relative h-[90vh] flex items-center justify-center overflow-hidden">

        {/* Banner layers — all stacked, crossfade via opacity */}
        {banners.length > 0 ? (
          banners.map((banner, index) => (
            <div
              key={banner.id}
              className="absolute inset-0 transition-all duration-1000 ease-in-out"
              style={{
                opacity: index === currentIndex ? 1 : 0,
                transform: index === currentIndex ? 'scale(1)' : 'scale(1.05)',
                zIndex: index === currentIndex ? 1 : 0,
              }}
            >
              {/* Desktop Video or Image */}
              {banner.video_url ? (
                <video
                  src={banner.video_url}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className={`absolute inset-0 w-full h-full object-cover ${banner.image_mobile ? 'hidden md:block' : ''}`}
                />
              ) : (
                <img
                  src={banner.image_desktop || fallbackUrl}
                  alt={banner.button_text || 'Banner'}
                  className={`absolute inset-0 w-full h-full object-cover ${banner.image_mobile ? 'hidden md:block' : ''}`}
                />
              )}

              {/* Mobile image (if available) */}
              {banner.image_mobile && (
                <img
                  src={banner.image_mobile}
                  alt={banner.button_text || 'Banner'}
                  className="absolute inset-0 w-full h-full object-cover md:hidden"
                />
              )}
            </div>
          ))
        ) : !loading ? (
          <img
            src={fallbackUrl}
            alt="Queijo premium"
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-[#101010] animate-pulse"></div>
        )}

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/30 z-[2]"></div>

        {/* CTA Button */}
        {currentBanner?.button_text && (
          <div className="relative z-10">
            <button
              onClick={handleCTA}
              className="bg-white text-[#101010] px-12 py-5 rounded-full font-black text-sm uppercase tracking-[0.2em] hover:scale-105 transition-transform shadow-2xl"
            >
              {currentBanner.button_text}
            </button>
          </div>
        )}

        {/* Dots — only if more than 1 banner */}
        {banners.length > 1 && (
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 flex gap-3">
            {banners.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`rounded-full transition-all duration-300 ${index === currentIndex
                  ? 'w-8 h-3 bg-white'
                  : 'w-3 h-3 bg-white/40 hover:bg-white/70'
                  }`}
                aria-label={`Banner ${index + 1}`}
              />
            ))}
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