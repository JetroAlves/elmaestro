import React, { useEffect } from 'react';

const TermsPage: React.FC = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-[#FCFAE6] py-24 px-4 md:px-8">
            <div className="max-w-4xl mx-auto bg-white rounded-[3rem] shadow-xl p-8 md:p-16 border border-stone-100">
                <h1 className="text-4xl md:text-5xl font-black text-[#101010] uppercase tracking-tighter mb-8">Termos de Uso</h1>

                <div className="prose prose-stone max-w-none text-[#101010]/80 font-medium leading-relaxed space-y-6">
                    <p>Seja bem-vindo ao site da <strong>EL MAESTRO LTDA</strong>. Ao acessar e utilizar este site, você concorda em cumprir e estar vinculado aos seguintes termos e condições de uso.</p>

                    <section>
                        <h2 className="text-2xl font-black text-[#101010] uppercase tracking-tighter mt-10 mb-4">1. Aceitação dos Termos</h2>
                        <p>O uso deste site constitui sua aceitação total destes Termos de Uso. Se você não concordar com qualquer parte destes termos, não deverá utilizar nosso site.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-black text-[#101010] uppercase tracking-tighter mt-10 mb-4">2. Propriedade Intelectual</h2>
                        <p>Todo o conteúdo presente neste site, incluindo textos, gráficos, logotipos, ícones, imagens e software, é de propriedade da EL MAESTRO LTDA ou de seus fornecedores de conteúdo e é protegido por leis internacionais de direitos autorais.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-black text-[#101010] uppercase tracking-tighter mt-10 mb-4">3. Uso Permitido</h2>
                        <p>Este site destina-se ao uso pessoal e informativo. É proibida a reprodução, duplicação, cópia, venda ou exploração de qualquer parte do site para fins comerciais sem o consentimento prévio por escrito da EL MAESTRO LTDA.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-black text-[#101010] uppercase tracking-tighter mt-10 mb-4">4. Isenção de Responsabilidade</h2>
                        <p>As informações fornecidas neste site são para fins de informação geral. Embora nos esforcemos para manter as informações atualizadas e corretas, não oferecemos garantias de qualquer tipo sobre a integridade, precisão, confiabilidade ou disponibilidade em relação ao site ou às informações contidas.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-black text-[#101010] uppercase tracking-tighter mt-10 mb-4">5. Links para Terceiros</h2>
                        <p>Nosso site pode conter links para sites de terceiros que não são operados por nós. Não temos controle sobre o conteúdo e as práticas de privacidade desses sites e não podemos aceitar responsabilidade por eles.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-black text-[#101010] uppercase tracking-tighter mt-10 mb-4">6. Modificações dos Termos</h2>
                        <p>A EL MAESTRO LTDA reserva-se o direito de alterar estes termos a qualquer momento, sem aviso prévio. O seu uso continuado do site após tais alterações será considerado como sua aceitação dos novos termos.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-black text-[#101010] uppercase tracking-tighter mt-10 mb-4">7. Lei Aplicável</h2>
                        <p>Estes termos e condições são regidos e interpretados de acordo com as leis brasileiras, e você se submete irrevogavelmente à jurisdição exclusiva dos tribunais localizados no estado de Santa Catarina.</p>
                    </section>

                    <p className="pt-10 text-sm font-bold opacity-50 italic">Última atualização: Fevereiro de 2026</p>
                </div>
            </div>
        </div>
    );
};

export default TermsPage;
