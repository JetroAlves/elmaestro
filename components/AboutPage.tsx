import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <div className="bg-[#FCFAE6] min-h-screen">
      {/* Hero Section */}
      <section className="relative py-32 md:py-48 bg-[#101010] overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10">
          <img
            src="https://images.unsplash.com/photo-1486328228599-85db4443971f?auto=format&fit=crop&q=80&w=1200"
            alt="Textura de Queijo"
            className="w-full h-full object-cover grayscale"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          <div className="max-w-3xl">
            <span className="text-[#90784E] font-black text-xs md:text-sm uppercase tracking-[0.4em] mb-6 block">
              Nosso Manifesto
            </span>
            <h1 className="text-white text-6xl md:text-9xl font-[900] uppercase tracking-tighter leading-[0.85] mb-8">
              O COMPROMISSO <br />
              <span className="text-[#90784E]">COM O REAL.</span>
            </h1>
            <p className="text-white/80 text-xl md:text-2xl font-medium leading-relaxed">
              Na Mg Queijos, acreditamos que a comida de verdade não precisa de atalhos. Nossa missão é preservar a integridade do leite e a honra do artesão.
            </p>
          </div>
        </div>
      </section>

      {/* The Cooperative Model Section */}
      <section className="py-24 md:py-40 px-4 md:px-8">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 md:gap-24">
          <div className="w-full lg:w-1/2">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80&w=1000"
                alt="Família de Produtores"
                className="rounded-[3rem] shadow-2xl relative z-10"
              />
              <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-[#90784E] rounded-[3rem] -z-0 hidden md:block opacity-20"></div>
            </div>
          </div>
          <div className="w-full lg:w-1/2 space-y-8">
            <h2 className="text-[#101010] text-4xl md:text-6xl font-[900] uppercase tracking-tighter leading-tight">
              PROPRIEDADE DE <br />
              <span className="text-[#90784E]">QUEM PRODUZ.</span>
            </h2>
            <p className="text-lg md:text-xl text-[#101010]/70 font-medium leading-relaxed">
              Diferente das grandes corporações, somos uma cooperativa. Isso significa que as famílias que cuidam das vacas e do solo são as mesmas que tomam as decisões sobre o futuro da nossa empresa.
            </p>
            <p className="text-lg md:text-xl text-[#101010]/70 font-medium leading-relaxed">
              Quando você escolhe um queijo Mg Queijos, você está apoiando diretamente a agricultura familiar e garantindo que o conhecimento ancestral da produção leiteira seja passado para a próxima geração.
            </p>
            <div className="pt-6">
              <div className="bg-[#101010] p-8 rounded-[2rem] inline-block text-white">
                <p className="text-4xl font-[900] text-[#90784E]">120+</p>
                <p className="text-xs font-black uppercase tracking-widest opacity-60">Famílias Cooperadas</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="bg-white py-24 md:py-40 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-[#101010] text-4xl md:text-6xl font-[900] uppercase tracking-tighter mb-6">
              NOSSOS <span className="text-[#90784E]">VALORES</span>
            </h2>
            <div className="w-24 h-2 bg-[#90784E] mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                title: "INTEGRIDADE TOTAL",
                text: "Nada de corantes artificiais, conservantes desnecessários ou hormônios de crescimento. Apenas leite, sal, tempo e paixão.",
                number: "01"
              },
              {
                title: "ADMINISTRAÇÃO DA TERRA",
                text: "Praticamos uma agricultura regenerativa. Respeitamos os ciclos da natureza para que o solo continue fértil por séculos.",
                number: "02"
              },
              {
                title: "BEM-ESTAR ANIMAL",
                text: "Vacas felizes produzem leite melhor. Nossas instalações e pastagens são desenhadas para o máximo conforto bovino.",
                number: "03"
              }
            ].map((value) => (
              <div key={value.number} className="group p-10 border-2 border-stone-100 rounded-[3rem] hover:border-[#90784E] transition-all duration-500 bg-[#FCFAE6]/30">
                <span className="text-6xl font-[900] text-[#90784E] opacity-20 group-hover:opacity-100 transition-opacity block mb-6">
                  {value.number}
                </span>
                <h3 className="text-[#101010] text-2xl font-[900] uppercase tracking-tighter mb-4">
                  {value.title}
                </h3>
                <p className="text-[#101010]/60 font-medium leading-relaxed">
                  {value.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MASTER CHEESEMAKERS Section */}
      <section className="py-24 md:py-40 px-4 md:px-8 bg-[#FCFAE6]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between mb-20 gap-8">
            <h2 className="text-[#101010] text-4xl md:text-6xl font-[900] uppercase tracking-tighter leading-none">
              OS MESTRES <br /> <span className="text-[#90784E]">QUEIJEIROS.</span>
            </h2>
            <p className="max-w-md text-[#101010]/60 font-medium text-lg italic text-right">
              "Um queijo não é feito apenas em uma fábrica. Ele é cultivado no campo e finalizado na cave pela sensibilidade humana."
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="relative group overflow-hidden rounded-[3rem] aspect-[4/5] md:aspect-auto h-[600px]">
              <img
                src="https://naopiradesopila.com/wp-content/uploads/blogger/-24ofZPd8Rqg/WCd4VCxzI/AAAAAAABVVg/4rULkelRqw8uygKLp7FSTCHJD_ZRUwq_QCLcB/s1600/Toni%2B%25282%2529.JPG"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                alt="Mestre Queijeiro em ação"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#101010] via-transparent to-transparent"></div>
              <div className="absolute bottom-12 left-12 right-12">
                <p className="text-[#90784E] font-black text-xs uppercase tracking-widest mb-2">30 Anos de Experiência</p>
                <h4 className="text-white text-3xl font-[900] uppercase tracking-tighter">Mestre Carlos Mendez</h4>
                <p className="text-white/60 mt-4 text-sm font-medium">Especialista em maturação de queijos de pasta dura e cristais de sabor.</p>
              </div>
            </div>

            <div className="relative group overflow-hidden rounded-[3rem] aspect-[4/5] md:aspect-auto h-[600px]">
              <img
                src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=1000"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                alt="Produção artesanal"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#101010] via-transparent to-transparent"></div>
              <div className="absolute bottom-12 left-12 right-12">
                <p className="text-[#90784E] font-black text-xs uppercase tracking-widest mb-2">Inovação Láctea</p>
                <h4 className="text-white text-3xl font-[900] uppercase tracking-tighter">Dra. Sofia Varela</h4>
                <p className="text-white/60 mt-4 text-sm font-medium">Líder de qualidade, garantindo que cada gota de leite atenda ao nosso padrão ouro.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Standards Section */}
      <section className="bg-[#101010] py-24 md:py-40 px-4 md:px-8 text-white relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none opacity-5">
          <p className="text-[20vw] font-black uppercase whitespace-nowrap leading-none tracking-tighter select-none">
            QUALIDADE MG QUEIJOS QUALIDADE MG QUEIJOS
          </p>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="space-y-10">
              <h2 className="text-5xl md:text-8xl font-[900] uppercase tracking-tighter leading-none">
                O PADRÃO <br /> <span className="text-[#90784E]">OURO.</span>
              </h2>
              <div className="space-y-8">
                {[
                  "Leite de pasto, rico em Ômega-3 e sabor.",
                  "Zero aditivos artificiais em toda a linha.",
                  "Maturação em caves naturais com temperatura controlada.",
                  "Rastreabilidade completa do pasto à mesa."
                ].map((standard, i) => (
                  <div key={i} className="flex items-center gap-6 group">
                    <div className="w-4 h-4 rounded-full bg-[#90784E] group-hover:scale-150 transition-transform"></div>
                    <p className="text-xl md:text-2xl font-medium text-stone-300">{standard}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#FCFAE6] rounded-[3rem] p-12 md:p-20 text-[#101010] shadow-2xl">
              <img
                src="https://mqcjdxflipzlwhfrfyky.supabase.co/storage/v1/object/public/images/logomarca/LogoElMaestro.png"
                alt="Logo"
                className="h-12 w-auto mb-10 transition-all duration-500 grayscale-0 hover:grayscale cursor-pointer"
              />
              <h3 className="text-3xl font-[900] uppercase tracking-tighter mb-6">NOSSA PROMESSA</h3>
              <p className="text-lg font-medium leading-relaxed text-stone-600 mb-8">
                Nós nunca sacrificaremos a qualidade pelo lucro. Se um lote de queijo não atinge a nota perfeita de nossos mestres, ele não recebe o selo El Maestro.
              </p>
              <div className="pt-8 border-t border-stone-200">
                <p className="text-xs font-black uppercase tracking-widest text-[#90784E]">Conselho da Cooperativa</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-40 px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-10">
          <h2 className="text-[#101010] text-5xl md:text-7xl font-[900] uppercase tracking-tighter leading-none">
            EXPERIMENTE O <br /> <span className="text-[#90784E]">DIFERENTE.</span>
          </h2>
          <p className="text-lg md:text-xl text-[#101010]/60 font-medium">
            Agora que você conhece nosso coração, descubra nossos sabores.
          </p>
          <button className="bg-[#101010] text-white px-12 py-5 rounded-full font-[900] text-sm uppercase tracking-widest hover:bg-[#90784E] transition-all shadow-xl">
            VER NOSSA SELEÇÃO
          </button>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;