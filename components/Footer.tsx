import React from 'react';

interface FooterProps {
  onNavigateAdmin?: () => void;
  onNavigate?: (view: 'home' | 'products' | 'recipes' | 'about' | 'stores') => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigateAdmin, onNavigate }) => {
  const handleNav = (e: React.MouseEvent, view: any) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(view);
      window.scrollTo(0, 0);
    }
  };

  return (
    <footer className="bg-[#101010] text-stone-400 py-16 px-4 border-t border-stone-800">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-1">
          <div className="mb-8">
            <img
              src="https://kyflpnhnxnivnuysrszr.supabase.co/storage/v1/object/public/images/204a94a1-f534-43b9-b67e-9a3a2c9b2baf/LogoElMaestro.png"
              alt="Mg Queijos Logo"
              className="h-12 w-auto brightness-0 invert opacity-90"
              style={{
                filter: 'brightness(0) saturate(100%) invert(98%) sepia(4%) saturate(737%) hue-rotate(320deg) brightness(105%) contrast(98%)'
              }}
            />
          </div>
          <p className="text-sm leading-relaxed">
            Devido a essa história e tradição, a produção uruguaia é reconhecida internacionalmente.
          </p>
        </div>

        <div>
          <h3 className="text-white font-bold uppercase tracking-widest text-sm mb-6">Explorar</h3>
          <ul className="space-y-3 text-sm">
            <li><button onClick={(e) => handleNav(e, 'products')} className="hover:text-[#90784E] transition-colors">Produtos</button></li>
            <li><button onClick={(e) => handleNav(e, 'recipes')} className="hover:text-[#90784E] transition-colors">Receitas</button></li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-bold uppercase tracking-widest text-sm mb-6">Ajuda</h3>
          <ul className="space-y-3 text-sm">
            <li><a href="#" className="hover:text-[#90784E] transition-colors">Fale Conosco</a></li>
            <li><a href="#" className="hover:text-[#90784E] transition-colors">FAQs</a></li>
            <li><button onClick={(e) => handleNav(e, 'stores')} className="hover:text-[#90784E] transition-colors">Onde Encontrar</button></li>
            <li><a href="#" className="hover:text-[#90784E] transition-colors">Trabalhe Conosco</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-bold uppercase tracking-widest text-sm mb-6">Novidades</h3>
          <p className="text-xs mb-4">Inscreva-se para receber convites para degustações e novos lançamentos.</p>
          <div className="flex">
            <input
              type="email"
              placeholder="Seu e-mail"
              className="bg-stone-900 border border-stone-700 px-4 py-2 w-full outline-none focus:border-[#90784E]"
            />
            <button className="bg-[#90784E] text-white px-4 py-2 hover:brightness-110">OK</button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-stone-800 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-tighter">
        <p>© 2026 Mg queijos. Todos os direitos reservados.</p>
        <div className="flex gap-6 items-center">
          <a href="#">Privacidade</a>
          <a href="#">Termos de Uso</a>
          <button
            onClick={onNavigateAdmin}
            className="hover:text-white transition-colors"
          >
            Administração
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;