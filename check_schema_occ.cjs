
const { createClient } = require('@supabase/supabase-client');
const fs = require('fs');

const envContent = fs.readFileSync('.env', 'utf8');
const env = {};
envContent.split('\n').forEach(line => {
    const [key, value] = line.split('=');
    if (key && value) {
        env[key.trim()] = value.trim();
    }
});

const supabaseUrl = env.VITE_SUPABASE_URL;
const supabaseAnonKey = env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function checkSchema() {
    const { data, error } = await supabase.from('recipes').select('*').limit(1);
    if (error) {
        console.error('Error fetching recipes:', error);
        return;
    }
    if (data && data.length > 0) {
        console.log('Recipe keys:', Object.keys(data[0]));
    } else {
        console.log('No recipes found to check schema.');
    }
}

checkSchema();
