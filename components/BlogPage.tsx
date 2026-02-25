import React, { useState, useEffect } from 'react';
import { supabase } from '../services/supabase';

interface BlogPageProps {
    onSelectStory: (story: any) => void;
}

const BlogPage: React.FC<BlogPageProps> = ({ onSelectStory }) => {
    const [stories, setStories] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStories = async () => {
            const { data, error } = await supabase
                .from('story_grid')
                .select('*')
                .order('sorting_order', { ascending: true });

            if (data && !error) {
                setStories(data);
            }
            setLoading(false);
        };
        fetchStories();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#FCFAE6] flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-[#90784E] border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#FCFAE6] py-20 px-4 md:px-8">
            <div className="max-w-7xl mx-auto">
                <header className="mb-20 text-center">
                    <span className="bg-[#90784E] text-white px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest inline-block mb-6 shadow-lg">
                        Nosso Jornal
                    </span>
                    <h1 className="text-5xl md:text-8xl font-black text-[#101010] uppercase tracking-tighter leading-none mb-6">
                        El Maestro <br /> <span className="text-[#90784E]">Stories</span>
                    </h1>
                    <p className="max-w-2xl mx-auto text-[#101010]/60 font-medium text-lg md:text-xl">
                        Descubra as histórias por trás de cada queijo, nossas tradições uruguaias e o cuidado em cada detalhe da nossa produção premium.
                    </p>
                </header>

                {/* Blog Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {stories.map((story) => (
                        <div
                            key={story.id}
                            className="group cursor-pointer flex flex-col space-y-6"
                            onClick={() => onSelectStory(story)}
                        >
                            <div className={`relative aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl ${story.bg_color || 'bg-white'} transition-transform duration-500 group-hover:-translate-y-3`}>
                                <img
                                    src={story.image}
                                    alt={story.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#101010]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-10">
                                    <span className="bg-white text-[#101010] py-4 px-8 rounded-full font-black text-xs uppercase tracking-widest shadow-2xl translate-y-4 group-hover:translate-y-0 transition-transform">Ler Matéria Completa</span>
                                </div>
                            </div>

                            <div className="space-y-4 px-2">
                                <div className="flex items-center gap-4">
                                    <span className="text-[#90784E] font-black text-[10px] uppercase tracking-widest border-b border-[#90784E]/30 pb-1">
                                        História
                                    </span>
                                    <span className="text-stone-300">•</span>
                                    <span className="text-stone-400 text-[10px] font-bold uppercase tracking-widest">
                                        {new Date(story.created_at || Date.now()).toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}
                                    </span>
                                </div>
                                <h2 className="text-3xl font-black text-[#101010] uppercase tracking-tighter leading-tight group-hover:text-[#90784E] transition-colors">
                                    {story.title}
                                </h2>
                                <p className="text-[#101010]/70 font-bold text-base leading-relaxed line-clamp-3">
                                    {story.text}
                                </p>
                                <div className="pt-2">
                                    <span className="text-[#101010] font-black text-[10px] uppercase tracking-widest flex items-center gap-2 group-hover:gap-4 transition-all">
                                        Continuar lendo <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" /></svg>
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {stories.length === 0 && !loading && (
                    <div className="py-20 text-center font-black uppercase tracking-widest text-[#101010]/20">
                        Nenhuma história encontrada...
                    </div>
                )}
            </div>
        </div>
    );
};

export default BlogPage;
