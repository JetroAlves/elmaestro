import React from 'react';

interface RecipeDetailsPageProps {
  recipe: any;
  onBack: () => void;
  onSelectProduct: (product: any) => void;
}

const RecipeDetailsPage: React.FC<RecipeDetailsPageProps> = ({ recipe, onBack, onSelectProduct }) => {
  return (
    <div className="bg-[#FCFAE6] min-h-screen">
      {/* Navigation Header */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-10 flex items-center justify-between">
        <button 
          onClick={onBack}
          className="flex items-center gap-3 text-[#101010] font-black text-xs uppercase tracking-widest group hover:text-[#90784E] transition-colors"
        >
          <div className="w-10 h-10 border-2 border-[#101010] rounded-full flex items-center justify-center group-hover:border-[#90784E] transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
            </svg>
          </div>
          Voltar para Receitas
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        <div className="flex flex-col lg:flex-row gap-16 md:gap-24">
          
          {/* Lado Esquerdo: Imagem e Ingredientes */}
          <div className="w-full lg:w-[45%]">
            <div className="relative rounded-[3rem] overflow-hidden shadow-2xl mb-12">
              <img src={recipe.image} alt={recipe.title} className="w-full aspect-[4/5] object-cover" />
              <div className="absolute bottom-10 left-10 right-10 flex gap-4">
                 <div className="bg-white/90 backdrop-blur-md flex-1 p-4 rounded-2xl text-center shadow-lg">
                    <p className="text-[10px] font-black text-[#90784E] uppercase tracking-widest mb-1">Tempo</p>
                    <p className="text-xl font-[900] text-[#101010]">{recipe.time}</p>
                 </div>
                 <div className="bg-white/90 backdrop-blur-md flex-1 p-4 rounded-2xl text-center shadow-lg">
                    <p className="text-[10px] font-black text-[#90784E] uppercase tracking-widest mb-1">Dificuldade</p>
                    <p className="text-xl font-[900] text-[#101010]">{recipe.difficulty}</p>
                 </div>
              </div>
            </div>

            <div className="bg-white rounded-[3rem] p-10 md:p-14 shadow-xl">
              <h3 className="text-[#101010] text-3xl font-[900] uppercase tracking-tighter mb-8 border-b-4 border-[#90784E] pb-4 inline-block">
                Ingredientes
              </h3>
              <ul className="space-y-6">
                {recipe.ingredients.map((ing: string, i: number) => (
                  <li key={i} className="flex items-start gap-4 group cursor-pointer">
                    <div className="mt-1 w-6 h-6 border-2 border-stone-200 rounded-lg flex-shrink-0 flex items-center justify-center group-hover:border-[#90784E] transition-colors">
                      <div className="w-2 h-2 bg-[#90784E] rounded-full opacity-0 group-hover:opacity-100"></div>
                    </div>
                    <span className="text-lg font-medium text-stone-700 leading-tight">
                      {ing}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Lado Direito: Modo de Preparo e Queijo */}
          <div className="w-full lg:w-[55%] flex flex-col">
            <span className="text-[#90784E] font-black text-xs uppercase tracking-[0.3em] mb-4">
              {recipe.category}
            </span>
            <h1 className="text-5xl md:text-8xl font-[900] text-[#101010] uppercase tracking-tighter leading-[0.85] mb-10">
              {recipe.title}
            </h1>
            
            <div className="space-y-12">
              <h3 className="text-[#101010] text-3xl font-[900] uppercase tracking-tighter">Modo de Preparo</h3>
              <div className="space-y-10">
                {recipe.instructions.map((step: string, i: number) => (
                  <div key={i} className="flex gap-8 group">
                    <span className="text-[#90784E] text-5xl font-[900] opacity-20 group-hover:opacity-100 transition-opacity">
                      {(i + 1).toString().padStart(2, '0')}
                    </span>
                    <p className="text-xl text-stone-700 font-medium leading-relaxed pt-2">
                      {step}
                    </p>
                  </div>
                ))}
              </div>

              {/* Related Product Card */}
              <div className="mt-20 pt-16 border-t border-stone-200">
                <p className="text-[#101010] font-black text-xs uppercase tracking-widest mb-8">Ingrediente Principal</p>
                <div 
                  onClick={() => onSelectProduct({ name: recipe.mainCheese.name, img: recipe.mainCheese.img, description: "O toque secreto desta receita.", brand: "El Maestro", country: "Uruguai", intensity: "Premium", type: "Artesanal" })}
                  className="bg-[#101010] rounded-[3rem] p-8 md:p-12 flex items-center justify-between group cursor-pointer hover:shadow-2xl transition-all"
                >
                  <div className="flex items-center gap-8">
                    <div className="w-24 md:w-32 aspect-square bg-white rounded-2xl p-4 transform group-hover:-rotate-6 transition-transform">
                      <img src={recipe.mainCheese.img} alt={recipe.mainCheese.name} className="w-full h-full object-contain" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-[#90784E] font-black text-[10px] uppercase tracking-widest">Sugerimos usar</p>
                      <h4 className="text-white text-2xl font-[900] uppercase tracking-tighter">{recipe.mainCheese.name}</h4>
                    </div>
                  </div>
                  <div className="hidden md:flex w-12 h-12 border-2 border-white rounded-full items-center justify-center text-white group-hover:bg-[#90784E] group-hover:border-[#90784E] transition-all">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default RecipeDetailsPage;