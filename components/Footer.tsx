import React, { useState } from 'react';

interface FooterProps {
  onNavigateAdmin?: () => void;
  onNavigate?: (view: any) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigateAdmin, onNavigate }) => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [contactForm, setContactForm] = useState({
    nome: '',
    telefone: '',
    email: '',
    mensagem: ''
  });

  const handleNav = (e: React.MouseEvent, view: any) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(view);
      window.scrollTo(0, 0);
    }
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Contato Site - ${contactForm.nome}`);
    const body = encodeURIComponent(
      `Nome: ${contactForm.nome}\n` +
      `Telefone: ${contactForm.telefone}\n` +
      `E-mail: ${contactForm.email}\n\n` +
      `Mensagem:\n${contactForm.mensagem}`
    );
    window.location.href = `mailto:comercial@mgqueijos.com.br?subject=${subject}&body=${body}`;
    setIsContactModalOpen(false);
  };

  return (
    <footer className="bg-[#101010] text-stone-400 py-16 px-4 border-t border-stone-800 relative">
      {/* Botão WhatsApp Flutuante */}
      <a
        href="https://wa.me/5548988079607"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all group"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 16 16">
          <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" />
        </svg>
        <span className="absolute right-full mr-3 bg-[#101010] text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">Fale no WhatsApp</span>
      </a>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-1">
          <div className="mb-8">
            <img
              src="https://mqcjdxflipzlwhfrfyky.supabase.co/storage/v1/object/public/images/logomarca/LogoElMaestro.png"
              alt="Mg Queijos Logo"
              className="h-20 md:h-24 w-auto opacity-90 transition-all hover:scale-105"
            />
          </div>
          <div className="space-y-4 text-xs leading-relaxed text-stone-500 font-bold">
            <p className="text-stone-300 text-sm">EL MAESTRO LTDA</p>
            <p>RUA JOSÉ CARLOS LIBRELATO Nº 166. BAIRRO VILA SÃO JOSÉ<br />IÇARA-SC. CEP: 88820-648</p>
            <p>IE 258.386.827<br />CNPJ 19.791.126/0001-50</p>
          </div>
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
            <li>
              <button
                onClick={() => setIsContactModalOpen(true)}
                className="hover:text-[#90784E] transition-colors flex items-center gap-2"
              >
                Fale Conosco
              </button>
            </li>
            <li><button onClick={(e) => handleNav(e, 'stores')} className="hover:text-[#90784E] transition-colors">Onde Encontrar</button></li>
            <li>
              <div className="flex flex-col">
                <a href="mailto:fiscal@mgqueijos.com.br" className="hover:text-[#90784E] transition-colors">Trabalhe Conosco</a>
                <span className="text-[10px] text-stone-600 font-bold uppercase tracking-tighter mt-1">Envie seu currículo</span>
              </div>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-bold uppercase tracking-widest text-sm mb-6">Contato Direto</h3>
          <div className="space-y-4 text-sm">
            <div className="flex items-center gap-3">
              <div className="bg-stone-900 p-2 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-[#90784E]">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                </svg>
              </div>
              <div>
                <p className="text-[10px] uppercase font-black tracking-widest text-stone-600">Telefone</p>
                <a href="tel:48988079607" className="text-stone-300 font-bold">(48) 988079607</a>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-stone-900 p-2 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-[#90784E]">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                </svg>
              </div>
              <div>
                <p className="text-[10px] uppercase font-black tracking-widest text-stone-600">E-mail</p>
                <a href="mailto:comercial@mgqueijos.com.br" className="text-stone-300 font-bold break-all">comercial@mgqueijos.com.br</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-stone-800 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-tighter">
        <p>© 2026 EL MAESTRO. Todos os direitos reservados.</p>
        <div className="flex gap-6 items-center">
          <button onClick={(e) => handleNav(e, 'privacy')} className="hover:text-white transition-colors">Privacidade</button>
          <button onClick={(e) => handleNav(e, 'terms')} className="hover:text-white transition-colors">Termos de Uso</button>
          <button
            onClick={onNavigateAdmin}
            className="hover:text-white transition-colors border-l border-stone-800 pl-6"
          >
            Administração
          </button>
        </div>
      </div>

      {/* Modal Fale Conosco */}
      {isContactModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#101010]/95 backdrop-blur-sm">
          <div className="bg-white w-full max-w-xl rounded-[3rem] p-10 md:p-14 shadow-2xl relative">
            <button
              onClick={() => setIsContactModalOpen(false)}
              className="absolute top-8 right-8 text-[#101010]/20 hover:text-[#101010] transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="mb-8">
              <h2 className="text-3xl md:text-4xl font-black text-[#101010] uppercase tracking-tighter mb-2">Fale Conosco</h2>
              <p className="text-stone-500 font-bold text-sm">Responda em breve para tirar suas dúvidas.</p>
            </div>

            <form onSubmit={handleContactSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Nome Completo"
                  required
                  value={contactForm.nome}
                  onChange={(e) => setContactForm({ ...contactForm, nome: e.target.value })}
                  className="w-full bg-[#FCFAE6] border-2 border-[#FCFAE6] rounded-2xl py-4 px-6 text-[#101010] font-bold outline-none focus:border-[#90784E] transition-all"
                />
                <input
                  type="tel"
                  placeholder="Telefone / WhatsApp"
                  required
                  value={contactForm.telefone}
                  onChange={(e) => setContactForm({ ...contactForm, telefone: e.target.value })}
                  className="w-full bg-[#FCFAE6] border-2 border-[#FCFAE6] rounded-2xl py-4 px-6 text-[#101010] font-bold outline-none focus:border-[#90784E] transition-all"
                />
              </div>
              <input
                type="email"
                placeholder="Seu melhor e-mail"
                required
                value={contactForm.email}
                onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                className="w-full bg-[#FCFAE6] border-2 border-[#FCFAE6] rounded-2xl py-4 px-6 text-[#101010] font-bold outline-none focus:border-[#90784E] transition-all"
              />
              <textarea
                placeholder="Sua Mensagem"
                rows={4}
                required
                value={contactForm.mensagem}
                onChange={(e) => setContactForm({ ...contactForm, mensagem: e.target.value })}
                className="w-full bg-[#FCFAE6] border-2 border-[#FCFAE6] rounded-2xl py-4 px-6 text-[#101010] font-bold outline-none focus:border-[#90784E] transition-all resize-none"
              />
              <button
                type="submit"
                className="w-full bg-[#101010] hover:bg-[#90784E] text-white py-5 rounded-full font-black text-sm uppercase tracking-widest transition-all shadow-xl hover:scale-[1.02] active:scale-95 mt-4"
              >
                Enviar Mensagem
              </button>
            </form>
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;