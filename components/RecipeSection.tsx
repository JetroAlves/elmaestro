import React, { useEffect, useState } from 'react';
import { supabase } from '../services/supabase';

interface RecipeSectionProps {
  onNavigateToRecipes: () => void;
  onSelectRecipe: (recipe: any) => void;
}

const RecipeSection: React.FC<RecipeSectionProps> = ({ onNavigateToRecipes, onSelectRecipe }) => {
  const [recipes, setRecipes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestRecipes = async () => {
      const { data, error } = await supabase
        .from('recipes')
        .select('*, mainCheese:products(*)')
        .order('created_at', { ascending: false })
        .limit(3);

      if (data && !error) {
        setRecipes(data);
      }
      setLoading(false);
    };

    fetchLatestRecipes();
  }, []);

  if (loading || recipes.length === 0) return null;

  return (
    <section className="bg-white py-24 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-16 gap-8 text-center md:text-left">
          <div className="space-y-4 w-full md:w-auto">
            <span className="text-[#90784E] font-black tracking-[0.3em] text-xs uppercase block">Inspiração na Cozinha</span>
            <h2 className="text-5xl md:text-7xl font-black text-[#101010] leading-none tracking-tighter uppercase font-sans">
              RECEITAS
            </h2>
          </div>
          <button
            onClick={onNavigateToRecipes}
            className="bg-[#101010] text-white px-10 py-4 rounded-full font-black text-sm uppercase tracking-widest hover:bg-[#90784E] transition-all shadow-xl active:scale-95"
          >
            VER TODAS AS RECEITAS
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {recipes.map((recipe) => (
            <div key={recipe.id} className="group cursor-pointer" onClick={() => onSelectRecipe(recipe)}>
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] mb-8 shadow-2xl bg-white">
                <img
                  src={recipe.image}
                  alt={recipe.title || recipe.name}
                  className="w-full h-full object-contain transition-transform duration-1000 group-hover:scale-110"
                />

                {/* Badges Flutuantes Minimalistas na Home */}
                <div className="absolute top-6 left-6 flex gap-2">
                  <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-lg">
                    <span className="text-[#101010] font-black text-[10px] uppercase tracking-widest leading-none">{recipe.time || '15 min'}</span>
                  </div>
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                  <span className="text-white font-black text-sm tracking-widest uppercase border-b-2 border-[#90784E] pb-1">Ver Receita Completa</span>
                </div>
              </div>
              <div className="space-y-3">
                <span className="text-[#90784E] font-black text-[10px] tracking-[0.2em] uppercase">
                  {recipe.ocasion || recipe.category || 'Receita'} • {recipe.difficulty || 'Fácil'}
                </span>
                <h3 className="text-[#101010] text-2xl md:text-3xl font-black leading-tight group-hover:text-[#90784E] transition-colors uppercase tracking-tighter">
                  {recipe.title || recipe.name}
                </h3>
                <p className="text-gray-600 font-medium leading-relaxed line-clamp-2">
                  {recipe.description || 'Confira esta receita exclusiva preparada pelos nossos especialistas.'}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecipeSection;