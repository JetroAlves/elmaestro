
import React, { useState } from 'react';
import { getCheesePairing } from '../services/geminiService';
import { PairingSuggestion } from '../types';

const Sommelier: React.FC = () => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [suggestion, setSuggestion] = useState<PairingSuggestion | null>(null);

  const handleAsk = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setLoading(true);
    try {
      const result = await getCheesePairing(input);
      setSuggestion(result);
    } catch (error) {
      console.error("Erro ao consultar Sommelier:", error);
      alert("Nosso mestre queijeiro está ocupado. Tente em breve!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-16 items-center">
      <div className="lg:w-1/2 space-y-8">
        <div className="inline-block px-4 py-1 bg-[#90784E] text-white text-xs font-black rounded-full uppercase mb-4">
          Inovação & Tradição
        </div>
        <h2 className="text-5xl md:text-7xl font-serif text-[#101010] leading-tight text-balance">
          Mestre <br/>
          Sommelier <span className="text-[#90784E]">AI</span>
        </h2>
        <p className="text-xl text-gray-700 font-medium">
          Diga-nos o que você vai beber ou qual é o clima do seu jantar, e nossa inteligência artesanal fará o "pairing" perfeito.
        </p>
        
        <form onSubmit={handleAsk} className="relative max-w-md">
          <input
            className="w-full pl-6 pr-32 py-5 rounded-full border-2 border-[#101010] focus:ring-4 focus:ring-[#90784E]/20 outline-none text-lg bg-white"
            placeholder="Ex: Vinho tinto suave..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button 
            type="submit"
            disabled={loading}
            className={`absolute right-2 top-2 bottom-2 px-6 rounded-full font-black text-xs uppercase transition-all ${
              loading ? 'bg-stone-300' : 'bg-[#101010] text-white hover:bg-[#90784E]'
            }`}
          >
            {loading ? '...' : 'PERGUNTAR'}
          </button>
        </form>
      </div>

      <div className="lg:w-1/2 w-full">
        {suggestion ? (
          <div className="bg-[#101010] p-10 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#90784E] opacity-20 -mr-10 -mt-10 rounded-full"></div>
            
            <h4 className="text-[#90784E] font-serif text-4xl mb-8 border-b border-stone-800 pb-4">
              {suggestion.cheeseName}
            </h4>
            
            <div className="grid gap-8">
              <div>
                <p className="text-stone-500 text-[10px] font-black uppercase tracking-widest mb-2">A Harmonização</p>
                <p className="text-xl font-medium text-stone-100 leading-relaxed">{suggestion.pairing}</p>
              </div>

              <div>
                <p className="text-stone-500 text-[10px] font-black uppercase tracking-widest mb-2">O Vinho Ideal</p>
                <p className="text-2xl font-serif text-[#90784E] underline decoration-stone-700 underline-offset-8">
                  {suggestion.wineSuggestion}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="aspect-video bg-stone-200/50 border-4 border-dashed border-stone-300 rounded-[2.5rem] flex items-center justify-center p-8 text-center">
            <p className="text-stone-400 font-black text-xl uppercase italic tracking-tighter">Aguardando seu desejo...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sommelier;
