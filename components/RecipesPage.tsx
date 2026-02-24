import React, { useState, useMemo, useEffect } from 'react';
import { supabase } from '../services/supabase';

const CATEGORIES = ["Todas", "Almoço", "Jantar", "Petiscos", "Sobremesas", "Café da Manhã"];

interface RecipesPageProps {
  onSelectRecipe: (recipe: any) => void;
}

const RecipesPage: React.FC<RecipesPageProps> = ({ onSelectRecipe }) => {
  const [recipes, setRecipes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("Todas");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchRecipes = async () => {
      const { data, error } = await supabase.from('recipes').select('*');
      if (data && !error) {
        setRecipes(data);
      }
      setLoading(false);
    };
    fetchRecipes();
  }, []);

  const filteredRecipes = useMemo(() => {
    return recipes.filter(recipe => {
      const matchesCategory = activeCategory === "Todas" || recipe.category === activeCategory;
      const matchesSearch = recipe.title ? recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) : recipe.name.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [recipes, activeCategory, searchTerm]);

  return (
    <div className="bg-[#FCFAE6] min-h-screen">
      {/* Recipe Hero */}
      <div className="bg-[#101010] py-24 px-4 md:px-8">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <span className="text-[#90784E] font-black text-xs uppercase tracking-[0.3em] mb-4">Cozinhando com Tradição</span>
          <h1 className="text-5xl md:text-8xl font-[900] text-white uppercase tracking-tighter leading-none mb-10">
            RECEITAS <br />
          </h1>

          <div className="w-full max-w-xl relative">
            <input
              type="text"
              placeholder="Qual prato vamos criar hoje?"
              className="w-full bg-white/10 border-2 border-white/20 rounded-full py-4 px-8 text-white placeholder:text-white/40 focus:border-[#90784E] outline-none transition-all font-medium"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Categories Bar */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 -mt-8 relative z-10 overflow-x-auto no-scrollbar pb-4">
        <div className="flex justify-center gap-4 min-w-max">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-8 py-4 rounded-full font-black text-xs uppercase tracking-widest transition-all shadow-xl
                ${activeCategory === cat
                  ? 'bg-[#90784E] text-white'
                  : 'bg-white text-[#101010] hover:bg-gray-50'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Recipes Grid */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-20">
        {loading ? (
          <div className="text-center py-20 font-black uppercase tracking-widest text-[#101010]/40">Carregando Receitas...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {filteredRecipes.map((recipe) => (
              <div
                key={recipe.id}
                className="group cursor-pointer flex flex-col"
                onClick={() => onSelectRecipe(recipe)}
              >
                <div className="relative aspect-[4/5] overflow-hidden rounded-[3rem] mb-8 shadow-2xl">
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />

                  {/* Time Badge */}
                  <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-lg">
                    <span className="text-[#101010] font-black text-[10px] uppercase tracking-widest flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3 h-3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                      </svg>
                      {recipe.time}
                    </span>
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center p-8">
                    <button className="bg-white text-[#101010] px-8 py-3 rounded-full font-black text-[10px] uppercase tracking-widest transform translate-y-4 group-hover:translate-y-0 transition-transform">
                      Ver Receita
                    </button>
                  </div>
                </div>

                <div className="space-y-3 px-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[#90784E] font-black text-[10px] tracking-[0.2em] uppercase">
                      {recipe.category} • {recipe.difficulty || recipe.complexity}
                    </span>
                  </div>
                  <h3 className="text-[#101010] text-2xl font-[900] leading-tight group-hover:text-[#90784E] transition-colors uppercase tracking-tighter">
                    {recipe.title || recipe.name}
                  </h3>
                  <p className="text-gray-600 font-medium leading-relaxed line-clamp-2">
                    {recipe.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default RecipesPage;