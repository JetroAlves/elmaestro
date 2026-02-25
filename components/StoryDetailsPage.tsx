import React from 'react';

interface StoryDetailsPageProps {
    story: any;
    onBack: () => void;
}

const StoryDetailsPage: React.FC<StoryDetailsPageProps> = ({ story, onBack }) => {
    return (
        <div className="min-h-screen bg-[#FCFAE6] flex flex-col">
            {/* Header / Hero da História */}
            <div className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden">
                <img
                    src={story.image}
                    alt={story.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#FCFAE6] via-transparent to-black/20" />

                {/* Botão Voltar */}
                <button
                    onClick={onBack}
                    className="absolute top-8 left-8 z-20 flex items-center gap-2 bg-white/90 backdrop-blur-md px-6 py-3 rounded-full shadow-xl hover:bg-white transition-all group active:scale-95"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 group-hover:-translate-x-1 transition-transform">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#101010]">Voltar</span>
                </button>
            </div>

            {/* Conteúdo */}
            <div className="max-w-4xl mx-auto px-6 -mt-32 relative z-10 pb-24">
                <div className="bg-white rounded-[3rem] shadow-2xl p-10 md:p-16 border border-stone-100">
                    <div className="flex flex-col items-center text-center mb-12">
                        <span className="bg-[#90784E] text-white px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest mb-6 shadow-lg">
                            El Maestro Stories
                        </span>
                        <h1 className="text-4xl md:text-7xl font-black text-[#101010] uppercase tracking-tighter leading-[0.9] mb-8">
                            {story.title}
                        </h1>
                        <p className="text-xl md:text-2xl font-bold text-[#101010]/60 italic">
                            "{story.text}"
                        </p>
                    </div>

                    <div className="w-24 h-1 bg-[#90784E]/20 mx-auto mb-12 rounded-full" />

                    {/* Corpo do Texto */}
                    <div className="prose prose-stone prose-lg max-w-none">
                        {story.content ? (
                            story.content.split('\n').map((paragraph: string, idx: number) => (
                                paragraph.trim() && (
                                    <p key={idx} className="text-[#101010] text-lg md:text-xl font-medium leading-relaxed mb-6 opacity-90 first-letter:text-5xl first-letter:font-black first-letter:text-[#90784E] first-letter:mr-3 first-letter:float-left">
                                        {paragraph}
                                    </p>
                                )
                            ))
                        ) : (
                            <p className="text-[#101010] text-lg md:text-xl font-medium leading-relaxed mb-6 opacity-90 text-center italic">
                                {story.text}
                            </p>
                        )}
                    </div>

                    {/* Rodapé da História */}
                    <div className="mt-20 pt-10 border-t border-stone-100 flex flex-col items-center">
                        <img src="https://kyflpnhnxnivnuysrszr.supabase.co/storage/v1/object/public/images/204a94a1-f534-43b9-b67e-9a3a2c9b2baf/LogoElMaestro.png" className="h-16 w-auto mb-6 grayscale opacity-20" alt="Logo" />
                        <p className="text-[10px] font-black uppercase tracking-widest text-stone-300">© El Maestro Queijos Premium</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StoryDetailsPage;
