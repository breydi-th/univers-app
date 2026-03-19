import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
dotenv.config({ path: 'c:/1-School app/.env' });

const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing SUPABASE credentials in .env");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function inspectProfiles() {
  // We can use a request to get the table's definition indirectly via a simple query
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .limit(1);

  if (error) {
    if (error.message.includes('column')) {
       console.log('Error found: ', error.message);
    } else {
       console.error('Fetch error:', error);
    }
  } else {
    console.log('Available columns in profiles table:', data && data.length > 0 ? Object.keys(data[0]) : 'Table is empty, try inserting a test.');
  }
}

inspectProfiles();
