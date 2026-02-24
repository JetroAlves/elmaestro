import React, { useState, useEffect } from 'react';
import { supabase } from '../services/supabase';

const StoreLocatorPage: React.FC = () => {
  const [stores, setStores] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("Todos");

  useEffect(() => {
    const fetchStores = async () => {
      const { data, error } = await supabase.from('stores').select('*');
      if (data && !error) {
        setStores(data);
      }
      setLoading(false);
    };
    fetchStores();
  }, []);

  const filteredStores = stores.filter(store => {
    const matchesSearch = (store.address && store.address.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (store.name && store.name.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesFilter = activeFilter === "Todos" || store.type === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const handleOpenMap = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
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
                placeholder="Digite seu CEP ou Cidade"
                className="w-full bg-white rounded-full py-5 px-10 text-[#101010] font-bold text-lg focus:ring-4 focus:ring-[#90784E]/30 outline-none transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6 absolute right-6 top-1/2 -translate-y-1/2 text-stone-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
            </div>
            <button className="bg-[#90784E] text-white px-10 py-5 rounded-full font-black text-sm uppercase tracking-widest hover:brightness-110 transition-all shadow-xl">
              BUSCAR PONTOS
            </button>
          </div>
        </div>
      </section>

      {/* Main Content: List + Map */}
      <div className="flex-grow flex flex-col lg:flex-row">

        {/* Lado Esquerdo: Lista de Lojas */}
        <aside className="w-full lg:w-[450px] bg-white border-r border-stone-100 flex flex-col h-[600px] lg:h-auto">
          <div className="p-8 border-b border-stone-100">
            <h2 className="text-[#101010] font-[900] text-xl uppercase tracking-tighter mb-6 flex items-center justify-between">
              Resultados
              <span className="bg-[#FCFAE6] text-[#90784E] px-3 py-1 rounded-full text-[10px]">{filteredStores.length} LOCAIS</span>
            </h2>

            <div className="flex gap-2 overflow-x-auto no-scrollbar">
              {["Todos", "Supermercado", "Empório Gourmet"].map(filter => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`flex-shrink-0 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all
                    ${activeFilter === filter ? 'bg-[#101010] text-white' : 'bg-stone-100 text-stone-500 hover:bg-stone-200'}`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-grow overflow-y-auto no-scrollbar p-4 space-y-4">
            {loading ? (
              <div className="text-center py-20 font-black uppercase tracking-widest text-[#101010]/40">Buscando Lojas...</div>
            ) : filteredStores.length === 0 ? (
              <div className="text-center py-20 font-black uppercase tracking-widest text-[#101010]/40">Nenhuma loja encontrada</div>
            ) : filteredStores.map(store => (
              <div key={store.id} className="group p-6 rounded-3xl border-2 border-stone-50 hover:border-[#90784E] transition-all cursor-pointer bg-white">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-[#90784E] font-black text-[10px] uppercase tracking-widest">{store.type}</span>
                  <span className="text-stone-400 font-bold text-[10px]">{store.distance}</span>
                </div>
                <h3 className="text-[#101010] text-xl font-[900] uppercase tracking-tighter mb-2 group-hover:text-[#90784E] transition-colors">{store.name}</h3>
                <p className="text-stone-500 text-sm font-medium mb-6">{store.address}</p>
                <div className="flex gap-3">
                  <button
                    onClick={() => handleOpenMap(store.mapUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(store.name + ' ' + (store.address || ''))}`)}
                    className="flex-1 bg-[#101010] text-white py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[#90784E] transition-colors"
                  >
                    Como Chegar
                  </button>
                  {store.phone && (
                    <a
                      href={`tel:${store.phone.replace(/\D/g, '')}`}
                      className="w-12 h-12 flex items-center justify-center border-2 border-stone-100 rounded-xl text-stone-400 hover:text-[#90784E] hover:border-[#90784E] transition-all"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* Lado Direito: Mapa Visual (Placeholder estilizado) */}
        <div className="flex-grow bg-stone-200 relative overflow-hidden h-[400px] lg:h-auto">
          {/* Overlay de Textura de Mapa */}
          <div className="absolute inset-0 grayscale opacity-40 mix-blend-multiply">
            <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=1600" className="w-full h-full object-cover" alt="Mapa Background" />
          </div>

          {/* Marcadores Estilizados */}
          <div className="absolute top-1/4 left-1/3">
            <div className="relative group">
              <div className="w-10 h-10 bg-[#101010] rounded-full border-4 border-white shadow-2xl flex items-center justify-center text-white scale-125">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path fillRule="evenodd" d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 3.58-3.12c1.01-1.15 1.721-2.309 2.146-3.405C18.558 14.773 19 13.56 19 12.339V8.9a7.35 7.35 0 0 0-3.664-6.387 7.15 7.15 0 0 0-6.672 0A7.35 7.35 0 0 0 5 8.9v3.44c0 1.22.443 2.433 1.104 3.52 1.157 1.9 2.427 3.513 3.58 3.12ZM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full mb-4 bg-white p-4 rounded-2xl shadow-2xl w-48 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                <p className="font-black text-xs uppercase tracking-tighter mb-1">Empório Santa Maria</p>
                <p className="text-[10px] text-stone-500 font-medium">Aberto até às 22h</p>
              </div>
            </div>
          </div>

          <div className="absolute top-1/2 right-1/4">
            <div className="w-10 h-10 bg-[#90784E] rounded-full border-4 border-white shadow-2xl flex items-center justify-center text-white animate-bounce">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path fillRule="evenodd" d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 3.58-3.12c1.01-1.15 1.721-2.309 2.146-3.405C18.558 14.773 19 13.56 19 12.339V8.9a7.35 7.35 0 0 0-3.664-6.387 7.15 7.15 0 0 0-6.672 0A7.35 7.35 0 0 0 5 8.9v3.44c0 1.22.443 2.433 1.104 3.52 1.157 1.9 2.427 3.513 3.58 3.12ZM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clipRule="evenodd" />
              </svg>
            </div>
          </div>

          {/* Map Info Toast */}
          <div className="absolute bottom-8 right-8 bg-white/90 backdrop-blur px-6 py-4 rounded-2xl shadow-2xl border border-white/50">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <p className="text-[10px] font-black uppercase tracking-widest text-[#101010]">Mostrando pontos em São Paulo e região</p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default StoreLocatorPage;