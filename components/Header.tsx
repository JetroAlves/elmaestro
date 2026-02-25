import React, { useState } from 'react';

interface HeaderProps {
  onNavigate: (view: 'home' | 'products' | 'recipes' | 'about' | 'stores') => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavigation = (view: 'home' | 'products' | 'recipes' | 'about' | 'stores') => {
    onNavigate(view);
    setIsMenuOpen(false);
  };

  const menuLinks = [
    { id: 'home', label: 'Home' },
    { id: 'products', label: 'Produtos' },
    { id: 'recipes', label: 'Receitas' },
    { id: 'stores', label: 'Onde Encontrar' },
    { id: 'about', label: 'Sobre' },
  ] as const;

  return (
    <header className="bg-[#101010] sticky top-0 z-50 py-5">
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
        {/* Logo Left */}
        <div className="flex-shrink-0">
          <button
            onClick={() => handleNavigation('home')}
            className="block outline-none"
          >
            <img
              src="https://mqcjdxflipzlwhfrfyky.supabase.co/storage/v1/object/public/images/logomarca/LogoElMaestro.png"
              alt="Mg Queijos Logo"
              className="h-10 md:h-14 w-auto opacity-90 hover:opacity-100 transition-opacity"
            />
          </button>
        </div>

        {/* Navigation Right (Desktop) & Hamburger (Mobile) */}
        <div className="flex items-center gap-6">
          <nav className="hidden lg:flex gap-10 uppercase text-[11px] font-black tracking-[0.2em] text-[#90784E]">
            {menuLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavigation(link.id as any)}
                className="hover:text-white transition-colors cursor-pointer outline-none"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Hamburger Button (Mobile) */}
          <button
            onClick={() => setIsMenuOpen(true)}
            className="text-[#90784E] lg:hidden hover:text-white transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-[100] bg-[#101010] transition-all duration-500 ease-in-out lg:hidden ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        {/* Header inside Mobile Menu */}
        <div className="flex justify-between items-center p-6 border-b border-stone-800">
          <img
            src="https://mqcjdxflipzlwhfrfyky.supabase.co/storage/v1/object/public/images/logomarca/LogoElMaestro.png"
            alt="Logo"
            className="h-10 opacity-90"
          />
          <button
            onClick={() => setIsMenuOpen(false)}
            className="text-[#90784E] hover:text-white transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Links List */}
        <nav className="flex flex-col items-center justify-center h-[calc(100vh-100px)] space-y-8 px-6">
          {menuLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavigation(link.id as any)}
              className="text-[#FCFAE6] text-4xl font-[900] uppercase tracking-tighter hover:text-[#90784E] transition-all transform active:scale-95"
            >
              {link.label}
            </button>
          ))}

          {/* Decorative Divider */}
          <div className="w-12 h-1 bg-[#90784E] rounded-full mt-4"></div>

          <p className="text-[#90784E] text-[10px] font-black uppercase tracking-[0.4em] opacity-60">
            Sabor Real Mg Queijos
          </p>
        </nav>
      </div>
    </header>
  );
};

export default Header;