import React, { useState, useEffect } from 'react';
import { supabase } from '../services/supabase';

const DEFAULT_SLIDES = [
  {
    id: 'default-1',
    label: "FEITO PARA UMA NOITE DE CINEMA.",
    title: "APROVEITE AS FESTAS.",
    button_text: "REÚNAM-SE",
    image: "https://kyflpnhnxnivnuysrszr.supabase.co/storage/v1/object/public/images/204a94a1-f534-43b9-b67e-9a3a2c9b2baf/Queijo_Gouda_Maturado.png",
    pattern_color: "bg-[#101010]"
  },
  {
    id: 'default-2',
    label: "SABOR QUE APAIXONA.",
    title: "MOMENTOS ESPECIAIS.",
    button_text: "DESCUBRA MAIS",
    image: "https://mgqueijos.com.br/wp-content/uploads/2024/11/Queijo_Azul_Cunha-300x296.png",
    pattern_color: "bg-[#90784E]"
  }
];

interface PromotionCarouselProps {
  onSelectProduct?: (product: any) => void;
}

const PromotionCarousel: React.FC<PromotionCarouselProps> = ({ onSelectProduct }) => {
  const [slides, setSlides] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      const [slidesRes, productsRes] = await Promise.all([
        supabase.from('promotion_carousel').select('*').order('sorting_order', { ascending: true }),
        supabase.from('products').select('*')
      ]);

      if (slidesRes.data && slidesRes.data.length > 0) {
        setSlides(slidesRes.data);
      } else {
        setSlides(DEFAULT_SLIDES);
      }

      if (productsRes.data) {
        setProducts(productsRes.data);
      }

      setLoading(false);
    };
    fetchContent();
  }, []);

  if (loading && slides.length === 0) return null;
  if (slides.length === 0) return (
    <div className="py-20 text-center font-black uppercase tracking-widest text-[#101010]/20">
      Aguardando promoções...
    </div>
  );

  const next = () => {
    if (slides.length > 0) setCurrent((prev) => (prev + 1) % slides.length);
  };
  const prev = () => {
    if (slides.length > 0) setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const slide = slides[current] || DEFAULT_SLIDES[0];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="bg-white rounded-[3rem] overflow-hidden shadow-xl flex flex-col md:flex-row h-auto md:h-[600px]">

        {/* Lado Esquerdo: Imagem com Padrão */}
        <div className={`md:w-1/2 relative p-8 md:p-12 flex items-center justify-center ${slide?.pattern_color || 'bg-[#101010]'} transition-colors duration-500 h-[400px] md:h-full`}>
          {/* Padrão de Pontos (Dots Pattern) */}
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: 'radial-gradient(circle, #ffffff 2px, transparent 2px)',
            backgroundSize: '24px 24px'
          }}></div>

          <div className="relative z-10 w-full h-full flex items-center justify-center">
            <img
              src={slide?.image}
              alt={slide?.title}
              className="max-w-full max-h-full w-auto h-auto object-contain rounded-[2rem] shadow-2xl transform -rotate-2 hover:rotate-0 transition-transform duration-500"
            />
          </div>
        </div>

        {/* Lado Direito: Conteúdo - Cor atualizada para #101010 */}
        <div className="md:w-1/2 flex flex-col items-center justify-center text-center p-8 md:p-16 space-y-8">
          <p className="text-[#101010] font-extrabold tracking-[0.2em] text-xs md:text-sm">
            {slide?.label}
          </p>

          <h2 className="text-[#101010] text-5xl md:text-7xl font-serif leading-[0.9] uppercase tracking-tighter">
            {slide?.title?.split(' ').map((word: string, i: number) => (
              <React.Fragment key={i}>
                {word} <br />
              </React.Fragment>
            )) || slide?.title}
          </h2>

          <button
            onClick={() => {
              if (onSelectProduct && slide.product_id) {
                const linkedProduct = products.find(p => p.id === slide.product_id);
                if (linkedProduct) onSelectProduct(linkedProduct);
              }
            }}
            className="bg-[#101010] text-white px-10 py-4 rounded-full font-black text-sm tracking-widest hover:scale-105 transition-transform"
          >
            {slide?.button_text}
          </button>

          {/* Navegação - Cores atualizadas para #101010 */}
          <div className="flex items-center gap-6 pt-4">
            <button
              onClick={prev}
              className="p-2 border-2 border-[#101010] text-[#101010] rounded-full hover:bg-[#101010] hover:text-white transition-colors group"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>

            <span className="text-[#101010] font-black text-sm tabular-nums">
              {current + 1}/{slides.length}
            </span>

            <button
              onClick={next}
              className="p-2 border-2 border-[#101010] text-[#101010] rounded-full hover:bg-[#101010] hover:text-white transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromotionCarousel;
