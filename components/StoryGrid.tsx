import React, { useRef, useState, useEffect } from 'react';
import { supabase } from '../services/supabase';

const DEFAULT_STORIES = [
  {
    id: 's1',
    title: "QUEIJO AZUL",
    text: "Intensidade e sofisticação em cada detalhe.",
    image: "https://mgqueijos.com.br/wp-content/uploads/2024/11/Queijo_Azul_Cunha-300x296.png",
    bg_color: "bg-blue-50"
  },
  {
    id: 's2',
    title: "TRADIÇÃO URUGUAIA",
    text: "O autêntico sabor que atravessa fronteiras.",
    image: "https://kyflpnhnxnivnuysrszr.supabase.co/storage/v1/object/public/images/204a94a1-f534-43b9-b67e-9a3a2c9b2baf/LogoElMaestro.png",
    is_special: true,
    bg_color: "bg-[#101010]"
  },
  {
    id: 's3',
    title: "GOURMET SELECTION",
    text: "Uma curadoria exclusiva para os paladares mais exigentes.",
    image: "https://mgqueijos.com.br/wp-content/uploads/2024/04/Gouda-Maturado-Cunha-300x300.png",
    bg_color: "bg-amber-50"
  }
];

const StoryGrid: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [stories, setStories] = useState<any[]>(DEFAULT_STORIES);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStories = async () => {
      const { data, error } = await supabase
        .from('story_grid')
        .select('*')
        .order('sorting_order', { ascending: true });

      if (data && !error) {
        setStories(data);
      }
      setLoading(false);
    };
    fetchStories();
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft } = scrollRef.current;
      const scrollAmount = 350;
      const scrollTo = direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  if (loading && stories.length === 0) return null;
  if (stories.length === 0) return (
    <div className="py-20 text-center font-black uppercase tracking-widest text-[#101010]/20">
      Contando nossa história...
    </div>
  );

  return (
    <section className="relative bg-[#FCFAE6] py-16 md:py-24 overflow-hidden">
      {/* Botões de Navegação */}
      <div className="absolute inset-y-0 left-4 md:left-8 z-30 flex items-center">
        <button
          onClick={() => scroll('left')}
          className="w-16 h-16 rounded-full flex items-center justify-center text-[#101010] hover:bg-[#101010]/5 active:scale-95 transition-all"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-10 h-10">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>
      </div>

      <div className="absolute inset-y-0 right-4 md:right-8 z-30 flex items-center">
        <button
          onClick={() => scroll('right')}
          className="w-16 h-16 rounded-full flex items-center justify-center text-[#101010] hover:bg-[#101010]/5 active:scale-95 transition-all"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-10 h-10">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      </div>

      {/* Container de Scroll centralizado em telas grandes */}
      <div
        ref={scrollRef}
        className="flex gap-8 md:gap-10 overflow-x-auto snap-x snap-mandatory no-scrollbar scroll-smooth pl-28 pr-6 md:pl-36 md:pr-10 lg:pl-44 lg:pr-12 max-w-[1600px] mx-auto"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none'
        }}
      >
        {stories.map((story) => (
          <div
            key={story.id}
            className="flex-shrink-0 w-[80vw] sm:w-[300px] md:w-[340px] snap-start flex flex-col space-y-6"
          >
            {/* CARD */}
            <div className={`relative rounded-[2.5rem] overflow-hidden shadow-xl ${story.bg_color || 'bg-white'} aspect-square`}>
              {story.is_special ? (
                <div className="w-full h-full flex flex-col items-center justify-center p-8 relative">
                  <div className="w-14 h-14 bg-[#101010] rounded-full flex items-center justify-center mb-6 shadow-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-5.75c-.622 0-1.125.504-1.125 1.125v3.375m9 0ZM9 10.5a3 3 0 1 1 6 0v3.375H9V10.5Z" />
                    </svg>
                  </div>
                  <img src={story.image} className="w-40 h-auto object-contain transform rotate-6 drop-shadow-2xl" alt="Produto Premiado" />

                  <div className="absolute bottom-4 right-4 bg-[#101010] text-white p-2 rounded-full text-[8px] font-black uppercase tracking-tighter w-12 h-12 flex items-center justify-center text-center leading-none border-2 border-white">
                    AWARD WINNING
                  </div>
                </div>
              ) : (
                <img
                  src={story.image}
                  alt={story.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              )}
            </div>

            {/* TEXTO */}
            <div className="space-y-4 px-2">
              <h3 className="text-[#101010] font-black text-xl md:text-2xl leading-tight uppercase tracking-tighter font-sans">
                {story.title}
              </h3>
              <p className="text-[#101010] text-sm md:text-base leading-relaxed font-bold opacity-75">
                {story.text}
              </p>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default StoryGrid;
