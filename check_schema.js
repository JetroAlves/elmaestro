
const { createClient } = require('@supabase/supabase-client');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function checkSchema() {
    const { data, error } = await supabase.from('recipes').select('*').limit(1);
    if (error) {
        console.error('Error fetching recipes:', error);
        return;
    }
    if (data && data.length > 0) {
        console.log('Recipe keys:', Object.keys(data[0]));
        console.log('Sample record:', data[0]);
    } else {
        console.log('No recipes found to check schema.');
    }
}

checkSchema();
