// Client-side Supabase client with anonymous key
const { createClient } = require('@supabase/supabase-js');

// Get environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Validate environment variables
if (!supabaseUrl || !supabaseAnonKey) {
  console.error(
    'Missing Supabase environment variables. Check your .env file.'
  );
}

// Create Supabase client with anonymous key for client-side operations
const supabase = createClient(supabaseUrl, supabaseAnonKey);

module.exports = {
  supabase,
};