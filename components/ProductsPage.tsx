import React, { useState, useMemo, useEffect } from 'react';
import { supabase } from '../services/supabase';

const FILTERS = {
  countries: ["Argentina", "Brasil", "Holanda", "Itália", "Uruguai"],
  brands: ["Belprado", "Colonial", "El Maestro", "El Maestro Origens", "La Paulina", "Trentini"],
  types: [
    "Cabra", "Colonial", "Doce de Leite", "Gouda", "Grana Padano",
    "Maasdam", "Manteiga", "Minas", "Montanhês", "Mozarela",
    "Ovelha", "Parmesão", "Prato", "Proosdij", "Provolone",
    "Queijo Azul", "Serrano"
  ]
};

interface ProductsPageProps {
  onSelectProduct: (product: any) => void;
}

const ProductsPage: React.FC<ProductsPageProps> = ({ onSelectProduct }) => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase.from('products').select('*');
      if (data && !error) {
        setProducts(data);
      }
      setLoading(false);
    };
    fetchProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCountry = selectedCountries.length === 0 || selectedCountries.includes(product.country);
      const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(product.brand);
      const matchesType = selectedTypes.length === 0 || selectedTypes.includes(product.type);
      return matchesSearch && matchesCountry && matchesBrand && matchesType;
    });
  }, [products, searchTerm, selectedCountries, selectedBrands, selectedTypes]);

  const toggleFilter = (list: string[], setList: React.Dispatch<React.SetStateAction<string[]>>, item: string) => {
    setList(prev => prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]);
  };

  const FilterSection = ({ title, items, selected, setSelected }: any) => (
    <div className="mb-8">
      <h4 className="text-[#101010] font-black text-[10px] uppercase tracking-widest mb-4 border-b border-stone-200 pb-2">{title}</h4>
      <div className="flex flex-col gap-2">
        {items.map((item: string) => (
          <label key={item} className="flex items-center gap-3 cursor-pointer group">
            <div className="relative flex items-center justify-center">
              <input
                type="checkbox"
                className="sr-only"
                checked={selected.includes(item)}
                onChange={() => toggleFilter(selected, setSelected, item)}
              />
              <div className={`w-5 h-5 border-2 rounded transition-all ${selected.includes(item) ? 'bg-[#90784E] border-[#90784E]' : 'bg-white border-stone-300 group-hover:border-[#90784E]'}`}>
                {selected.includes(item) && (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-white">
                    <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
            </div>
            <span className={`text-sm font-medium transition-colors ${selected.includes(item) ? 'text-[#101010]' : 'text-stone-500 group-hover:text-[#90784E]'}`}>
              {item}
            </span>
          </label>
        ))}
      </div>
    </div>
  );

  return (
    <div className="bg-[#FCFAE6] min-h-screen">
      <div className="bg-[#101010] pt-20 pb-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-7xl font-[900] text-white uppercase tracking-tighter leading-none mb-6">
            NOSSA SELEÇÃO <br /> <span className="text-[#90784E]">PREMIUM.</span>
          </h1>
          <div className="max-w-xl mx-auto relative mt-10">
            <input
              type="text"
              placeholder="O que você está procurando hoje?"
              className="w-full bg-white/10 border-2 border-white/20 rounded-full py-4 px-8 text-white placeholder:text-white/40 focus:border-[#90784E] outline-none transition-all font-medium"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar Desktop */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-32">
              <h3 className="text-[#101010] font-[900] text-xl uppercase tracking-tighter mb-8">Filtros</h3>
              <FilterSection title="Países" items={FILTERS.countries} selected={selectedCountries} setSelected={setSelectedCountries} />
              <FilterSection title="Marcas" items={FILTERS.brands} selected={selectedBrands} setSelected={setSelectedBrands} />
              <FilterSection title="Tipos" items={FILTERS.types} selected={selectedTypes} setSelected={setSelectedTypes} />
            </div>
          </aside>

          {/* Botão Mobile Filter */}
          <div className="lg:hidden mb-8">
            <button
              onClick={() => setIsMobileFiltersOpen(true)}
              className="w-full bg-white border-2 border-stone-200 py-4 px-6 rounded-2xl flex items-center justify-between group hover:border-[#90784E] transition-all"
            >
              <div className="flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-[#90784E]">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 12h8.25" />
                </svg>
                <span className="text-sm font-black uppercase tracking-widest text-[#101010]">Filtros e busca</span>
              </div>
              {(selectedCountries.length + selectedBrands.length + selectedTypes.length) > 0 && (
                <span className="bg-[#90784E] text-white text-[10px] font-black w-6 h-6 rounded-full flex items-center justify-center">
                  {selectedCountries.length + selectedBrands.length + selectedTypes.length}
                </span>
              )}
            </button>
          </div>

          <div className="flex-grow">
            {loading ? (
              <div className="text-center py-20 font-black uppercase tracking-widest text-[#101010]/40">Carregando Queijos...</div>
            ) : filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-16">
                {filteredProducts.map((product) => (
                  <div key={product.id} className="group flex flex-col">
                    <div
                      onClick={() => onSelectProduct(product)}
                      className="bg-white rounded-[3rem] p-10 shadow-lg group-hover:shadow-2xl transition-all duration-500 relative flex items-center justify-center aspect-square mb-6 overflow-hidden cursor-pointer"
                    >
                      <img src={product.image} alt={product.name} className="w-full h-full object-contain transform group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-700 drop-shadow-[0_20px_25px_rgba(0,0,0,0.15)]" />
                    </div>

                    <div className="px-4">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[#90784E] font-black text-[10px] uppercase tracking-widest">{product.brand}</span>
                      </div>
                      <h3 className="text-[#101010] text-2xl font-[900] uppercase tracking-tighter leading-tight mb-3 group-hover:text-[#90784E] transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-[#101010]/70 text-sm font-medium leading-relaxed mb-6 line-clamp-2">
                        {product.description}
                      </p>
                      <button
                        onClick={() => onSelectProduct(product)}
                        className="text-[#101010] font-black text-xs uppercase tracking-widest border-b-4 border-[#90784E] pb-1 hover:border-[#101010] transition-all"
                      >
                        Explorar Sabor
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-[3rem] p-20 text-center shadow-inner">
                <h3 className="text-2xl font-black text-[#101010] uppercase tracking-tighter mb-4">Nenhum queijo encontrado</h3>
                <button
                  onClick={() => {
                    setSelectedCountries([]);
                    setSelectedBrands([]);
                    setSelectedTypes([]);
                    setSearchTerm("");
                  }}
                  className="text-[#90784E] font-bold text-xs uppercase tracking-widest hover:underline"
                >
                  Limpar todos os filtros
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Drawer Mobile Filters */}
      <div className={`fixed inset-0 z-[100] transition-all duration-500 ease-in-out lg:hidden ${isMobileFiltersOpen ? 'visible opacity-100' : 'invisible opacity-0'}`}>
        <div className="absolute inset-0 bg-[#101010]/80 backdrop-blur-sm" onClick={() => setIsMobileFiltersOpen(false)} />
        <div className={`absolute right-0 top-0 bottom-0 w-[85%] max-w-sm bg-[#FCFAE6] shadow-2xl transition-transform duration-500 ease-in-out p-8 overflow-y-auto ${isMobileFiltersOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex items-center justify-between mb-10">
            <h3 className="text-[#101010] font-[900] text-2xl uppercase tracking-tighter">Filtros</h3>
            <button
              onClick={() => setIsMobileFiltersOpen(false)}
              className="text-[#101010]/20 hover:text-[#101010] transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <FilterSection title="Países" items={FILTERS.countries} selected={selectedCountries} setSelected={setSelectedCountries} />
          <FilterSection title="Marcas" items={FILTERS.brands} selected={selectedBrands} setSelected={setSelectedBrands} />
          <FilterSection title="Tipos" items={FILTERS.types} selected={selectedTypes} setSelected={setSelectedTypes} />

          <div className="sticky bottom-0 left-0 right-0 pt-8 pb-4 bg-gradient-to-t from-[#FCFAE6] via-[#FCFAE6] to-transparent">
            <button
              onClick={() => setIsMobileFiltersOpen(false)}
              className="w-full bg-[#101010] text-white py-5 rounded-full font-black text-xs uppercase tracking-widest shadow-xl"
            >
              Ver {filteredProducts.length} Resultados
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;