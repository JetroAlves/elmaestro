import React, { useState, useMemo } from 'react';
import { STORES, Store } from '../data/stores';

const ITEMS_PER_PAGE = 50;

// Normalize string for search (remove accents, lowercase)
function normalize(str: string): string {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
}

// Format CEP as 00000-000
function formatCep(cep: string): string {
  const clean = cep.replace(/\D/g, '').padStart(8, '0');
  return `${clean.slice(0, 5)}-${clean.slice(5)}`;
}

// Format phone for display
function formatPhone(phone: string): string {
  if (!phone || phone.length < 10) return phone;
  if (phone.length === 11) return `(${phone.slice(0, 2)}) ${phone.slice(2, 7)}-${phone.slice(7)}`;
  if (phone.length === 10) return `(${phone.slice(0, 2)}) ${phone.slice(2, 6)}-${phone.slice(6)}`;
  return phone;
}

// Extract unique states from data, sorted
const ALL_STATES = Array.from(new Set(STORES.map(s => s.state)))
  .filter(s => s && s.length > 2)
  .sort();

const StoreLocatorPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeState, setActiveState] = useState("Todos");
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  // Determine if search is CEP-based (only digits) or text-based
  const isSearchingByCep = /^\d+$/.test(searchTerm.replace(/[-.\s]/g, ''));

  const filteredStores = useMemo(() => {
    const cleanSearch = searchTerm.trim();

    // If no search term, handle state filtering only
    if (!cleanSearch) {
      return STORES.filter(store => activeState === "Todos" || store.state === activeState);
    }

    if (isSearchingByCep) {
      const term = cleanSearch.replace(/\D/g, '');
      return STORES.filter(store => {
        if (activeState !== "Todos" && store.state !== activeState) return false;
        const cleanCep = store.cep.replace(/\D/g, '');
        return cleanCep.startsWith(term);
      });
    } else {
      const term = normalize(cleanSearch);
      return STORES.filter(store => {
        if (activeState !== "Todos" && store.state !== activeState) return false;

        // Text search: name, city, neighborhood, address
        const searchable = normalize(
          `${store.name} ${store.city} ${store.neighborhood} ${store.address}`
        );
        return searchable.includes(term);
      });
    }
  }, [searchTerm, activeState, isSearchingByCep]);

  // Reset visible count when filters change
  const displayedStores = filteredStores.slice(0, visibleCount);
  const hasMore = visibleCount < filteredStores.length;

  const handleSearch = () => {
    setVisibleCount(ITEMS_PER_PAGE);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSearch();
  };

  const handleOpenMap = (store: Store) => {
    const query = encodeURIComponent(`${store.name} ${store.address} ${store.city} ${store.state}`);
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="bg-[#FCFAE6] min-h-screen flex flex-col">
      {/* Hero Search Section */}
      <section className="bg-[#101010] py-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <span className="text-[#90784E] font-black text-xs uppercase tracking-[0.4em] mb-4 block">
            Onde Encontrar
          </span>
          <h1 className="text-white text-5xl md:text-8xl font-[900] uppercase tracking-tighter leading-none mb-12">
            ESTAMOS ONDE <br /> <span className="text-[#90784E]">VOCÊ ESTÁ.</span>
          </h1>

          <div className="max-w-3xl mx-auto flex flex-col md:flex-row gap-4">
            <div className="flex-grow relative">
              <input
                type="text"
                placeholder="Buscar por CEP, cidade ou loja..."
                className="w-full bg-white rounded-full py-4 md:py-5 px-6 md:px-12 text-[#101010] font-bold text-base md:text-lg focus:ring-4 focus:ring-[#90784E]/30 outline-none transition-all"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setVisibleCount(ITEMS_PER_PAGE);
                }}
                onKeyDown={handleKeyDown}
              />
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6 absolute right-6 top-1/2 -translate-y-1/2 text-stone-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
            </div>
            <button
              onClick={handleSearch}
              className="bg-[#90784E] text-white px-10 py-4 md:py-5 rounded-full font-black text-sm uppercase tracking-widest hover:brightness-110 transition-all shadow-xl"
            >
              BUSCAR PONTOS
            </button>
          </div>

          {/* Search hint */}
          {searchTerm && (
            <p className="text-white/50 text-sm mt-4 font-medium">
              {isSearchingByCep
                ? `🔢 Buscando por CEP: ${searchTerm}`
                : `🔤 Buscando por nome/cidade: "${searchTerm}"`}
            </p>
          )}
        </div>
      </section>

      {/* Main Content: List + Map */}
      <div className="flex-grow flex flex-col lg:flex-row">

        {/* Lado Esquerdo: Lista de Lojas */}
        <aside className="w-full lg:w-[500px] bg-white border-r border-stone-100 flex flex-col" style={{ minHeight: '600px' }}>
          <div className="p-8 border-b border-stone-100">
            <h2 className="text-[#101010] font-[900] text-xl uppercase tracking-tighter mb-6 flex items-center justify-between">
              Resultados
              <span className="bg-[#FCFAE6] text-[#90784E] px-3 py-1 rounded-full text-[10px]">{filteredStores.length} LOCAIS</span>
            </h2>

            {/* State filters — horizontal scroll */}
            <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-stone-200 scrollbar-track-transparent">
              <button
                onClick={() => { setActiveState("Todos"); setVisibleCount(ITEMS_PER_PAGE); }}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all
                  ${activeState === "Todos" ? 'bg-[#101010] text-white' : 'bg-stone-100 text-stone-500 hover:bg-stone-200'}`}
              >
                Todos
              </button>
              {ALL_STATES.map(state => (
                <button
                  key={state}
                  onClick={() => { setActiveState(state); setVisibleCount(ITEMS_PER_PAGE); }}
                  className={`flex-shrink-0 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all
                    ${activeState === state ? 'bg-[#101010] text-white' : 'bg-stone-100 text-stone-500 hover:bg-stone-200'}`}
                >
                  {state}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-grow overflow-y-auto no-scrollbar p-4 space-y-4" style={{ maxHeight: 'calc(100vh - 200px)' }}>
            {filteredStores.length === 0 ? (
              <div className="text-center py-20">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 mx-auto mb-4 text-stone-300">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                </svg>
                <p className="font-black uppercase tracking-widest text-[#101010]/40 text-sm">Nenhuma loja encontrada</p>
                <p className="text-stone-400 text-xs mt-2">Tente buscar por outro CEP, cidade ou nome</p>
              </div>
            ) : (
              <>
                {displayedStores.map(store => (
                  <div key={store.id} className="group p-6 rounded-3xl border-2 border-stone-50 hover:border-[#90784E] transition-all cursor-pointer bg-white hover:shadow-lg">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-[#90784E] font-black text-[10px] uppercase tracking-widest">{store.state}</span>
                      <span className="text-stone-400 font-bold text-[10px] bg-stone-50 px-2 py-1 rounded-full">{formatCep(store.cep)}</span>
                    </div>
                    <h3 className="text-[#101010] text-lg font-[900] uppercase tracking-tighter mb-1 group-hover:text-[#90784E] transition-colors leading-tight">{store.name}</h3>
                    <p className="text-stone-500 text-sm font-medium mb-1">{store.address}</p>
                    <p className="text-stone-400 text-xs font-medium mb-4">{store.neighborhood} — {store.city}, {store.state}</p>
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleOpenMap(store)}
                        className="flex-1 bg-[#101010] text-white py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[#90784E] transition-colors"
                      >
                        Como Chegar
                      </button>
                      {store.phone && (
                        <a
                          href={`tel:${store.phone}`}
                          className="w-12 h-12 flex items-center justify-center border-2 border-stone-100 rounded-xl text-stone-400 hover:text-[#90784E] hover:border-[#90784E] transition-all"
                          title={formatPhone(store.phone)}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>
                ))}

                {/* Load More */}
                {hasMore && (
                  <div className="text-center py-6">
                    <button
                      onClick={() => setVisibleCount(prev => prev + ITEMS_PER_PAGE)}
                      className="bg-[#101010] text-white px-8 py-4 rounded-full font-black text-xs uppercase tracking-widest hover:bg-[#90784E] transition-colors"
                    >
                      Carregar mais ({filteredStores.length - visibleCount} restantes)
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </aside>

        {/* Lado Direito: Info Panel */}
        <div className="flex-grow bg-stone-100 relative overflow-hidden h-[500px] lg:h-auto flex flex-col items-center justify-center">
          {/* Background Image */}
          <div className="absolute inset-0 grayscale opacity-30 mix-blend-multiply">
            <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=1600" className="w-full h-full object-cover" alt="Mapa Background" />
          </div>

          {/* Stats Overlay */}
          <div className="relative z-10 text-center space-y-8 p-6 md:p-8">
            <div className="bg-white/90 backdrop-blur-xl p-6 md:p-10 rounded-[2rem] shadow-2xl border border-white/50 max-w-md mx-auto">
              <div className="w-16 h-16 bg-[#101010] rounded-full flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 text-[#90784E]">
                  <path fillRule="evenodd" d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 3.58-3.12c1.01-1.15 1.721-2.309 2.146-3.405C18.558 14.773 19 13.56 19 12.339V8.9a7.35 7.35 0 0 0-3.664-6.387 7.15 7.15 0 0 0-6.672 0A7.35 7.35 0 0 0 5 8.9v3.44c0 1.22.443 2.433 1.104 3.52 1.157 1.9 2.427 3.513 3.58 3.12ZM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="text-6xl font-[900] text-[#101010] tracking-tighter mb-2">{STORES.length}</p>
              <p className="text-sm font-black uppercase tracking-widest text-stone-500 mb-6">Pontos de venda</p>

              <div className="grid grid-cols-2 gap-4 pt-6 border-t border-stone-100">
                <div>
                  <p className="text-2xl font-[900] text-[#90784E] tracking-tighter">{ALL_STATES.length}</p>
                  <p className="text-[10px] font-black uppercase tracking-widest text-stone-400">Estados</p>
                </div>
                <div>
                  <p className="text-2xl font-[900] text-[#90784E] tracking-tighter">
                    {new Set(STORES.map(s => s.city)).size}
                  </p>
                  <p className="text-[10px] font-black uppercase tracking-widest text-stone-400">Cidades</p>
                </div>
              </div>
            </div>

            {/* Active filter toast */}
            {(searchTerm || activeState !== "Todos") && (
              <div className="bg-white/90 backdrop-blur px-6 py-4 rounded-2xl shadow-2xl border border-white/50 inline-flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${filteredStores.length > 0 ? 'bg-green-500' : 'bg-red-400'}`}></div>
                <p className="text-[10px] font-black uppercase tracking-widest text-[#101010]">
                  {filteredStores.length} {filteredStores.length === 1 ? 'ponto encontrado' : 'pontos encontrados'}
                  {activeState !== "Todos" && ` em ${activeState}`}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .scrollbar-thin::-webkit-scrollbar {
          height: 6px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: transparent;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: #e5e7eb;
          border-radius: 10px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: #90784E;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default StoreLocatorPage;