import React from 'react';

interface StoryDetailsPageProps {
    story: any;
    onBack: () => void;
}

const StoryDetailsPage: React.FC<StoryDetailsPageProps> = ({ story, onBack }) => {
    // Função simples para converter **texto** em negrito
    const formatContent = (text: string) => {
        if (!text) return null;

        return text.split('\n').map((paragraph, pIdx) => {
            if (!paragraph.trim()) return null;

            // Substituir **texto** por <strong>texto</strong>
            const parts = paragraph.split(/(\*\*.*?\*\*)/g);

            return (
                <p key={pIdx} className="text-[#101010] text-lg md:text-xl font-medium leading-[1.6] mb-8 opacity-90">
                    {parts.map((part, i) => {
                        if (part.startsWith('**') && part.endsWith('**')) {
                            return <strong key={i} className="font-black text-[#101010]">{part.slice(2, -2)}</strong>;
                        }
                        return part;
                    })}
                </p>
            );
        });
    };

    return (
        <div className="min-h-screen bg-white flex flex-col pt-10">
            {/* Botão Voltar */}
            <div className="max-w-4xl mx-auto w-full px-6 mb-12">
                <button
                    onClick={onBack}
                    className="flex items-center gap-2 text-[#90784E] hover:text-[#101010] transition-colors group"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-5 h-5 group-hover:-translate-x-1 transition-transform">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>
                    <span className="text-[10px] font-black uppercase tracking-widest">Voltar para o Blog</span>
                </button>
            </div>

            <div className="max-w-4xl mx-auto px-6 pb-32">
                {/* Cabeçalho El Maestro */}
                <div className="mb-16">
                    <span className="bg-[#FCFAE6] text-[#90784E] px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest inline-block mb-8 border border-[#90784E]/10">
                        El Maestro Stories • {new Date(story.created_at || Date.now()).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}
                    </span>

                    <h1 className="text-5xl md:text-8xl font-black text-[#101010] uppercase tracking-tighter leading-[0.85] mb-8">
                        {story.title}
                    </h1>

                    <div className="w-20 h-2 bg-[#90784E] mb-10 rounded-full" />

                    {/* Subtítulo / Resumo */}
                    <h2 className="text-2xl md:text-3xl font-bold text-[#101010]/60 leading-tight mb-12 max-w-3xl">
                        {story.text}
                    </h2>
                </div>

                {/* Imagem Central */}
                <div className="relative rounded-[3rem] overflow-hidden mb-16 shadow-2xl aspect-[16/10]">
                    <img
                        src={story.image}
                        alt={story.title}
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Conteúdo Completo */}
                <div className="prose prose-stone prose-lg max-w-none">
                    {story.content ? (
                        formatContent(story.content)
                    ) : (
                        <p className="text-[#101010] text-lg md:text-xl font-medium leading-relaxed mb-6 opacity-90 italic text-center py-10 border-2 border-dashed border-stone-100 rounded-3xl">
                            Conteúdo em desenvolvimento...
                        </p>
                    )}
                </div>

                {/* Rodapé da Matéria */}
                <div className="mt-24 pt-12 border-t border-stone-100 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="flex items-center gap-4">
                        <img src="https://kyflpnhnxnivnuysrszr.supabase.co/storage/v1/object/public/images/204a94a1-f534-43b9-b67e-9a3a2c9b2baf/LogoElMaestro.png" className="h-10 w-auto opacity-40 grayscale" alt="Logo" />
                        <div className="h-8 w-px bg-stone-200" />
                        <p className="text-[10px] font-black uppercase tracking-widest text-stone-300">© El Maestro Queijos Premium</p>
                    </div>

                    <button
                        onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                        className="text-[10px] font-black uppercase tracking-widest text-[#90784E] hover:text-[#101010] transition-colors flex items-center gap-2"
                    >
                        Voltar ao topo <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-3 h-3"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" /></svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default StoryDetailsPage;
