import React, { useEffect } from 'react';

const PrivacyPage: React.FC = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-[#FCFAE6] py-24 px-4 md:px-8">
            <div className="max-w-4xl mx-auto bg-white rounded-[3rem] shadow-xl p-8 md:p-16 border border-stone-100">
                <h1 className="text-4xl md:text-5xl font-black text-[#101010] uppercase tracking-tighter mb-8">Política de Privacidade</h1>

                <div className="prose prose-stone max-w-none text-[#101010]/80 font-medium leading-relaxed space-y-6">
                    <p>A <strong>EL MAESTRO LTDA</strong>, inscrita no CNPJ sob o nº 19.791.126/0001-50, valoriza a privacidade de seus visitantes e clientes. Esta Política de Privacidade descreve como coletamos, usamos e protegemos suas informações pessoais.</p>

                    <section>
                        <h2 className="text-2xl font-black text-[#101010] uppercase tracking-tighter mt-10 mb-4">1. Coleta de Informações</h2>
                        <p>Coletamos informações que você nos fornece voluntariamente ao preencher o formulário de contato ou ao enviar seu currículo. Isso pode incluir seu nome, e-mail, número de telefone e qualquer outra informação que você decida compartilhar conosco.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-black text-[#101010] uppercase tracking-tighter mt-10 mb-4">2. Uso das Informações</h2>
                        <p>As informações coletadas são utilizadas exclusivamente para:</p>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>Responder a suas solicitações de contato e dúvidas;</li>
                            <li>Avaliar currículos enviados para oportunidades de trabalho;</li>
                            <li>Melhorar nossos serviços e a experiência do usuário em nosso site.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-black text-[#101010] uppercase tracking-tighter mt-10 mb-4">3. Proteção de Dados</h2>
                        <p>Implementamos medidas de segurança técnicas e organizacionais para proteger seus dados pessoais contra acesso não autorizado, alteração, divulgação ou destruição.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-black text-[#101010] uppercase tracking-tighter mt-10 mb-4">4. Compartilhamento com Terceiros</h2>
                        <p>Não vendemos, trocamos ou transferimos suas informações de identificação pessoal para terceiros. Isso não inclui parceiros confiáveis que nos ajudam a operar nosso site, desde que essas partes concordem em manter essas informações confidenciais.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-black text-[#101010] uppercase tracking-tighter mt-10 mb-4">5. Seus Direitos</h2>
                        <p>Você tem o direito de solicitar o acesso, correção ou exclusão de seus dados pessoais a qualquer momento. Para fazer isso, entre em contato conosco através do e-mail comercial@mgqueijos.com.br.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-black text-[#101010] uppercase tracking-tighter mt-10 mb-4">6. Alterações nesta Política</h2>
                        <p>A EL MAESTRO LTDA reserva-se o direito de atualizar esta política de privacidade periodicamente. Recomendamos que você revise esta página regularmente para estar ciente de quaisquer mudanças.</p>
                    </section>

                    <p className="pt-10 text-sm font-bold opacity-50 italic">Última atualização: Fevereiro de 2026</p>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPage;
