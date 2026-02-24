
import React from 'react';
import { Cheese } from '../types';

const MOCK_CHEESES: Cheese[] = [
  {
    id: '1',
    name: 'Sharp Cheddar',
    type: 'ENVELHECIDO 9 MESES',
    intensity: 'Forte',
    description: 'O sabor clássico que você conhece, com um toque extra de maturação.',
    imageUrl: 'https://images.unsplash.com/photo-1618164435735-413d3b066c9a?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: '2',
    name: 'Creamy Brie',
    type: 'TRIPLA CREMOSIDADE',
    intensity: 'Suave',
    description: 'Textura aveludada que derrete na boca. Feito para momentos especiais.',
    imageUrl: 'https://images.unsplash.com/photo-1626957341926-98752fc2ba90?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: '3',
    name: 'Pepper Jack',
    type: 'COM PIMENTAS REAIS',
    intensity: 'Médio',
    description: 'O equilíbrio perfeito entre a suavidade do queijo e o calor da pimenta.',
    imageUrl: 'https://images.unsplash.com/photo-1596131397999-82b3d68198f1?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: '4',
    name: 'Smoked Gouda',
    type: 'DEFUMADO NATURAL',
    intensity: 'Forte',
    description: 'Defumado lentamente em lenha de macieira para um aroma inesquecível.',
    imageUrl: 'https://images.unsplash.com/photo-1624806994096-7f2010204764?auto=format&fit=crop&q=80&w=600'
  }
];

const ProductGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
      {MOCK_CHEESES.map((cheese) => (
        <div key={cheese.id} className="flex flex-col">
          <div className="aspect-square rounded-2xl overflow-hidden mb-6 shadow-lg group">
            <img 
              src={cheese.imageUrl} 
              alt={cheese.name} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
          </div>
          <div className="px-2">
            <p className="text-[#90784E] text-xs font-black uppercase tracking-[0.2em] mb-2">{cheese.type}</p>
            <h3 className="text-3xl font-serif mb-3 leading-tight">{cheese.name}</h3>
            <p className="text-gray-600 text-sm mb-6 leading-relaxed line-clamp-3">{cheese.description}</p>
            <button className="text-[#101010] font-black uppercase text-sm border-b-4 border-[#90784E] pb-1 hover:border-[#101010] transition-colors">
              Explorar Sabor
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;
