import React from 'react';

interface ProductDetailsPageProps {
  product: any;
  onBack: () => void;
}

const ProductDetailsPage: React.FC<ProductDetailsPageProps> = ({ product, onBack }) => {
  return (
    <div className="bg-[#FCFAE6] min-h-screen">
      {/* Botão de Voltar Fixo/Flutuante */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-10">
        <button
          onClick={onBack}
          className="flex items-center gap-3 text-[#101010] font-black text-xs uppercase tracking-widest group hover:text-[#90784E] transition-colors"
        >
          <div className="w-10 h-10 border-2 border-[#101010] rounded-full flex items-center justify-center group-hover:border-[#90784E] transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
            </svg>
          </div>
          Voltar ao Catálogo
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 flex flex-col lg:flex-row items-center gap-16 md:gap-24">

        {/* Lado Esquerdo: Imagem Monumental */}
        <div className="w-full lg:w-1/2 relative flex items-center justify-center">
          <div className="absolute inset-0 bg-[#90784E]/5 rounded-full blur-[100px] transform scale-75"></div>
          <img
            src={product.image || product.img}
            alt={product.name}
            className="w-full max-w-[500px] h-auto object-contain drop-shadow-[0_50px_60px_rgba(0,0,0,0.25)] relative z-10 animate-float"
          />
        </div>

        {/* Lado Direito: Informações e Storytelling */}
        <div className="w-full lg:w-1/2 space-y-10">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <span className="bg-[#90784E] text-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                {product.brand}
              </span>
              <span className="text-[#101010] font-black text-[10px] uppercase tracking-widest opacity-40">
                {product.country} • {product.type}
              </span>
            </div>
            <h1 className="text-5xl md:text-8xl font-[900] text-[#101010] uppercase tracking-tighter leading-[0.85] mb-8">
              {product.name?.split(' ').map((word: string, i: number) => (
                <span key={i} className="block">{word}</span>
              )) || product.name}
            </h1>
            <p className="text-xl text-[#101010]/80 font-medium leading-relaxed max-w-xl">
              {product.description}
            </p>
          </div>

          {/* Notas de Sabor */}
          {product.notes && product.notes.length > 0 && (
            <div className="flex flex-wrap gap-4">
              {product.notes.map((note: string) => (
                <div key={note} className="border-2 border-[#101010] px-6 py-2 rounded-full flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#90784E] rounded-full"></span>
                  <span className="text-[#101010] font-black text-xs uppercase tracking-widest">{note}</span>
                </div>
              ))}
            </div>
          )}

          {/* Seção de Harmonização (The Sommelier Touch) */}
          {product.pairings && (
            <div className="bg-[#101010] p-8 md:p-12 rounded-[3rem] text-white shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#90784E] opacity-10 rounded-full -mr-16 -mt-16"></div>

              <h3 className="text-[#90784E] font-[900] text-xl uppercase tracking-tighter mb-8 flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path fillRule="evenodd" d="M12.963 2.286a.75.75 0 0 0-1.071-.136 9.742 9.742 0 0 0-3.539 6.176 7.547 7.547 0 0 1-2.66-1.441.75.75 0 0 0-1.151.15 10.503 10.503 0 0 0-1.456 5.517c0 5.799 4.701 10.5 10.5 10.5s10.5-4.701 10.5-10.5c0-4.374-2.664-8.13-6.477-9.766a.75.75 0 0 0-.659.138 7.495 7.495 0 0 1-3.977 1.362Z" clipRule="evenodd" />
                </svg>
                Harmonização Ideal
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-2">
                  <p className="text-stone-500 font-black text-[10px] uppercase tracking-widest">Para Brindar</p>
                  <p className="text-2xl font-black text-[#FCFAE6]">{product.pairings?.wine}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-stone-500 font-black text-[10px] uppercase tracking-widest">No Prato</p>
                  <p className="text-2xl font-black text-[#FCFAE6]">{product.pairings?.accompaniment}</p>
                </div>
              </div>

              {product.notes?.[0] && (
                <div className="mt-10 pt-8 border-t border-white/10">
                  <p className="text-stone-400 text-sm font-medium italic">
                    "Este queijo libera notas de {product.notes?.[0].toLowerCase()} que são perfeitamente elevadas pelo corpo do {product.pairings?.wine}."
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes float {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(-2deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default ProductDetailsPage;