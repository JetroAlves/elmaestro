import React, { useState } from 'react';
import { supabase } from '../services/supabase';

interface AdminLoginPageProps {
    onLoginSuccess: () => void;
}

const AdminLoginPage: React.FC<AdminLoginPageProps> = ({ onLoginSuccess }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const { error: authError } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (authError) throw authError;
            onLoginSuccess();
        } catch (err: any) {
            setError(err.message || 'Erro ao realizar login. Verifique suas credenciais.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#FCFAE6] flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white rounded-[3rem] shadow-2xl p-10 md:p-14 border border-stone-100 relative overflow-hidden">
                {/* Decorativo */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#90784E]/5 rounded-bl-full -mr-16 -mt-16"></div>

                <div className="relative z-10">
                    <div className="mb-10 text-center">
                        <img
                            src="https://kyflpnhnxnivnuysrszr.supabase.co/storage/v1/object/public/images/204a94a1-f534-43b9-b67e-9a3a2c9b2baf/LogoElMaestro.png"
                            alt="Logo"
                            className="h-16 mx-auto mb-6"
                        />
                        <h1 className="text-3xl font-black text-[#101010] uppercase tracking-tighter">Painel Admin</h1>
                        <p className="text-stone-500 font-bold text-xs mt-2 uppercase tracking-widest">Acesso Restrito</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-5">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-[#101010]/60 ml-4 italic">E-mail</label>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="seu@email.com"
                                className="w-full bg-[#FCFAE6] border-2 border-[#FCFAE6] rounded-2xl py-4 px-6 text-[#101010] font-bold outline-none focus:border-[#90784E] transition-all"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-[#101010]/60 ml-4 italic">Senha</label>
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full bg-[#FCFAE6] border-2 border-[#FCFAE6] rounded-2xl py-4 px-6 text-[#101010] font-bold outline-none focus:border-[#90784E] transition-all"
                            />
                        </div>

                        {error && (
                            <div className="bg-red-50 text-red-600 p-4 rounded-2xl text-xs font-bold border border-red-100 animate-shake">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#101010] hover:bg-[#90784E] text-white py-5 rounded-full font-black text-sm uppercase tracking-widest transition-all shadow-xl hover:scale-[1.02] active:scale-95 mt-4 disabled:opacity-50 disabled:scale-100 flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    ENTRANDO...
                                </>
                            ) : 'ENTRAR NO PAINEL'}
                        </button>
                    </form>

                    <p className="text-center mt-10 text-[10px] text-stone-400 font-bold uppercase tracking-widest">
                        © 2026 EL MAESTRO. Todos os direitos reservados.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AdminLoginPage;
