import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

let supabaseInstance: any;

try {
    if (!supabaseUrl || supabaseUrl.includes('seu-url-do-supabase') || !supabaseUrl.startsWith('http')) {
        console.warn("Supabase URL is invalid or missing! Content fetching will fail.");
        // Criamos um mock básico para evitar erros de undefined
        supabaseInstance = {
            from: () => ({
                select: () => ({ eq: () => ({ order: () => ({ limit: () => ({ single: () => Promise.resolve({ data: null, error: { message: 'Supabase URL not configured' } }) }) }) }) }),
                insert: () => Promise.resolve({ data: null, error: { message: 'Supabase URL not configured' } })
            }),
            storage: {
                from: () => ({
                    upload: () => Promise.resolve({ data: null, error: { message: 'Supabase Storage not configured' } }),
                    getPublicUrl: () => ({ data: { publicUrl: '' } })
                })
            }
        };
    } else {
        supabaseInstance = createClient(supabaseUrl, supabaseAnonKey);
        console.log("Supabase client initialized successfully");
    }
} catch (err) {
    console.error("Failed to initialize Supabase client:", err);
    supabaseInstance = {
        from: () => ({
            select: () => ({ eq: () => ({ order: () => ({ limit: () => ({ single: () => Promise.resolve({ data: null, error: { message: 'Initialization failed' } }) }) }) }) }),
            insert: () => Promise.resolve({ data: null, error: { message: 'Initialization failed' } })
        }),
        storage: {
            from: () => ({
                upload: () => Promise.resolve({ data: null, error: { message: 'Initialization failed' } }),
                getPublicUrl: () => ({ data: { publicUrl: '' } })
            })
        }
    };
}

export const supabase = supabaseInstance;
