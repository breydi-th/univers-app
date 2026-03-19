import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseServiceKey = import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY || '';

if (!supabaseServiceKey) {
  console.warn('Supabase service role key missing. Admin operations might fail.');
}

// Client spécial pour l'administration contournant la RLS
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);
