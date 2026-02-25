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

  const handleBannerClick = () => {
    if (!banner) return;
    const link = banner.link || '/produtos';
    if (link.startsWith('http')) {
      window.open(link, '_blank');
    } else {
      window.location.href = link;
    }
  };

  const fallbackUrl = "https://sabordaserramg.com.br/wp-content/uploads/2019/05/fonduee.jpg";

  return (
    <section className="bg-[#101010] py-24 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div
          className="relative rounded-[3rem] overflow-hidden group cursor-pointer"
          onClick={handleBannerClick}
        >
          {/* Background Layer (Video or Image) */}
          <div className="aspect-[3/4] sm:aspect-square md:aspect-[21/9] w-full relative">
            {banner?.video_url ? (
              <video
                src={banner.video_url}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover brightness-[0.5] group-hover:scale-105 transition-transform duration-[2s]"
              />
            ) : (
              <img
                src={banner?.image_desktop || fallbackUrl}
                alt="Highlight"
                className="w-full h-full object-cover brightness-[0.4] group-hover:scale-105 transition-transform duration-[2s]"
              />
            )}

            {/* Sticker / Label (Floating Top Right) */}
            {banner?.sticker_url && (
              <div className="absolute top-8 right-8 z-30 w-32 h-32 md:w-48 md:h-48 group-hover:scale-110 transition-transform duration-700">
                <div className="w-full h-full rounded-full overflow-hidden border-4 border-white/20 shadow-2xl backdrop-blur-sm bg-white/10 flex items-center justify-center p-4">
                  <img
                    src={banner.sticker_url}
                    alt="Sticker"
                    className="w-full h-full object-contain animate-spin-slow"
                  />
                </div>
              </div>
            )}

            {/* Dark overlay for extra depth */}
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