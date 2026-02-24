import React from 'react';

interface RecipeSectionProps {
  onNavigateToRecipes: () => void;
}

const RECIPES = [
  {
    id: 1,
    title: "SALADA COM QUEIJO MAASDAM E NOZES",
    category: "ALMOÇO RÁPIDO",
    image: "https://mgqueijos.com.br/wp-content/uploads/2020/05/salada-maasdam-300x300.jpg",
    description: "A cremosidade do queijos Maasdam proporciona um contraste perfeito com a crocância das nozes."
  },
  {
    id: 2,
    title: "SALADA CAESAR COM PARMESÃO EL MAESTRO",
    category: "CLÁSSICO",
    image: "https://mgqueijos.com.br/wp-content/uploads/elementor/thumbs/salada-caesar-pje3s5k3rhbdsrans3wa3ny233el8djia2mett1ncg.jpg",
    description: "A cremosidade perfeita que só o blend de queijos Mg Queijos proporciona a este ícone da gastronomia."
  },
  {
    id: 3,
    title: "TORRADA COM PARMESÃO EL MAESTRO",
    category: "ENTRETENIMENTO",
    image: "https://mgqueijos.com.br/wp-content/uploads/elementor/thumbs/torrada-parmesao-e1591304883275-pje3s5k3rhbdsrans3wa3ny233el8djia2mett1ncg.jpg",
    description: "Aprenda a montar a entrada perfeita para impressionar seus convidados com minimalismo e sabor."
  }
];

const RecipeSection: React.FC<RecipeSectionProps> = ({ onNavigateToRecipes }) => {
  return (
    <section className="bg-white py-24 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-16 gap-8 text-center md:text-left">
          <div className="space-y-4 w-full md:w-auto">
            <span className="text-[#90784E] font-black tracking-[0.3em] text-xs uppercase block">Inspiração na Cozinha</span>
            <h2 className="text-5xl md:text-7xl font-serif text-[#101010] leading-none tracking-tighter uppercase">
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
          {RECIPES.map((recipe) => (
            <div key={recipe.id} className="group cursor-pointer" onClick={onNavigateToRecipes}>
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] mb-8 shadow-2xl">
                <img 
                  src={recipe.image} 
                  alt={recipe.title} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                   <span className="text-white font-black text-sm tracking-widest uppercase border-b-2 border-[#90784E] pb-1">Ver Receita Completa</span>
                </div>
              </div>
              <div className="space-y-3">
                <span className="text-[#90784E] font-black text-[10px] tracking-[0.2em] uppercase">
                  {recipe.category}
                </span>
                <h3 className="text-[#101010] text-2xl md:text-3xl font-serif leading-tight group-hover:text-[#90784E] transition-colors uppercase tracking-tighter">
                  {recipe.title}
                </h3>
                <p className="text-gray-600 font-medium leading-relaxed line-clamp-2">
                  {recipe.description}
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